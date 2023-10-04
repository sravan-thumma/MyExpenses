import React, { useEffect,useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { Alert, StyleSheet, Text,TextInput, View ,Button,BackHandler, ActivityIndicator,TouchableWithoutFeedback,TouchableOpacity,ScrollView } from 'react-native';
import { Image } from "react-native";
import { API_URL_TRANSACTIONS,API_HEADERS, axiosConfig,Post_Transaction } from '../apiconfig';
import AuthenticatedScreenHOC from '../AuthGuard/AuthenticatedScreenHOC';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

function CreateTransaction (){
        const route=useRoute();
        var  userid  = route.params.userid;
        const [userId,setUserId] = useState(userid);
        const [transaction, setTransaction] = useState(Post_Transaction(userid));
        const navigation=useNavigation();
        const [updatedData, setUpdatedData] = useState(transaction);
        const [selectedStatus, setSelectedStatus] = useState(updatedData.status);
        const initialDate = new Date();
        const minDate=new Date(initialDate);
        minDate.setDate(initialDate.getDate() - 10);
        const [date, setDate] = useState(initialDate);
        const [displaymode, setMode] = useState('date');
        const [isDisplayDate, setShow] = useState(false);
        const [TDate, setTDate] = useState(initialDate.toISOString().split('T')[0]);
        const [isButtonDisabled, setButtonDisabled] = useState(false);

        const getuserDetails = async()=>{
            setUpdatedData({ ...updatedData, userId: 1 });
            console.log(updatedData.userId);
        }

        const handleCreateSubmit = async () => {
          setButtonDisabled(true);
          const options = {
            method: 'POST',
            url: API_URL_TRANSACTIONS,
            headers: API_HEADERS,
            data: updatedData
          };
          console.log(updatedData);
          await axios.request(options).then(function (response) {
            const data = response.data;
            if (data){
              setTransaction(data);
              Alert.alert("Success","Create Transaction Successful");
              navigation.navigate("Home",{ refresh: true });
          }else{
              console.log("Data:"+data);
              Alert.alert("Error", data.message);
          }
          }).catch(function (error) {
            if (error.response) {
              console.log(error);
            Alert.alert('Error', 'Server responded with an error.');
            } else if (error.request) {
            console.error('Request:', error.request);
            Alert.alert('Error', 'No response received from the server.');
            } else {
            console.error('Error:', error.message);
            Alert.alert('Error', 'An error occurred while making the request.');
            }
          });
        }
    
          const showMode = (currentMode) => {
            setShow(true);
            setMode(currentMode);
          };
        
          const displayDatePicker = () => {
            showMode('date');
          };
        
          const clearDate = () => {
            setTDate('');
            setDate(initialDate);
            setUpdatedData({ ...updatedData, date: null })
          };
    
          const changeSelectedDate = (event, selectedDate) => {
            setShow(false);
            if (selectedDate !== undefined) {
              const currentDate = selectedDate || date;
              const formattedDate = currentDate.toISOString().split('T')[0]; // Format the date as "YYYY-MM-DD"
              setDate(currentDate);
              setTDate(formattedDate.toString());
              console.log(formattedDate.toString());
              setUpdatedData({ ...updatedData, date: formattedDate.toString() })
            }
          };
    
/*          <Image 
                  source={require("../../assets/781902.png")} // Replace with the actual image path
                  style={{ width: responsiveWidth(20), height: responsiveWidth(20), padding:15,marginLeft:responsiveWidth(23)}}
            />  */

        return(
          <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={styles.container}>
                <View style={styles.dataContainer}>
                <Image 
                  source={require("../../assets/781902.png")} // Replace with the actual image path
                  style={{ width: responsiveWidth(20), height: responsiveWidth(20), padding:5,marginLeft:responsiveWidth(23)}}
                />
                <Text style={{color:"red",fontWeight:'bold',padding:responsiveWidth(1)}}>(-)Debit <Text style={{color:"green"}}>(+)Credit</Text></Text>
                <Text style={styles.label}>Description:</Text>
                <TextInput
                    style={styles.textInput}
                    value={updatedData.description}
                    onChangeText={(text) => setUpdatedData({ ...updatedData, description: text })}
                />
                <Text style={styles.label}>Date:</Text>
                <View style={{
                  //flex:1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}>
                  <TextInput
                        style={styles.textInputCalander}
                        value={TDate.toString()}
                        placeholder="Select Date"
                        editable={false}
                    />
            
                    <TouchableWithoutFeedback onPress={displayDatePicker}>
                          <Icon name="calendar" size={responsiveWidth(7)} color="#333" style={{paddingTop: responsiveWidth(3), paddingLeft: responsiveWidth(2)}}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={clearDate}>
                          <Icon name="remove" size={responsiveWidth(7)} color="#333" style={{paddingTop: responsiveWidth(3), paddingLeft: responsiveWidth(2)}}/>
                    </TouchableWithoutFeedback>
                </View>
                  {isDisplayDate && (
                    <DateTimePicker
                      value={date}
                      mode={displaymode}
                      is24Hour={true}
                      display="default"
                      onChange={changeSelectedDate}
                      minimumDate={minDate}
                    />
                  )}
    
                <Text style={styles.label}>Debit Card:</Text>
                <TextInput
                    style={styles.textInput}
                    value={updatedData.debitCard}
                    onChangeText={(text) => setUpdatedData({ ...updatedData, debitCard: text })}
                />
                <Text style={styles.label}>Credit Card:</Text>
                <TextInput
                    style={styles.textInput}
                    value={updatedData.creditCard}
                    onChangeText={(text) => setUpdatedData({ ...updatedData, creditCard: text })}
                />
                <Text style={styles.label}>Borrowed From Me:</Text>
                <TextInput
                    style={styles.textInput}
                    value={updatedData.borrowedFromMe}
                    onChangeText={(text) => setUpdatedData({ ...updatedData, borrowedFromMe: text })}
                />
                <Text style={styles.label}>Borrowed By Me:</Text>
                <TextInput
                    style={styles.textInput}
                    value={updatedData.borrowedByMe}
                    onChangeText={(text) => setUpdatedData({ ...updatedData, borrowedByMe: text })}
                />
                <Text style={styles.label}>Status:</Text>
                <Picker
                  selectedValue={selectedStatus}
                  onValueChange={(itemValue, itemIndex) =>{
                    if(itemValue==='clear'){
                      setUpdatedData({ ...updatedData, status: null })
                    }else{
                      setUpdatedData({ ...updatedData, status: itemValue })
                    }
                    setSelectedStatus(itemValue);
                    }
                  }
                  mode='dropdown'
                  dropdownIconColor='blue'
                  > 
                    <Picker.Item label="Clear" value="clear" />
                    <Picker.Item label="Completed" value="Completed" />
                    <Picker.Item label="Pending" value="Pending" />
                </Picker>
                
                
                        <TouchableOpacity style={styles.Updatebutton} onPress={handleCreateSubmit} disabled={isButtonDisabled}>
                            <Icon name="check" size={responsiveWidth(6)} color="white" />
                            <Text style={styles.buttonText}>Create</Text>
                        </TouchableOpacity>
                </View>
    
            </View>
          </ScrollView>
        );
    }
    const styles = {
        container: {
          flex: 1,
          backgroundColor:'gray',
          justifyContent: 'center',
          alignItems: 'center',
          height:responsiveHeight(93),
          width: responsiveWidth(100),
        },
        label: {
          fontSize: responsiveFontSize(2),
            fontWeight: 'bold',
        },
        textInput: {
          borderWidth: responsiveWidth(0.3),
          borderColor: 'gray',
          padding: responsiveWidth(2),
          borderRadius: responsiveWidth(3),
        },
        textInputCalander: {
          width: responsiveWidth(50),
          borderWidth: responsiveWidth(0.3),
          borderColor: 'gray',
          padding: responsiveWidth(3),
          borderRadius: responsiveWidth(3),
      },
        dataContainer: {
          backgroundColor: '#f0f0f0',
          borderRadius: responsiveWidth(5),
          padding: responsiveHeight(3),
          height: responsiveHeight(87),
          width: responsiveHeight(40),
          marginTop:responsiveHeight(10),
          marginBottom:responsiveHeight(15)
        },
        fieldContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: responsiveHeight(10),
        },
        fieldName: {
          fontWeight: 'bold',
        },
        fieldValue: {
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: responsiveWidth(10),
          },
          Updatebutton: {
            marginLeft: responsiveWidth(20),
              width:responsiveWidth(27),
              height: responsiveWidth(12),
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'blue',
              marginTop:responsiveWidth(1),
              padding: responsiveWidth(3),
              borderRadius: responsiveWidth(2),
          },
        Deletebutton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'red',
            padding: 10,
            borderRadius: 5,
          },
          buttonText: {
            color: 'white',
            marginLeft: responsiveWidth(2),
          },
};
export default AuthenticatedScreenHOC(CreateTransaction);