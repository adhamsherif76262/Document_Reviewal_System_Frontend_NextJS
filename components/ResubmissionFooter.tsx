
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "@/components/ui/button";

// export function ResubmissionFooter({
//   isReSubmitting,
//   isFormValid,
//   lang,
//   onReSubmit,
//   form,
// }: any) {
//   return (
//     <div
//       className={`
//         ${isReSubmitting || !isFormValid ? "animate-none" : "animate-pulse"}
//         sticky bottom-0
//         bg-backgrsound
//         bg-gray-s200
//         rounded-3xl
//         shadow-2xl
//         border-t
//         p-3 sm:p-4
//         z-50 inset-0
//         flex flex-col sm:flex-row
//         gap-2
//       `}
//     >
//       <Button
//         onClick={onReSubmit}
//         // disabled={isSubmitting || !isFormValid}
//         disabled={!form.isFormValid() || form.submissionLoading} 
//         className="w-full sm:w-auto hover:cursor-pointer hover:bg-transparent hover:text-black transition-all duration-300"
//       >
//         {isReSubmitting
//           ? lang === "en"
//             ? "Submitting..."
//             : "جارٍ الإرسال..."
//           : lang === "en"
//           ? "Submit Document"
//           : "إرسال المستند"}
//       </Button>
//     </div>
//   );
// }



/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";

export function ResubmissionFooter({
  lang,
  onReSubmit,
  form,
}: {
  lang: "en" | "ar";
  onReSubmit: () => void;
  form: any;
}) {
  // const valid = form.validate() ==> Triggers An Infinite Loop
  const canSubmit =
   form.isFormValid() && !form.resubmissionLoading;
    // form.isFormValid() && !form.resubmissionLoading && form.validate();
    // form.isFormValid() && !form.resubmissionLoading && valid;

  return (
    <div
      className={`
        ${canSubmit ? "animate-pulse" : "animate-none"}
        sticky bottom-0
        bg-backgrsound
        bg-gray-s200
        rounded-3xl
        max-w-fit
        mx-auto
        shadow-2xl
        border-t
        p-3 sm:p-4
        z-50 inset-0
        flex flex-col sm:flex-row
        gap-2
      `}
    >
      <Button
        onClick={onReSubmit}
        disabled={!canSubmit}
        // className="
        //   w-full sm:w-auto
        //   hover:cursor-pointer
        //   hover:bg-transparent
        //   hover:text-black
        //   transition-all duration-300
        // "
                className="w-full sm:w-auto hover:cursor-pointer hover:bg-transparent hover:text-black transition-all duration-300"

      >
        {form.resubmissionLoading
          ? lang === "en"
            ? "Resubmitting..."
            : "جارٍ إعادة الإرسال..."
          : lang === "en"
          ? "Resubmit Document"
          : "إعادة إرسال المستند"}
      </Button>
    </div>
  );
}
