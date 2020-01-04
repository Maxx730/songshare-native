import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { Feather } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsPill: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY_LIGHT,
    paddingTop: Constants.smallAmount,
    paddingBottom: Constants.smallAmount,
    paddingLeft: Constants.largeAmount,
    paddingRight: Constants.largeAmount,
    borderRadius: Constants.largeAmount,
    margin: Constants.smallAmount
  },
  Label: {
    color: Colors.PRIMARY,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
})

class SsPill extends React.Component {
  render() {
    return(
      <View style={[Styles.SsPill]}>
        <Text style={[Styles.Label]}>
          {this.props.label}
        </Text>
      </View>
    )
  }
}

export default SsPill;
