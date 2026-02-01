// import { template } from '@/templates/organic-nutrition.json';
// import { template } from '@/templates/organic-nutrition.json';
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nochseck

// "use client";

// import { useState, useEffect } from "react";
// import api from "../../lib/api";
// import { useParams } from "next/navigation";

// type UseResubmissionFormProps = {
//   documentId: string;
//   lockedFields: string[];
//   initialValues: Record<string, any>;
// };

// export function useResubmissionForm({
//   documentId,
//   lockedFields = [],
//   initialValues = {},
// }: UseResubmissionFormProps) {
//   const { lang } = useParams();

//   const [values, setValues] = useState<Record<string, any>>(initialValues);
//   const [errors, setErrors] = useState<Record<string, string[]>>({});

//   const [resubmissionLoading, setResubmissionLoading] = useState(false);
//   const [resubmissionStatus, setResubmissionStatus] = useState("");
//   const [resubmissionMessage, setResubmissionMessage] = useState("");

//   // 🔹 Reset form
//   function reset() {
//     setValues(initialValues);
//     setErrors({});
//   }

  
//   useEffect(() => {
//   setValues(initialValues);
//   setErrors({});
// }, [initialValues]);

//   // 🔹 Get which tabs have errors
// //   function getTabErrors(tabs: any[]) {
// //     const tabErrors: Record<string, boolean> = {};
// //     tabs.forEach(tab => {
// //       tabErrors[tab.key] = tab.fields.some((f:any) => errors[f.name]?.length > 0);
// //     });
// //     return tabErrors;
// //   }

//   // 🔹 Re-validate on change
//   useEffect(() => {
//     validate();
//   }, [values]);

//   // 🔹 Set field value
//   function setFieldValue(name: string, value: any) {
//     if (lockedFields.includes(name)) return;

//     setValues(prev => ({ ...prev, [name]: value }));

//     setErrors(prev => ({
//       ...prev,
//       [name]: [],
//     }));
//   }

//   function setFieldError(name: string, errors: string[] | null) {
//     setErrors(prev => ({
//       ...prev,
//       [name]: errors ?? [],
//     }));
//   }

//   // 🔹 Validate entire form (ONLY unlocked fields)
//   function validate() {
//     let isValid = true;
//     const nextErrors: Record<string, string[]> = {};

//     Object.entries(values).forEach(([name, value]) => {
//       if (lockedFields.includes(name)) return;

//       const fieldErrors: string[] = [];

//       const isEmpty =
//         value === undefined ||
//         value === null ||
//         (typeof value === "string" && value.trim() === "") ||
//         (Array.isArray(value) && value.length === 0);

//       if (isEmpty) {
//         fieldErrors.push(
//           lang === "ar" ? "هذا الحقل مطلوب" : "This field is required"
//         );
//         isValid = false;
//       }

//       nextErrors[name] = fieldErrors;
//     });

//     setErrors(prev => ({ ...prev, ...nextErrors }));
//     return isValid;
//   }

//   // 🔹 Check if form is valid
//   function isFormValid() {
//     return Object.values(errors).every(e => !e || e.length === 0);
//   }

//   // 🔹 Scroll to first error
//   function scrollToFirstError() {
//     requestAnimationFrame(() => {
//       const firstKey = Object.keys(errors).find(k => errors[k]?.length);
//       if (!firstKey) return;

//       const el = document.querySelector(
//         `[data-field="${firstKey}"]`
//       ) as HTMLElement | null;

//       el?.scrollIntoView({ behavior: "smooth", block: "center" });
//     });
//   }

// //   function setValues(newValues: Record<string, any>) {
// //   setValues(newValues); // the internal React state
// // }

//   // 🔹 Submit resubmission
//   async function submit({ onProgress }: { onProgress?: (p: number) => void } = {}) {
//     const valid = validate();
//     if (!valid) {
//       scrollToFirstError();
//       return { success: false };
//     }

//     setResubmissionLoading(true);
//     setResubmissionStatus("");
//     setResubmissionMessage("");

//     try {
//       const formData = new FormData();

//       Object.entries(values).forEach(([key, value]) => {
//         if (!value || lockedFields.includes(key)) return;
//         if (!value) return;

//         if (Array.isArray(value)) {
//           value.forEach(file => {
//             if (file instanceof File) {
//               formData.append(`files[${key}]`, file);
//             }
//           });
//         } else {
//           formData.append(`text[${key}]`, String(value));
//         }
//       });

//       const res = await api.patch(
//         `/api/documents/${documentId}/resubmit`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           onUploadProgress: e => {
//             if (!e.total) return;
//             const percent = Math.round((e.loaded * 100) / e.total);
//             onProgress?.(percent);
//           },
//         }
//       );

//       setResubmissionStatus("success");
//       setResubmissionMessage(res.data.message);
//       return res.data;
//     } catch (err: any) {
//       const msg =
//         err?.response?.data?.message ||
//         err?.response?.data?.error ||
//         "Resubmission failed";

//       setResubmissionStatus("failure");
//       setResubmissionMessage(msg);
//       throw err;
//     } finally {
//       setResubmissionLoading(false);
//     }
//   }

//   return {
//     values,
//     errors,
//     setFieldValue,
//     setFieldError,
//     validate,
//     submit,
//     reset,
//     isFormValid,
//     resubmissionLoading,
//     resubmissionStatus,
//     resubmissionMessage,
//   };
// }


"use client";

import { useState, useEffect, useRef } from "react";
import api from "../../lib/api";
import { useParams } from "next/navigation";
import { isValid } from "date-fns";

type UseResubmissionFormProps = {
  documentId: string;
  template: any;
  lockedFields: string[];
  initialValues: Record<string, any>;
};

export function useResubmissionForm({
  documentId,
  template,
  lockedFields = [],
  initialValues = {},
}: UseResubmissionFormProps) {
  const { lang } = useParams();

  const [values, setValuesState] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [resubmissionLoading, setResubmissionLoading] = useState(false);
  const [resubmissionStatus, setResubmissionStatus] = useState("");
  const [resubmissionMessage, setResubmissionMessage] = useState("");

  const valuesRef = useRef(values);

useEffect(() => {
  valuesRef.current = values;
}, [values]);

//   useEffect(() => {
//   if (!template) return;
//   validate();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [template]);

  // 🔹 Reset form
  function reset() {
    const nextValues = {};
    setValuesState(nextValues);
    // setErrors({});
    // validate(nextValues);
    validate();
  }

//   function reset() {
//       if (!template) return;

//   const nextValues: Record<string, any> = {};

//   template.tabs.forEach((tab: any) => {
//     tab.fields.forEach((field: any) => {
//       nextValues[field.name] = initialValues[field.name] ?? null;
//     });
//   });

//   setValuesState(nextValues);
//   setErrors({});

//   // ✅ validate against the SAME values
//   validate(nextValues);
// }

  // 🔹 Update values if initialValues changes (when doc loads)
// useEffect(() => {
//   if (!template) return;

//   setValuesState(initialValues);
//   setErrors({});

//   validate(initialValues);
// }, [template, initialValues]);

useEffect(() => {
  setValuesState(initialValues);
//   setErrors({});

//   ⛔ immediately validate AFTER values are set
  requestAnimationFrame(() => {
    validate();
});
}, [initialValues]);


  // 🔹 Re-validate on change
  // useEffect(() => {
  //   validate();
  // }, [values]);

  // 🔹 Set field value
  function setFieldValue(name: string, value: any) {
    if (lockedFields.includes(name)) return;

    setValuesState(prev => ({ ...prev, [name]: value }));

    setErrors(prev => ({
      ...prev,
      [name]: [],
    }));
  }

  function setFieldError(name: string, errors: string[] | null) {
    setErrors(prev => ({
      ...prev,
      [name]: errors ?? [],
    }));
  }

  // 🔹 Validate entire form (ONLY unlocked fields)


// function validate(valuesOverride?: Record<string, any>) {
//   if (!template) return false;

//   const currentValues = valuesOverride ?? values;

//   let isValid = true;
//   const nextErrors: Record<string, string[]> = {};

//   template.tabs.forEach((tab: any) => {
//     tab.fields.forEach((field: any) => {
//       // 🔐 ONLY validate rejected fields
//       if (lockedFields.includes(field.name)) {
//         nextErrors[field.name] = [];
//         return;
//       }

//       const value = currentValues[field.name];
//       const fieldErrors: string[] = [];

//       const isEmpty =
//         value === undefined ||
//         value === null ||
//         (typeof value === "string" && value.trim() === "") ||
//         (Array.isArray(value) && value.length === 0);

//       if (field.required && isEmpty) {
//         const msg =
//           template.globals.errors[field.type]?.required?.[
//             lang === "ar" ? "ar" : "en"
//           ] || "This field is required";

//         fieldErrors.push(msg);
//         isValid = false;
//       }

//       nextErrors[field.name] = fieldErrors;
//     });
//   });

//   setErrors(nextErrors);
//   return isValid;
// }



  function validate(V?:boolean) {
  if (!template) return false;

  let isValid = true;
  const nextErrors: Record<string, string[]> = {};

    const templateFieldNames = template.tabs.flatMap(
      (tab: any) => tab.fields.map((f: any) => f.name)
    );
    const allTemplateFieldsLocked = templateFieldNames.every(
      (name : any)  => lockedFields.includes(name)
    );
    // alert(allTemplateFieldsLocked);
    if(allTemplateFieldsLocked){
      // alert("all fields are locked");
      isValid = false;
      return isValid
    }

  template.tabs.forEach((tab: any) => {
    tab.fields.forEach((field: any) => {
      // 🔐 SKIP locked (approved + pending)
      if (lockedFields.includes(field.name)) {
        nextErrors[field.name] = [];
        return;
      }

      const fieldErrors: string[] = [];
      const value = values[field.name];

      const isEmpty =
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0);

      if (field.required && isEmpty) {
        const msg =
          template.globals.errors[field.type]?.required?.[
            lang === "ar" ? "ar" : "en"
          ] || "This field is required";

        fieldErrors.push(msg);
        isValid = false;
      }

      nextErrors[field.name] = fieldErrors;
    });
  });

  setErrors(prev => ({ ...prev, ...nextErrors }));
  if (typeof V !== 'undefined') {
    isValid=V
    alert("V Wins" + V + "  " + isValid)
    // return V;
    return isValid;
  }
  else{
    // alert("isValid Returned" + isValid)
    return isValid;
  }
}




//   function validate() {
//     if (!template) return false;

//     let isValid = true;
//     const nextErrors: Record<string, string[]> = {};

//     // template.states[state]?.tabs.forEach((tab: any) => {
//     template.tabs.forEach((tab: any) => {
//       tab.fields.forEach((field: any) => {
//         const fieldErrors: string[] = [];

//         // Required validation
//         // if (field.required && !values[field.name]) {
//         //   const msg =
//         //     template.globals.errors[field.type]?.required?.[lang] ||
//         //     "This field is required";
//         //   fieldErrors.push(msg);
//         // }

//         // Required validation
//         if (field.required) {
//           const value = values[field.name];
        
//           const isEmpty =
//             value === undefined ||
//             value === null ||
//             (typeof value === "string" && value.trim() === "") ||
//             (Array.isArray(value) && value.length === 0);
        
//           if (isEmpty) {
//             const msg =
//               template.globals.errors[field.type]?.required?.[lang === "ar" ? "ar" : "en"] ||
//               "This field is required";
          
//             fieldErrors.push(msg);
//             isValid = false;
//           }
//         }


//         // Add other validations if needed (files, custom rules)

//         if (fieldErrors.length > 0) {
//           nextErrors[field.name] = fieldErrors;
//           isValid = false;
//         } else {
//           nextErrors[field.name] = [];
//         }
//       });
//     });

//     setErrors(prev => ({ ...prev, ...nextErrors }));
//     // alert("Form.Validate Called")
//     return isValid;
//   }
  
  // 🔹 Check if form is valid
  function isFormValid() {
    return Object.values(errors).every(e => !e || e.length === 0);
    // return isValid;
  }

  // 🔹 Scroll to first error
  function scrollToFirstError() {
    requestAnimationFrame(() => {
      const firstKey = Object.keys(errors).find(k => errors[k]?.length);
      if (!firstKey) return;

      const el = document.querySelector(
        `[data-field="${firstKey}"]`
      ) as HTMLElement | null;

      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  // 🔹 Expose setValues to parent
  function setValues(newValues: Record<string, any>) {
    setValuesState(newValues);
  }

    // 🔹 Validate a specific tab

    function validateTab(tabFields: any[]) {
  let isValid = true;
  const nextErrors: Record<string, string[]> = {};

  tabFields.forEach(field => {
    if (lockedFields.includes(field.name)) {
      nextErrors[field.name] = [];
      return;
    }

    const fieldErrors: string[] = [];
    const value = values[field.name];

    const isEmpty =
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) && value.length === 0);

    if (field.required && isEmpty) {
      const msg =
        template.globals.errors[field.type]?.required?.[
          lang === "ar" ? "ar" : "en"
        ] || "This field is required";

      fieldErrors.push(msg);
      isValid = false;
    }

    nextErrors[field.name] = fieldErrors;
  });

  setErrors(prev => ({ ...prev, ...nextErrors }));
  return isValid;
}


// function validateTab(tabFields: any[]) {
//   if (!template) return false;

//   let isValid = true;
//   const nextErrors: Record<string, string[]> = {};

//   tabFields.forEach(field => {
//     if (lockedFields.includes(field.name)) return;

//     const value = values[field.name];
//     const fieldErrors: string[] = [];

// const isEmpty =
//   value === undefined ||
//   value === null ||
//   (typeof value === "string" && value.trim() === "") ||
//   (Array.isArray(value) && value.length === 0);

//     if (field.required && isEmpty) {
//       const msg =
//         template.globals.errors[field.type]?.required?.[
//           lang === "ar" ? "ar" : "en"
//         ] || "This field is required";

//       fieldErrors.push(msg);
//       isValid = false;
//     }

//     nextErrors[field.name] = fieldErrors;
//   });

//   setErrors(prev => ({ ...prev, ...nextErrors }));
//   return isValid;
// }

  // 🔹 Get which tabs have errors
  
  
  function getTabErrors(tabs: { key: string; fields: { name: string }[] }[]) {
    const tabErrors: Record<string, boolean> = {};
    tabs.forEach(tab => {
      tabErrors[tab.key] = tab.fields.some(f => errors[f.name]?.length > 0);
    });
    return tabErrors;
  }

  // 🔹 Submit resubmission
  async function submit({ onProgress }: { onProgress?: (p: number) => void } = {}) {
    const valid = validate();
    if (!valid) {
      scrollToFirstError();
      alert("Not Valid")
      return { success: false };
    }

    setResubmissionLoading(true);
    setResubmissionStatus("");
    setResubmissionMessage("");

    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (!value || lockedFields.includes(key)) return;

        if (Array.isArray(value)) {
          value.forEach(file => {
            if (file instanceof File) {
              formData.append(`files[${key}]`, file);
            }
          });
        } else {
          formData.append(`text[${key}]`, String(value));
        }
      });

      const res = await api.patch(
        `/api/documents/${documentId}/resubmit`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: e => {
            if (!e.total) return;
            const percent = Math.round((e.loaded * 100) / e.total);
            onProgress?.(percent);
          },
        }
      );

      setResubmissionStatus("success");
      setResubmissionMessage(res.data.message);
      return res.data;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Resubmission failed";

      setResubmissionStatus("failure");
      setResubmissionMessage(msg);
      throw err;
    } finally {
      setResubmissionLoading(false);
    }
  }

  return {
    values,
    errors,
    setFieldValue,
    setFieldError,
    validate,
    submit,
    reset,
    isFormValid,
    resubmissionLoading,
    resubmissionStatus,
    resubmissionMessage,
    setValues,        // ✅ added
    getTabErrors,     // ✅ added
    validateTab,     // ✅ added
  };
}
