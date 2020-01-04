import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { FontAwesome } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsAvatar: {
    overflow: 'hidden',
    backgroundColor: Colors.BORDER_COLOR
  },
  Round: {
    borderRadius: Constants.superAmount * 3
  },
  Small: {
    width: Constants.largestAmount,
    height: Constants.largestAmount
  },
  Large: {
    width: Constants.superAmount * 3,
    height: Constants.superAmount * 3
  }
})

class SsAvatar extends React.Component {
  render() {
    return(
      <View style={[Styles.SsAvatar,this.props.style && this.props.style,this.props.round && Styles.Round,this.props.large ? Styles.Large : Styles.Small]}>
        {
          this.props.name ? <Text style={[{
            color: Colors.SUBTITLE,
            fontSize: 18,
            textTransform: 'uppercase',
            textAlign: 'center',
            justifyContent: 'center',
            paddingTop: 5,
            flex: 1
          }]}>{this.props.name.charAt(0)}</Text> : <Image source={this.props.source ? this.props.source : require('../../assets/img/default-user-img.jpg')} style={[this.props.large ? Styles.Large : Styles.Small]}/>
        }
      </View>
    );
  }
}

export default SsAvatar;
