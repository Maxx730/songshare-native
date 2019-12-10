import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { AntDesign } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsButton: {
    marginTop: Constants.tinySmallAmount,
    marginBottom: Constants.tinySmallAmount,
    paddingTop: Constants.mediumLargeAmount,
    paddingBottom: Constants.mediumLargeAmount,
    borderRadius: Constants.smallAmount
  },
  Default: {
    borderColor: Colors.BORDER_COLOR,
    borderWidth: 1
  },
  Primary: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY
  },
  Danger: {
    backgroundColor: Colors.DANGER,
    borderColor: Colors.DANGER
  },
  Dashed: {
    borderStyle: 'dashed'
  },
  Link: {
    borderWidth: 0
  },
  Left: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderRightWidth: 0
  },
  Right: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderLeftWidth: 0
  },
  Center: {
    borderRadius: 0
  },
  Icon: {
    alignSelf: 'center'
  }
});

class SsButton extends React.Component {
  render() {
    return(
      <View style={[this.props.position && {flex: 1}]}>
        <TouchableOpacity onPress={() => {
          if(this.props.position) {
            this.props.onPress(parseInt(this.props.buttonPosition));
          }
        }} style={[Styles.Default,this.props.link && Styles.Link,this.props.dashed && Styles.Dashed,this.props.primary && Styles.Primary,this.props.danger && Styles.Danger,Styles.SsButton,this.getPosition(this.props.position)]}>
          {
            this.props.label && <Text style={[this.getTextColor(),{textAlign: 'center',fontSize: 15}]}>
              {
               this.props.label
              }
            </Text>
          }
          {
            this.props.icon && <AntDesign style={[Styles.Icon]} name={this.props.icon} size={20} color={this.getIconColor()}/>
          }
        </TouchableOpacity>
      </View>
    );
  }

  getTextColor() {
    if(this.props.primary || this.props.danger)
      return {
        color: Colors.WHITE
      }

    if(this.props.link)
      return {
        color: Colors.PRIMARY
      }
  }

  getIconColor() {
    if(this.props.primary || this.props.danger)
      return Colors.WHITE
  }

  getPosition(position) {
    switch(position) {
      case 'right':
        return Styles.Right
      case 'left':
        return Styles.Left
      case 'center':
        return Styles.Center
      default:
        return {}
    }
  }
}

export default SsButton;
