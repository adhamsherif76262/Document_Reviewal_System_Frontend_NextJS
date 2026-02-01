
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getDocumentById } from "../../../../hooks/useGetDocumentById";
import { ResubmissionFooter } from "../../../../../components/ResubmissionFooter";
import { fetchTemplateByKey } from "../../../../../templates/api";
import { TemplateForm } from "../../../../../components/TemplateForm";
import { resolveTemplateKey } from "../../../../../lib/TemplateKeyResolver";

import { useResubmissionForm } from "../../../../hooks/useResubmitForm";
export default function ResubmissionPage() {
  const { id, lang }: any = useParams();

  const [doc, setDoc] = useState<any>(null);
  const [template, setTemplate] = useState<any>(null);
  const [lockedFields, setLockedFields] = useState<string[]>([]);


  
  useEffect(() => {
    async function load() {
      // form.reset()
      const document = await getDocumentById({ id });
      setDoc(document);
      // alert(id)
      const key = resolveTemplateKey(document.docType);
      
      const tpl = await fetchTemplateByKey(key, document.state);

      // const tpl = await fetchTemplateByKey(
      //   document.docType,
      //   document.state
      // );
      setTemplate(tpl);

      const locked = Object.entries(document.fields)
        .filter(([_, f]: any) => f.review?.status !== "rejected")
        .map(([name]) => name);

      setLockedFields(locked);
    }

    load();
  }, [id]);

  console.log(doc)
  // const initialValues = doc
  // ? Object.fromEntries(
  //   Object.entries(doc.fields).map(([key, f]: any) => [key, f.value ?? null])
  // )
  // : {};
  
//   const normalizedInitialValues = Object.fromEntries(
//   Object.entries(doc.fields).map(([key, field]: any) => {
//     if (field.type === "image" && Array.isArray(field.value)) {
//       return [
//         key,
//         field.value.map((url: string) => ({
//           url,           // 👈 what your image renderer expects
//           isExisting: true,
//         })),
//       ];
//     }

//     return [key, field.value ?? null];
//   })
// );

const initialValues = useMemo(() => {
  if (!doc) return {};

  return Object.fromEntries(
    Object.entries(doc.fields).map(([key, field]: any) => {
      // normalize images if needed
      if (field.type === "image" && Array.isArray(field.value)) {
        return [
          key,
          field.value.map((url: string) => ({
            url,
            isExisting: true,
          })),
        ];
      }

      return [key, field.value ?? null];
    })
  );
}, [doc]);

  // console.log(initialValues)
const form = useResubmissionForm({
  documentId: id || "",
  template: template,
  lockedFields,
  initialValues: initialValues,
});

useEffect(() => {
  if (!doc) return;

  const initialVals = Object.fromEntries(
    Object.entries(doc.fields).map(([key, f]: any) => [key, f.value ?? null])
  );

  form.reset();                   // reset errors & values
  form.setValues(initialVals);     // update values
  
}, [doc]);

  if (!doc || !template) return null;
  console.log("The Locked Fields Are" + lockedFields.length + typeof(lockedFields.length))
  console.log("The Locked Fields Are" + Object.keys(doc.fields).length + typeof(Object.keys(doc.fields).length))
  console.log("The Locked Fields Are" + lockedFields + typeof(lockedFields))
  console.log("The Doc Fields Are" + Object.keys(doc.fields) + typeof(Object.keys(doc.fields)))
  async function handleResubmit() {
//     alert("allTemplateFieldsLocked")
//     const templateFieldNames = template.tabs.flatMap(
//       (tab: any) => tab.fields.map((f: any) => f.name)
//     );
//     const allTemplateFieldsLocked = templateFieldNames.every(
//       (name : any)  => lockedFields.includes(name)
//     );

// console.log("TEMPLATE FIELD NAMES:", templateFieldNames);
// console.log("LOCKED FIELDS:", lockedFields);

// const unlockedTemplateFields = templateFieldNames.filter(
//   (name : any) => !lockedFields.includes(name)
// );

// console.log("UNLOCKED TEMPLATE FIELDS:", unlockedTemplateFields);

//     if(allTemplateFieldsLocked){
//       alert("all fields are locked");
//       return
//     }
    
    const valid = form.validate();
    if (!valid) return;

    await form.submit();
  }

  return (
    <>
      <TemplateForm
        template={template}
        lang={lang}
        form={form}
        doc={doc}
        lockedFields={lockedFields}
        mode="resubmission"
        onSubmit={handleResubmit}
      />
      

      {/* <ResubmissionFooter
        lang={lang}
        form={form}
        onReSubmit={handleResubmit}
      /> */}
    </>
  );
}
