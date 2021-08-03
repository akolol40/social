import React, {useState, useEffect} from 'react';
import {  View, Text, Image, Dimensions, ScrollView, TextInput, Platform } from 'react-native';
import {defaultView, Btn_1, logoAndName, btnCab} from '../components/styles'
import Btn from '../components/Btn'
import Footer from '../components/footer'
import SvgCamera from '../svg/Camera'
import * as ImagePicker from 'expo-image-picker';
import {connect} from 'react-redux'
import {getUserToken} from '../actions/index'
import SvgHeart from '../svg/Heart'
import SvgReps from '../svg/SvgRep'
const CheckAcc = (props) => {
   const [image, setImage] = useState(false);
   const [News, setNews] = useState(false)
   const [RenderBtn, showRenderBtn] = useState(true)
   const [value, setValue] = useState('')
   const [link, setLink] = useState('')
   const [valueArea, setValueArea] = useState('')
   const windowWidth = Dimensions.get('window').width
   const windowheight = Dimensions.get('window').height
   const data = {'UserData': props.route.params.data}
   const [H, setH] = useState(2)
   const [PostList, GetPostList] = useState([{}]);

   async function GetMyPost ()  {
      let res = await fetch("http://ownunion.com/api/v1/getMyPost", {
         headers: {
           Authorization: 'Bearer '+props.Token
         }
       })
       let rez = await res.json()
       GetPostList(rez.posts.reverse())
       //console.log(PostList)
   }

   const uploadPost = async (photo) => {
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
        link: result.url, 
        header: value,
        textArea: valueArea
      }

      let res = await fetch("http://ownunion.com/api/v1/SendPost", {
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
      GetMyPost()
    }

   useEffect(() => {
      
    (async () => {
      GetMyPost() 
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
   }, []);
   
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
        setLink(base64Img)
        setH(1.2)
      }
    };

    const Post = PostList.map((post) => 
    <View style={{left: 0,position: 'relative', height: windowheight/1.9, width: windowWidth, shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 2.22,
    borderRadius: 22,
    elevation: 2, marginBottom: 12}}>
     <View style={{marginTop: 24, marginLeft: 31}}>    
         <Text style={{fontSize: 16, lineHeight: 16, fontWeight: '500'}}> {post.fio}</Text> 
        
      </View>
      <Image source={{ uri: post.link }} style={{ width: windowWidth, height: 174, position: 'relative',  marginTop: 10}}/>
      <View style={{marginTop: 17, marginLeft: 31}}>    
         <Text style={{fontSize: 18, lineHeight: 16, fontWeight: 'bold'}}> {post.header}</Text> 
         <Text style={{fontSize: 14, lineHeight: 16, fontWeight: '400', marginTop: 5, marginLeft: 1}}> {post.areaText}</Text>
         <Text style={{ marginTop: 21}}> <SvgHeart/> </Text>
         <Text style={{ marginTop: -27, marginLeft: 50}}> <SvgReps/> </Text>
      </View>
   </View>
    )

   return (
    <View 
      style={defaultView.container}
    >
          <ScrollView 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{display: 'flex', flex: 1,  marginTop: 0, marginBottom: 50,  position: 'relative'}}> 
      <View style={{position: 'relative', height: windowheight/2, width: windowWidth, shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 2.22,
      borderBottomEndRadius: 22,
      borderBottomLeftRadius: 22,
      elevation: 2,}}> 
      <View style={{marginLeft: 34}}>
         <Image
            style={logoAndName.logo}
            source={{uri: props.route.params.ava}}
         /> 
     </View>
     <Text style={logoAndName.text_2} > 
         <Text style={logoAndName.text}>{data.UserData.surname+'\n'}</Text>
          {data.UserData.name + ' ' + data.UserData.middleName}   
       </Text>
      <View style={{marginLeft: windowWidth-220, marginTop: 5}}>
       </View>
       <View style={{left: 30, top: -40}}>
         <Btn name="Редактировать профиль" onPress={()=>''} styles={btnCab}/>
       </View> 
       <View style={{left: 35, top: -40}}>
       <Text style={logoAndName.textInfo}>Электронная почта: </Text>
       <Text style={logoAndName.textInfo}>Электронная почта: </Text>
       <Text style={logoAndName.textInfo}>Электронная почта: </Text>
       <Text style={logoAndName.textInfo}>Электронная почта: </Text>
        <View style={{marginTop: -25, top: -windowheight/7, left: 150}}> 
         <Text style={logoAndName.textData}>{data.UserData.email}</Text>
         <Text style={logoAndName.textData}>{data.UserData.email}</Text>
         <Text style={logoAndName.textData}>{data.UserData.email}</Text>
         <Text style={logoAndName.textData}>{data.UserData.email}</Text>
         </View>
       </View>


      </View>
      <View style={{position: 'relative', left: 27, marginTop: 12}}>
         {RenderBtn&&<Btn name="Создать новость" onPress={()=>{showRenderBtn(false); setNews(true)}} styles={btnCab}/>}

       </View> 
       {News&&
               <View style={{left: 0,position: 'relative', height: windowheight/H, width: windowWidth, shadowColor: "#000",
               shadowOffset: {
                  width: 0,
                  height: 4,
               },
               shadowOpacity: 0.32,
               shadowRadius: 2.22,
               borderRadius: 22,
               elevation: 2, marginBottom: 12}}> 
               {image && <Image source={{ uri: image }} style={{ width: windowWidth, height: 174, position: 'relative',  marginTop: 30}} />} 
               <View style={{marginTop: 24, marginLeft: 31}}>
                  <TextInput style={{
                  height: 23, //35
                  width: windowWidth/2, 
                  borderWidth: 1,
                  borderColor: '#D8D8D8',
                  backgroundColor: '#D8D8D8', 
                  borderRadius: 20, 
                  paddingLeft: 13,
                  position: 'relative',
                  fontSize: 18, 
                  outline: 'none',
                  lineHeight: 21}}
                  
                  placeholder={'Заголовок'}
                  onChangeText = {text => setValue(text)}
                  keyboardType = {Platform.OS === 'ios' ? 'ascii-capable' : 'default'}
                  value={value} />
                  <View style={{left: windowWidth/2, marginLeft: 20, top: -20}}>
                     <Text onPress={()=>pickImage()}>
                     <SvgCamera/>
                     </Text>
                  </View>
                  <View style={{marginTop: 10}}>
                  <TextInput style={{
                  alignItems: 'flex-start',

                  
                  width: windowWidth/1.2, 
                  borderWidth: 1,
                  borderColor: '#D8D8D8',
                  backgroundColor: '#D8D8D8', 
                  borderRadius: 20, 
                  paddingLeft: 13,
                  position: 'relative',
                  fontSize: 18, 
                  outline: 'none',
                  lineHeight: 21}}
                  multiline={true}
                  placeholder={'Текст публикации'}
                  numberOfLines={8}
                  onChangeText = {text => setValueArea(text)}
                  keyboardType = {Platform.OS === 'ios' ? 'ascii-capable' : 'default'}
                  value={valueArea} />
                  </View>
                  <View style={{marginTop: 15}}>
                     <Btn name="Опубликовать" onPress={()=>{showRenderBtn(true); setNews(false); setImage(false); setH(2); uploadPost(link); setValue(''); setValueArea('') } } styles={btnCab}/>
                  </View>
               </View>
               </View>
         
         }
           {Post}
            
       </ScrollView>  

       <Footer NavList={props}/>

    </View>
   )
}



const mapStateToProps = state => {
   return {
     Token: state.AuthToken.token
   }
 }
 
 export default connect(mapStateToProps, {getUserToken})(CheckAcc)