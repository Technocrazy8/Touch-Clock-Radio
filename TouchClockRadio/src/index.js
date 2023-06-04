import React from 'react';
import { TopNav } from '../src/navigation/TopNav';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
// import { ThemeProvider } from './context/Theme';


const Index = () => {
    return (
        // <ThemeProvider>
            <SafeAreaProvider style={{marginTop:40}}>
                <StatusBar style="auto" />
                <TopNav />
            </SafeAreaProvider> 
        // </ThemeProvider>
    )
}
export default Index;