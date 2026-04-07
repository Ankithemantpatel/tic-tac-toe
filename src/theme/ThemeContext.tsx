import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { getTheme, type AppTheme, type ThemeMode } from './theme';

type ThemeContextValue = {
  mode: ThemeMode;
  theme: AppTheme;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  const value = useMemo<ThemeContextValue>(() => {
    const theme = getTheme(mode);
    return { mode, theme, setMode };
  }, [mode]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useAppTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useAppTheme must be used within ThemeProvider');
  }
  return ctx;
}
