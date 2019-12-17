import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,Animated } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { FontAwesome } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsListItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER_COLOR,
    paddingTop: Constants.largeAmount,
    paddingBottom: Constants.largeAmount,
    paddingLeft: Constants.largeAmount,
    paddingRight: Constants.largeAmount,
    flexDirection: 'row'
  }
})

class SsListItem extends React.Component {
  render() {
    return(
      <TouchableOpacity style={[Styles.SsListItem]} onPress={(event) => {
        this.props.onPress && this.props.onPress(event)
      }}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

export default SsListItem;
