import React, {Component} from "react";
import {StyleSheet, View, Text, Alert, Skia} from "react-native";
import {Circle, Paint, vec, Group} from "@shopify/react-native-skia";

const Chair = ({x, y, occupancy}) => {
  const width = 5;
  const height = 5;

  const strokeWidth = 1;
  const c = vec(width/2, height/2);
  const r = (width-strokeWidth) / 2;

  let center_colour = "green";
  if (occupancy == "occupied") {
    center_colour = "red";
  } else if (occupancy == "bag") {
    center_colour = "yellow";
  }

  return (
    <Group transform={[{translateY: y},{translateX: x}]}>
      <Circle c={c} r={r} x={x} y={y}>
        <Paint color={center_colour} />
        <Paint color="black" style="stroke" strokeWidth={strokeWidth} />
        <Paint color="lightblue" style="stroke" strokeWidth={strokeWidth/2} />
      </Circle>
    </Group>
  )
}
export default Chair