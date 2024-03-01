import React from 'react';
import {StyleSheet, Button, Text, View} from 'react-native';

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: 'darkblue'
    },
    section: {
        width:'100%',
        height: '20%',
        backgroundColor: 'deepskyblue',
        color: 'white'
    },
    button: {
        width:'100%',
        height:'100%'
    }
})

const Menu = (props) => {
    return (
        <View style={[styles.background]}>
            <View style={[styles.section]}>
                <Button title="1F" style={[styles.button]} onPress={() => {props.changeFloor(1)}}/>
            </View>
            <View style={[styles.section]}>
                <Button title="GF" style={[styles.button]} onPress={() => {props.changeFloor(0)}}/>
            </View>
            <View style={[styles.section]}>
                <Button title="LG1" style={[styles.button]} onPress={() => {props.changeFloor(-1)}}/>
            </View>
            <View style={[styles.section]}>
                <Button title="LG3" style={[styles.button]} onPress={() => {props.changeFloor(-3)}}/>
            </View>
            <View style={[styles.section]}>
                <Button title="LG4" style={[styles.button]} onPress={() => {props.changeFloor(-4)}}/>
            </View>
        </View>
    )
}

export default Menu;