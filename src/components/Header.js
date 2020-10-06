import React from 'react'
import {View, StyleSheet, Dimensions} from 'react-native'
import {Text } from 'react-native-elements'
import Spacer from '../components/Spacer'
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export default ({title})=>{



return <View style = {{
    marginTop : HEIGHT * 0.03
}}>
    <Spacer>
<Text style = {{
fontSize : 40,
fontWeight : "bold"

}}>{title}</Text>
</Spacer>
</View>

}

