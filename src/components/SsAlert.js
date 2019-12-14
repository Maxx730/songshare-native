import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { Feather } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsAlert: {
    marginTop: Constants.smallAmount,
    marginBottom: Constants.smallAmount,
    flexDirection: 'row',
    paddingTop: Constants.mediumAmount,
    paddingBottom: Constants.mediumAmount,
    paddingLeft: Constants.largeAmount,
    paddingRight: Constants.mediumAmount,
    justifyContent: 'center'
  },
  Round: {
    borderRadius: Constants.smallAmount
  },
  Error: {
    backgroundColor: Colors.DANGER
  }
})

class SsAlert extends React.Component {
  render() {
    return(
      <View style={[Styles.SsAlert,this.props.error && Styles.Error,this.props.round && Styles.Round]}>
        <Text style={[{
          color: Colors.WHITE,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }]}>
          {this.props.label}
        </Text>
        <TouchableOpacity style={[{
          alignContent: 'flex-end'
        }]} onPress={() => {
            this.props.onClear && this.props.onClear()
        }}>
          <Feather name={'x'} size={32} color={Colors.WHITE}/>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SsAlert;
