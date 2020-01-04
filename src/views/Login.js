import React from 'react';
import { View,Text,StyleSheet,KeyboardAvoidingView,TouchableOpacity,Image,Keyboard } from 'react-native';
import Constants from '../styles/Constants';
import Colors from '../styles/Colors';
import Labels from '../styles/Labels';
import { CheckAccess } from '../utils/Network';
import { Analytics, PageHit, Event } from 'expo-analytics';
import { SaveValue,GetValue,HasValue,DeleteValue } from '../utils/Storage';

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

  },
  Form: {
    padding: Constants.largeAmount,
    flex: 3,
    flexDirection: 'column'
  },
  SocialLogins: {
    flexDirection: 'row'
  },
  KeyboardUp: {
    flex: .25
  },
  KeyboardDown: {
    flex: 1
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
      error: '',
      keyboardShowing: false
    }

    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
  }

  componentDidMount() {
    const analytics = new Analytics('UA-85720731-3');
    analytics.hit(new PageHit('Login'))
      .then(() => {

      }).catch(e => {

      });

      //Check if the user is already logged in, if so direct to main
      HasValue('user_id').then(data => {
        console.log(data)
        if(data) {
          this.props.navigation.navigate('Main');
        }
      })

    //Add listeners to the keyboard and set the functions that we want to run
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    //Remove the keyboard listeners once the login screen is gone.
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    this.setState({
      keyboardShowing: true
    });
  }

  _keyboardDidHide() {
    this.setState({
      keyboardShowing: false
    });
  }

  render() {
      const {navigate} = this.props.navigation;
      return(
        <KeyboardAvoidingView style={[Styles.Login]} behavior='padding'>
          <View style={[this.state.keyboardShowing ? Styles.KeyboardUp : Styles.KeyboardDown]}></View>
          <View style={[Styles.Form]}>
            {
              this.state.loading ? <SsSpinner message={Labels.LOGIN_MESSAGE}/> :
              <View style={{
                flex: 1
              }}>
                <Text style={[
                  {
                    fontSize: Constants.mediumLargeAmount * 2,
                    paddingLeft: Constants.mediumAmount
                  }
                ]}>
                  {Labels.LOGIN}
                </Text>
                <Text style={[{
                  fontSize: Constants.mediumLargeAmount,
                  paddingBottom: Constants.largeAmount,
                  paddingLeft: Constants.mediumAmount
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
                          //We are going to want to pass information along to the
                          //next screen which will determine redirects when opening the application
                          //so that the user does not see the login screen again.
                          navigate('Main',{
                            user: data,
                            password: this.state.password
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

  _loginWithFacebook() {

  }
}

export default Login;
