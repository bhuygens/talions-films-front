"use client"
import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {usePathname} from "next/navigation";

type HeaderContextType = {
  currentTab: string;
  brandPosition: string;
  onTabClicked: (tab: string) => void;
  setBrandPosition: any;

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
  const pathname = usePathname()

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<string>("");
  const [brandPosition, setBrandPosition] = useState<"top" | "middle">("middle");

  const onTabClicked = (newTab: string): void => {
    setBrandPosition("top");
    setCurrentTab(newTab);
  };


  const contextValue: HeaderContextType = {
    currentTab,
    onTabClicked,
    brandPosition,
    setBrandPosition
  };

  useEffect(() => {
    if (window.location.pathname !== "/") {
      setBrandPosition("top");
    }
    setIsLoading(false);
  }, [])

  useEffect(() => {
    console.log("pathhhh", pathname)
    setCurrentTab(pathname.substring(1))
  }, [pathname])


  return (
    <HeaderContext.Provider value={contextValue}>
      {!isLoading && children}
    </HeaderContext.Provider>
  );
};
