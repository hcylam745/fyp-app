import React, {useRef, useEffect, useState, useReducer} from "react";
import {StyleSheet, View, Alert, Skia, ImageBackground, Button} from "react-native";
import {Canvas, Group, useImage, useValue, Image, center, Text, matchFont} from "@shopify/react-native-skia";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import Animated from "react-native-reanimated";

import {base_url} from "./constants"

import FloorPlan from "./FloorPlan";

import axios from "axios"

import Chair from "./Chair";
import Table from "./Table";

const getChairs = (floor) => {
  return new Promise((resolve, reject) =>{
    axios.get(base_url + "/get_chairs")
    .catch(function(error) {
      console.log(error.response);

      reject(null);
    })
    .then((res)=>{
      let out_arr = res.data;
      let result = [];
      for (let i = 0; i < out_arr.length; i++) {
        let x_val = out_arr[i][1];
        let y_val = out_arr[i][2];
        let zone = out_arr[i][4];
        let id = out_arr[i][5];

        if (zone === floor) {
          let tmp = React.createElement(Chair, {x:x_val, y:y_val, occupancy:out_arr[i][0], key:i, id:id});
          result.push(tmp);
        }
      }

      //console.log(result);

      resolve(result);
    })
  })
}

const getTables = (floor) => {
  return new Promise((resolve, reject) =>{
    axios.get(base_url + "/get_tables")
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
        let zone = out_arr[i][3];
        let size_x = out_arr[i][6];
        let size_y = out_arr[i][7];
        if (zone === floor) {
          let tmp = React.createElement(Table, {x:x_val, y:y_val, key:i, type:type, x_size: size_x, y_size: size_y});
          result.push(tmp);
        }
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

const Map = (props) => {
  const width = 1600;
  const height = 850;

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

  let floor = props["floor"];

  useEffect(()=>{
    const fetchAPI = async () => {
      fetchChairs();
    }

    const fetchChairs = async () => {
      let chairs = await getChairs(floor);
      setChairsList(chairs);
    };

    const fetchTables = async () => {
      let tables = await getTables(floor);
      setTablesList(tables);
    };

    fetchAPI();
    fetchTables();

    const interval = setInterval(fetchAPI, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <GestureDetector gesture={Gesture.Simultaneous(pinch, pan, rotate)}>
      <View style={{flex:1}}>
        <Animated.View style={[styles.background, animatedStyles]}>
          <FloorPlan floor={floor}/>
          <Canvas style={{width, height, position:'absolute', flex:1}}>
              {tablesList}
              {chairsList}
          </Canvas>
        </Animated.View>
      </View>
    </GestureDetector>
    
  )
}
export default Map