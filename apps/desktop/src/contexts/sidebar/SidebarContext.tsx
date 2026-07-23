import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { SidebarMode } from "./types";

interface SidebarContextType {
  mode: SidebarMode;

  isExpanded: boolean;
  isCollapsed: boolean;

  setMode: (mode: SidebarMode) => void;

  toggleSidebar: () => void;
}

export const SidebarContext =
  createContext<SidebarContextType | null>(null);

interface SidebarProviderProps {
  children: ReactNode;
}

function getSidebarMode(): SidebarMode {
  return "collapsed";
}

export function SidebarProvider({
  children,
}: SidebarProviderProps) {
  const [mode, setMode] = useState<SidebarMode>(
    getSidebarMode,
  );

  const toggleSidebar = useCallback(() => {
    setMode((previous) =>
      previous === "expanded"
        ? "collapsed"
        : "expanded",
    );
  }, []);

  const value = useMemo(
    () => ({
      mode,

      isExpanded: mode === "expanded",
      isCollapsed: mode === "collapsed",

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