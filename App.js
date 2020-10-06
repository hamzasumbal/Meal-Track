import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './src/screens/HomeScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import { Dimensions } from 'react-native';
import Colors from './src/constants/Colors'
import { Provider as MealsProvider } from './src/contexts/MealsContext'
const HEIGHT = Dimensions.get('window').height;


const navigator =createBottomTabNavigator(
  {

  Home : HomeScreen,
  Schedule: ScheduleScreen

},

{
initialRouteName: 'Home',
tabBarOptions :{
labelStyle : {
fontSize  : 14,
fontWeight : "bold",
marginBottom : 15
},
style  :{
height  : HEIGHT* 0.12
},
activeTintColor : Colors.orange,
inactiveTintColor : Colors.grey
}
}




);


const App = createAppContainer(navigator)


export default ()=>{


 return <MealsProvider>

   <App/>
 </MealsProvider> 
}