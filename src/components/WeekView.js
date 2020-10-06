import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors'
const WeekView = ({startDate, lastDate,onLeft,onRight}) => {
  

    return <View style={styles.container}>
        <TouchableOpacity
        onPress = {onLeft}
        >
        <AntDesign name="left" size={32} color= {Colors.grey} />
        </TouchableOpacity>
        <Text style={styles.text}>{`${startDate.slice(0,-4)}  -  ${lastDate.slice(0,-4)}`}</Text>
        <TouchableOpacity
        onPress = {onRight}
        >
        <AntDesign name="right" size={32} color={Colors.grey} />
        </TouchableOpacity>
    </View>

}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    text: {
        fontSize: 20,
        fontWeight: "bold"
    }

})

export default WeekView;