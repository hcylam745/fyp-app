import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Map from "./Map";
import {Gesture, GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";

const App = () => {
    return (
        <GestureHandlerRootView style={{flex:1}}>
            <Map/>
        </GestureHandlerRootView>
    );
}

export default App;