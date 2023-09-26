import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Map from "./Map";
import GestureHandler from "./GestureHandler";
import {Gesture, GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";

const App = () => {
    return (
        <GestureHandlerRootView style={{flex:1}}>
            <GestureHandler/>
        </GestureHandlerRootView>
    )
}

export default App