import React, {Component} from "react";
import {StyleSheet, View, Text, Alert, Skia} from "react-native";
import {Circle, Paint, vec, Group} from "@shopify/react-native-skia";

const Chair = ({x, y}) => {
  const width = 96;
  const height = 96;

  const strokeWidth = 5;
  const c = vec(width/2, height/2);
  const r = (width-strokeWidth) / 2;

  return (
    <Group transform={[{translateY: y},{translateX: x}]}>
      <Circle c={c} r={r} x={x} y={y}>
        <Paint color="lightblue" />
        <Paint color="black" style="stroke" strokeWidth={strokeWidth} />
        <Paint color="green" style="stroke" strokeWidth={strokeWidth/2} />
      </Circle>
    </Group>
  )
}
export default Chair