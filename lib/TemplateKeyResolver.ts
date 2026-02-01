// lib/resolveTemplateKey.ts
export const TEMPLATE_KEY_MAP: Record<string, string> = {
  "Domestic Organic Nutrition": "organic_nutrition",
  "Imported Organic Nutrition": "organic_nutrition",

  "Domestic Organic Pesticide": "organic_pesticide",
  "Imported Organic Pesticide": "organic_pesticide",

  "Organic Farm": "organic_farm",
  "Exporters Organic Production": "exporters_organic_production",
  "Importers Organic Production": "importers_organic_production",
  "Warehouse": "warehouse",
  "Factory Or Production Unit": "factory_or_production_unit",
  "Conformity Office Or Entity": "conformity_office_or_entity",
  "Consultancy Firms Or Scientific Offices":
    "consultancy_firms_or_scientific_offices",
  "Organic Feed Logo": "organic_feed_logo",
};

export function resolveTemplateKey(docType: string) {
  return TEMPLATE_KEY_MAP[docType];
}
