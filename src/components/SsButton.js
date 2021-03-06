import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { FontAwesome,Feather } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsButton: {
    paddingTop: Constants.mediumLargeAmount,
    paddingBottom: Constants.mediumLargeAmount,
    paddingLeft: Constants.mediumLargeAmount,
    paddingRight: Constants.mediumLargeAmount,
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
    alignSelf: 'center',
    padding: Constants.tinySmallAmount
  },
  Caps: {
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  Disabled: {
    opacity: .4
  },
  Circle: {
    borderRadius: Constants.superAmount,
    paddingLeft: Constants.mediumLargeAmount,
    paddingRight: Constants.mediumLargeAmount
  },
  Tinted: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    borderWidth: 1,
    borderColor: Colors.PRIMARY_LIGHT
  },
  Small: {
    padding: Constants.smallAmount
  }
});

class SsButton extends React.Component {
  render() {
    return(
      <View style={[this.props.position && {flex: 1},this.props.disabled && Styles.Disabled]}>
        <TouchableOpacity onPress={() => {
          if(this.props.position) {
            this.props.onPress(parseInt(this.props.buttonPosition));
          }

          (this.props.onPress && !this.props.disabled) && this.props.onPress();
        }} style={[Styles.Default,this.props.link && Styles.Link,this.props.dashed && Styles.Dashed,this.props.primary && Styles.Primary,this.props.danger && Styles.Danger,this.props.style && this.props.style,Styles.SsButton,this.getPosition(this.props.position),this.props.circle && Styles.Circle,this.props.tinted && Styles.Tinted,this.props.color && {
          backgroundColor: this.props.color,
          borderColor: this.props.color
        },{
          flexDirection: 'row',
          justifyContent: 'center'
        },this.props.small && Styles.Small]}>
          {
            this.props.icon && <Feather style={[Styles.Icon]} name={this.props.icon} size={20} color={this.getIconColor()}/>
          }
          {
            this.props.label && <Text style={[this.getTextColor(),{textAlign: 'center',fontSize: 15,padding: Constants.tinySmallAmount},this.props.caps && Styles.Caps]}>
              {
               this.props.label
              }
              {
                this.props.tinted
              }
            </Text>
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

    if(this.props.link || this.props.tinted)
      return Colors.PRIMARY
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
