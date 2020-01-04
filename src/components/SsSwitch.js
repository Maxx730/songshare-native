import React from 'react';
import { View,Text,StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { Feather } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsSwitch: {

  },
  SwitchCase: {
    padding: Constants.smallAmount,
    borderRadius: Constants.largerAmount,
    width: Constants.largerAmount * 2,
    height: Constants.largerAmount + 6
  },
  SwitchToggle: {
    width: Constants.largerAmount,
    height: Constants.largerAmount,
    borderRadius: Constants.largerAmount,
    backgroundColor: Colors.WHITE,
    position: 'absolute'
  },
  True: {
    top: 3,
    right: 3
  },
  False: {
    top: 3,
    left: 4
  }
})

class SsSwitch extends React.Component {
  render() {
    return(
      <View style={[Styles.SsSwitch]}>
        <View style={[Styles.SwitchCase,(this.props.checked === true) ? {backgroundColor: Colors.PRIMARY} : {backgroundColor: Colors.LIGHT_GRAY}]}>
          <View style={[Styles.SwitchToggle,(this.props.checked === true) ? Styles.True : Styles.False]}>

          </View>
        </View>
      </View>
    );
  }
}

export default SsSwitch;
