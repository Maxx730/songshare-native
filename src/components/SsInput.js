import React from 'react';
import { View,Text,StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { Feather } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsInput: {
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    borderRadius: Constants.smallAmount,
    paddingTop: Constants.mediumAmount,
    paddingBottom: Constants.mediumAmount,
    paddingLeft: Constants.mediumAmount,
    paddingRight: Constants.mediumLargeAmount,
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
    alignContent: 'flex-end',
    paddingTop: 2
  },
  Error: {
    borderColor: Colors.DANGER
  }
});

class SsInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showingPassword: false
    }
  }

  render() {
    return(
      <View style={[Styles.SsInput,this.props.disabled && Styles.Disabled, this.props.dashed && Styles.Dashed,this.props.error === true && Styles.Error]}>
        <TextInput style={[Styles.InputText]} onChangeText={(value) => {
          this.props.onChange && this.props.onChange(value);
        }} value={this.props.value} disabled={this.props.disabled ? true : false} placeholder={this.props.placeholder} secureTextEntry={(this.props.password && !this.state.showingPassword) ? true : false}/>
        {
          this.props.password ? <TouchableOpacity onPress={() => {
            this.setState({
              showingPassword: !this.state.showingPassword
            })
          }}><Feather style={[Styles.InputIcon]} name={this.state.showingPassword ? 'eye' : 'eye-off'} size={24} color={this.getIconColor()} /></TouchableOpacity> : this.props.icon && <Feather style={[Styles.InputIcon]} name={this.props.icon} size={24} color={this.getIconColor()} />
        }
      </View>
    );
  }

  getIconColor() {
    let color = this.props.light ? Colors.WHITE : Colors.BORDER_COLOR;

    return color;
  }
}

export default SsInput;
