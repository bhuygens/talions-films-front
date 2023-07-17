"use client"
import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {CommonUtil} from "@/app/_common/utils/common.util";

type HeaderContextType = {
  currentTab: string;
  brandPosition: string;
  onTabClicked: (tab: string) => void;
  setBrandPosition: any;
  setCurrentTab: any;
};

const HeaderContext = createContext<HeaderContextType | null>(null);

export const useHeaderContext = (): HeaderContextType => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeaderContext must be used within an HeaderProvider");
  }
  return context;
};

type HeaderProviderProps = {
  children: ReactNode;
};

export const HeaderProvider = ({children}: HeaderProviderProps): JSX.Element => {

  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [brandPosition, setBrandPosition] = useState<"top" | "middle">("middle");

  const onTabClicked = (newTab: string): void => {
    setBrandPosition("top");
    setCurrentTab(newTab);
  };

  const contextValue: HeaderContextType = {
    currentTab,
    onTabClicked,
    brandPosition,
    setBrandPosition,
    setCurrentTab,
  };

  useEffect(() => {
    if (pathname !== "/") {
      setBrandPosition("top");
      setCurrentTab(CommonUtil.getTab(pathname));
    }
    setIsLoading(false);
  }, [pathname])


  return (
    <HeaderContext.Provider value={contextValue}>
      {!isLoading && children}
    </HeaderContext.Provider>
  );
};
