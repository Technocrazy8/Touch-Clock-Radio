import { View,Text, Pressable, StyleSheet } from "react-native";

const ClockScreen = () => {
    return (
        <View style={styles.container}>
            <Text>ClockScreen</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
});

export default ClockScreen;