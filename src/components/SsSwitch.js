import React from 'react';
import { View,Text,StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { Feather } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsSwitch: {

  }
})

class SsSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    }
  }

  render() {
    return(
      <View style={[Styles.SsSwitch]}>

      </View>
    );
  }
}

export default SsSwitch;
