import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Homescreen from './screen/Homescreen'
import Regscreen from './screen/Regscreen'
import CheckAcc from './screen/CheckAcc'
import Confimpass from './screen/Confimpass'
import Autif from './screen/Autif'
import ConfimReg from './screen/ConfimReg'
import {Image} from 'react-native'
import ResetPass from './screen/ResetPass'
import Avatar from './screen/Avatar'
import Message from './screen/Message'
import Friends from './screen/Friends'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import {createStore , applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import Messagelist from './screen/Messagelist'
import Svgloop from './svg/loop'
import {Text} from 'react-native'
import SvgWriter from './svg/Writelist'
import NewsScreen from './screen/NewsScreen' 

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(ReduxThunk)
))

const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 47, height: 37, marginTop: 17, marginRight: 33, marginBottom: 20 }}
      source={require('./img/logo_screen.png')}
    />
  );
}

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
         name="Авторизация"
         component={Homescreen}
         options={{headerShown: false}}
      />
      <Stack.Screen 
        name="Регистрация"
        component={Regscreen}
        options={{headerLeft: null, 
                  headerRight: props => <LogoTitle {...props}/>}}
      />
      <Stack.Screen
        name="Личный кабинет"
        component={CheckAcc}
        options={{
          title: "Личный кабинет",
          headerLeft: null}}
      />
      <Stack.Screen
        name="Подтверждение"
        component={Autif}
        options={{
          headerLeft: null,headerShown: false}}
      />
      <Stack.Screen
        name="Ввод пароля"
        component={Confimpass}
        options={{headerLeft: null, 
          headerRight: props => <LogoTitle {...props}/>}}
      />
      <Stack.Screen
        name="Добро пожаловать"
        component={ConfimReg}
        options={{headerLeft: null}}
      />
      <Stack.Screen 
        name="Восстановление пароля"
        component={ResetPass}
        options={{headerLeft: null, 
                  headerRight: props => <LogoTitle {...props}/>}}
      />
      <Stack.Screen 
         name="Аватарка"
         component={Avatar}
         options={{headerShown: false}}
      />
      <Stack.Screen 
         name="Чат"
         component={Message}
         options={{headerShown: true}}
      />
      <Stack.Screen 
         name="Чатc"
         component={Messagelist}
          options={{
          headerShown: true, 
          title: 'Чат', 
          headerTitleStyle: {alignSelf: 'center'},
          headerLeft: ()=> 
          <Text style={{marginTop: 0, marginLeft: 34}} onPress={()=>console.log('loop')}>
            <Svgloop/>
           </Text>,
           headerRight: () =>
           <Text style={{marginTop: 0, marginRight: 34}} onPress={()=>console.log('loop')}>
           <SvgWriter/>
           </Text>,
           }
          }
      />
      <Stack.Screen
        name="Друзья"
        component={Friends}
        options={{
          title: "Друзья",
          headerLeft: null}}
      />
      <Stack.Screen
        name="Новости"
        component={NewsScreen}
        options={{
          title: "Новости",
          headerLeft: null}}
      />
    </Stack.Navigator>
  </NavigationContainer>
  </Provider>
  );
}


