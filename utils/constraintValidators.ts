// utils/constraintValidators.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export function validateFile(file: File, type: 'image' | 'pdf', globals:any, lang:any) {
  const maxSize = globals.constraints[type].maxSizeMB * 1024 * 1024;

  if (file.size > maxSize)
    return globals.errors.maxSize[lang];

  if (
    type === 'image' &&
    !globals.constraints.image.allowedMimeTypes.includes(file.type)
  )
    return globals.errors.invalidType[lang];

  return null;
}
