import { ThemeProvider as AppThemeProvider } from "../../shared/context/ThemeContext";

export default function ThemeProvider({ children }) {
  return <AppThemeProvider>{children}</AppThemeProvider>;
}