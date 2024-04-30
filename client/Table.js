import React, {Component} from "react";
import {Group, Box, rect} from "@shopify/react-native-skia";

const Table = ({x, y, type, x_size, y_size}) => {
  const width = x_size;
  const height = y_size;

  // this forcefully pushes the table to the coordinates of the first recording's cctv output.
  // there should probably be a dict for each offset.
  let x_translate = x+1007;
  let y_translate = y+653;

  let result = null;

  if (type === "rectangle") {
    result = (
      <Group transform={[{translateY: y_translate},{translateX: x_translate}]}>
        <Box box={rect(x, y, x+width, y+height)} color="#000000"></Box>
        <Box box={rect(x+0.1, y+0.1, x+width-0.2, y+height-0.2)} color="#f5c991"></Box>
      </Group>
    )
  }


  return result;
}
export default Table