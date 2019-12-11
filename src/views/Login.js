import React from 'react';
import { View,Text,StyleSheet,KeyboardAvoidingView } from 'react-native';
import Constants from '../styles/Constants';
import Colors from '../styles/Colors';
import Labels from '../styles/Labels';

//Import the components we need to create the login view.
import SsInput from '../components/SsInput';
import SsButton from '../components/SsButton';
import SsHeader from '../components/SsHeader';

const Styles = StyleSheet.create({
  Login: {
    flex: 1
  },
  Header: {
    flex: 3,
    backgroundColor: Colors.PRIMARY,
    alignContent: 'center',
    justifyContent: 'center'
  },
  Form: {
    padding: Constants.largeAmount,
    flex: 3,
    flexDirection: 'column'
  },
  SocialLogins: {
    flexDirection: 'row'
  }
})

class Login extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
      return(
        <KeyboardAvoidingView style={[Styles.Login]} behavior='padding'>
          <View style={[Styles.Header]}>
            <SsHeader light style={{textAlign: 'center'}}>
              {Labels.HELLO}
            </SsHeader>
            <Text style={{textAlign: 'center',color: Colors.WHITE,fontSize: 16}}>
              {Labels.SIGN_INTO}
            </Text>
          </View>
          <View style={[Styles.Form]}>
            <SsInput placeholder={Labels.USERNAME} icon='user'/>
            <SsInput placeholder={Labels.PASSWORD} password={true}/>
            <SsButton label={Labels.FORGOT} link/>
            <SsButton label={Labels.SIGN_IN} primary caps/>

            <View style={{paddingTop: Constants.largeAmount}}>
              <View style={[Styles.SocialLogins]}>
                <SsButton icon='google' link/>
                <SsButton icon='facebook' link/>
                <SsButton icon='twitter' link/>
              </View>
            </View>
          </View>
          <View style={[{flex: .5}]}>
            <SsButton label={Labels.NO_ACCOUNT} link/>
          </View>
        </KeyboardAvoidingView>
      );
  }
}

export default Login;
