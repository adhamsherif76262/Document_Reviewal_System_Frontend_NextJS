"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group animate-bounce min-h-[200px]"
      icons={{
        success: <CircleCheckIcon className="size-10 text-green-600 font-black" />,
        info: <InfoIcon className="size-10 text-white font-black" />,
        warning: <TriangleAlertIcon className="size-10 text-Yellow-600 font-black" />,
        error: <OctagonXIcon className="size-10 text-red-600 font-black" />,
        loading: <Loader2Icon className="size-10 animate-spin text-blue-600 font-black" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
