# Lead Magnets & Conversion Strategy

## Philosophy

Every page on CleanP must have a clear conversion path. But conversion on CleanP is **indirect** — we capture interest and pass it to Proprely (SaaS) or Réseau Propreté (service marketplace). The value exchange must be fair: the user gets something genuinely useful, and we get permission to follow up.

## Conversion Funnels

### Funnel A: Educational Content → Lead Magnet → Email Nurture → Proprely

```
Entry: Google search for regulatory or operational query
  → Guide article (trust building)
    → CTA: Download related PDF/tool
      → Email capture (value exchange)
        → Welcome email (immediate delivery)
          → Drip sequence (3-5 emails over 2 weeks)
            → Soft CTA Proprely (contextual)
              → Demo request on Proprely.fr
```

**Metrics:** Article → CTA click: target 5%. CTA → email submit: target 30%. Email → demo: target 3%.

### Funnel B: Tool Usage → Light Registration → Nurture → Proprely

```
Entry: Direct or social to tool page
  → Interactive tool (value delivered immediately)
    → Completion → "Save/email your results"
      → Email + company name capture
        → Results email with Proprely mention
          → Follow-up sequence
            → Proprely trial or demo
```

**Metrics:** Tool start → completion: target 60%. Completion → email: target 40%.

### Funnel C: Local Search → Quote Request → Réseau Propreté

```
Entry: "société de nettoyage [ville]"
  → Local city page
    → Browse companies or direct CTA
      → "Obtenir 3 devis gratuits"
        → Quote form (service type, surface, email)
          → Lead sent to Réseau Propreté matching
```

**Metrics:** Local page → CTA click: target 8%. Form → submit: target 50%.

### Funnel D: Software Comparison → Direct Trial → Proprely

```
Entry: "meilleur logiciel nettoyage" or "[software] avis"
  → Comparison page or software review
    → CTA: "Tester Proprely gratuitement"
      → Proprely.fr/signup
```

**Metrics:** Comparison → CTA click: target 6%. High-intent traffic.

## Lead Magnets (MVP)

### LM1: "Guide Grille Salariale Propreté 2025" (PDF)

| Attribute | Detail |
|---|---|
| **Trigger** | Article about salary grids |
| **Value** | Complete, up-to-date salary grid with all levels, coefficients, and majorations |
| **Pages** | `/reglementation/grille-salaire-proprete-2025`, all regulatory articles |
| **CTA text** | "Télécharger la grille complète en PDF" |
| **Form fields** | Email + company name (optional) |
| **Delivery** | Auto-email with PDF attachment |
| **Follow-up** | 3-email sequence: (1) PDF delivered, (2) "Comment calculez-vous vos coûts ?", (3) "Les logiciels qui automatisent la paie" |

### LM2: "Checklist Audit Digitalisation" (PDF)

| Attribute | Detail |
|---|---|
| **Trigger** | Guides about digitization |
| **Value** | 20-point self-assessment of digital maturity |
| **Pages** | `/guides/digitaliser-entreprise-nettoyage`, `/logiciels` |
| **CTA text** | "Télécharger la checklist d'audit" |
| **Form fields** | Email + company name + company size |
| **Delivery** | Auto-email with PDF |
| **Follow-up** | Score interpretation email + Proprely soft CTA |

### LM3: "Modèles de Planning Excel" (Files)

| Attribute | Detail |
|---|---|
| **Trigger** | Management/planning articles |
| **Value** | 3 Excel templates: weekly schedule, monthly rotation, holiday planning |
| **Pages** | `/guides/planning-agents-nettoyage` |
| **CTA text** | "Recevoir les modèles Excel" |
| **Form fields** | Email + company name |
| **Delivery** | Email with download link (Supabase Storage) |

### LM4: Calculator Results (Email Delivery)

| Attribute | Detail |
|---|---|
| **Trigger** | Tool completion |
| **Value** | Detailed calculation results emailed |
| **Pages** | All `/outils/*` pages |
| **CTA text** | "Recevoir mon résultat par email" |
| **Form fields** | Email + company name |
| **Delivery** | Auto-email with results summary + related guide links |

## Interactive Tools (MVP)

### T1: Calculateur de Prix Nettoyage

**Purpose:** Estimate cleaning service cost based on surface, frequency, service type.

**Inputs:**
- Type de locaux (bureaux, industriel, commerce, copropriété, médical)
- Surface en m² (slider: 50-10,000)
- Fréquence (quotidien, hebdomadaire, mensuel, ponctuel)
- Nombre de postes de travail (optional, for office cleaning)
- Ville (for regional price adjustment)

**Output:**
- Prix estimé (€/mois and €/heure)
- Détail du calcul (surface × frequency × rate)
- Comparaison avec la moyenne nationale
- CTA: "Affiner mon devis" → detailed quote form or Proprely

**Formula (simplified):**
```
base_rate = rate_by_type[type]  // e.g., bureaux = 25€/h, industriel = 30€/h
frequency_multiplier = {quotidien: 22, hebdomadaire: 4.3, mensuel: 1, ponctuel: 1}
hours_needed = (surface / productivity_rate[type]) * frequency_multiplier
monthly_cost = hours_needed * base_rate * city_adjustment[city]
```

### T2: Calculateur de Rentabilité Contrat

**Purpose:** Calculate the true profitability of a cleaning contract.

**Inputs:**
- Revenu mensuel du contrat (€)
- Nombre d'heures mensuelles prévues
- Coût horaire agent (€/h, default from salary grid)
- Charges sociales (%)
- Temps de déplacement (h/mois)
- Frais matériel mensuels (€)
- Frais divers (€)

**Output:**
- Marge brute (% and €)
- Coût total par heure facturée
- Seuil de rentabilité
- Recommandation: "Rentable" / "À surveiller" / "Non rentable — revoir votre pricing"
- CTA: "Comment améliorer vos marges ?" → Proprely

### T3: Générateur de Devis Nettoyage

**Purpose:** Generate a professional-looking quote PDF for cleaning companies.

**Inputs:**
- Nom de l'entreprise de nettoyage
- Logo upload (optional)
- Coordonnées
- Nom du client
- Description des prestations (line items)
- Prix unitaires et quantités
- Conditions (payment terms, duration)

**Output:**
- Preview of the quote (HTML)
- PDF download
- CTA: "Gérez vos devis professionnellement" → Proprely

## CTA Placement Rules

### Article CTAs

| Position | CTA Type | Example |
|---|---|---|
| After BLUF (top) | Soft — inline link | "Téléchargez notre modèle de planning →" |
| Mid-content (after 2nd H2) | Contextual banner | Related tool or PDF download |
| End of content | Strong — lead magnet form | "Recevez ce guide + nos outils exclusifs" |
| After FAQ | Soft — related content | "Lisez aussi: [related comparison]" |

### Tool CTAs

| Position | CTA Type | Example |
|---|---|---|
| Before tool | None — let user explore | |
| After result | Primary — email capture | "Recevoir mon résultat par email" |
| After email send | Secondary — Proprely | "Gérer vos devis comme un pro →" |

### Local Page CTAs

| Position | CTA Type | Example |
|---|---|---|
| Above fold | Primary — quote form | "Obtenir 3 devis à [Ville]" |
| After company listings | Secondary — directory | "Voir toutes les entreprises de [Ville]" |
| Bottom | Soft — guide | "Comment choisir un prestataire à [Ville]" |

### Comparison CTAs

| Position | CTA Type | Example |
|---|---|---|
| After verdict | Primary — winner CTA | "Tester [Winner] gratuitement" |
| Per software row | Secondary | "Tester [Software]" |
| End of page | Contextual | "Comparez d'autres logiciels" |

## Email Sequences

### Sequence A: PDF Download → Proprely (5 emails, 10 days)

| Day | Subject | Content | CTA |
|---|---|---|---|
| 0 | Votre [PDF] est prêt | PDF delivery + related article | Read article |
| 2 | Le coût caché de la gestion manuelle | Pain point content | "Calculer mes coûts" (tool) |
| 4 | Comment [Company] a digitalisé ses 45 agents | Case study | "Voir la démo Proprely" |
| 7 | Les 5 erreurs qui coûtent cher en nettoyage | Educational | Comparison page |
| 10 | Votre offre Proprely — 1 mois gratuit | Offer | "Activer mon mois gratuit" |

### Sequence B: Newsletter Welcome (3 emails, 7 days)

| Day | Subject | Content |
|---|---|---|
| 0 | Bienvenue sur CleanP | What to expect, most popular content |
| 3 | Les outils les plus utilisés par nos lecteurs | Tool showcase |
| 7 | Ce que vous avez manqué cette semaine | Weekly recap |

## Tracking & Attribution

### UTM Parameters

All links to Proprely and Réseau Propreté must include UTM parameters:

```
https://proprely.fr/demo?utm_source=cleanp&utm_medium=referral&utm_content=[article-slug]&utm_campaign=content_funnel_a
https://reseauproprete.fr/devis?utm_source=cleanp&utm_medium=referral&utm_content=[city-slug]&utm_campaign=local_funnel_c
```

### Conversion Events (GA4)

| Event | Trigger | Parameters |
|---|---|---|
| `lead_magnet_download` | PDF form submission | magnet_type, magnet_slug, page_location |
| `tool_completion` | Calculator result displayed | tool_slug, result_value |
| `tool_email_capture` | Email submitted from tool | tool_slug |
| `quote_request` | Local page quote form submitted | city, service_type |
| `demo_click` | CTA to Proprely clicked | cta_location, content_slug |
| `newsletter_subscribe` | Newsletter form submitted | source_page |
| `profile_claim` | Claim form submitted | company_id |
| `comparison_cta_click` | Software trial CTA clicked | software_name, comparison_slug |

### Lead Routing

```typescript
// Lead routing logic
function routeLead(lead: Lead): RoutingDecision {
  if (lead.lead_type === 'quote_request') {
    return { destination: 'rp', webhook_url: process.env.RP_WEBHOOK_URL };
  }
  if (lead.lead_type === 'demo_request' || lead.score >= 70) {
    return { destination: 'proprely', webhook_url: process.env.PROPRELY_WEBHOOK_URL };
  }
  if (lead.lead_type === 'tool_use' || lead.lead_type === 'pdf_download') {
    return { destination: 'nurture', add_to_sequence: 'sequence_a' };
  }
  return { destination: 'newsletter' };
}
```

**Webhook payloads:**

To Proprely:
```json
{
  "source": "cleanp",
  "email": "...",
  "company_name": "...",
  "phone": "...",
  "company_size": "...",
  "score": 75,
  "source_page": "/guides/digitaliser-entreprise-nettoyage",
  "interest": "digitalisation"
}
```

To Réseau Propreté:
```json
{
  "source": "cleanp",
  "email": "...",
  "company_name": "...",
  "phone": "...",
  "city": "Lyon",
  "service_type": "bureaux",
  "surface": 500,
  "source_page": "/lyon/societes-nettoyage"
}
```
