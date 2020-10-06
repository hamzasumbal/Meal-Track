import React, { useState } from 'react'
import {Alert} from 'react-native'
import {AsyncStorage} from 'react-native'
const MealsContext = React.createContext();


export const Provider = ({ children}) => {
//Meals are stored in these states
    const [Monday, setmonday] =useState([])
    const [Tuesday,settuesday] =useState([])
    const [Wednesday,setwednesday] =useState([])
    const [Thursday, setthursday] =useState([])
    const [Friday, setfriday] =useState([])
    const [Saturday, setsaturday] =useState([])
    const [Sunday, setsunday] =useState([])
    const [loaded, setLoaded] = useState(false)




    var months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const mealExistCheck = (Array,mealName)=>{
    
            let found = Array.find(arr => arr.name === mealName)
            if(found.name === mealName)
            {
                Alert.alert(
                    "Meal already Exist",
                    `Try Adding different meal`,
                    [
                      
                      { text: "OK" }
                    ],
                    { cancelable: false }
                  );
                  return;
                }
            
    
    }

    const clearData = ()=>{

      setmonday([])
      settuesday([])
      setwednesday([])
      setthursday([])
      setfriday([])
      setsaturday([])
      setsunday([])

    }

    const saveMeal =  async (mealId,mealName)=>{
  
    try {
         GetArray = await AsyncStorage.getItem(`${mealId}`);
        if (GetArray !== null) {
            let Array = JSON.parse(GetArray)
            console.log(Array)
            try{ 
                mealExistCheck(Array,mealName)
                return;
            }
           catch{}

          Array.push({name :mealName,
            date : mealId  
        })
          await AsyncStorage.setItem(`${mealId}`, JSON.stringify(Array));
          
        }
        else{
            console.log("NO data")
            let Array= []
            Array[0] = 
            {name :mealName,
            date : mealId   
            }
            await AsyncStorage.setItem(`${mealId}`, JSON.stringify(Array));

        }
      } catch (error) {
        Alert.alert(
            "Something Went Wrong",
            `Try Again`,
            [
              
              { text: "OK"/* , onPress: () => console.log("OK Pressed") */ }
            ],
            { cancelable: false }
          );
    }

   

     let meal =  await AsyncStorage.getItem(`${mealId}`);
     console.log(meal)
     Alert.alert(
        "Meal Added",
        `${mealName} added on ${mealId}`,
        [
          
          { text: "OK"/* , onPress: () => console.log("OK Pressed") */ }
        ],
        { cancelable: false }
      );
     

}


const getMeals = async (Monday, callback)=>{

    try{
      setLoaded(false)
      await Promise.all([getMealofDay(Monday, setmonday, 0),
        getMealofDay(Monday, settuesday, 1),
        getMealofDay(Monday, setwednesday, 2),
        getMealofDay(Monday, setthursday, 3),
        getMealofDay(Monday, setfriday, 4),
        getMealofDay(Monday, setsaturday, 5),
        getMealofDay(Monday, setsunday, 6)
      
      ])
      setLoaded(true)

    }
    catch{
        console.log("error")
    }
    if(callback){
        callback()
       
    }
    
     

}


const getMealofDay =async (Monday, setDay, i)=>{
    try{
        let day = new Date(Monday);
        day.setDate(Monday.getDate() + i);
        let mealId = `${day.getDate()} ${months[day.getMonth() + 1]} ${day.getFullYear()}`
        let meal =  await AsyncStorage.getItem(`${mealId}`);
        await setDay(JSON.parse(meal))
    
    }catch{}

}

const clearAppData = async function() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error('Error clearing app data.');
    }
}


const editMeal = async (mealId, Pre_Name, New_Name,onSuccess,onReject)=>{
try{
       
    
   let  GetArray = await AsyncStorage.getItem(`${mealId}`);
    let Array = JSON.parse(GetArray)
    console.log(Array)
 
    try{ 
        mealExistCheck(Array,New_Name)
        return;
    }
   catch{}
    
    
    let index = Array.findIndex(arr => arr.name === Pre_Name)
        Array[index].name = New_Name
        await AsyncStorage.setItem(`${mealId}`, JSON.stringify(Array));
        Alert.alert(
            "Meal Edited",
            "",
            [
              
              { text: "OK"/* , onPress: () => console.log("OK Pressed") */ }
            ],
            { cancelable: false }
          );

}
catch{

    saveMeal(mealId,New_Name)

}

onSuccess()
}



const deleteMeal = async (mealId, name)=>{

    try{
    let  GetArray = await AsyncStorage.getItem(`${mealId}`);
    let Array = JSON.parse(GetArray)
    let index = Array.findIndex(arr => arr.name === name)
    Array.pop(index)
    await AsyncStorage.setItem(`${mealId}`, JSON.stringify(Array));
    }
    catch{
        Alert.alert(
            "Something Went Wrong",
            "",
            [
              
              { text: "OK"/* , onPress: () => console.log("OK Pressed") */ }
            ],
            { cancelable: false }
          );

    }
  

}



    return <MealsContext.Provider value={{state :{Monday, Tuesday,Wednesday, Thursday,Friday,Saturday,Sunday,loaded}, saveMeal , getMeals,clearAppData, editMeal, deleteMeal,clearData}}>

        {children}
    </MealsContext.Provider>


}

export default MealsContext;