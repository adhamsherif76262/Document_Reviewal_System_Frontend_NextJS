/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card } from "../src/components/ui/card";
import { Button } from "../src/components/ui/button";

export function DocumentTypeSelector({ templates, onSelect } : any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {templates.map((tpl : any) => (
        <Card
          key={tpl.templateKey}
          className="p-4 flex flex-col gap-3"
        >
          <h3 className="font-semibold">{tpl.templateKey}</h3>

          <div className="flex gap-2">
            {tpl.states.map((state : any) => (
              <Button
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
