import { Template, TemplateField } from "../types/template";

export function getStateTemplate(
  template: Template,
  state: "Domestic" | "Imported"
) {
  const stateTemplate = template.states[state];
  if (!stateTemplate) {
    throw new Error(`State '${state}' not found in template`);
  }
  return stateTemplate;
}

export function flattenFields(template: Template, state: "Domestic" | "Imported") {
  return template.states[state].tabs.flatMap(tab =>
    tab.fields.map(field => ({
      ...field,
      tabKey: tab.key,
    }))
  );
}

export function getFieldByName(
  template: Template,
  state: "Domestic" | "Imported",
  name: string
): TemplateField | undefined {
  return flattenFields(template, state).find(f => f.name === name);
}
