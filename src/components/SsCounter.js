import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,Animated } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { FontAwesome } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsCounter: {
    flex: 1
  },
  Center: {
    textAlign: 'center'
  }
});

class SsCounter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: new Animated.Value(0)
    }
  }

  componentDidMount() {
    Animated.timing(this.state.value, {
      toValue: this.props.value,
      duration: 1000
    }).start();
  }

  render() {
    return(
      <Animated.View style={[Styles.SsCounter]}>
        <Text style={[Styles.Center,{
          fontSize: Constants.largeAmount + 4,
          textTransform: 'uppercase'
        }]}>
          {JSON.stringify(this.state)}
        </Text>
        <Text style={[Styles.Center,{
          color: Colors.SUBTITLE,
          textTransform: 'uppercase',
          fontSize: 12,
          paddingTop: Constants.smallAmount
        }]}>
          {this.props.label}
        </Text>
      </Animated.View>
    )
  }
}

export default SsCounter;
