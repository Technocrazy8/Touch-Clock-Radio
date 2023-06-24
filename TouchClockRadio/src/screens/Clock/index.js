import { View,Text, Pressable, StyleSheet, ImageBackground} from "react-native";
import Slider from 'react-native-slider';
import React, { useEffect, useState } from 'react';
import {VolumeHighComponent, VolumeOffComponent}from '../../constants/Icons';
import axios from 'axios';
import moment from 'moment';
import { useThemeScheme } from "../../hooks/useThemeScheme";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from 'react-native-webview';

const test = require('../../components/Clock/test.html');


const ClockScreen = () => {
    const {colors} = useThemeScheme();
    const [timedata, setTimeData] = useState(null);
    const [relativeTime, setRelativeTime] = useState(null);
    const [timeloaded, setTimeloaded] = useState(false);
    const [sliderActive, setSliderActive] = useState(false);


    useEffect(() => {
        const fetchCurrentTimeAndLocation = async () => {
          try {
            const response = await axios.get('http://worldtimeapi.org/api/ip');
            const data = response.data;
            const hours = moment(data.datetime).format('HH.mm');
    
            let relative = null;
            if(hours >= 5 && hours < 12){
              relative = "MORNING";
            }else if(hours >= 12 && hours < 17){
              relative = "AFTERNOON";
            }else{
              relative = "EVENING";
            }
    
            // if(hours >= 5 && hours < 18){
            //   setBackgroundImage(require('../../assets/bg-image-daytime.jpg'));
            // }else{
            //   setBackgroundImage(require('../../assets/bg-image-nighttime.jpg'));
            // }
        
            // const locationResponse = await axios.get(`http://ip-api.com/json/${data.client_ip}`);
            // const locationData = locationResponse.data;
            // const location = `${locationData.city}, ${locationData.region}`;
    
            setRelativeTime(relative);
            // setLocation(location);
            setTimeData(data);
            setTimeloaded(true);
          } catch (error) {
            console.log('Error fetching current time and location:', error);
          }
        };    
    
        fetchCurrentTimeAndLocation();
        
        const intervalID = setInterval(fetchCurrentTimeAndLocation, 20000);
        return () => clearInterval(intervalID);
      }, []);

    const handleSliderStart = () => {
        console.log('slider start');
        setSliderActive(true);
    };
    
    const handleSliderEnd = () => {
        console.log('slider end');
       setSliderActive(false);
    };

    if(timeloaded==false){
        return null;
    }

    

    return (        
        <ImageBackground source={require('../../../assets/background.jpg')} style={styles.image}>
            <View style={{width:'100%', height:200, justifyContent:'center'}}>
            <WebView source={test} style={{margin:10,justifyContent:'center',alignItems:'center'}}/> 
            </View>

            <View style={{width:'100%',borderWidth:1, marginBottom:'5%'}}>
                <Text style={[styles.h1,{color:colors.text}]}>Radio:</Text>
                <View style={{marginHorizontal:'2%'}}>
                    <View style={{flexDirection:'row', height:40,width:'100%',borderWidth:1,justifyContent:'space-between', borderColor:'white'}}>
                        <View style={{justifyContent:'center',alignItems:'center'}}><VolumeOffComponent/></View>
                        <View style={styles.volumeSlider}>
                                <Slider
                                    animateTransitions
                                    minimumTrackTintColor="#e6a954"
                                    thumbTintColor='#e6a954'
                                    tapToSeek={true}
                                    trackStyle={{                    
                                        backgroundColor:'grey',
                                        borderRadius: 20,
                                        height: 35,
                                    }}
                                    thumbStyle={{
                                        height: 35,
                                        width: 35,
                                        borderTopRightRadius: 20,
                                        borderBottomRightRadius: 20,
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                    }}
                                    onSlidingStart={handleSliderStart}
                                    onSlidingComplete={handleSliderEnd}
                                    step={.05}
                                    lowerLimit={0}
                                    upperLimit={1}
                                    minimumValue={0}
                                    maximumValue={1}
                                />
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <VolumeHighComponent/>
                        </View>
                    </View>
                </View>
            </View>


            <View style={styles.timecontainer}>
                <Text style={{textTransform:'uppercase', fontSize:20, color:colors.text}}>Good {relativeTime} Evan, it is currently:</Text>
                <View style={styles.timeStamp}>
                    <Text style={[styles.h1,{color:colors.text}]}>{moment(timedata.datetime).format('h:mm')}</Text>
                    <View style={{justifyContent:'flex-end', borderWidth:1,flexGrow:1,minHeight:50}}>
                        <Text style={[styles.h3,{color:colors.text}]}>{timedata.abbreviation}</Text>
                        <Text style={[styles.h3,{color:colors.text}]}>{moment(timedata.datetime).format('A')}</Text>
                    </View>
                </View>
            </View>

        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        },
    image:{
        ...StyleSheet.absoluteFillObject,
        justifyContent:'center',
    },
    timecontainer:{
        borderWidth:1,
        marginBottom:'20%',
        width:'100%',
        paddingHorizontal:'10%',
    },
    timeStamp:{
        flexDirection:'row',
        alignItems:'center'
    },
    h1:{
        fontSize:60,
    },
    h3:{
        fontSize:20,
    }, 
    volumeSlider:{
        borderRadius:20,
        width:'80%',
        borderWidth:1,
        backgroundColor:'grey',
        justifyContent:'center',
    },
});

export default ClockScreen;