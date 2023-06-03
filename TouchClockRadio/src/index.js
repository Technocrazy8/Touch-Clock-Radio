import React from 'react';
import { TopNav } from '../src/navigation/TopNav';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';


const Index = () => {
    return (
        <SafeAreaProvider style={{marginTop:40}}>
            <StatusBar style="auto" />
            <TopNav />
        </SafeAreaProvider>
    )
}
export default Index;