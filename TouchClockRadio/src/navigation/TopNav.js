import * as SplashScreen from 'expo-splash-screen';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { NavigationTabs, TopTabs } from './NavigationTabs';

SplashScreen.preventAutoHideAsync();

export const TopNav = () => {

    // const navigationTheme = {
    //     ...DefaultTheme,
    //     colors: {
    //     ...DefaultTheme.colors,
    //       primary: colors.primary,
    //       background: colors.background,
    //       card: colors.background,
    //       text: colors.text,
    //       border: 'transparent',
    //     },
    // };

    return (
        <NavigationContainer theme={DefaultTheme}>
            <TopTabs />
        </NavigationContainer>
    );
};