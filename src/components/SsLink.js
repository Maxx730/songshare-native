import React from 'react';
import { View,Text,StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { Feather } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsLink: {
    paddingTop: Constants.largeAmount,
    paddingBottom: Constants.largeAmount
  }
});

class SsLink extends React.Component {
  render() {
    return(
      <TouchableOpacity style={[Styles.SsLink]}>
        <Text style={[{color: this.getColor(),fontWeight: 'bold'},this.props.style && this.props.style]}>
          {
            this.props.label
          }
        </Text>
      </TouchableOpacity>
    );
  }

  getColor() {
    if(this.props.primary)
      return Colors.PRIMARY
  }
}

export default SsLink;
