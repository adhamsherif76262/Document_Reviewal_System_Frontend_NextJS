// app/(public)/layout.tsx
import ClassicDepthNavbar from "../../../components/nav/PublicNavbar";
import { Analytics } from "@vercel/analytics/next"
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
          <Analytics></Analytics>
      <ClassicDepthNavbar />
      {children}
    </>
  );
}
