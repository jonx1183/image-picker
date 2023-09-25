import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, FlatList, Button, View, TextInput, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from './Firebase';
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage'

export default function App() {
  const [text, setText] = useState('')
  const [notes, setNotes] = useState([])
  const [editObj, setEditObj] = useState(null)
  const [imagePath, setImagePath] = useState(null)
  const stack = createNativeStackNavigator()

  
 function buttonHandler(){
    setNotes([...notes, {key:notes.length, name:text}])   
  }

  async function launchImagePicker(){

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true

    })
    if(!result.canceled){
      setImagePath(result.assets[0].uri)

    }

  }

  async function launchCamera(){
    const result = await ImagePicker.requestCameraPermissionsAsync()
    if(result.granted===false){
      alert("Acces denied")
    }else{
      ImagePicker.launchCameraAsync({
        quality:1
      })
      .then((response) => {
        if(!response.canceled){
          setImagePath(response.assets[0].uri)
        }
      })
      .catch((error) => alert("Error in launchCamera" + error))
    }
  }

  async function uploadImage(){
    const res = await fetch(imagePath)
    const blob = await res.blob()
    const storageRef = ref(storage, "myImage")
    uploadBytes(storageRef, blob).then((snaphot) => {
      alert("image uploaded")
    })
  }

  async function downloadImage(){
    getDownloadURL(ref(storage, "myImage"))
    .then((url) => {
      setImagePath(url)
    })
    .catch((error) => {
      alert("Error at download image" + error)
    })
  }

  return (

    <NavigationContainer>
      <stack.Navigator initialRouteName='listpage'>
        <stack.Screen
        name ='listPage'
        component={listPage}

        />
        <stack.Screen
        name ='detailPage'
        component={detailPage}

        />
        
      </stack.Navigator>
    </NavigationContainer>


/*
    <View style={styles.container}>
      <Text>Hello</Text>
      { editObj && 
        <View>
          <TextInput defaultValue={editObj.text} onChangeText={(txt) => setText(txt)} />
          <Text onPress={saveUpdate}>Save</Text>
        </View> 
      }

      <TextInput style={styles.textInput}  onChangeText={(txt) => setText(txt)} />
      <Button title='Press Me' onPress={buttonHandler} ></Button>
      <FlatList
        data={notes}
        renderItem={(note) => 
          <View>
            <Text>{note.item.name}</Text>
          </View>
      }
      />
      <Image style={{width:200, height:200}} source={{uri:imagePath}} />
      <Button title ='Download image' onPress={downloadImage} />
      <Button title ='Pick image' onPress={launchImagePicker} />
      <Button title ='Camera' onPress={launchCamera} />
      <Button title ='Upload image' onPress={uploadImage} />
      <StatusBar style="auto" />
    </View>
    */
  );
}

const listPage = ({navigation, route}) =>{

  function handleButton(){
    navigation.navigate('detailPage')

  }
  return(
    <View>
      <Text>Hej</Text>
      <Button title='detailPage' onPress={handleButton}></Button>
    </View>
  )
}

const detailPage = ({navigation, route}) =>{
  return(
    <View>
      <Text>Details...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:200
  },
  textInput:{
    backgroundColor:'lightblue',
    minWidth: 200
  }
});