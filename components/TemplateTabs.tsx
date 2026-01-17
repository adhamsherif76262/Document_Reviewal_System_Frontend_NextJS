// components/TemplateTabs.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../src/components/ui/tabs";

export function TemplateTabs({ tabs, lang, children } : any) {
  return (
    <Tabs defaultValue={tabs[0].key} className="w-full">
      <TabsList
        className="
          grid w-full
          grid-cols-2
          sm:grid-cols-3
          gap-2
          bg-muted p-2
          rounded-xl
        "
      >
        {tabs.map((tab : any) => (
          <TabsTrigger
            key={tab.key}
            value={tab.key}
            className="text-xs sm:text-sm px-2 py-1"
          >
            {tab.label[lang]}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab : any) => (
        <TabsContent key={tab.key} value={tab.key}>
          {children(tab)}
        </TabsContent>
      ))}
    </Tabs>
  );
}
