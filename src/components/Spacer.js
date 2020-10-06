import React from 'react'
import {View, StyleSheet, Dimensions} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const Spacer =({children})=>{
return<View style = {styles.spacer}>{children}</View>
};

const styles = StyleSheet.create({

    spacer :{
        marginHorizontal: SCREEN_WIDTH * 0.03,
        marginTop : SCREEN_HEIGHT * 0.02
    }
});

export default Spacer;