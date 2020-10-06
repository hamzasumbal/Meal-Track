import React,{useContext, useState, useEffec,useRef} from 'react'
import {View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Platform, Animated} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons';
import OptionsModal from '../components/OptionsModal'
import MealsContext from '../contexts/MealsContext'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const MealCards =({item, navigation,onChange})=>{
const [modalVisible, setModalVisible] = useState(false);
const [info, setInfo] = useState({})
const {deleteMeal} =useContext(MealsContext)

const onEdit = (item)=>{
setModalVisible(false)
navigation.navigate("Home",{date : item.date,Name : item.name})

}

const onDelete =async (item)=>{
await deleteMeal(item.date, item.name)
onChange()
setModalVisible(false)
}


const openModal =(item)=>{

    setModalVisible(true)
    setInfo(item)
}




return <View>

<FlatList
horizontal
data = {item}
keyExtractor = {(item)=>item.name}
renderItem = {({item})=>{
return <>
<View
style={[
  styles.square,
 Platform.OS === "ios"? {
    
shadowColor: "#000",
shadowOffset: {
width: 0,
height: 1,
},
shadowOpacity: 0.25,
shadowRadius: 4,
elevation: 6,

}
: null]}
>
    <TouchableOpacity
    onPress = {()=>{openModal(item)}}
    >
<SimpleLineIcons name="options" size={24} color="white" style = {styles.icon}/>
</TouchableOpacity>
<Text style = {styles.text}>{item.name}</Text>

</View>
</>

}}



/>

<OptionsModal
modalVisible = {modalVisible}
onClose ={()=>setModalVisible(false)}
onEdit ={()=>{onEdit(info)}}
onDelete ={()=>{onDelete(info)}}
/>



</View>
}


const styles = StyleSheet.create({
container :{

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
},
square: {
    marginHorizontal : 10,
    marginVertical : 10,
    backgroundColor: "white",
    borderRadius: 20,
    height: 100,
    shadowColor: "black",
    width: 180,
    backgroundColor : "#FD5E53",

  },
  text :{
fontSize : 20,
marginLeft : 10,
/* color : "grey" */
color : "white"

  },
  icon : {
      alignSelf : "flex-end",
      marginRight : 20,
      marginTop : 10
  }


})


export default MealCards