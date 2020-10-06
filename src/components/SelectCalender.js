import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Platform ,Modal,TouchableOpacity,TouchableHighlight} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
/* import Colors from '../constants/colors' */
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../constants/Colors'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const SelectCalender = (props) => {
    const showDatepicker = props.showDatepicker
    const onChange = props.onChange
    const show = props.show
    const date = props.date
    const mode = props.mode
    const selectedDate = props.selectedDate
    const closeDatePicker = props.closeDatePicker

    

    /* let Date = `${selectedDate.getDate()}/${selectedDate.getMonth()}/${selectedDate.getYear()}`
    console.log(Date) */

    return (
        <View>
            <View
                style={[styles.selector, {height: HEIGHT * 0.12, borderRadius: WIDTH * 0.05, width: WIDTH * 0.85, alignItems: 'center' }]}
                on>
                <TouchableOpacity onPress={showDatepicker}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ justifyContent: 'center', marginLeft: WIDTH * 0.1 }}>
                            <AntDesign name="calendar" size={WIDTH * 0.1} color={"grey"} />
                        </View>
                        <View style={{ height: HEIGHT * 0.06, borderWidth: 0.5, borderColor: Colors.grey, alignSelf: 'center', marginHorizontal: WIDTH * 0.06 }} />
                        <View style={{ justifyContent: 'center' }}>
                          { !selectedDate? 
                          <View>
                           <Text style={{ fontSize: WIDTH * 0.05, fontWeight: "bold", color: '#575757' }}>Select</Text>
                            <Text style={{ fontSize: WIDTH * 0.04, fontWeight: "100", color: '#ADADAD' }}>Day to schedule </Text>
                            </View>:
      <Text style={{ fontSize: WIDTH * 0.05, fontWeight: "bold", color: '#575757' }}>{selectedDate}</Text> }
                            </View>

                    </View>
                    {Platform.OS !== "ios"? 
                    <View>
                    {show && (
                        <View style={{backgroundColor: Colors.orange}}>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            style={{backgroundColor:"#FD5E53"}}
                            is24Hour={true}
                            display="calendar"
                            onChange={onChange}
                        />
                        </View> 
                    )}
                    </View>
                    : <View style = {styles.iOScontainer}>
                        
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            style={styles.iOSdatePicker}
                            is24Hour={true}
                            display="calendar"
                            onChange={onChange}
                            de
                        />

            <TouchableHighlight
              style={{ ...styles.openButton }}
              onPress={() => {
                 onChange(null,date) 
                closeDatePicker()
              }}
            >
              <Text style={styles.textStyle}>Set Date</Text>
            </TouchableHighlight>
           
          </View>
        </View>
      </Modal> 
                        
                        </View>}
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default SelectCalender

const styles = StyleSheet.create({
    selector: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6,
        alignSelf: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50
      },
      modalView: {
         height : HEIGHT *0.6,
         width :WIDTH * 0.9, 
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
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
          marginTop : 30,
        backgroundColor: Colors.orange,
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize : 20,
        paddingHorizontal : 20
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },

      iOSdatePicker : {
          height : HEIGHT * 0.4,
          width : WIDTH * 0.8
      },
      iOScontainer :{
          /* borderWidth : 2,
        backgroundColor : "white",
        width : 400,
        height : 400 */
      }
})
