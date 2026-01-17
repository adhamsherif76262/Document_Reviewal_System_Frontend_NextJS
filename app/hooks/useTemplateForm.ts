/* eslint-disable @typescript-eslint/no-explicit-any */

// import { Template } from "../../types/template";

// // hooks/useTemplateForm.ts
// export function useTemplateForm(template: Template, state: 'Domestic' | 'Imported') {
//   const tabs = template.states[state].tabs;

//   const defaultValues = Object.fromEntries(
//     tabs.flatMap(tab =>
//       tab.fields.map(f => [f.name, f.type === 'text' ? '' : []])
//     )
//   );

//   return { tabs, defaultValues };
// }

import { useState } from "react";
import { Template } from "../../types/template";

export function useTemplateForm(
  template: Template | null,
  state: "Domestic" | "Imported" | "General" | null,
  lockedFields: string[] = []
) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  function setFieldValue(name: string, value: any) {
    if (lockedFields.includes(name)) return;
    setValues(prev => ({ ...prev, [name]: value }));
  }

  function setFieldError(name: string, error: string | null) {
    setErrors(prev => ({ ...prev, [name]: error }));
  }

  return {
    values,
    errors,
    setFieldValue,
    setFieldError,
  };
}
