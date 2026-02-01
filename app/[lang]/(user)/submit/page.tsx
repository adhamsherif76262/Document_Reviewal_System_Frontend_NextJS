// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React from 'react'

// export default function SubmitDocumentpage() {
//   return (
//     <div>Submit Document page</div>
//   )
// }

// "use client";

// import { TemplateForm } from "../../../../components/TemplateForm";
// import { useTemplateForm } from "../../../hooks/useTemplateForm";
// // import template from "@/templates/organic-nutrition.json";
// import template from "@/templates/organic-nutrition.json";
// import api from "../../../../lib/api";

// export default function NewDocumentPage() {
//   const lang = "en"; // from next-intl later
//   const state = "Domestic";

//   const form = useTemplateForm(template, state);

//   async function handleSubmit() {
//     const formData = new FormData();

//     Object.entries(form.values).forEach(([key, value]) => {
//       if (Array.isArray(value)) {
//         value.forEach(file => formData.append(`files[${key}]`, file));
//       } else {
//         formData.append(`text[${key}]`, value);
//       }
//     });

//     await api.post("api/documents/upload", formData);
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-3 sm:p-6">
//       <h1 className="text-xl sm:text-2xl font-bold mb-4">
//         {lang === "en" ? "New Document Submission" : "تقديم مستند جديد"}
//       </h1>

//       <TemplateForm
//         template={template}
//         state={state}
//         lang={lang}
//         form={form}
//         onSubmit={handleSubmit}
//       />
//     </div>
//   );
// }


// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import { useEffect, useState } from "react";
// import { fetchTemplates, fetchTemplateByKey } from "../../../../templates/api";
// import { DocumentTypeSelector } from "../../../../components/DocumentTypeSelector";
// import { TemplateForm } from "../../../../components/TemplateForm";
// import { useTemplateForm } from "../../../hooks/useTemplateForm";
// import { useParams } from "next/navigation";

// export default function NewDocumentPage() {
//   const {lang} = useParams()
//   const [templates, setTemplates] = useState([]);
//   const [template, setTemplate] = useState(null);
//   const [state, setState] = useState<"Domestic" | "Imported" | "General" | null>(null);
//   // const [state, setState] = useState<"Domestic" | "Imported" | "General" | null>("Imported");
  
//   const form = useTemplateForm(template, state);

//   useEffect(() => {
//     fetchTemplates().then(setTemplates);
//   }, []);

//   async function handleSelect(templateKey : any, selectedState : any) {
//     const tpl = await fetchTemplateByKey(templateKey , selectedState);
//     setTemplate(tpl);
//     setState(selectedState);
//   }

//   if (!template || !state) {
//     return (
//       <div className="max-w-5xl mx-auto p-4">
//         <h1 className="text-xl font-bold mb-4">
//           Select Document Type
//         </h1>

//         <DocumentTypeSelector
//           templates={templates}
//           onSelect={handleSelect}
//         />
//       </div>
//     );
//   }


//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <TemplateForm
//         template={template}
//         state={state}
//         lang={lang}
//         form={form}
//         onSubmit={() => {}}
//       />
//     </div>
//   );
// }

"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { fetchTemplates, fetchTemplateByKey } from "../../../../templates/api";
import { DocumentTypeSelector } from "../../../../components/DocumentTypeSelector";
import { TemplateForm } from "../../../../components/TemplateForm";
import { useTemplateForm } from "../../../hooks/useTemplateForm";
import { useParams } from "next/navigation";
import ImageCompressionTest from "../../../../components/ImageCompressionTester";
import PDFUploadFieldTester from "../../../../components/pdfCompressionTest";

export default function NewDocumentPage() {
  const { lang }: any = useParams();

  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState<any>(null);
  // const [state, setState] = useState<"Domestic" | "Imported" | "General" | null>(null);
  // const [state, setState] = useState<"Domestic" | "Imported" | "General">("");
  const [state, setState] = useState<string>("");

  
  const form = useTemplateForm(template, state);
  
  // const {submissionloading ,submissionstatus , submissionmessage} = useTemplateForm(template, state)

  useEffect(() => {
    fetchTemplates().then(setTemplates);
  }, []);

  async function handleSelect(templateKey: any, selectedState: any) {
    const tpl = await fetchTemplateByKey(templateKey, selectedState);
    setTemplate(tpl);
    setState(selectedState);
    form.reset();          // 👈 THIS is where reset belongs
  }

  function resetSelection() {
    setTemplate(null);
    // setState(null);
    setState("");
  }

  async function handleSubmit() {
    const isValid = form.validate();
    if (!isValid) return;

    await form.submit();
  }

  if (!template || !state) {
    return (
      <div className="max-w-7xl mx-auto p-4 text-center">
        {/* <PDFUploadFieldTester></PDFUploadFieldTester> */}
        {/* <ImageCompressionTest></ImageCompressionTest> */}
        <h1 className="text-2xl font-black mb-6 font-sans">
          {lang === "en" ? "Select Document Type" : "اختر نوع المستند"}
        </h1>

        <DocumentTypeSelector
          templates={templates}
          onSelect={handleSelect}
        />
      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto p-4 flex flex-col items-center">
            <div className="font-black font-sans text-2xl text-red-600 text-center p-3">

        {
          lang === "ar" ? 
            "يجب تسليم جميع الأوراق و الملفات المطلوبة بالأسفل كأصول ورقية بالاضافة الي نسخها علي فلاشة" 
          : "All required documents and files listed below must be submitted as original paper copies, in addition to copies on a flash drive."
        }

      </div>
      <div className="self-center mb-4">
        <button
          onClick={resetSelection}
          className="
            text-xl font-black px-4 py-2 rounded-2xl shadow-2xl
            border border-gray-300
            hover:bg-black hover:cursor-pointer hover:text-white transition-all duration-300
          "
        >
          {lang === "en" ? "Change Document Type" : "تغيير نوع المستند"}
        </button>
      </div>

      <TemplateForm
        template={template}
        state={state}
        lang={lang}
        form={form}
        mode={"submission"}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
