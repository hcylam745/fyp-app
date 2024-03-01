import React, {Component, useState} from 'react';
import {Text, View, Button} from 'react-native';
import Map from "./Map";
import {Gesture, GestureDetector, GestureHandlerRootView, RectButton} from "react-native-gesture-handler";
import Menu from "./Menu";

const App = () => {
    const [floor, setFloor] = useState(-1);
    const [menu, setMenu] = useState(0); // menu == 0 means in menu, menu == 1 means not in menu

    const changeFloor = (floor) => {
        setFloor(floor);
        setMenu(1);
    }

    const onBack = () => {
        setFloor(-1);
        setMenu(0);
    }

    switch(menu) {
        case 0:
            return (
                <Menu changeFloor={changeFloor}/>
            );
        case 1:
            return (
                <View style={{width:"100%", height:"100%", display:"flex", flexDirection:"column"}}>
                    <GestureHandlerRootView style={{width:"100%", height:"100%"}}>
                        <RectButton onPress={onBack} style={{zIndex:1}}>
                            <View accessible accessibilityRole="button">
                                <Text>Back to Menu</Text>
                            </View>
                        </RectButton>
                        <Map floor={floor}/>
                    </GestureHandlerRootView>
                </View>
            );
    }
}

export default App;