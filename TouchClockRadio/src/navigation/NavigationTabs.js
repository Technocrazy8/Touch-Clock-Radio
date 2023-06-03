import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import Icons from '../constants/Icons';
import { Ionicons } from '@expo/vector-icons';
// import { useThemeScheme } from '../hooks/useThemeScheme';
import ClockScreen from '../screens/Clock/index';
import SettingScreen from '../screens/Settings/index';

const Tab = createMaterialTopTabNavigator();

const TabBarIcon = ({color,name})=>(
    <Ionicons name={name} size={25} color={color}/>
);

{/* <ion-icon name="settings-outline"></ion-icon> */}
export const TopTabs = () => {
    // const { colors } = useThemeScheme();

    // top navigation
    return (
        <Tab.Navigator
        initialRouteName='Clock'
        screenOptions={{
            tabBarInactiveTintColor: 'grey',
            tabBarActiveTintColor: 'blue',
        }}
        >
            <Tab.Screen name="Clock" 
            component={ClockScreen}
            options={{
                title:"Clock",
                tabBarIcon:(props)=>(
                    <TabBarIcon {...props} name="time-outline"/>
                ),
                headerShown: false,
            }}/>
            <Tab.Screen name="Settings"
            component={SettingScreen}
            options={{
                title:"Settings",
                tabBarIcon:(props)=>(
                    <TabBarIcon {...props} name="settings-outline"/>
                ),
                headerShown: false,
            }}/>
            
        </Tab.Navigator>
    );
};
