import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { FontAwesome } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsAvatar: {
    overflow: 'hidden',
    margin: Constants.largeAmount
  },
  Round: {
    borderRadius: Constants.superAmount * 2
  },
  Small: {
    width: Constants.superAmount,
    height: Constants.superAmount
  },
  Large: {
    width: Constants.superAmount * 2,
    height: Constants.superAmount * 2
  }
})

class SsAvatar extends React.Component {
  render() {
    return(
      <View style={[Styles.SsAvatar,this.props.style && this.props.style,this.props.round && Styles.Round,this.props.large ? Styles.Large : Styles.Small]}>
        {
          this.props.source && <Image source={this.props.source} style={[this.props.large ? Styles.Large : Styles.Small]}/>
        }
      </View>
    );
  }
}

export default SsAvatar;
