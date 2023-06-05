import { View,Text, Pressable, StyleSheet, ImageBackground } from "react-native";
import React, { useEffect, useState } from 'react';
import {VolumeHighComponent, VolumeOffComponent}from '../../constants/Icons';
import axios from 'axios';
import moment from 'moment';
import { Ionicons } from "@expo/vector-icons";


const ClockScreen = () => {
    const [timedata, setTimeData] = useState(null);
    const [relativeTime, setRelativeTime] = useState(null);
    const [timeloaded, setTimeloaded] = useState(false);
    


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

    if(timeloaded==false){
        return null;
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/background.jpg')} style={styles.image}>

            <View style={{width:'100%',borderWidth:1, marginBottom:'5%'}}>
                <Text style={styles.h1}>Radio:</Text>
                <View style={{marginHorizontal:'2%'}}>
                    <View style={{flexDirection:'row', height:40,width:'100%',borderWidth:1,justifyContent:'space-between', borderColor:'white'}}>
                        {/* <VolumeHighComponent style={{height:50, width:50,borderWidth:0}}/> */}
                        <View style={{justifyContent:'center',alignItems:'center'}}><VolumeOffComponent/></View>
                        <View style={styles.volumeSlider}>
                            <View style={{backgroundColor:'yellow',width:'100%',height:'100%',borderRadius:20, borderWidth:1,borderColor:'white'}}></View>
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <VolumeHighComponent/>
                        </View>
                    </View>
                </View>
            </View>


            <View style={styles.timecontainer}>
                <Text style={{textTransform:'uppercase', fontSize:20, color:'white'}}>Good {relativeTime} Evan, it is currently:</Text>
                <View style={styles.timeStamp}>
                    <Text style={styles.h1}>{moment(timedata.datetime).format('h:mm')}</Text>
                    <View style={{justifyContent:'flex-end', borderWidth:1,flexGrow:1,minHeight:50}}>
                        <Text style={styles.h3}>{timedata.abbreviation}</Text>
                        <Text style={styles.h3}>{moment(timedata.datetime).format('A')}</Text>
                    </View>
                </View>
            </View>

            </ImageBackground>
        </View>
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
        color:'white',
    },
    h3:{
        fontSize:20,
        color:'white',
    }, 
    volumeSlider:{
        borderRadius:20,
        width:'80%',
        borderWidth:1,
    },

});

export default ClockScreen;