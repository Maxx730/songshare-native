import React from 'react';
import { View,Text,StyleSheet,KeyboardAvoidingView,TouchableOpacity,Image } from 'react-native';
import Constants from '../styles/Constants';
import Colors from '../styles/Colors';
import Labels from '../styles/Labels';

//Import the components we need to create the login view.
import SsInput from '../components/SsInput';
import SsButton from '../components/SsButton';
import SsHeader from '../components/SsHeader';
import SsButtonSet from '../components/SsButtonSet';
import SsCheckbox from '../components/SsCheckbox';

const Styles = StyleSheet.create({
  Login: {
    flex: 1
  },
  Header: {
    flex: 2.5,
    backgroundColor: Colors.PRIMARY,
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
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
      const {navigate} = this.props.navigation;
      return(
        <KeyboardAvoidingView style={[Styles.Login]} behavior='padding'>
          <View style={[Styles.Header]}>
            <Image source={require('../../assets/img/djbooth.jpg')} style={{
              opacity: .3,
              position: 'absolute'
            }}/>
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
            <TouchableOpacity onPress={() => {
              navigate('Forgot');
            }} style={[{
              paddingTop: Constants.tinyAmount,
              paddingBottom: Constants.largeAmount,
              paddingRight: Constants.mediumAmount
            }]}>
              <Text style={[{
                textAlign: 'right',
                fontWeight: 'bold'
              }]}>
                {Labels.FORGOT}
              </Text>
            </TouchableOpacity>
            <SsButton label={Labels.SIGN_IN} primary caps/>
          </View>
          <View style={[{flex: .5}]}>
            <SsButton label={Labels.NO_ACCOUNT} link onPress={() => {
              navigate('Register');
            }}/>
          </View>
        </KeyboardAvoidingView>
      );
  }
}

export default Login;
