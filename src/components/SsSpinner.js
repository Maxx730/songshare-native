import React from 'react';
import { View,Text,StyleSheet,TextInput,TouchableOpacity,ActivityIndicator } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { Feather } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsSpinner: {
    flex: 1,
    justifyContent: 'center'
  },
  SpinnerLabel: {
    textAlign: 'center',
    padding: Constants.mediumAmount,
    color: Colors.BORDER_COLOR
  }
});

class SsSpinner extends React.Component {
  render() {
    return(
      <View style={[Styles.SsSpinner]}>
        <ActivityIndicator color={Colors.PRIMARY} size={'large'}/>
        <Text style={[Styles.SpinnerLabel]}>
          {this.props.message}
        </Text>
      </View>
    );
  }
}

export default SsSpinner;
