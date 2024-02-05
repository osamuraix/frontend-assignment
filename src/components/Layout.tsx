import i18n from "@/i18n";
import { ReactNode, useEffect } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    i18n.loadResources();
  }, []);

  return (
    <div className={"container"}>
      <div className={"section"}>{children}</div>
    </div>
  );
};

export default Layout;
