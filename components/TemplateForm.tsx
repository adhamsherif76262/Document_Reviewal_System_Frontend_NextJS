/* eslint-disable @typescript-eslint/no-explicit-any */

// import { TemplateTabs } from "./TemplateTabs";
// import { FieldRenderer } from "./FieldRenderer";
// import { FormFooter } from "./FormFooter";
// import { useFormValidation } from "../app/hooks/useFormValidation";
// import { useState } from "react";

// export function TemplateForm({
//   template,
//   state,
//   lang,
//   lockedFields = [],
//   form,
//   onSubmit,
// }:any) {
//   const { validateText, validateFiles } = useFormValidation(template, lang);
//   // console.log(template)

//   return (
//     <>
//       <TemplateTabs tabs={template?.tabs} lang={lang}>
//         {(tab : any) => (
//           <div className="grid grid-cols-1 gap-4 mt-4">
//             {tab.fields.map((field : any) => (
//               <FieldRenderer
//                 key={field.name}
//                 field={field}
//                 lang={lang}
//                 globals={template.globals}
//                 value={form.values[field.name]}
//                 locked={lockedFields.includes(field.name)}
//                 error={form.errors[field.name]}
//                 onChange={(value : any) => {
//                   let error = null;

//                   if (field.type === "text")
//                     error = validateText(field, value);

//                   if (field.type !== "text")
//                     error = validateFiles(field, value);

//                   form.setFieldValue(field.name, value);
//                   form.setFieldError(field.name, error);
//                 }}
//               />
//             ))}
//           </div>
//         )}
//       </TemplateTabs>

//       <FormFooter
//         lang={lang}
//         onSubmit={onSubmit}
//         isSubmitting={false}
//       />
//     </>
//   );
// }





// export function TemplateForm({
//   template,
//   state,
//   lang,
//   lockedFields = [],
//   form,
//   onSubmit,
// }: any) {
//   const { validateText, validateFiles } =
//     useFormValidation(template, lang);
// console.log("Form :::" + form)
// console.log("Template" + template)
// // const [errors, setErrors] = useState<Record<string, string[]>>({});

//   return (
//     <>
//       <TemplateTabs
//         // tabs={template.states[state].tabs}
//         tabs={template.tabs}
//         lang={lang}
//         // onTabChange={(tab: any) =>
//         //   form.validateTab(tab.fields)
//         // }
//         onTabChange={(fields : any) => form.validateTab(fields)}
//         tabErrors={form.getTabErrors(template.tabs)}
//       >
//         {(tab: any) => (
//           <div className="grid grid-cols-1 gap-4 mt-4">
//             {tab.fields.map((field: any) => (
//               <FieldRenderer
//                 key={field.name}
//                 field={field}
//                 lang={lang}
//                 globals={template.globals}
//                 value={form.values[field.name]}
//                 locked={lockedFields.includes(field.name)}
//                 error={form.errors[field.name]}
//                 // error={"This Field Has An Error"}
//                 onChange={(value: any) => {
//                   let error = null;

//                   if (field.type === "text")
//                     error = validateText(field, value);
//                   else
//                     error = validateFiles(field, value);

//                   form.setFieldValue(field.name, value);
                  
//                   form.setFieldError(
//                     field.name,
//                     error
//                     // error?.length ? error.join('\n') : null
//                   );
//                   // form.setFieldError(name: string, errors: string[]) {
//                   //   setErrors(prev => ({ ...prev, [name]: errors }));
//                   // }

//                   // form.setFieldError(field.name, error);
//                 }}
//               />
//             ))}
//           </div>
//         )}
//       </TemplateTabs>

//       {/* <FormFooter
//         lang={lang}
//         onSubmit={onSubmit}
//         isSubmitting={false}
//       /> */}
//       <FormFooter
//         isSubmitting={form.submissionloading}
//         isFormValid={form.isFormValid()}
//         lang={lang}
//         onSubmit={form.submit}
//       />
//     </>
//   );
// }



// /* eslint-disable @typescript-eslint/no-explicit-any */
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
// }: any) {
//   const { validateText, validateFiles } = useFormValidation(template, lang);

//   return (
//     <>
//       <TemplateTabs
//         // tabs={template.states[state].tabs}
//         tabs={template.tabs}
//         lang={lang}
//         onTabChange={(fields: any[]) => form.validateTab(fields)}
//         tabErrors={form.getTabErrors(template.tabs)}
//       >
//         {(tab: any) => (
//           <div className="grid grid-cols-1 gap-4 mt-4">
//             {tab.fields.map((field: any) => (
//               <FieldRenderer
//                 key={field.name}
//                 field={field}
//                 lang={lang}
//                 globals={template.globals}
//                 value={form.values[field.name]}
//                 locked={lockedFields.includes(field.name)}
//                 error={form.errors[field.name]} // array of errors
//                 onChange={(value: any) => {
//                   let error: string[] | string | null = null;
//                   if (field.type === "text") error = validateText(field, value);
//                   else error = validateFiles(field, value);

//                   form.setFieldValue(field.name, value);

//                   // if multiple errors, pass array
//                   if (error) {
//                     form.setFieldError(field.name, Array.isArray(error) ? error.join("\n") : error);
//                   } else {
//                     form.setFieldError(field.name, null);
//                   }
//                 }}
//               />
//             ))}
//           </div>
//         )}
//       </TemplateTabs>

//       <FormFooter
//         isSubmitting={form.submissionLoading}
//         isFormValid={form.isFormValid()}
//         lang={lang}
//         onSubmit={form.submit}
//       />
//     </>
//   );
// }



/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { TemplateTabs } from "./TemplateTabs";
import { FieldRenderer } from "./FieldRenderer";
import { FormFooter } from "./FormFooter";
import { useFormValidation } from "../app/hooks/useFormValidation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TemplateForm({
  template,
  state,
  lang,
  lockedFields = [],
  form,
}: any) {
  const { validateText, validateFiles } =
    useFormValidation(template, lang);

  /** 🔥 Centralized submit handler */
  async function handleSubmit() {
    // 1️⃣ Validate entire form
    const isValid = form.validate();
    if (!isValid) {
      form.scrollToFirstError?.();
      return;
    }

    // 2️⃣ Use Sonner promise API
    toast.promise(
      form.submit(),
      {
        loading: (
          <div className="flex items-center gap-2">
            {/* <Loader2 className="w-4 h-4 animate-spin" /> */}
            <span>
              {lang === "en" ? "Submitting document..." : "جارٍ إرسال المستند..."}
            </span>
          </div>
        ),

        success: (res: any) => ({
          message:
            res?.message ||
            (lang === "en"
              ? "Document submitted successfully"
              : "تم إرسال المستند بنجاح"),
        }),

        error: (err: any) => ({
          message:
            // err?.error ||
            // err?.response?.data?.message || err?.response?.data?.error
            err?.message || err?.error
            (lang === "en"
              ? "Document submission failed"
              : "فشل إرسال المستند"),
        }),
        duration: 5000, // ✅ stays for ~10 seconds after resolve
      },
    );
  }

  return (
    <>

        {/* <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast("Event has been created")}>
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success("Event has been created")}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.info("Be at the area 10 minutes before the event time")
        }
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("Event start time cannot be earlier than 8am")
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("Event has not been created")}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toast.promise<{ name: string }>(
            () =>
              new Promise((resolve) =>
                setTimeout(() => resolve({ name: "Event" }), 2000)
              ),
            {
              loading: "Loading...",
              success: (data) => `${data.name} has been created`,
              error: "Error",
            }
          )
        }}
      >
        Promise
      </Button>
    </div> */}

      <TemplateTabs
        tabs={template.tabs}
        lang={lang}
        onTabChange={(fields: any[]) => form.validateTab(fields)}
        tabErrors={form.getTabErrors(template.tabs)}
      >
        {(tab: any) => (
          <div className="grid grid-cols-1 gap-4 mt-4">
            {tab.fields.map((field: any) => (
              <FieldRenderer
                key={field.name}
                field={field}
                lang={lang}
                globals={template.globals}
                value={form.values[field.name]}
                locked={lockedFields.includes(field.name)}
                error={form.errors[field.name]} // ✅ array of errors
                onChange={(value: any) => {
                  let error: string | string[] | null = null;

                  if (field.type === "text") {
                    error = validateText(field, value);
                  } else {
                    error = validateFiles(field, value);
                  }

                  form.setFieldValue(field.name, value);

                  // ✅ Always store errors as arrays
                  // form.setFieldError(
                  //   field.name,
                  //   error && error.length ? error : null
                  // );
                  if (error) {
                    form.setFieldError(
                      field.name,
                      Array.isArray(error) ? error : [error]
                    );
                  } else {
                    form.setFieldError(field.name, null);
                  }

                }}
              />
            ))}
          </div>
        )}
      </TemplateTabs>

      <FormFooter
        isSubmitting={form.submissionLoading}
        isFormValid={form.isFormValid()}
        lang={lang}
        onSubmit={handleSubmit}
      />
    </>
  );
}
