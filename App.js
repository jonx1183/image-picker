import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, FlatList, Button, View, TextInput, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from './Firebase';
import { ref, uploadBytes} from 'firebase/storage'

export default function App() {
  const [text, setText] = useState('')
  const [notes, setNotes] = useState([])
  const [editObj, setEditObj] = useState(null)
  const [imagePath, setImagePath] = useState(null)

  
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

  async function uploadImage(){
    const res = await fetch(imagePath)
    const blob = await res.blob()
    const storageRef = ref(storage, "myImage.jpg")
    uploadBytes(storageRef, blob).then((snaphot) => {
      alert("image uploaded")
    })
  }

  return (
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
      <Button title ='Picke image' onPress={launchImagePicker} />
      <Button title ='Upload image' onPress={uploadImage} />
      <StatusBar style="auto" />
    </View>
  );
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