import * as SplashScreen from 'expo-splash-screen';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { NavigationTabs, TopTabs } from './NavigationTabs';
import{ useThemeScheme } from '../hooks/useThemeScheme';
import { useCustomTheme } from '../hooks/useCustomTheme';

// SplashScreen.preventAutoHideAsync();

export const TopNav = () => {


  const { colors } = useThemeScheme();
  const { theme } = useCustomTheme();

    const navigationTheme = {
        ...DefaultTheme,
        colors: {
        ...DefaultTheme.colors,
          primary: colors.primary,
          background: colors.background,
          card: colors.background,
          text: colors.text,
          border: 'transparent',
        },
    };

    return (
        <NavigationContainer theme={navigationTheme}>
            <TopTabs />
        </NavigationContainer>
    );
};