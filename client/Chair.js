import React, {Component} from "react";
import {StyleSheet, View, Alert, Skia} from "react-native";
import {Circle, Paint, vec, Group, Text, listFontFamilies, matchFont, Canvas} from "@shopify/react-native-skia";

const Chair = ({x, y, occupancy, id}) => {
  const width = 5;
  const height = 5;

  const strokeWidth = 1;
  const c = vec(width/2, height/2);
  const r = (width-strokeWidth) / 2;

  let center_colour = "green";
  if (occupancy == "occupied") {
    center_colour = "red";
  } else if (occupancy == "belonging") {
    center_colour = "yellow";
  }

  let font = matchFont({
    fontFamily:"sans-serif",
    fontSize:5
  })

  return (
    <Group transform={[{translateY: y},{translateX: x}]}>
      <Text x={0} y={0} text={String(id-1)} font={font}/>
      <Circle c={c} r={r} x={x} y={y}>
        <Paint color={center_colour} />
        <Paint color="black" style="stroke" strokeWidth={strokeWidth} />
        <Paint color="lightblue" style="stroke" strokeWidth={strokeWidth/2} />
        </Circle>
    </Group>
  )
}
export default Chair;