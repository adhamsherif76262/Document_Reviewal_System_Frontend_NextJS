// utils/constraintValidators.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

// export function validateFile(file: File, type: 'image' | 'pdf', globals:any, lang:any) {
//   console.log("After Passing Globals \n" + Object.keys(globals.errors))
//   const maxSize = globals.constraints[type].maxSizeMB * 1024 * 1024;

//   if(!file)
//     return globals.errors[type].required[lang]
//   if (file.size > maxSize)
//     return globals.errors[type].maxSize[lang];

//   if (
//     type === 'image' &&
    // !globals.constraints.image.allowedMimeTypes.includes(file.type)
//   )
//     return globals.errors.invalidType[lang];

//   return null;
// }


export function validateFile(
  files: File[] | undefined,
  type: 'image' | 'pdf',
  globals: any,
  lang: 'en' | 'ar'
): string[] {
  const errors: string[] = [];

  const constraints = globals.constraints[type];
  const messages = globals.errors[type];

  // Required
  if (!files || files.length === 0) {
    errors.push(messages.required[lang]);
    return errors; // no need to continue
  }

  // Max files
  // if (constraints.maxFiles && files.length > constraints.maxFiles) {
  //   errors.push(messages.maxFiles[lang]);
  // }

  const maxSizeBytes = constraints.maxSizeMB * 1024 * 1024;

  files.forEach((file) => {
    // Max size
    if (file.size > maxSizeBytes) {
      errors.push(messages.maxSize[lang]);
    }

    // Invalid mime type
    if (
      constraints.allowedMimeTypes &&
      !constraints.allowedMimeTypes.includes(file.type)
    ) {
      errors.push(messages.invalidType[lang]);
    }
  });

  // Remove duplicate messages
  return Array.from(new Set(errors));
}
