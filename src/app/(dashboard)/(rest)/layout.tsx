import { AppHeader } from "@/components/app-header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppHeader />
      <main className="p-4 md:px-10 md:py-6 h-full">{children}</main>
    </>
  );
};
export default Layout;
