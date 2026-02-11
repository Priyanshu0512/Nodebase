import AuthLayout from "@/features/auth/components/auth-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayout children={children}></AuthLayout>;
};

export default Layout;
