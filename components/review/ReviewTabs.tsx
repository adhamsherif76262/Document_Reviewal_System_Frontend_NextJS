/* eslint-disable @typescript-eslint/no-explicit-any */
// components/review/ReviewTabs.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReviewFieldRow } from './ReviewFieldRow'
import { useParams } from 'next/navigation'

export function ReviewTabs({
  template,
  document,
  reviewState,
  onReviewChange
}: any) {

    
const {lang} = useParams()
    // console.log( "Template is " + JSON.stringify(template.tabs[0].fields[0].label[lang]))
  return (
    <Tabs defaultValue={template.tabs[0].key}>
      <TabsList className='mx-auto xxs:my-8 xxxs:my-12 flex justify-center items-center xxxs:flex-col xxs:flex-row'>
        {template.tabs.map((tab: any) => (
          <TabsTrigger key={tab.key} value={tab.key} className='text-2xl font-black p-6 m-2 hover:cursor-pointer hover:bg-black hover:text-white'>
            {tab.label[lang as string].includes("الصور") ? "ملفات الصور" 
            : tab.label[lang as string].includes("تحميل الملفات") ? " PDF ملفات ال" 
            : tab.label[lang as string].includes("Image") ? "Image Files" 
            :tab.label[lang as string].includes("PDF") ? "PDF Files" : ""
        }
            {/* {lang === "ar" ? "" : ""} */}
            {/* {tab.label?.[lang] ?? tab.label?.en} */}
          </TabsTrigger>
        ))}
      </TabsList>

  {template.tabs.map((tab: any) => {
    // Filter document fields that belong to this tab
    const fieldsInThisTab = Object.entries(document.fields).filter(
      ([key, field]: any) => field.tab === tab.key
    )
    // console.log("Tab Fields Is" + tab.fields)
    console.log("Tab Fields Is" + tab.fields)
    if (fieldsInThisTab.length === 0) return null // skip empty tabs

    return (
      <TabsContent key={tab.key} value={tab.key} className="space-y-4">
        {fieldsInThisTab.map(([key, field]: any) => (
          <ReviewFieldRow
            key={key}
            fieldKey={key}
            field={field}
            templateFieldLabel = {tab.fields[0].label[lang as string]}
            review={reviewState[key]}
            onChange={onReviewChange}
          />
        ))}
      </TabsContent>
    )
  })}

      {/* {template.tabs.map((tab: any) => {
        alert(tab.key)
        return(

        <TabsContent key={tab.key} value={tab.key} className="space-y-4">
          {tab.fields.map((field: any) => (
            <ReviewFieldRow
              key={field.name}
              field={field}
              value={document.fields[field.name]?.value}
              review={reviewState[field.name]}
              onChange={onReviewChange}
            />
          ))}
        </TabsContent>
        )
})} */}

       {/* {Object.entries(document.fields).map(([key, field]: any) => (
         <ReviewFieldRow
           key={key}
           fieldKey={key}
           field={field}
           review={reviewState[key]}
           onChange={onReviewChange}
         />
       ))} */}
    </Tabs>
  )
}


// // components/review/ReviewTabs.tsx
// import { ReviewFieldRow } from './ReviewFieldRow'

// export function ReviewTabs({ document, reviewState, onReviewChange }: any) {
//   if (!document) return null

//   return (
//     <div className="space-y-4">
//       {Object.entries(document.fields).map(([key, field]: any) => (
//         <ReviewFieldRow
//           key={key}
//           fieldKey={key}
//           field={field}
//           review={reviewState[key]}
//           onChange={onReviewChange}
//         />
//       ))}
//     </div>
//   )
// }