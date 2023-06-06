import { useThemeScheme } from "../../hooks/useThemeScheme";
import { useCustomTheme } from "../../hooks/useCustomTheme";
import { View,Text, Pressable, StyleSheet, Switch } from "react-native";
import React, { useState } from 'react';

const SettingsScreen = () => {
    const { colors } = useThemeScheme();
    const { setTheme } = useCustomTheme();
    const [isEnabled, setIsEnabled] = useState(false);


    const toggleSwitch = () => {
        if(isEnabled){
            setTheme('light');
        }else{
            setTheme('dark');
        }
        setIsEnabled(previousState => !previousState);
    };


    return (
        <View style={styles.container}>
            <Text style={{color:colors.text}}>Toggle mode</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={colors.text}
                onValueChange={toggleSwitch}
                value={isEnabled}
                // style={{width: 100, height: 100}}
                style={{transform: [{ scaleX: 2.5 }, { scaleY: 2.5 }]}}
            />
            {/* <View style={styles.buttonContainer}>
                <Pressable onPress={() => setTheme('light')} style={styles.button}/>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable onPress={() => setTheme('dark')} style={styles.button}/>
            </View> */}

        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap: 20,
    },
    buttonContainer:{
        backgroundColor: 'blue',
        height: 52,
        width: 52,
        borderRadius: 25,
    },
    button:{
        borderWidth: 1,
        height:50,
        width:50,
    },
});

export default SettingsScreen;