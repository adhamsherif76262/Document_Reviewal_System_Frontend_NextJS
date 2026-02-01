// // components/TemplateTabs.tsx
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "../src/components/ui/tabs";

// export function TemplateTabs({ tabs, lang, children } : any) {
//   return (
//     <Tabs defaultValue={tabs[0].key} className="w-full">
//       <TabsList
//         className="
//           grid w-full
//           grid-cols-2
//           sm:grid-cols-3
//           gap-2
//           bg-muted p-2
//           rounded-xl
//         "
//       >
//         {tabs.map((tab : any) => (
//           <TabsTrigger
//             key={tab.key}
//             value={tab.key}
//             className="text-xs sm:text-sm px-2 py-1"
//           >
//             {tab.label[lang]}
//           </TabsTrigger>
//         ))}
//       </TabsList>

//       {tabs.map((tab : any) => (
//         <TabsContent key={tab.key} value={tab.key}>
//           {children(tab)}
//         </TabsContent>
//       ))}
//     </Tabs>
//   );
// }


// // components/TemplateTabs.tsx
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import {
//   Tabs,
//   TabsList,
//   TabsTrigger,
//   TabsContent,
// } from "../src/components/ui/tabs";

// export function TemplateTabs({
//   tabs,
//   lang,
//   children,
//   onTabChange,
//   tabErrors = {},
// }: any) {
//   const [activeTab, setActiveTab] = useState(tabs[0]?.key);

//   function handleTabChange(nextKey: string) {
//     if (nextKey === activeTab) return;

//     if (onTabChange) {
//       const currentTab = tabs.find((t: any) => t.key === activeTab);
//       const canLeave = onTabChange(currentTab.fields);
//       if (!canLeave) return;
//     }

//     setActiveTab(nextKey);
//   }

//   return (
//     <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
//       <TabsList
//         className="
//           grid w-full
//           grid-cols-2 sm:grid-cols-3
//           gap-2
//           bg-muted p-2
//           rounded-xl
//         "
//       >
//         {tabs.map((tab: any) => {
//           const hasError = tabErrors[tab.key];

//           return (
//             <TabsTrigger
//               key={tab.key}
//               value={tab.key}
//               className={`
//                 text-xs sm:text-sm px-2 py-1
//                 ${hasError ? "border border-red-500 text-red-600" : ""}
//               `}
//             >
//               {tab.label[lang]}
//             </TabsTrigger>
//           );
//         })}
//       </TabsList>

//       {tabs.map((tab: any) => (
//         <TabsContent key={tab.key} value={tab.key}>
//           {children(tab)}
//         </TabsContent>
//       ))}
//     </Tabs>
//   );
// }




/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../src/components/ui/tabs";

export function TemplateTabs({
  tabs,
  lang,
  children,
  onTabChange,
  tabErrors = {},
}: any) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key);

  function handleTabChange(nextKey: string) {
    alert("bEFORE tab changed")
    if (nextKey === activeTab) return;
    alert(" aFTER tab changed")

    if (onTabChange) {
      alert("tab changed")
      const currentTab = tabs.find((t: any) => t.key === activeTab);
      const canLeave = onTabChange(currentTab.fields);
      if (!canLeave) return; // prevent tab switch if validation fails
    }

    setActiveTab(nextKey);
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-7xl mx-auto">
      <TabsList className=" w-full xs:h-20 xxxs:h-50 flex xs:flex-row xxxs:flex-col xs:items-center xsxx:items-center xxxs:justify-center xs:justify-evenly bg-muted xxxs:p-5 xs:p-3 rounded-xl">
        {tabs.map((tab: any) => {
          const hasError = tabErrors[tab.key];

          return (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className={`text-xl font-black sm:text-xl max-w-[300px] px-3 py-3 hover:cursor-pointer hover:bg-black hover:text-white transition-all duration-300 ${
                hasError ? "border border-red-500 text-red-600" : ""
              }`}
            >
              {tab.label[lang]}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {tabs.map((tab: any) => (
        <TabsContent key={tab.key} value={tab.key}>
          {children(tab)}
        </TabsContent>
      ))}
    </Tabs>
  );
}
