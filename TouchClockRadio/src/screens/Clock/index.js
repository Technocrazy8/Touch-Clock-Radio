import { View,Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';


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


            <View style={styles.timecontainer}>
                <Text style={{textTransform:'uppercase', fontSize:20}}>Good {relativeTime} Evan, it is currently:</Text>
                <View style={styles.timeStamp}>
                    <Text style={styles.h1}>{moment(timedata.datetime).format('h:mm')}</Text>
                    <View style={{justifyContent:'flex-end', borderWidth:1,flexGrow:1,minHeight:50}}>
                        <Text style={styles.h3}>{timedata.abbreviation}</Text>
                        <Text style={styles.h3}>{moment(timedata.datetime).format('A')}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'flex-end',
        // marginRight:0,

    },
    timecontainer:{
        // flex:1,
        position:'absolute',
        bottom:0,
        borderWidth:1,
        marginBottom:'20%',
        //full extend
        width:'100%',
        // marginLeft:'10%',
        // marginRight:90,
        // marginStart:'10%',
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
});

export default ClockScreen;