/**
 * 10 pilot cities — MVP local pages.
 *
 * INSEE population data: figures rounded to nearest thousand from
 * the INSEE municipal census (Recensement de la population, dernier
 * millésime exploitable). Office surface and cleaning company count
 * are conservative estimates compiled from CBRE / ORT data and
 * Sirene NAF 8121Z extracts; they should be refined per-city by
 * the editorial team before publication.
 *
 * Lat / Lng = city hall (mairie centrale) coordinates.
 */

export type PilotCity = {
  /** URL slug — lowercase, no accents, hyphens. */
  slug: string;
  /** Canonical display name. */
  name: string;
  /** INSEE department code (e.g. "75", "69", "13"). */
  departmentCode: string;
  /** Department name in French. */
  departmentName: string;
  /** Region (INSEE 2016 boundaries). */
  region: string;
  /** Municipal population (commune only). */
  population: number;
  /** Metro / EPCI population, if meaningfully larger than commune. */
  metroPopulation?: number;
  /** Estimated office-stock surface in m² (commune scope). */
  officeSurface: number;
  /** Estimated number of active NAF 8121Z companies in the city. */
  cleaningCompanyCount: number;
  /** City hall latitude (WGS84). */
  lat: number;
  /** City hall longitude (WGS84). */
  lng: number;
};

export const PILOT_CITIES: readonly PilotCity[] = [
  {
    slug: 'paris',
    name: 'Paris',
    departmentCode: '75',
    departmentName: 'Paris',
    region: 'Île-de-France',
    population: 2_103_000,
    metroPopulation: 10_785_000,
    officeSurface: 53_000_000,
    cleaningCompanyCount: 2_400,
    lat: 48.8566,
    lng: 2.3522,
  },
  {
    slug: 'lyon',
    name: 'Lyon',
    departmentCode: '69',
    departmentName: 'Rhône',
    region: 'Auvergne-Rhône-Alpes',
    population: 522_000,
    metroPopulation: 1_424_000,
    officeSurface: 6_400_000,
    cleaningCompanyCount: 520,
    lat: 45.764,
    lng: 4.8357,
  },
  {
    slug: 'marseille',
    name: 'Marseille',
    departmentCode: '13',
    departmentName: 'Bouches-du-Rhône',
    region: "Provence-Alpes-Côte d'Azur",
    population: 873_000,
    metroPopulation: 1_899_000,
    officeSurface: 3_900_000,
    cleaningCompanyCount: 610,
    lat: 43.2965,
    lng: 5.3698,
  },
  {
    slug: 'bordeaux',
    name: 'Bordeaux',
    departmentCode: '33',
    departmentName: 'Gironde',
    region: 'Nouvelle-Aquitaine',
    population: 261_000,
    metroPopulation: 822_000,
    officeSurface: 2_100_000,
    cleaningCompanyCount: 240,
    lat: 44.8378,
    lng: -0.5792,
  },
  {
    slug: 'nantes',
    name: 'Nantes',
    departmentCode: '44',
    departmentName: 'Loire-Atlantique',
    region: 'Pays de la Loire',
    population: 320_000,
    metroPopulation: 670_000,
    officeSurface: 2_500_000,
    cleaningCompanyCount: 220,
    lat: 47.2184,
    lng: -1.5536,
  },
  {
    slug: 'lille',
    name: 'Lille',
    departmentCode: '59',
    departmentName: 'Nord',
    region: 'Hauts-de-France',
    population: 236_000,
    metroPopulation: 1_182_000,
    officeSurface: 3_200_000,
    cleaningCompanyCount: 380,
    lat: 50.6292,
    lng: 3.0573,
  },
  {
    slug: 'toulouse',
    name: 'Toulouse',
    departmentCode: '31',
    departmentName: 'Haute-Garonne',
    region: 'Occitanie',
    population: 504_000,
    metroPopulation: 1_046_000,
    officeSurface: 4_100_000,
    cleaningCompanyCount: 360,
    lat: 43.6047,
    lng: 1.4442,
  },
  {
    slug: 'strasbourg',
    name: 'Strasbourg',
    departmentCode: '67',
    departmentName: 'Bas-Rhin',
    region: 'Grand Est',
    population: 291_000,
    metroPopulation: 511_000,
    officeSurface: 1_700_000,
    cleaningCompanyCount: 190,
    lat: 48.5734,
    lng: 7.7521,
  },
  {
    slug: 'nice',
    name: 'Nice',
    departmentCode: '06',
    departmentName: 'Alpes-Maritimes',
    region: "Provence-Alpes-Côte d'Azur",
    population: 348_000,
    metroPopulation: 545_000,
    officeSurface: 1_400_000,
    cleaningCompanyCount: 240,
    lat: 43.7102,
    lng: 7.262,
  },
  {
    slug: 'rennes',
    name: 'Rennes',
    departmentCode: '35',
    departmentName: 'Ille-et-Vilaine',
    region: 'Bretagne',
    population: 222_000,
    metroPopulation: 460_000,
    officeSurface: 1_500_000,
    cleaningCompanyCount: 170,
    lat: 48.1173,
    lng: -1.6778,
  },
] as const;

export function findCityBySlug(slug: string): PilotCity | undefined {
  return PILOT_CITIES.find((city) => city.slug === slug);
}

export function nearbyCities(
  slug: string,
  radiusKm = 200,
  limit = 4,
): PilotCity[] {
  const origin = findCityBySlug(slug);
  if (!origin) return [];
  return PILOT_CITIES.filter((city) => city.slug !== slug)
    .map((city) => ({
      city,
      distance: haversineKm(origin, city),
    }))
    .filter(({ distance }) => distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map(({ city }) => city);
}

function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  const x =
    sinDLat * sinDLat +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinDLng * sinDLng;
  return 2 * R * Math.asin(Math.sqrt(x));
}
