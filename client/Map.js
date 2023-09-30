import React, {Component} from "react";
import {StyleSheet, View, Text, Alert, Skia} from "react-native";
import {Canvas, Circle, Group, useImage, useValue, Image, center} from "@shopify/react-native-skia";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import Animated from "react-native-reanimated";

const img = require("./imagecropped.jpg")

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

  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <GestureDetector gesture={Gesture.Race(pan, rotate, pinch)}>
          <Animated.View style={[styles.ball, animatedStyles]}>
            <Canvas style={{width, height}}>
              <Group>
                <Image image={image} width={width} height={height} fit="cover"/>
              </Group>
            </Canvas>
          </Animated.View>
      </GestureDetector>
    </View>
      
  )
}
export default Map