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


/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { fetchTemplates, fetchTemplateByKey } from "../../../../templates/api";
import { DocumentTypeSelector } from "../../../../components/DocumentTypeSelector";
import { TemplateForm } from "../../../../components/TemplateForm";
import { useTemplateForm } from "../../../hooks/useTemplateForm";
import { useParams } from "next/navigation";

export default function NewDocumentPage() {
  const {lang} = useParams()
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [state, setState] = useState<"Domestic" | "Imported" | "General" | null>(null);
  // const [state, setState] = useState<"Domestic" | "Imported" | "General" | null>("Imported");
  
  const form = useTemplateForm(template, state);

  useEffect(() => {
    fetchTemplates().then(setTemplates);
  }, []);

  async function handleSelect(templateKey : any, selectedState : any) {
    const tpl = await fetchTemplateByKey(templateKey , selectedState);
    setTemplate(tpl);
    setState(selectedState);
  }

  if (!template || !state) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">
          Select Document Type
        </h1>

        <DocumentTypeSelector
          templates={templates}
          onSelect={handleSelect}
        />
      </div>
    );
  }


  return (
    <div className="max-w-5xl mx-auto p-4">
      <TemplateForm
        template={template}
        state={state}
        lang={lang}
        form={form}
        onSubmit={() => {}}
      />
    </div>
  );
}
