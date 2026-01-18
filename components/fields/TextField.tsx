// fields/TextField.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TextField({
  field,
  lang,
  value,
  onChange,
  locked = false,
  error,
}: any) {
  return (
    <div className="flex flex-col">
      <Label className="font-semibold text-sm">{field.label[lang]}</Label>
      <p className="text-xs text-muted-foreground mt-1">
        {field.helpText?.[lang]}
      </p>
      <Input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={locked}
        className="w-full mt-1"
      />
      {
        error && (
          <ul>
            {
            error.map((err : any , index : any)=>(
              <li key={err}  className="font-black text-lg text-red-500 mt-2">{err}</li>
            ))
          }
            {/* <li></li> */}
          {/* {error}         */}
          </ul>
        )
      }
    </div>
  );
}
