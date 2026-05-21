# Automation V2 — Preparation & Future Architecture

## V2 Vision

V2 introduces AI-assisted automation to scale content production, data enrichment, and distribution without sacrificing quality. The MVP must be architected to support these additions seamlessly.

**V2 Principles:**
1. MVP works without automation (no dependency)
2. Automation enhances existing processes (doesn't replace them)
3. Human review remains mandatory for published content
4. All automation is observable and controllable (dashboard + kill switches)
5. Quality scoring gates prevent AI slop from reaching production

## What V2 Automates

| Process | V1 (MVP) | V2 | Frequency |
|---|---|---|---|
| Article publishing | Manual MDX creation | AI-assisted generation + human review | Weekly batch |
| Company data enrichment | Manual | AI scraping + enrichment | Daily batch |
| Local page generation | Manual (10 pilots) | Programmatic (350+ cities) | One-time then updates |
| Content refresh detection | Manual calendar | Automated freshness scoring | Weekly scan |
| SEO monitoring | Manual (Ahrefs) | Automated rank tracking | Daily |
| GEO citation monitoring | Manual query | Automated AI citation tracking | Weekly |
| Social distribution | Manual posting | Auto-generated + scheduled | Per publication |
| Newsletter creation | Manual curation | AI-assisted curation | Weekly |
| Lead scoring | Basic rules | ML-based scoring | Real-time |

## V2 Technical Architecture

### Orchestration: n8n (Self-Hosted)

```
n8n instance (self-hosted on Railway or VPS)
├── Workflow: Content Generation
├── Workflow: Data Enrichment
├── Workflow: Local Page Generation
├── Workflow: SEO Monitoring
├── Workflow: GEO Monitoring
├── Workflow: Social Distribution
├── Workflow: Newsletter Assembly
├── Workflow: Content Refresh Scan
└── Workflow: Lead Processing
```

**Why n8n:**
- Free (self-hosted)
- Visual workflow builder
- Native Supabase integration
n- HTTP request nodes for any API
- Error handling and retries built-in
- Schedule triggers (cron)
- Webhook triggers (from CleanP events)

### AI Layer: Multi-Provider LLM

| Provider | Model | Use | Cost Est. |
|---|---|---|---|
| **Anthropic** | Claude 3.5 Sonnet | Article generation, enrichment, complex reasoning | ~$0.03/1K tokens |
| **OpenAI** | GPT-4o-mini | Classification, extraction, summarization | ~$0.005/1K tokens |
| **Google** | Gemini 1.5 Pro | Long-context analysis (full pages, reports) | ~$0.01/1K tokens |

**Failover:** Claude primary → GPT-4o-mini fallback → Gemini tertiary.

### RAG (Retrieval-Augmented Generation)

```
CleanP content (MDX + DB)
  → Embedding (OpenAI text-embedding-3-small)
    → Supabase pgvector (existing!)
      → Similarity search for context
        → LLM prompt with retrieved context
          → Generated content grounded in facts
```

**MVP preparation:**
- `pgvector` extension is installed on Supabase
- `documents` table exists (for V2 RAG storage)
- Embedding pipeline is documented but not active

## V2 Database Additions

These tables should NOT be created in MVP. Documented here for migration planning.

```sql
-- V2: Content generation tracking
CREATE TABLE content_generation_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'generating', 'review', 'approved', 'rejected', 'published')),
  content_type text NOT NULL CHECK (content_type IN ('article', 'local_page', 'enrichment', 'social_post')),
  target_slug text,
  prompt text,
  raw_output text,
  score_quality integer CHECK (score_quality >= 0 AND score_quality <= 100),
  reviewed_by uuid,
  review_notes text,
  published_content_id uuid,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- V2: RAG document store
CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type text NOT NULL, -- 'article', 'regulation', 'study', 'website_scrape'
  source_id text,
  title text,
  content text NOT NULL,
  embedding vector(1536), -- OpenAI embedding dimension
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);
CREATE INDEX idx_documents_embedding ON documents USING ivfflat (embedding vector_cosine_ops);

-- V2: SEO ranking tracking
CREATE TABLE seo_rankings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text NOT NULL,
  url text NOT NULL,
  position integer,
  search_volume integer,
  difficulty integer,
  engine text DEFAULT 'google',
  tracked_at timestamptz DEFAULT now()
);
CREATE INDEX idx_seo_rankings_keyword ON seo_rankings(keyword, tracked_at DESC);

-- V2: GEO citation tracking
CREATE TABLE geo_citations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query text NOT NULL,
  ai_engine text NOT NULL CHECK (ai_engine IN ('chatgpt', 'claude', 'perplexity', 'gemini', 'copilot')),
  cited_url text,
  citation_text text,
  position integer, -- position in citations list
  is_cited boolean DEFAULT false,
  tracked_at timestamptz DEFAULT now()
);
CREATE INDEX idx_geo_citations_query ON geo_citations(query, ai_engine);

-- V2: Content freshness scoring
CREATE TABLE content_freshness_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type text NOT NULL,
  content_slug text NOT NULL,
  freshness_score integer CHECK (freshness_score >= 0 AND freshness_score <= 100),
  last_updated timestamptz,
  recommended_action text CHECK (recommended_action IN ('ok', 'minor_update', 'major_refresh', 'archive')),
  calculated_at timestamptz DEFAULT now(),
  UNIQUE(content_type, content_slug)
);

-- V2: Automation job logs
CREATE TABLE automation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_name text NOT NULL,
  job_id text,
  status text DEFAULT 'started' CHECK (status IN ('started', 'success', 'warning', 'error')),
  details jsonb DEFAULT '{}',
  error_message text,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz
);
CREATE INDEX idx_automation_logs_workflow ON automation_logs(workflow_name, started_at DESC);
```

## Content Generation Workflow (V2)

```
Trigger: Weekly (Monday 06:00) OR Manual (dashboard)

Step 1: OPPORTUNITY DETECTION
├── Scrape Google Suggest for cleaning industry queries
├── Check Ahrefs for new keywords with volume > 100
├── Identify competitor content that ranks but is outdated
└── Score opportunities: volume × relevance × competition
    → Select top 3 opportunities

Step 2: RESEARCH
├── Search top 10 Google results for the query
├── Extract key facts, statistics, sources
├── Query internal RAG (existing CleanP content for context)
└── Compile research brief (automated)

Step 3: GENERATION
├── Build prompt with: brief + tone guide + structure template + BLUF requirement
├── Call Claude 3.5 Sonnet
├── Post-process: extract FAQ, verify structure, check length
└── Save to content_generation_jobs table (status: review)

Step 4: QUALITY SCORING (automated)
├── Check: length > 1500 words?
├── Check: BLUF present in first 50 words?
├── Check: H1-H2-H3 structure?
├── Check: 3+ data points with citations?
├── Check: FAQ section present?
├── Check: similarity with existing content < 30%?
└── Score 0-100 → save to job record

Step 5: HUMAN REVIEW
├── If score >= 80: flag for quick review
├── If score 50-79: flag for standard review
├── If score < 50: auto-reject
├── Reviewer approves, edits, or rejects via admin UI
└── Approved → publish (MDX commit + revalidate)
```

## Data Enrichment Workflow (V2)

```
Trigger: Daily at 02:00 CET

Step 1: SELECT TARGETS
├── SELECT companies WHERE enriched_at > 7 days ago OR score_visibility < 60
├── LIMIT 50 per batch
└── Order by: score_visibility ASC (worst first)

Step 2: WEB SCRAPING
├── For each company with website:
│   ├── GET homepage → extract meta description, title
│   ├── GET /services or /prestations → extract services
│   ├── GET /contact → extract phone, email
│   └── Extract: LinkedIn, Facebook links from footer
└── Store raw scrape in enrichment_jobs

Step 3: AI ENRICHMENT
├── Build prompt: raw scrape + Sirene data + enrichment instructions
├── Call GPT-4o-mini (fast, cheap for structured extraction)
├── Extract: specialties[], service_area[], description, certifications[]
├── Validate: no hallucination (cross-check with raw data)
└── Save enriched_data JSONB to companies table

Step 4: SCORE UPDATE
├── Recalculate score_visibility
├── If score improved by > 20 points: flag for featured review
└── Log: enrichment_jobs record updated with status
```

## Local Page Generation Workflow (V2)

```
Trigger: One-time (batch) then monthly updates

Step 1: CITY DATA AGGREGATION
├── For each city in cities table:
│   ├── Count: companies in 30km radius
│   ├── Calculate: avg score_visibility of local companies
│   ├── Extract: top 10 companies by score
│   └── Compile: city market stats (from INSEE data)
└── Generate data payload

Step 2: CONTENT GENERATION
├── Template: local-page-template.md
├── Variables: {city_name}, {population}, {company_count}, {avg_rate}, {top_companies}
├── Call Claude 3.5 Sonnet with template + data payload
├── Output: full article text with H1-H2-H3 + FAQ + company cards
└── Save to content_generation_jobs

Step 3: PUBLISH
├── Convert to MDX (if using MDX for local pages) OR insert as DB record
├── Add Schema.org (LocalBusiness for each company, FAQPage, Dataset)
├── Add to sitemap
├── Trigger revalidate
└── Log: published
```

## GEO Monitoring Workflow (V2)

```
Trigger: Weekly (Sunday)

Step 1: QUERY AI ENGINES
├── For each of 10 standard test queries:
│   ├── Query ChatGPT (via API if available, else manual)
│   ├── Query Perplexity
│   ├── Query Claude (via API)
│   └── Query Gemini
└── Extract: cited URLs, citation text, position

Step 2: RECORD
├── Save to geo_citations table
├── Flag new citations (not seen before)
├── Flag lost citations (previously cited, now absent)
└── Calculate: citation rate (%) per engine

Step 3: ALERT
├── If citation rate drops > 20%: alert team
├── If new high-value query gets no citation: priority content creation
└── Monthly report: citation trends by engine, by content type
```

## Social Distribution Workflow (V2)

```
Trigger: On article publish (webhook)

Step 1: EXTRACT KEY POINTS
├── Summarize article: 3 key takeaways
├── Extract: most compelling stat
├── Generate: hook sentence (attention-grabbing)
└── Build: LinkedIn post + X thread + newsletter blurb

Step 2: SCHEDULE
├── LinkedIn: publish immediately (Tuesday 09:00 or Thursday 14:00)
├── X: publish immediately or schedule
└── Queue for newsletter (next issue)

Step 3: TRACK
├── Store engagement metrics (likes, shares, comments)
├── Correlate with traffic spike
└── Feed into content performance analytics
```

## MVP Preparation Checklist

Before V2 starts, ensure MVP has:

- [ ] `pgvector` extension enabled on Supabase
- [ ] `metadata` JSONB on companies table (stores raw enrichment data)
- [ ] `enriched_data` JSONB on companies table (stores processed enrichment)
- [ ] Content generation API endpoint (accepts prompts, returns text)
- [ ] Webhook endpoint for publish events (triggers external workflows)
- [ ] Admin API endpoints (for workflow authentication)
- [ ] n8n instance provisioned and connected to Supabase
- [ ] LLM API keys (Anthropic, OpenAI) secured in environment
- [ ] Monitoring dashboard (automation_logs table + basic UI)
- [ ] Kill switch mechanism (disable all automation instantly)

## Automation Risk Mitigation

| Risk | Mitigation |
|---|---|
| AI generates incorrect regulatory info | Human review mandatory + expert verification for regulatory content |
| AI hallucinates company data | Cross-check with raw scrape data + confidence threshold |
| Spammy content published | Quality scoring gate (<70 rejected) + human review required |
| Duplicate content | Vector similarity check against existing content (>30% similarity rejected) |
| Over-automation damages brand | Max 3 AI articles/week, max 50 enrichments/day, human always in loop |
| API costs explode | Rate limiting, token budgets, usage alerts |
| n8n instance down | All MVP features work without automation; queue resumes when back |

## V2 Timeline Estimate

| Phase | Duration | Key Deliverables |
|---|---|---|
| V2.0: Content gen + enrichment | 4-6 weeks | 2 workflows active, 3 AI articles/week |
| V2.1: Local pages programmatic | 3-4 weeks | 350+ city pages generated |
| V2.2: SEO + GEO monitoring | 2-3 weeks | Automated rank tracking, citation monitoring |
| V2.3: Social + newsletter auto | 2-3 weeks | Auto-distribution, AI-assisted curation |
| V2.4: Lead scoring + optimization | 3-4 weeks | ML-based scoring, conversion optimization |
