import Colors from '../constants/Colors';
import { useCustomTheme } from './useCustomTheme';

export const useThemeScheme = () => {
  const customTheme = useCustomTheme();
  // handles theme and colors
  return {
    theme: customTheme.theme,
    colors: Colors[customTheme.theme],
  };
}