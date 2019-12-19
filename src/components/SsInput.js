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
    margin: Constants.tinySmallAmount,
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
  },
  Circle: {
    borderRadius: Constants.superAmount
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
      <View style={[Styles.SsInput,this.props.disabled && Styles.Disabled, this.props.dashed && Styles.Dashed,this.props.error === true && Styles.Error,this.props.circle && Styles.Circle]}>
        {
          this.props.search && <TouchableOpacity><Feather style={[Styles.InputIcon]} name={'search'} size={24} color={this.getIconColor()} /></TouchableOpacity>
        }
        <TextInput style={[Styles.InputText,this.props.search && {marginLeft: Constants.largeAmount}]} onChangeText={(value) => {
          this.props.onChange && this.props.onChange(value);
        }} value={this.props.value} disabled={this.props.disabled ? true : false} placeholder={this.props.placeholder} secureTextEntry={(this.props.password && !this.state.showingPassword) ? true : false}/>
        {
          this.props.password ? <TouchableOpacity onPress={() => {
            this.setState({
              showingPassword: !this.state.showingPassword
            })
          }}><Feather style={[Styles.InputIcon]} name={this.state.showingPassword ? 'eye' : 'eye-off'} size={24} color={this.getIconColor()} /></TouchableOpacity> : this.props.icon && <Feather style={[Styles.InputIcon]} name={this.props.icon} size={24} color={this.getIconColor()} />
        }
        {
          (this.props.search && this.props.clear) && <TouchableOpacity><Feather style={[Styles.InputIcon]} name={'x'} size={24} color={Colors.PRIMARY} /></TouchableOpacity>
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
