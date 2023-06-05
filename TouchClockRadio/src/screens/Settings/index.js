import { useThemeScheme } from "../../hooks/useThemeScheme";
import { useCustomTheme } from "../../hooks/useCustomTheme";
import { View,Text, Pressable, StyleSheet } from "react-native";

const SettingsScreen = () => {
    const { colors } = useThemeScheme();
    const { setTheme } = useCustomTheme();


    return (
        <View style={styles.container}>
            <Text>Settings Screen</Text>
            <View style={styles.buttonContainer}>
                <Pressable onPress={() => setTheme('light')} style={styles.button}/>
            </View>
            {/* <View style={styles.buttonContainer}> */}
                <Pressable onPress={() => setTheme('dark')} style={styles.button}/>
            
            {/* </View> */}

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
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    button:{
        borderWidth: 1,
        height:50,
        width:50,
    },
});

export default SettingsScreen;