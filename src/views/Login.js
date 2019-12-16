import React from 'react';
import { View,Text,StyleSheet,KeyboardAvoidingView,TouchableOpacity,Image } from 'react-native';
import Constants from '../styles/Constants';
import Colors from '../styles/Colors';
import Labels from '../styles/Labels';
import { CheckAccess } from '../utils/Network';

//Import the components we need to create the login view.
import SsInput from '../components/SsInput';
import SsButton from '../components/SsButton';
import SsHeader from '../components/SsHeader';
import SsButtonSet from '../components/SsButtonSet';
import SsCheckbox from '../components/SsCheckbox';
import SsSpinner from '../components/SsSpinner';
import SsAlert from '../components/SsAlert';

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

    this.state = {
      username: '',
      password: '',
      usernameError: false,
      passwordError: false,
      loading: false,
      error: ''
    }
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
            {
              this.state.loading ? <SsSpinner message={Labels.LOGIN_MESSAGE}/> :
              <View style={{
                flex: 1
              }}>
                <Text style={[
                  {
                    fontSize: Constants.mediumLargeAmount * 2,
                    paddingBottom: Constants.smallAmount
                  }
                ]}>
                  {Labels.LOGIN}
                </Text>
                <Text style={[{
                  fontSize: Constants.mediumLargeAmount,
                  paddingBottom: Constants.largeAmount
                }]}>
                  {Labels.PLEASE_ENTER}
                </Text>
                <SsInput placeholder={Labels.USERNAME} error={this.state.usernameError} icon='user' onChange={(value) => {
                  this.setState({
                     username: value
                  });
                }}/>
                <SsInput placeholder={Labels.PASSWORD} error={this.state.passwordError} password={true} onChange={(value) => {
                  this.setState({
                    password: value
                  });
                }}/>
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
                <SsButton label={Labels.SIGN_IN} primary caps onPress={() => {
                  if(this.checkFields()) {
                    this.setState({
                      loading: true
                    });

                    CheckAccess(this.state.username,this.state.password).then(data => {
                      setTimeout(() => {
                        if(data.TYPE === "ERROR") {
                          this.setState({
                            loading: false,
                            error: data.MESSAGE
                          });
                        } else {
                          this.setState({
                            loading: false
                          });
                        }
                      },Constants.loginTimeout);
                    });
                  }
                }}/>
                {
                  this.state.error != '' && <SsAlert round error label={this.state.error} onClear={() => {
                    this.setState({
                      error: ''
                    });
                  }}/>
                }
              </View>
          }
          </View>
          <View style={[{flex: .5}]}>
            {
              !this.state.loading && <SsButton label={Labels.NO_ACCOUNT} link onPress={() => {
                navigate('Register');
              }}/>
            }
          </View>
        </KeyboardAvoidingView>
      );
  }

  checkFields() {
    let userError = this.state.username === '';
    let passError = this.state.password === '';

    this.setState({
        usernameError: userError,
        passwordError: passError
    });

    if(!userError && !passError){
      return true
    } else {
      return false
    }
  }
}

export default Login;
