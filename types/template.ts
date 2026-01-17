// types/template.ts
export type Lang = 'en' | 'ar';

export interface TemplateField {
  name: string;
  type: 'text' | 'image' | 'pdf';
  required?: boolean;
  label: Record<Lang, string>;
}

export interface TemplateTab {
  key: string;
  label: Record<Lang, string>;
  fields: TemplateField[];
}

export interface TemplateState {
  tabs: TemplateTab[];
}

export interface TemplateGlobals {
  constraints: {
    image: {
      maxSizeMB: number;
      allowedMimeTypes: string[];
    };
    pdf: {
      maxSizeMB: number;
    };
  };
  errors: Record<string, Record<Lang, string>>;
  helpText: Record<string, Record<Lang, string>>;
}

export interface Template {
  templateKey: string;
  states: Record<'Domestic' | 'Imported'| 'General', TemplateState>;
  globals: TemplateGlobals;
}
