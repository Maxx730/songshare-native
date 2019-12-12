import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import Constants from '../styles/Constants';
import Colors from '../styles/Colors';
import Labels from '../styles/Labels';

//Import the form components.
import SsInput from '../components/SsInput';
import SsButton from '../components/SsButton';
import SsCheckbox from '../components/SsCheckbox';
import SsLink from '../components/SsLink';

const Styles = StyleSheet.create({
  Register: {
    flex: 1
  },
  Header: {
    flex: 1
  },
  Form: {
    padding: Constants.largeAmount,
    flex: 1
  },
  Foot: {
    flex: 1
  }
})

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      repeatPassword: '',
      email: '',
      termsAccepted: false
    }
  }

  render() {
    return(
      <View style={[Styles.Register]}>
        <View>

        </View>
        <View style={[Styles.Form]}>
          <SsInput placeholder={Labels.USERNAME} icon={'user'}/>
          <SsInput placeholder={Labels.PASSWORD} password/>
          <SsInput placeholder={Labels.REPEAT_PASSWORD} password/>
          <SsInput placeholder={Labels.EMAIL} icon={'mail'}/>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <SsCheckbox label={Labels.READ_AGREE}/>
            <SsLink label={Labels.TERMS_CONDITIONS} style={{marginTop: 1.5}} primary/>
          </View>
          <SsButton label={Labels.SUBMIT} caps primary/>
        </View>
        <View>

        </View>
      </View>
    );
  }
}

export default Register;
