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
const NewsScreen = (props) => {
   const windowWidth = Dimensions.get('window').width
   const windowheight = Dimensions.get('window').height
   const [PostList, GetPostList] = useState([{}]);

   async function GetMyPost ()  {
      let res = await fetch("http://ownunion.com/api/v1/getallpost", {
         headers: {
           Authorization: 'Bearer '+props.Token
         }
       })
       let rez = await res.json()
       GetPostList(rez.posts.reverse())
       //console.log(PostList)
   }

   

   useEffect(() => {
      
    (async () => {
      GetMyPost() 
      
      
    })();
   }, []);
   


    const Post = PostList.map((post) => 
    <View style={{left: 0, marginTop: 10,position: 'relative', height: windowheight/1.9, width: windowWidth, shadowColor: "#000",
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
    console.log(props)
   return (
       
    <View 
      style={defaultView.container}
    >
          <ScrollView 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{display: 'flex', flex: 1,  marginTop: 0, marginBottom: 50,  position: 'relative'}}> 
      
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
 
 export default connect(mapStateToProps, {getUserToken})(NewsScreen)