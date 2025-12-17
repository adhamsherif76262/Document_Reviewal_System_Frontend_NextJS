// app/(public)/layout.tsx
import ClassicDepthNavbar from "../../../components/nav/PublicNavbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClassicDepthNavbar />
      {children}
    </>
  );
}
