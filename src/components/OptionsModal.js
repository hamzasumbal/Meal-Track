import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Colors from '../constants/Colors'

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const OptionsModal = ({modalVisible,onClose,onEdit,onDelete})=>{






return <Modal
animationType="slide"
transparent={true}
visible={modalVisible}
onRequestClose={() => {
  Alert.alert("Modal has been closed.");
}}
>
<View style={styles.centeredView}>
  <View style={styles.modalView}>
    <Text style={styles.modalText}>Options</Text>

    <TouchableOpacity
    onPress = {onEdit}
    >
<View style = {styles.rowContainer}>
<AntDesign name="edit" size={35} color="grey" />
<Text style = {styles.text}>Edit Meal</Text>

</View>
</TouchableOpacity>
<TouchableOpacity
onPress = {onDelete}
>
<View style = {styles.rowContainer}>
<AntDesign name="delete" size={35} color="red" />
<Text style = {styles.text}>Delete Meal</Text>
</View>
</TouchableOpacity>




    <TouchableOpacity
      onPress={onClose}
    >
      <Text style={styles.textStyle}>Cancel</Text>
    </TouchableOpacity>
  </View>
</View>
</Modal>

}



const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    modalView: {
    borderWidth : 1,
    width : WIDTH ,
    height : HEIGHT * 0.35,
      backgroundColor: "white",
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      paddingTop : 20,
      paddingBottom : 35,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
        alignSelf : "center",
        fontSize : 20,
      fontWeight: "bold",
      textAlign: "center",
      marginVertical : 20
    },
    modalText: {
        fontSize : 23,
        fontWeight : "bold",
      marginBottom: 20,
      textAlign: "center"
    },
    rowContainer :{
        flexDirection : "row",
        alignItems : "center",
        marginLeft : 20,
        marginVertical : 7
    },
    text : {
        fontSize : 18,
        marginHorizontal : WIDTH * 0.1,
        color : "#838383"

    }
  });

  
  export default OptionsModal