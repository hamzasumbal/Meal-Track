
import React,{createRef, useContext, useEffect} from 'react'
import { StyleSheet, Text, View, Dimensions, Image, SafeAreaView, Keyboard,TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Button, Input } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import MealsContext from '../contexts/MealsContext'
import { useState } from 'react';
import { NavigationEvents } from 'react-navigation';
import SelectCalender from '../components/SelectCalender';
import Colors from '../constants/Colors'
var months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {

    const [date, setDate] = useState(new Date());
    const [mealName, setMealName] = useState("")
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [selectedDate,setSelectedDate] =useState("")
    const {saveMeal,clearAppData, editMeal} =useContext(MealsContext)
    const [editScreen, setEditScreen] =useState(false)

    const onChange = (event,selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
       let Date = `${selectedDate.getDate()} ${months[selectedDate.getMonth() + 1]} ${selectedDate.getFullYear()}`
     console.log(Date)
     setSelectedDate(Date)
    };
  
    const closeDatePicker= ()=>{

        setShow(false)
    }

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const onSubmit = ()=>{

        if (errorCheck()){
            setMealName("")
            saveMeal(selectedDate,mealName,date)
        }
       
    }

    const saveEdit =()=>{
        
        editMeal(selectedDate, navigation.getParam("Name"), mealName ,()=>{
        setMealName("")
        setSelectedDate("")
        clearParams()
            setEditScreen(false)
            navigation.navigate("Schedule")
        }, 
        ()=>{}
        )
       
    }


    const clearParams = ()=>{
       return navigation.setParams({date : null ,Name : null})
    }


    const errorCheck = ()=>{

        if(mealName !== "" && selectedDate !== "")
        {
            return true
        }
        else {
            alert("Something is missing")
            return false
        }
    }

    const onDidFocus = ()=>{
if( navigation.getParam("Name"))
{
    setEditScreen(true)

        setMealName( navigation.getParam("Name"))
        setSelectedDate(navigation.getParam("date"))
   
}


    }

    return (
        <TouchableWithoutFeedback
        onPress = {Keyboard.dismiss}
        >
            
        <View 
            style={styles.container}>
                 <NavigationEvents
            onDidFocus={onDidFocus}
        />

            <View style={{backgroundColor: Colors.orange, height:HEIGHT*0.4}}>
                <View style={styles.title}>
                    <Text style={{ fontSize: WIDTH * 0.09, fontWeight: "bold", color:'white' }}>Meal Plan</Text>
                </View>
                <Text style={{ fontSize: WIDTH * 0.045, alignSelf:'center', color:'white', opacity:0.6, marginTop:HEIGHT*0.025 }}>Select a day and Meal Time</Text>
            </View>

            <Input
            inputContainerStyle = {styles.input}
            placeholder = {"Type the meal to schedule"}
            value ={mealName}
            onChangeText = {setMealName}
            />
            <View>
         <SelectCalender 
                    onChange={onChange} 
                    showDatepicker={showDatepicker} 
                    show={show}
                    date={date}
                    mode={mode}
                    selectedDate = {selectedDate}
                    closeDatePicker = {closeDatePicker}
                />
            </View>
{ !editScreen?  
            <Button
                buttonStyle={styles.startBtn}
                title='Add to Plan'
                titleStyle={{ color: 'white', fontSize: WIDTH * 0.055, fontWeight: 'bold' }}
                onPress={onSubmit}
            />
         : <Button
         buttonStyle={styles.startBtn}
         title='Save Edit'
         titleStyle={{ color: 'white', fontSize: WIDTH * 0.055, fontWeight: 'bold' }}
         onPress={saveEdit}
     />}
            
        </View>
        </TouchableWithoutFeedback>
    )
}

export default HomeScreen


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: 'white'
    },
    btnCont: {
        position: 'absolute',
    },
    backBtn: {
        backgroundColor: 'white',
        marginTop: HEIGHT * 0.07,
        width: WIDTH * 0.11,
        height: WIDTH * 0.11,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: WIDTH * 0.9,
        marginLeft: WIDTH * 0.04
    },
    title: {
        alignSelf: 'center',
        marginTop: HEIGHT * 0.17,
    },
    startBtn: {
        borderRadius: WIDTH * 0.9,
        backgroundColor: Colors.orange,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: HEIGHT * 0.07,
        width: WIDTH * 0.7,
        marginTop: HEIGHT * 0.08,
        alignSelf: 'center'
    },
    selector:{
        backgroundColor:'white',
        flexDirection:'row',
        alignContent:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,

        elevation: 6,
        alignSelf:"center",
    },
    input : {
        marginHorizontal : WIDTH * 0.02,
        marginVertical : HEIGHT * 0.03

    }
})


HomeScreen.navigationOptions = {
    tabBarIcon : ({tintColor}) => <Ionicons name="md-add-circle-outline" color={tintColor} size={38} style = {{marginTop : 5}}/>,
    title : "Add"
}