// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "@/components/ui/button";

// export function FormFooter({
//   isSubmitting,
//   lang,
//   onSubmit,
// }:any) {
//   return (
//     <div
//       className="
//         sticky bottom-0
//         bg-background
//         border-t
//         p-3 sm:p-4
//         flex flex-col sm:flex-row
//         gap-2
//       "
//     >
//       <Button
//         onClick={onSubmit}
//         disabled={isSubmitting}
//         className="w-full sm:w-auto"
//       >
//         {isSubmitting
//           ? lang === "en" ? "Submitting..." : "جارٍ الإرسال..."
//           : lang === "en" ? "Submit Document" : "إرسال المستند"}
//       </Button>
//     </div>
//   );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";

export function FormFooter({
  isSubmitting,
  isFormValid,
  lang,
  onSubmit,
}: any) {
  return (
    <div
      className={`
        ${isSubmitting || !isFormValid ? "animate-none" : "animate-pulse"}
        sticky bottom-0
        bg-backgrsound
        bg-gray-s200
        rounded-3xl
        shadow-2xl
        border-t
        p-3 sm:p-4
        
        flex flex-col sm:flex-row
        gap-2
      `}
    >
      <Button
        onClick={onSubmit}
        disabled={isSubmitting || !isFormValid}
        className="w-full sm:w-auto hover:cursor-pointer hover:bg-transparent hover:text-black transition-all duration-300"
      >
        {isSubmitting
          ? lang === "en"
            ? "Submitting..."
            : "جارٍ الإرسال..."
          : lang === "en"
          ? "Submit Document"
          : "إرسال المستند"}
      </Button>
    </div>
  );
}
