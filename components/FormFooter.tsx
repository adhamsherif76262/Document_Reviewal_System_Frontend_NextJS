/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";

export function FormFooter({
  isSubmitting,
  lang,
  onSubmit,
}:any) {
  return (
    <div
      className="
        sticky bottom-0
        bg-background
        border-t
        p-3 sm:p-4
        flex flex-col sm:flex-row
        gap-2
      "
    >
      <Button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting
          ? lang === "en" ? "Submitting..." : "جارٍ الإرسال..."
          : lang === "en" ? "Submit Document" : "إرسال المستند"}
      </Button>
    </div>
  );
}
