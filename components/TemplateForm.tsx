/* eslint-disable @typescript-eslint/no-explicit-any */

import { TemplateTabs } from "./TemplateTabs";
import { FieldRenderer } from "./FieldRenderer";
import { FormFooter } from "./FormFooter";
import { useFormValidation } from "../app/hooks/useFormValidation";

export function TemplateForm({
  template,
  state,
  lang,
  lockedFields = [],
  form,
  onSubmit,
}:any) {
  const { validateText, validateFiles } = useFormValidation(template, lang);
  // console.log(template)

  return (
    <>
      <TemplateTabs tabs={template?.tabs} lang={lang}>
        {(tab : any) => (
          <div className="grid grid-cols-1 gap-4 mt-4">
            {tab.fields.map((field : any) => (
              <FieldRenderer
                key={field.name}
                field={field}
                lang={lang}
                globals={template.globals}
                value={form.values[field.name]}
                locked={lockedFields.includes(field.name)}
                error={form.errors[field.name]}
                onChange={(value : any) => {
                  let error = null;

                  if (field.type === "text")
                    error = validateText(field, value);

                  if (field.type !== "text")
                    error = validateFiles(field, value);

                  form.setFieldValue(field.name, value);
                  form.setFieldError(field.name, error);
                }}
              />
            ))}
          </div>
        )}
      </TemplateTabs>

      <FormFooter
        lang={lang}
        onSubmit={onSubmit}
        isSubmitting={false}
      />
    </>
  );
}



/* eslint-disable @typescript-eslint/no-explicit-any */

// import { TemplateTabs } from "./TemplateTabs";
// import { FieldRenderer } from "./FieldRenderer";
// import { FormFooter } from "./FormFooter";
// import { useFormValidation } from "../app/hooks/useFormValidation";

// export function TemplateForm({
//   template,
//   state,
//   lang,
//   lockedFields = [],
//   form,
//   onSubmit,
// }: any) {
//   const { validateText, validateFiles } = useFormValidation(template, lang);

//   console.log(template)
//   const stateConfig = template?.states?.[state];

//   return (
//     <>
//       {!stateConfig ? (
//         <div className="text-red-600 text-sm mt-4">
//           This document type does not support the selected state.
//         </div>
//       ) : (
//         <TemplateTabs tabs={stateConfig.tabs} lang={lang}>
//           {(tab : any) => (
//             <div className="grid grid-cols-1 gap-4 mt-4">
//               {tab.fields.map((field: any) => (
//                 <FieldRenderer
//                   key={field.name}
//                   field={field}
//                   lang={lang}
//                   globals={template.globals}
//                   value={form.values[field.name]}
//                   locked={lockedFields.includes(field.name)}
//                   error={form.errors[field.name]}
//                   onChange={(value : any) => {
//                     let error = null;

//                     if (field.type === "text") {
//                       error = validateText(field, value);
//                     } else {
//                       error = validateFiles(field, value);
//                     }

//                     form.setFieldValue(field.name, value);
//                     form.setFieldError(field.name, error);
//                   }}
//                 />
//               ))}
//             </div>
//           )}
//         </TemplateTabs>
//       )}

//       <FormFooter
//         lang={lang}
//         onSubmit={onSubmit}
//         isSubmitting={false}
//       />
//     </>
//   );
// }
