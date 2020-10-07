import React, { useState, useEffect, useContext,useRef } from 'react'
import { View, StyleSheet, Text, SafeAreaView, StatusBar,Animated, AsyncStorage, Platform, ScrollView , RefreshControl} from 'react-native'
import Header from '../components/Header'
import { MaterialIcons } from '@expo/vector-icons';
import Spacer from '../components/Spacer'
import WeekView from '../components/WeekView'
import Colors from '../constants/Colors'
import MealCards from '../components/MealCards'
import MealsContext from '../contexts/MealsContext'
import { NavigationEvents } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';

let curr;
let Monday;
let Sunday;
let months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" , "Sunday"]
const ScheduleScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [startDate, setStartDate] = useState("")
    const [lastDate, setLastDate] = useState("")
    const { state, getMeals ,clearData} = useContext(MealsContext)
    const [loaded, setLoaded] = useState(false)
    const fade = useRef(new Animated.Value(1)).current

    const setCurrentWeek = async () => {
        curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6
        Monday = new Date(curr.setDate(first))
        Sunday = new Date(curr.setDate(last))
        curr = Monday;

        getMeals(Monday, () => { setLoaded(true) })

        setStartDate(`${Monday.getDate()} ${months[Monday.getMonth() + 1]} ${Monday.getFullYear()}`)
        setLastDate(`${Sunday.getDate()} ${months[Sunday.getMonth() + 1]} ${Sunday.getFullYear()}`)
    }

    const leftShiftWeek = () => {

        
        fadein()
        curr.setDate(curr.getDate() - (curr.getDay() + 6) % 7);
        curr.setDate(curr.getDate() - 7);

        // create new date of day before
        let Monday = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate());
        let Sunday = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate() + 6);

        getMeals(Monday, () => { setLoaded(true) })


        setStartDate(`${Monday.getDate()} ${months[Monday.getMonth() + 1]} ${Monday.getFullYear()}`)
        setLastDate(`${Sunday.getDate()} ${months[Sunday.getMonth() + 1]} ${Sunday.getFullYear()}`)

    }


    const rightShiftWeek = () => {
        fadein()
        
        curr.setDate(curr.getDate() + (1 - curr.getDay() - 7) % 7 + 7);
        let Monday = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate());
        let Sunday = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate() + 6);

        getMeals(Monday, () => { setLoaded(true) })
        setStartDate(`${Monday.getDate()} ${months[Monday.getMonth() + 1]} ${Monday.getFullYear()}`)
        setLastDate(`${Sunday.getDate()} ${months[Sunday.getMonth() + 1]} ${Sunday.getFullYear()}`)
       

    }

    const onRefresh =()=>{
        setRefreshing(true)
        getMeals(Monday, () => { setLoaded(true)
        setRefreshing(false)
        })
    }

    const onChange = ()=>{
        getMeals(Monday)
    }




    const fadein = (callback) => {

            fade.setValue(0)
        Animated.timing(
            fade,
            {
                toValue: 0,
                duration: 50,
                useNativeDriver: true,
            },

        ).start(()=>{
            fadeout()
        })
    
    

    }

    const fadeout = () => {
        Animated.timing(
            fade,
            {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            },

        ).start();
    }

    useEffect(() => {
        setLoaded(false)
        setCurrentWeek()
    }, [])





    

    return <SafeAreaView style = {{flex: 1}}>
        <NavigationEvents
            onDidFocus={() => {
                getMeals(Monday,() => { setLoaded(true)})
                 }}
        />

        <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "default"} />
        
        
            <Header
                title={"Planner"}
            />
  
            <Spacer />
            <Spacer>
                <WeekView
                    startDate={startDate}
                    lastDate={lastDate}
                    onLeft={leftShiftWeek}
                    onRight={rightShiftWeek}
                />
            </Spacer>
            <Spacer/>
            <ScrollView 
        refreshControl = {<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {loaded ? <View>
                <FlatList
                data = {days}
                keyExtractor = {(item)=>item}
                renderItem = {({item})=>{
                    return<>
                    <Text style={styles.day}>{item}</Text>
                    <Animated.View style ={[{opacity : fade}]}>
                    <MealCards
                        item={state[item]}
                        navigation={navigation}
                        onChange ={onChange}
                    />
                    </Animated.View>
                 
                    <View style={styles.divider} />
               </>
                }}
                />
             
            </View>
                : null}
        </ScrollView>
    </SafeAreaView>
}



const styles = StyleSheet.create({


    day: {

        fontSize: 25,
        fontWeight: "bold",
        color: "grey",
        marginLeft : 10
    },
    divider: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: "grey",
        marginHorizontal : 10,
        marginBottom : 15

    }
})

ScheduleScreen.navigationOptions = {
    tabBarIcon: ({ tintColor }) => <MaterialIcons name="schedule" color={tintColor} size={38} style={{ marginTop: 5 }} />
}

export default ScheduleScreen;