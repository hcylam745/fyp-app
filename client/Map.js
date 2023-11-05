import React, {useRef, useEffect, useState, useReducer} from "react";
import {StyleSheet, View, Text, Alert, Skia} from "react-native";
import {Canvas, Group, useImage, useValue, Image, center} from "@shopify/react-native-skia";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import Animated from "react-native-reanimated";

import axios from "axios"

import Chair from "./Chair";
import Table from "./Table";

const getChairs = () => {
  return new Promise((resolve, reject) =>{
    axios.get("https://fyp-app.onrender.com/get_chairs")
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

const getTables = () => {
  return new Promise((resolve, reject) =>{
    axios.get("https://fyp-app.onrender.com/get_tables")
    .catch(function(error) {
      console.log(error.response);

      reject(null);
    })
    .then((res)=>{
      let out_arr = res.data;
      let result = [];
      for (let i = 0; i < res.data.length; i++) {
        let x_val = out_arr[i][0];
        let y_val = out_arr[i][1];
        let type = out_arr[i][2];
        let size_x = out_arr[i][6];
        let size_y = out_arr[i][7];
        let tmp = React.createElement(Table, {x:x_val, y:y_val, key:i, type:type, x_size: size_x, y_size: size_y});
        result.push(tmp);
      }

      //console.log(result);

      resolve(result);
    })
  })
}

const styles = StyleSheet.create({
    background: {
        width: 100,
        height: 100
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
        { scale: scale.value },
        { translateX: -(width/2) },
        { translateY: -(height/2) }
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
    scale.value = savedScale.value * e.scale;
  })
  .onEnd(()=>{
    savedScale.value = scale.value;
  })

  const [chairsList, setChairsList] = useState([]);

  const [tablesList, setTablesList] = useState([]);

  useEffect(()=>{
    const fetchAPI = async () => {
      fetchChairs();
      fetchTables();
    }

    const fetchChairs = async () => {
      let chairs = await getChairs();
      setChairsList(chairs);
    };

    const fetchTables = async () => {
      let tables = await getTables();
      setTablesList(tables);
    };

    fetchAPI();

    const interval = setInterval(fetchAPI, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <GestureDetector gesture={Gesture.Simultaneous(pinch, pan, rotate)}>
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
          <Animated.View style={[styles.background, animatedStyles]}>
            <Canvas style={{width, height}}>
              {tablesList}
              {chairsList}
            </Canvas>
          </Animated.View>
      </View>
    </GestureDetector>
  )
}
export default Map