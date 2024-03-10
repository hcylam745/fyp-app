import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {StyleSheet, Button, Text, View} from 'react-native';

import {base_url} from "./constants"

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
    },
    preview: {
        display:'flex',
        flexDirection:'row',
        padding:10
    },
    column: {
        width:'33%',
        height:'100%',
        display:'flex',
        alignItems:'center'
    },
    subtitle: {
        color:'white',
        fontSize:14
    },
    number: {
        color:'white',
        fontSize:48
    }
})

const getChairCount = () => {
    return new Promise ((resolve, reject) => {
        axios.get(base_url + "/get_chairs")
        .catch(function(error) {
            console.log(error.response);

            reject(null);
        })
        .then((res)=>{ 
            let out_arr = res.data;
            let chair_counts = {
                "1": {
                    "occupied":0,
                    "free":0,
                    "bag":0
                },
                "0": {
                    "occupied":0,
                    "free":0,
                    "bag":0
                },
                "-1": {
                    "occupied":0,
                    "free":0,
                    "bag":0
                },
                "-3": {
                    "occupied":0,
                    "free":0,
                    "bag":0
                },
                "-4": {
                    "occupied":0,
                    "free":0,
                    "bag":0
                }
            };

            for (let i = 0; i < out_arr.length; i++) {
                let floor = out_arr[i][4];
                let occupancy = out_arr[i][0];
                chair_counts[String(floor)][occupancy] += 1; 
            }

            resolve(chair_counts);
        })
    })
    
}

const Menu = (props) => {
    const [chairCounts, setChairCounts] = useState({});

    useEffect(()=>{
        const getCounts = async () => {
            let chair_counts = await getChairCount();

            let list_of_displays = {}

            for (const [key, value] of Object.entries(chair_counts)) {
                let current_floor_arr = {};

                let tmp = [];
                tmp.push(React.createElement(Text,{style:[styles.subtitle], key:1}, "Bag: "));
                tmp.push(React.createElement(Text,{style:[styles.number], key:2}, value["bag"]));
                current_floor_arr["1"] = tmp;

                tmp = [];
                tmp.push(React.createElement(Text,{style:[styles.subtitle], key:3}, "Free: "));
                tmp.push(React.createElement(Text,{style:[styles.number], key:4}, value["free"]));
                current_floor_arr["2"] = tmp;

                tmp = [];
                tmp.push(React.createElement(Text,{style:[styles.subtitle], key:5}, "Occupied: "));
                tmp.push(React.createElement(Text,{style:[styles.number], key:6}, value["occupied"]));
                current_floor_arr["3"] = tmp;

                list_of_displays[key] = current_floor_arr;
            }
            setChairCounts(list_of_displays);
        }
        
        const interval = setInterval(getCounts, 10000);

        return () => clearInterval(interval);
    })

    return (
        <View style={[styles.background]}>
            <View style={[styles.section]}>
                <Button title="1F" style={[styles.button]} onPress={() => {props.changeFloor(1)}}/>
                <View style={[styles.preview]}>
                    <View style={[styles.column]}>
                        {(chairCounts["1"] !== undefined) && 
                        chairCounts["1"]["1"]}
                    </View>
                    <View style={[styles.column]}>
                        {(chairCounts["1"] !== undefined) &&
                        chairCounts["1"]["2"]}
                    </View>
                    <View style={[styles.column]}>
                        {(chairCounts["1"] !== undefined) &&
                        chairCounts["1"]["3"]}
                    </View>
                </View>
            </View>
            <View style={[styles.section]}>
                <Button title="GF" style={[styles.button]} onPress={() => {props.changeFloor(0)}}/>
                <View style={[styles.preview]}>
                    <View style={[styles.column]}>
                        {(chairCounts["0"] !== undefined) && 
                        chairCounts["0"]["1"]}
                    </View>
                    <View style={[styles.column]}>
                        {(chairCounts["0"] !== undefined) &&
                        chairCounts["0"]["2"]}
                    </View>
                    <View style={[styles.column]}>
                        {(chairCounts["0"] !== undefined) &&
                        chairCounts["0"]["3"]}
                    </View>
                </View>
            </View>
            <View style={[styles.section]}>
                <Button title="LG1" style={[styles.button]} onPress={() => {props.changeFloor(-1)}}/>
                <View style={[styles.preview]}>
                    <View style={[styles.column]}>
                        {(chairCounts["-1"] !== undefined) && 
                        chairCounts["-1"]["1"]}
                    </View>
                    <View style={[styles.column]}>
                        {(chairCounts["-1"] !== undefined) &&
                        chairCounts["-1"]["2"]}
                    </View>
                    <View style={[styles.column]}>
                        {(chairCounts["-1"] !== undefined) &&
                        chairCounts["-1"]["3"]}
                    </View>
                </View>
            </View>
            <View style={[styles.section]}>
                <Button title="LG3" style={[styles.button]} onPress={() => {props.changeFloor(-3)}}/>
                <View style={[styles.preview]}>
                    <View style={[styles.column]}>
                        {(chairCounts["-3"] !== undefined) && 
                        chairCounts["-3"]["1"]}
                    </View>
                    <View style={[styles.column]}>
                        {(chairCounts["-3"] !== undefined) &&
                        chairCounts["-3"]["2"]}
                    </View>
                    <View style={[styles.column]}>
                        {(chairCounts["-3"] !== undefined) &&
                        chairCounts["-3"]["3"]}
                    </View>
                </View>
            </View>
            <View style={[styles.section]}>
                <Button title="LG4" style={[styles.button]} onPress={() => {props.changeFloor(-4)}}/>
                <View style={[styles.preview]}>
                    <View style={[styles.column]}>
                        {(chairCounts["-4"] !== undefined) && 
                        chairCounts["-4"]["1"]}
                    </View>
                    <View style={[styles.column]}>
                        {(chairCounts["-4"] !== undefined) &&
                        chairCounts["-4"]["2"]}
                    </View>
                    <View style={[styles.column]}>
                        {(chairCounts["-4"] !== undefined) &&
                        chairCounts["-4"]["3"]}
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Menu;