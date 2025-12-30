import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

export function PdfFieldList({ pdfs , fieldName}: { pdfs: string[] , fieldName : string}) {
  return (
    <div className="flex flex-col gap-2">
      {pdfs.map((url, i) => (
        <Button
          key={i}
          variant="outline"
          className="justify-start gap-2"
          asChild
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            <FileText className="h-4 w-4" />
            {fieldName} <strong> PDF </strong>  {i + 1}
          </a>
        </Button>
      ))}
    </div>
  )
}
