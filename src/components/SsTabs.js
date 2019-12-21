import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,Animated } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { Feather } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsTabs: {
    flexDirection: 'row'
  },
  Tab: {
    flex: 1,
    paddingTop: Constants.largeAmount,
    paddingBottom: Constants.largeAmount,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  FocusedTab: {
    flex: 1,
    paddingTop: Constants.largeAmount,
    paddingBottom: Constants.largeAmount,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_LIGHT
  }
});

class SsTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: 0
    }
  }

  render() {
    return(
      <View style={[Styles.SsTabs]}>
        {
          this.props.tabs && this.props.tabs.map((tab,index) => {
            return <TouchableOpacity onPress={(event) => {
              this.setState({
                focused: index
              });

              tab.onPress && tab.onPress();
            }} key={`tab-${index}`} style={[index === this.state.focused ? Styles.FocusedTab : Styles.Tab]}>
                <Feather name={tab.icon} size={24} color={this.state.focused === index ? Colors.PRIMARY : Colors.BLACK}/>
              </TouchableOpacity>
          })
        }
      </View>
    );
  }
}

export default SsTabs;
