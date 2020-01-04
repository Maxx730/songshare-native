import React from 'react';
import { View,Text,StyleSheet,KeyboardAvoidingView,TouchableOpacity,Image,Keyboard } from 'react-native';
import Constants from '../styles/Constants';
import Colors from '../styles/Colors';
import Labels from '../styles/Labels';
import { CheckAccess } from '../utils/Network';
import { Analytics, PageHit, Event } from 'expo-analytics';
import { SaveValue,GetValue,HasValue,DeleteValue } from '../utils/Storage';

const Styles = StyleSheet.create({
  Loading: {

  }
})

class Loading extends React.Component {
  render() {
    return (
      <View style={[Styles.Loading]}>

      </View>
    )
  }
}

export default Loading;
