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

        const getuserDetails = async()=>{
            setUpdatedData({ ...updatedData, userId: 1 });
            console.log(updatedData.userId);
        }

        const handleCreateSubmit = async () => {
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
    
        return(
          <ScrollView>
            <View style={styles.container}>
                <View style={styles.dataContainer}>
                <Text style={{color:"red"}}>(-)Debit (+)Credit</Text>
                <Text style={styles.label}>Description:</Text>
                <TextInput
                    style={styles.textInput}
                    value={updatedData.description}
                    onChangeText={(text) => setUpdatedData({ ...updatedData, description: text })}
                />
                <Text style={styles.label}>Date:</Text>
                <View style={{
                  flex:1,
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
                
                <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.Updatebutton} onPress={handleCreateSubmit}>
                            <Icon name="check" size={20} color="white" />
                            <Text style={styles.buttonText}>Create</Text>
                        </TouchableOpacity>
                    </View>
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
        },
        label: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        textInput: {
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
            borderRadius: 5,
        },
        textInputCalander: {
          width: responsiveWidth(50),
          borderWidth: 1,
          borderColor: 'gray',
          padding: 10,
          borderRadius: 5,
      },
        dataContainer: {
          backgroundColor: '#f0f0f0',
          borderRadius: 10,
          padding: 20,
          width: '80%',
        },
        fieldContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        },
        fieldName: {
          fontWeight: 'bold',
        },
        fieldValue: {
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          },
        Updatebutton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
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
            marginLeft: 5,
          },
};
export default AuthenticatedScreenHOC(CreateTransaction);