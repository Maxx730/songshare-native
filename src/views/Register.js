import React from 'react';
import { View,Text,StyleSheet,Image,Dimensions,Keyboard,KeyboardAvoidingView } from 'react-native';
import Constants from '../styles/Constants';
import Colors from '../styles/Colors';
import Labels from '../styles/Labels';
import HTML from 'react-native-render-html';

//Import the form components.
import SsInput from '../components/SsInput';
import SsButton from '../components/SsButton';
import SsCheckbox from '../components/SsCheckbox';
import SsLink from '../components/SsLink';
import SsModal from '../components/SsModal';
import SsHeader from '../components/SsHeader';
import SsCard from '../components/SsCard';

const Styles = StyleSheet.create({
  Register: {
    flex: 1
  },
  Header: {
    flex: 1
  },
  Form: {
    padding: Constants.largeAmount,
    flex: 3
  },
  Foot: {
    flex: 0
  },
  KeyboardShowing: {
    flex: .25
  },
  KeyboardHiding: {
    flex: .75
  }
})

class Register extends React.Component {
  constructor(props) {
    super(props);

    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);

    this.state = {
      username: '',
      password: '',
      repeatPassword: '',
      email: '',
      termsAccepted: false,
      modalOpen: false,
      keyboardShowing: false
    }
  }

  componentDidMount() {
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
    return(
      <KeyboardAvoidingView style={[Styles.Register]} behavior='padding'>
        {
          this.state.modalOpen && <SsModal style={[{
            marginBottom: Constants.largerAmount
          }]} visible={this.state.modalOpen} title={Labels.TERMS_CONDITIONS} onClose={() => {
            this.setState({
              modalOpen: false
            });
          }}>
            <HTML html={Labels.EULA}/>
            <SsButton primary label={Labels.ACCEPT} onPress={() => {
              this.setState({
                termsAccepted: true,
                modalOpen: false
              });
            }}/>
          </SsModal>
        }
        <View style={[this.state.keyboardShowing ? Styles.KeyboardShowing : Styles.KeyboardHiding]}>

        </View>
        <View style={[Styles.Form]}>
            <Text style={[{
              fontSize: Constants.mediumLargeAmount * 2,
              paddingLeft: Constants.mediumAmount
            }]}>
              {Labels.REGISTER}
            </Text>
            <Text style={[{
              fontSize: Constants.mediumLargeAmount,
              paddingBottom: Constants.largeAmount,
              paddingLeft: Constants.mediumAmount
            }]}>
              {Labels.FILL_OUT}
            </Text>
            <SsInput onChange={(value) => {
              this.setState({
                username: value
              });
            }} placeholder={Labels.USERNAME} icon={'user'} value={this.state.username}/>
            <SsInput onChange={(value) => {
              this.setState({
                password: value
              });
            }} placeholder={Labels.PASSWORD} password value={this.state.password}/>
            <SsInput onChange={(value) => {
              this.setState({
                repeatPassword: value
              });
            }} placeholder={Labels.REPEAT_PASSWORD} password value={this.state.repeatPassword}/>
            <SsInput onChange={(value) => {
              this.setState({
                email: value
              });
            }} placeholder={Labels.EMAIL} icon={'mail'} value={this.state.email}/>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center'
            }}>
              <SsCheckbox label={Labels.READ_AGREE} onChecked={(value) => {
                this.setState({
                  termsAccepted: value
                });
              }}/>
              <SsLink label={Labels.TERMS_CONDITIONS} checked={this.state.termsAccepted} style={{marginTop: 1.5}} primary onPress={() => {
                this.setState({
                  modalOpen: true
                });
              }}/>
            </View>
            <SsButton label={Labels.SUBMIT} caps primary disabled/>
            <SsButton label={Labels.NEVERMIND} onPress={() => {
              this.props.navigation.goBack();
            }}/>
        </View>
        <View style={[Styles.Foot]}>

        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Register;
