import React from 'react';
import { View,Text,StyleSheet,TextInput } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { AntDesign } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsInput: {
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    borderRadius: Constants.smallAmount,
    paddingTop: Constants.mediumAmount,
    paddingBottom: Constants.mediumAmount,
    paddingLeft: Constants.mediumAmount,
    paddingRight: Constants.mediumAmount,
    marginTop: Constants.tinySmallAmount,
    marginBottom: Constants.tinySmallAmount,
    flexDirection: 'row'
  },
  Disabled: {
    opacity: .4
  },
  Dashed: {
    borderStyle: 'dashed'
  },
  InputText: {
    flex: 1
  },
  InputIcon: {
    alignContent: 'flex-end'
  }
});

class SsInput extends React.Component {
  render() {
    return(
      <View style={[Styles.SsInput,this.props.disabled && Styles.Disabled, this.props.dashed && Styles.Dashed]}>
        <TextInput style={[Styles.InputText]} value={this.props.value} disabled={this.props.disabled ? true : false} placeholder={this.props.placeholder}/>
        {
          this.props.icon && <AntDesign style={[Styles.InputIcon]} name={this.props.icon} size={24} />
        }
      </View>
    );
  }
}

export default SsInput;
