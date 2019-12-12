import React from 'react';
import { View,Text,StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { Feather } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsCheckbox: {
    flexDirection: 'row',
    marginTop: Constants.largeAmount,
    marginBottom: Constants.largeAmount
  },
  Checkbox: {
    borderColor: Colors.BORDER_COLOR,
    borderWidth: 1,
    width: 24,
    height: 24,
    borderRadius: Constants.smallAmount
  },
  Checked: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY
  },
  CheckLabel: {
    paddingLeft: Constants.mediumAmount,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Constants.tinyAmount,
    textAlignVertical: 'center'
  }
});

class SsCheckbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.checked || false
    }
  }

  render() {
    return(
      <View value={this.state.checked} style={[Styles.SsCheckbox]}>
        <TouchableOpacity style={[Styles.Checkbox,this.state.checked && Styles.Checked]} onPress={() => {
          this.setState({
            checked: !this.state.checked
          });
          this.props.onChecked && this.props.onChecked(!this.state.checked);
        }}>
        {
          this.state.checked && <Feather name='check' color={Colors.WHITE} size={22}/>
        }
        </TouchableOpacity>
        <Text style={[Styles.CheckLabel]}>
          {
            this.props.label
          }
        </Text>
      </View>
    );
  }
}

export default SsCheckbox;
