/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck

"use client";

import { useState, useEffect } from "react";
import { Template } from "../../types/template";
import api from "../../lib/api";
import { useParams } from "next/navigation";

export function useTemplateForm(
  template: Template | null,
  state: string,
  lockedFields: string[] = []
) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { lang } = useParams();

  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<string>("");
  const [submissionMessage, setSubmissionMessage] = useState<string>("");

  // 🔹 Reset form when template or state changes
  useEffect(() => {
    setValues({});
    setErrors({});
  }, [template, state]);

  // 🔹 Reset helper
  function reset() {
    setValues({});
    setErrors({});
  }

  // 🔹 Set a field value and clear its errors if valid
  function setFieldValue(name: string, value: any) {
    if (lockedFields.includes(name)) return;

    setValues(prev => ({ ...prev, [name]: value }));

    setErrors(prev => {
      if (!prev[name] || prev[name].length === 0) return prev;
      return { ...prev, [name]: [] };
    });
  }

  // 🔹 Set a specific error for a field
  // function setFieldError(name: string, error: string | null) {
  //   setErrors(prev => ({
  //     ...prev,
  //     [name]: error ? [error] : [],
  //   }));
  // }

  function setFieldError(name: string, errors: string[] | null) {
  setErrors(prev => ({
    ...prev,
    [name]: errors ?? [],
  }));
}


  // 🔹 Validate entire form
  function validate() {
    if (!template) return false;

    let isValid = true;
    const nextErrors: Record<string, string[]> = {};

    // template.states[state]?.tabs.forEach((tab: any) => {
    template.tabs.forEach((tab: any) => {
      tab.fields.forEach((field: any) => {
        const fieldErrors: string[] = [];

        // Required validation
        if (field.required && !values[field.name]) {
          const msg =
            template.globals.errors[field.type]?.required?.[lang] ||
            "This field is required";
          fieldErrors.push(msg);
        }

        // Add other validations if needed (files, custom rules)

        if (fieldErrors.length > 0) {
          nextErrors[field.name] = fieldErrors;
          isValid = false;
        } else {
          nextErrors[field.name] = [];
        }
      });
    });

    setErrors(prev => ({ ...prev, ...nextErrors }));
    return isValid;
  }

  // 🔹 Validate a specific tab
  function validateTab(tabFields: any[]) {
    let isValid = true;
    const nextErrors: Record<string, string[]> = {};

    tabFields.forEach(field => {
      const fieldErrors: string[] = [];

      if (field.required && !values[field.name]) {
        const msg =
          template?.globals.errors[field.type]?.required?.[lang] ||
          "This field is required";
        fieldErrors.push(msg);
      }

      if (fieldErrors.length > 0) {
        nextErrors[field.name] = fieldErrors;
        isValid = false;
      } else {
        nextErrors[field.name] = [];
      }
    });

    setErrors(prev => ({ ...prev, ...nextErrors }));
    return isValid;
  }

  // 🔹 Check if form is valid
  function isFormValid() {
    return Object.values(errors).every(errList => !errList || errList.length === 0);
  }

  // 🔹 Get which tabs have errors
  function getTabErrors(tabs: any[]) {
    const tabErrors: Record<string, boolean> = {};
    tabs.forEach(tab => {
      tabErrors[tab.key] = tab.fields.some((f:any) => errors[f.name]?.length > 0);
    });
    return tabErrors;
  }

  // 🔹 Scroll to first error in the DOM
  function scrollToFirstError() {
    const firstKey = Object.keys(errors).find(k => errors[k]?.length > 0);
    if (!firstKey) return;

    const el = document.querySelector(`[data-field="${firstKey}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // 🔹 Form submission
  async function submit() {
    if (!template) return { success: false, error: "No template selected" };

    const valid = validate();
    if (!valid) {
      scrollToFirstError();
      return { success: false };
    }

    setSubmissionLoading(true);
    setSubmissionStatus("");
    setSubmissionMessage("");

    try {
      const formData = new FormData();

      // ✅ Required by backend
      formData.append("docType", template.appliesTo[0]);
      formData.append("state", state);

      // ✅ Append dynamic fields
      Object.entries(values).forEach(([key, value]) => {
        if (!value) return;

        if (Array.isArray(value)) {
          value.forEach(file => {
            if (file instanceof File) formData.append(`files[${key}]`, file);
          });
        } else {
          formData.append(`text[${key}]`, String(value));
        }
      });

      const res = await api.post("api/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSubmissionStatus("success");
      setSubmissionMessage(res.data.message);

      // return { success: true, data: res.data };
      return res.data;
    } catch (err: any) {
      const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      "Document Submission Has Failed";
      
      setSubmissionStatus("failure");
      setSubmissionMessage(msg);
      // return { success: false, error: msg };
      // return {err , message : msg};
      const error = new Error(msg);
      (error as any).response = err?.response;
      throw error;

    } finally {
      setSubmissionLoading(false);
    }
  }

  return {
    values,
    errors,
    setFieldValue,
    setFieldError,
    validate,
    validateTab,
    submit,
    reset,
    isFormValid,
    getTabErrors,
    submissionLoading,
    submissionStatus,
    submissionMessage,
  };
}
