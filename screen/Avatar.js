import React, { useState, useEffect } from 'react';
import {  Image, View, Platform, Text } from 'react-native';
import Btn from '../components/Btn'
import * as ImagePicker from 'expo-image-picker';
import {defaultView, Btn_1, Btn_2, defText, Ava} from '../components/styles'
import {connect} from 'react-redux'
import {getUserToken, getUserEmail} from '../actions/index'


function Avatar(props, {route, navigation}) {
  const [image, setImage] = useState(false);
  const [img, setImg] = useState('text');
  const [visableava, setVisableava] = useState(true)
  

  const setDefImg = uri => {
    setImg(uri)
  }

  useEffect(() => {

    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);


  async function takeAndUploadPhotoAsync() {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });
    console.log(result)
    if (result.cancelled) {
      return;
    }
  
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split('/').pop();
    let base64Img = `data:image/jpg;base64,${result.base64}`
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    let blob = new Blob([{uri: result.uri}], {type: 'image/jpeg'});
    // Upload the image using the fetch and FormData APIs
    const formData = new FormData();
    formData.append('filedata', base64Img)

    return await fetch('http://localhost:3000/api/v1/sendfile', {
      method: 'POST',
      body: formData,
      header:{
      Accept: "application/x-www-form-urlencoded"}
    });
  }

   const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });
    if (!result.cancelled) {
      let base64Img = `data:image/jpg;base64,${result.base64}`
      setImage(result.uri);
      uploadOwnunion(base64Img)
      setVisableava(false)
    }
  };

  const getUserInfomation =async ()=> { 
    const {Token} = props
    let response = await fetch('http://ownunion.com/api/v1/getUser', {
      // credentials: 'same-origin', 
       headers: {
         Authorization: 'Bearer ' + Token
       }
     })
     let result = await response.json()
     props.navigation.navigate("Личный кабинет", {data: result.message, token: Token})
  }

  const uploadOwnunion = async (photo) => {
    const data = new FormData()
    data.append('file', photo)
    data.append('upload_preset', 'ownunion')
    data.append('cloud_name', 'ownunion')
    let response = await fetch('https://api.cloudinary.com/v1_1/ownunion/image/upload', {
      method: 'post', body: data
    })
    let result = await response.json()

    const UserAvatar = {
      email: props.Email, 
      link: result.url
    }

    let res = await fetch("http://ownunion.com/api/v1/sendfile", {
      method: "post",
      body: JSON.stringify(UserAvatar),
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json',
        credentials: 'same-origin',
        Authorization: 'Bearer ' + props.Token
      }
    })
    let rez = await res.json()
  }

  return (
    <View style={defaultView.container}>
      <View style={{marginTop: 0}}>
       {visableava&&<Image
         style={{width: 222, height: 222, marginBottom:40}}
         source={require('../img/ava.png')}
        />}
      </View>
      {image && <Image source={{ uri: image }} style={{ width: 250, height: 250, position: 'relative', borderRadius: 300, marginBottom: 25}} />} 
   
      

      <Text style={{fontSize: 18, lineHeight: 21, color: '#141414', marginBottom: 40, width: 276,textAlign: 'center' }}>Загрузите вашу первую аватарку</Text>      
      <Btn name="Выбрать из фотоальбома" onPress={()=>{pickImage()}} styles={Btn_1}/> 

      <Btn name="Пропустить" onPress={()=> getUserInfomation()} styles={Btn_2}/> 
    </View>
  );
}

const mapStateToProps = state => {
  return {
    Token: state.AuthToken.token, 
    Email: state.UserEmail.email
  }
}

export default connect(mapStateToProps, {getUserToken, getUserEmail})(Avatar)