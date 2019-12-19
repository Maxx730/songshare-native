import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,Animated } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { Feather } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsTabs: {
    flexDirection: 'row',
    paddingTop: Constants.mediumAmount,
    paddingBottom: Constants.mediumAmount,
    paddingLeft: Constants.superAmount,
    paddingRight: Constants.superAmount
  },
  Tab: {
    flex: 1,
    paddingTop: Constants.mediumAmount,
    paddingBottom: Constants.mediumAmount,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  FocusedTab: {
    flex: 1.5,
    paddingTop: Constants.mediumAmount,
    paddingBottom: Constants.mediumAmount,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_LIGHT,
    borderRadius: Constants.superAmount,
    paddingLeft: Constants.largeAmount,
    paddingRight: Constants.largeAmount
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
                {
                  this.state.focused === index && <Text style={[{
                    textAlign: 'center',
                    paddingTop: Constants.tinyAmount + 1,
                    paddingLeft: Constants.mediumAmount,
                    fontWeight: 'bold',
                    color: Colors.PRIMARY
                  }]}>
                    {tab.label}
                  </Text>
                }
              </TouchableOpacity>
          })
        }
      </View>
    );
  }
}

export default SsTabs;
