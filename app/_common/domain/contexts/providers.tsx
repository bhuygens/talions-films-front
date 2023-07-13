"use client";

import {HeaderProvider} from "@/app/_common/domain/contexts/header/header.context";
import LogoComponent from "@/app/_common/components/logo.component";
import TabsComponent from "@/app/_common/components/tabs.component";

export default function Providers({children}: any) {
  return (
    <>
      <HeaderProvider>
        <LogoComponent/>
        <TabsComponent/>
        {children}
      </HeaderProvider>
    </>
  );
}
