import React, {useEffect, useState} from "react";
import {View} from "react-native";

import Firstfloor from "./floorplans/1F";
import Groundfloor from "./floorplans/GF";
import Lowergroundfirst from "./floorplans/LG1";
import Lowergroundthird from "./floorplans/LG3";
import Lowergroundfourth from "./floorplans/LG4";

const FloorPlan = (props) => {
    switch(props["floor"]) {
        case 1:
            return <Firstfloor/>;
        case 0:
            return <Groundfloor/>;
        case -1:
            return <Lowergroundfirst/>;
        case -3:
            return <Lowergroundthird/>;
        case -4:
            return <Lowergroundfourth/>;
        default:
            return (
                null
            )
    }
}

export default FloorPlan;