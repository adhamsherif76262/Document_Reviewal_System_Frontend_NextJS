/* eslint-disable @typescript-eslint/no-explicit-any */

import { Template } from "../../types/template";
import { validateFile } from "../../utils/constraintValidators";

export function useFormValidation(template: Template, lang: "en" | "ar") {
  function validateText(field : any, value: string) {
    if (field.required && !value?.trim()) {
      return template.globals.errors.required[lang];
    }
    return null;
  }

  function validateFiles(field : any, files: File[]) {

    if (!files || files.length === 0) {
      return [];
    }

    if (field.required && files.length === 0) {
      return template.globals.errors.required[lang];
    }

    console.log("Before Passing To Validate Single File" + Object.keys(template.globals))
    const fileErrors = validateFile(
      files,
      field.type,
      template.globals,
      lang
    );

    if (fileErrors) return fileErrors
// form.setFieldError(
//   field.name,
//   fileErrors.length ? fileErrors.join('\n') : null
// );

    // for (const file of files) {
    //   console.log("Before Passing To Validate Single File" + Object.keys(template.globals))
    //   const error = validateFile(file, field.type, template.globals, lang);
    //   if (error) return error;
    // }

    return null;
  }

  return { validateText, validateFiles };
}
