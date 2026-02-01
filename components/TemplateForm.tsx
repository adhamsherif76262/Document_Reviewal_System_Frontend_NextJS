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
import { ResubmissionFooter } from "./ResubmissionFooter";
import { useFormValidation } from "../app/hooks/useFormValidation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { useState , useRef , useEffect} from "react";
import { useRouter } from "next/navigation";

export function TemplateForm({
  template,
  state,
  lang,
  lockedFields = [],
  form,
  doc,
  mode,
}: any) {
  const router = useRouter()
  const { validateText, validateFiles } =
    useFormValidation(template, lang);

    // const [progress, setProgress] = useState(10)

  /** 🔥 Centralized submit handler */

async function handleSubmit() {
  // 1️⃣ Validate form before doing anything
  const isValid = form.validate(); // this updates errors internally
  if (!isValid) {
    form.scrollToFirstError?.();
    return; // ❌ Stop here if validation fails
  }
  //   // 🔹 Check if form is valid
  // function isFormValid() {
  //   return Object.values(errors).every(errList => !errList || errList.length === 0);
  // }

  // ✅ If we reached here, form is valid
  let progress = 0;

  // Reusable render function
  const renderToast = () => (
    <div className="space-y-3 w-full">
      <p className="font-black">
        {lang === "en" ? "Submitting documents..." : "جارٍ إرسال المستندات..."}
      </p>
      <Progress value={progress} />
      <p className="text-xs text-muted-foreground text-right">{progress}%</p>
    </div>
  );

  const toastId = toast.loading(renderToast());

  // Start simulated progress
  let stopped = false;
  const startProgress = () => {
    let current = 0;

    const run = async () => {
      while (!stopped && current < 95) {
        await new Promise(res => setTimeout(res, 500));
        current += Math.floor(Math.random() * 5) + 3;
        progress = Math.min(current, 95);
        toast.loading(renderToast(), { id: toastId });
      }
    };

    run();

    return () => {
      stopped = true;
    };
  };

  const stopProgress = startProgress();

  try {
    // 2️⃣ Submit form only after validation passed
    await form.submit();

    // 3️⃣ Stop progress and set 100%
    stopProgress();
    progress = 100;
    toast.loading(renderToast(), { id: toastId });

    toast.success(
      lang === "en"
        ? "Documents Submitted Successfully"
        : "تم إرسال المستندات بنجاح",
      { id: toastId }
    );
        router.push(`/${lang}/submissions`)
  } catch (err: any) {
    stopProgress();

    // ❌ Re-validate form again on failure to catch required errors
    form.validate();

    toast.error(
      err?.message ||
        (lang === "en"
          ? "Document submission failed"
          : "فشل إرسال المستندات"),
      { id: toastId }
    );
  }
}

async function handleReSubmit() {
  // 1️⃣ Validate form before doing anything
  const isValid = form.validate(); // this updates errors internally
  if (!isValid) {
    form.scrollToFirstError?.();
    return; // ❌ Stop here if validation fails
  }

  // ✅ If we reached here, form is valid
  let progress = 0;

  // Reusable render function
  const renderToast = () => (
    <div className="space-y-3 w-full">
      <p className="font-black">
        {lang === "en" ? "Re-Submitting documents..." : "جارٍ اعادة إرسال المستندات..."}
      </p>
      <Progress value={progress} />
      <p className="text-xs text-muted-foreground text-right">{progress}%</p>
    </div>
  );

  const toastId = toast.loading(renderToast());

  // Start simulated progress
  let stopped = false;
  const startProgress = () => {
    let current = 0;

    const run = async () => {
      while (!stopped && current < 95) {
        await new Promise(res => setTimeout(res, 500));
        current += Math.floor(Math.random() * 5) + 3;
        progress = Math.min(current, 95);
        toast.loading(renderToast(), { id: toastId });
      }
    };

    run();

    return () => {
      stopped = true;
    };
  };

  const stopProgress = startProgress();

  try {
    // 2️⃣ Submit form only after validation passed
    await form.submit();

    // 3️⃣ Stop progress and set 100%
    stopProgress();
    progress = 100;
    toast.loading(renderToast(), { id: toastId });

    toast.success(
      lang === "en"
        ? "Documents Re-Submitted Successfully"
        : "تم اعادة إرسال المستندات بنجاح",
      { id: toastId }
    );
    router.push(`/${lang}/submissions/${doc._id}`)
  } catch (err: any) {
    stopProgress();

    // ❌ Re-validate form again on failure to catch required errors
    form.validate();

    toast.error(
      err?.message ||
        (lang === "en"
          ? "Document Re-submission failed"
          : "فشل اعادة إرسال المستندات"),
      { id: toastId }
    );
  }
}


const didInit = useRef(false);

useEffect(() => {
  if (didInit.current) return;
  didInit.current = true;

  form.reset();     // set values
  // form.validate();  // 🔥 REQUIRED
}, []);


  return (
    <>
      <div className="font-black font-sans text-2xl text-blue-900 text-center p-3">

        {
          lang === "ar" ? 
            "اذا أردت مسح جميع الملفات برجاء اعادة تحميل الصفحة (CTRL + R)" 
          : "If You Need To Clear All The File Inputs Please Refresh The Page (CTRL + R)"
        }

      </div>
      <TemplateTabs
      
        tabs={template.tabs}
        lang={lang}
  /*** Commented Recently To Solve The Error Of The Resubmission Form ****/
        // onTabChange={(fields: any[]) => form.validateTab(fields)}
        tabErrors={form.getTabErrors(template.tabs)}
      >
        {(tab: any) => (
          <div className="grid grid-cols-1 gap-4 mt-4">
            {tab.fields.map((field: any) => (
              <FieldRenderer
                key={field.name}
                field={field}
                doc={doc}
                lang={lang}
                mode={mode}
                globals={template.globals}
                value={form.values[field.name]}
                locked={lockedFields.includes(field.name)}
                error={form.errors[field.name]} // ✅ array of errors
                onClear={() => {
                  form.setFieldValue(field.name, []);
                  form.setFieldError(field.name, null);
                }}
                form={form}
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

        {
          mode === "submission" && (
            <FormFooter
              isSubmitting={form.submissionLoading}
              isFormValid={form.isFormValid()}
              lang={lang}
              form={form}
              onSubmit={handleSubmit}
            />
          )
        }

        {
          mode === "resubmission" && (
            <ResubmissionFooter

              // isReSubmitting={form.resubmissionLoading}
              // isFormValid={form.isFormValid()}
              lang={lang}
              form={form}
              onReSubmit={handleReSubmit}
            />
          )
        }

    </>
  );
}
