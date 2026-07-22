import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { SidebarMode } from "./types";

interface SidebarContextType {
  mode: SidebarMode;

  isExpanded: boolean;
  isCollapsed: boolean;
  isHidden: boolean;

  setMode: (mode: SidebarMode) => void;

  toggleSidebar: () => void;
}

export const SidebarContext =
  createContext<SidebarContextType | null>(null);

interface SidebarProviderProps {
  children: ReactNode;
}

function getSidebarMode(width: number): SidebarMode {
  if (width < 900) return "hidden";

  if (width < 1200) return "collapsed";

  return "expanded";
}

export function SidebarProvider({
  children,
}: SidebarProviderProps) {
  const [mode, setMode] = useState<SidebarMode>(() =>
    getSidebarMode(window.innerWidth),
  );

  useEffect(() => {
    const handleResize = () => {
      setMode(getSidebarMode(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = useCallback(() => {
    setMode((previous) => {
      switch (previous) {
        case "expanded":
          return "collapsed";

        case "collapsed":
          return "expanded";

        case "hidden":
          return "expanded";
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      mode,

      isExpanded: mode === "expanded",
      isCollapsed: mode === "collapsed",
      isHidden: mode === "hidden",

      setMode,

      toggleSidebar,
    }),
    [mode, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}