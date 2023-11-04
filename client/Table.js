import React, {Component} from "react";
import {Group, Box, rect} from "@shopify/react-native-skia";

const Table = ({x, y, type, x_size, y_size}) => {
  const width = x_size;
  const height = y_size;

  let result = null;

  if (type === "rectangle") {
    result = (
      <Group transform={[{translateY: y},{translateX: x}]}>
        <Box box={rect(x, y, x+width, y+height)} color="#000000"></Box>
        <Box box={rect(x+5, y+5, x+width-10, y+height-10)} color="#f5c991"></Box>
      </Group>
    )
  }


  return result;
}
export default Table