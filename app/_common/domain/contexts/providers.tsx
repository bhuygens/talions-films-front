"use client";

import {HeaderProvider} from "@/app/_common/domain/contexts/header/header.context";
import BrandComponent from "@/app/_common/components/layout/brand.component";
import TabsComponent from "@/app/_common/components/layout/tabs.component";

export default function Providers({children}: any) {
  return (
    <>
      <HeaderProvider>
        <BrandComponent/>
        <TabsComponent/>
        {children}
      </HeaderProvider>
    </>
  );
}
