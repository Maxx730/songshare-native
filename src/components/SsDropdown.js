import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Dimensions } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { FontAwesome,Feather } from '@expo/vector-icons'

const Styles = StyleSheet.create({
  SsDropdown: {
    padding: Constants.largeAmount
  },
  DropDownButton: {

  },
  DropDownMenu: {
    backgroundColor: Colors.WHITE,
    position: 'absolute',
    flex: 1,
    top: (Constants.largeAmount * 2) + Constants.largerAmount,
    minWidth: 200,
    right: 0
  },
  MenuItem: {
    paddingTop: Constants.mediumLargeAmount,
    paddingBottom: Constants.mediumLargeAmount,
    paddingLeft: Constants.largeAmount,
    paddingRight: Constants.largeAmount,
    flex: 1,
    flexDirection: 'row'
  },
  MenuItemText: {
    paddingLeft: Constants.largeAmount
  },
  MenuShade: {
    position: 'absolute',
    backgroundColor: Colors.BLACK,
    opacity: .3,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
    left: 0
  },
  TopBorder: {
    borderTopWidth: 1,
    borderTopColor: Colors.BORDER_COLOR
  }
});

class SsDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open || false
    }
  }

  componentDidMount() {

  }

  render() {
    return(
      <View style={[Styles.SsDropdown]}>
        <View style={[Styles.DropDownButton]}>
        {
          this.props.icon && <TouchableOpacity onPress={() => {
            this.props.onPress && this.props.onPress()
          }}>
            <Feather name={this.props.icon} size={Constants.largerAmount} color={this.props.iconColor ? this.props.iconColor : Colors.WHITE}/>
          </TouchableOpacity>
        }
        </View>
        {
          (this.props.data && this.props.open) && <TouchableOpacity style={[Styles.DropDownMenu]}>
            {
              this.props.data.map((item,index) => {
                return <TouchableOpacity style={[Styles.MenuItem,index > 0 && Styles.TopBorder]} key={`submenu-item-${index}`}>
                  {item.icon && <Feather name={item.icon} size={Constants.largeAmount}/>}
                  <Text style={[Styles.MenuItemText]}>{item.label}</Text>
                </TouchableOpacity>
              })
            }
          </TouchableOpacity>
        }
      </View>
    );
  }
}

export default SsDropdown;
