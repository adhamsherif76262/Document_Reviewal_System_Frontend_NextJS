/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card } from "../src/components/ui/card";
import { Button } from "../src/components/ui/button";


export function DocumentTypeSelector({ templates, onSelect } : any) {
    const formatKeyToLabel = (key: string): string => {
    return key
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/([A-Z])/g, ' $1') // Insert space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
      .trim();
  };
  
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 xxs:grid-cols-2 gap-4">
      {templates.map((tpl : any) => (
        <Card
          key={tpl.templateKey}
          className="p-4 flex flex-col items-center justify-center gap-3"
        >
          <h3 className="text-xl font-black sm:text-xl px-3 py-3">{formatKeyToLabel(tpl.templateKey)}</h3>

          <div className="flex gap-5 sm:flex-row sm:items-center sm:justify-center xxxs:flex-col xxxs:items-center xxxs:justify-center">
            {tpl.states.map((state : any) => (
              <Button
                className="text-xl font-black sm:text-xl max-w-[300px] px-3 py-3 hover:cursor-pointer hover:bg-black hover:text-white transition-all duration-300"
                key={state}
                variant="outline"
                onClick={() =>
                  onSelect(tpl.templateKey, state)
                }
              >
                {state}
              </Button>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
