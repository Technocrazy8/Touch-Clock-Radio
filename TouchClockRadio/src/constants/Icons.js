import { Ionicons } from "@expo/vector-icons";
import React from "react";
// import Svg, { Path, Circle, G } from "react-native-svg";

function SettingsComponent(props){

    <Ionicons name="volume-high-outline"/>
}

function VolumeHighComponent(props){
    return(
        <Ionicons name="volume-high-outline" size={30} color ={'white'}/>
    );
}
function VolumeOffComponent(props){
    return(
        <Ionicons name="volume-off-outline" size={30} color={'white'}/>
    );
}

export {SettingsComponent, VolumeHighComponent, VolumeOffComponent};