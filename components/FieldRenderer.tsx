// components/FieldRenderer.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

// export function FieldRenderer({
//   field,
//   lang,
//   globals,
//   value,
//   onChange,
//   locked,
//   error,
// }:any) {
//   if (field.type === 'text')
//     return <TextField {...props} />;

//   if (field.type === 'image')
//     return <ImageUploadField {...props} />;

//   if (field.type === 'pdf')
//     return <PdfUploadField {...props} />;
// }



// components/FieldRenderer.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { TextField } from "./fields/TextField";
import { ImageUploadField } from "./fields/ImageUploadField";
import { PdfUploadField } from "./fields/PdfUploadField";

export function FieldRenderer({
  field,
  lang,
  globals,
  value,
  onChange,
  locked,
  error,
}: any) {

  const props = {
    field,
    lang,
    globals,
    value,
    onChange,
    locked,
    error,
  };

  switch (field.type) {
    case "text":
      return <TextField {...props} />;

    case "image":
      return <ImageUploadField {...props} />;

    case "pdf":
      return <PdfUploadField {...props} />;

    default:
      return null;
  }
}
