import React, {useRef, useEffect, useState} from "react";
import {StyleSheet, View, Text, Alert, Skia} from "react-native";
import {Canvas, Group, useImage, useValue, Image, center} from "@shopify/react-native-skia";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import Animated from "react-native-reanimated";

import axios from "axios"

import Chair from "./Chair";

const img = require("./table_cropped.png")

const callAPI = () => {
  return new Promise((resolve, reject) =>{
    axios.get("http://10.0.2.2:5000/get_chairs")
    .catch(function(error) {
      console.log(error.response);

      reject(null);
    })
    .then((res)=>{
      let out_arr = res.data;
      let result = [];
      for (let i = 0; i < res.data.length; i++) {
        let x_val = out_arr[i][1];
        let y_val = out_arr[i][2];
        let tmp = React.createElement(Chair, {x:x_val, y:y_val, occupancy:out_arr[i][0], key:i});
        result.push(tmp);
      }

      //console.log(result);

      resolve(result);
    })
  })
}

const styles = StyleSheet.create({
    ball: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: 'lightblue'
    },
    map: {
      width:"100%",
      height:"100%",
      backgroundColor: "grey"
    }
});

const Map = () => {
  const width = 760;
  const height = 540;

  const offset = useSharedValue({ x: -(width/2), y: -(height/2)});
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: (width/2) + offset.value.x },
        { translateY: (height/2) + offset.value.y },
        { rotateZ: `${rotation.value}rad` },
        { translateX: -(width/2) },
        { translateY: -(height/2) },
        { scale: scale.value }
      ]
    };
  });
  
  const start = useSharedValue({ x: -(width/2), y:-(height/2) });
  const pan = Gesture.Pan()
  .onUpdate((e) => {
    offset.value = {
      x: e.translationX + start.value.x,
      y: e.translationY + start.value.y
    };
  })
  .onEnd(() => {
    start.value = {
      x: offset.value.x,
      y: offset.value.y,
    };
  });

  const rotate = Gesture.Rotation()
  .onUpdate((e)=>{
    rotation.value = savedRotation.value + e.rotation;
  })
  .onEnd(()=>{
    savedRotation.value = rotation.value;
  });

  const pinch = Gesture.Pinch()
  .onUpdate((e)=>{ 
    console.log("pinched")
    scale.value = savedScale.value * e.scale;
  })
  .onEnd(()=>{
    savedScale.value = scale.value;
  })

  

  const image = useImage(img);

  const [chairsList, setChairsList] = useState([]);

  useEffect(()=>{
    const fetchChairs = async () => {
      let result = await callAPI();
      setChairsList(result);
    };

    fetchChairs();
  }, []);

  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <GestureDetector gesture={Gesture.Race(pan, rotate, pinch)}>
          <Animated.View style={[styles.ball, animatedStyles]}>
            <Canvas style={{width, height}}>
              <Image image={image} width={width} height={height} fit="cover"/>
              {chairsList}
            </Canvas>
          </Animated.View>
      </GestureDetector>
    </View>
      
  )
}
export default Map