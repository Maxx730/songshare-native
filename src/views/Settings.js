import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,FlatList,Dimensions } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import Labels from '../styles/Labels';
import Global from '../styles/Global';
import Preferences from '../utils/Preferences';
import { FontAwesome } from '@expo/vector-icons';
import { Dialog,ConfirmDialog } from 'react-native-simple-dialogs';
import { SaveValue,GetValue,HasValue,DeleteValue,DeleteSecure } from '../utils/Storage';

//Import components here.
import SsListItem from '../components/SsListItem';
import SsSwitch from '../components/SsSwitch';
import SsDialog from '../components/SsDialog';
import SsInput from '../components/SsInput';
import SsButton from '../components/SsButton';

const Styles = StyleSheet.create({
  Settings: {
    paddingTop: Constants.largestAmount,
    flex: 1,
    backgroundColor: Colors.WHITE
  },
  SettingsItem: {
    flexDirection: 'row'
  },
  ItemLabel: {
    flex: 1,
    alignSelf: 'center'
  },
  SearchTop: {
    paddingLeft: Constants.mediumAmount,
    paddingRight: Constants.mediumAmount,
    paddingBottom: Constants.mediumAmount,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER_COLOR
  },
  SearchContent: {

  }
})

class Settings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      settings: {
        user_search_default: false,
        theme: 'cherry'
      },
      preferences: [{
      //   id: 0,
      //   label: 'Default Search Users',
      //   type: 'boolean',
      //   value: false,
      //   change: () => {
      //
      //   }
      // },
      // {
      //   id: 4,
      //   type: 'button',
      //   label: Labels.ABOUT,
      //   dialog: {
      //     title: Labels.ABOUT,
      //     message: 'Created by John M Kinghorn'
      //   }
      // },
      // {
      //   id: 3,
      //   label: 'Logout',
      //   type: 'button',
      //   dialog: {
      //     title: Labels.LOGOUT,
      //     message: Labels.CONFIRM_LOGOUT,
      //     positive: async () => {
      //       //Clear out all the saved values.
      //       await DeleteValue('user_id');
      //       await DeleteValue('username');
      //       await DeleteValue('authCode');
      //       await DeleteValue('email');
      //       await DeleteSecure('password');
      //
      //       this.props.navigate('Login');
      //     }
      //   }
      }],
      dialogVisible: false,
      dialog: {
        title: 'TEST 1',
        message: 'TESTING MESSAGE',
        positive: () => {
          console.log('positive');
        }
      }
    }
  }

  componentDidMount() {
    //Load all the values for preferences.
    //If they do not exist set the default preferences.
    if(!HasValue('settings')) {
      this._setDefault();
    }

    GetValue('settings').then(data => {
      this.setState({
        settings: data
      });
    });
  }

  render() {
    return(
      <View style={[Styles.Settings]}>
        <View style={[Styles.SearchTop]}>
          <SsInput circle onClear={() => {

          }} style={[{
            marginTop: Constants.mediumAmount
          }]} clear={this.state.searchValue !== '' ? true : false} value={this.state.searchValue} search placeholder={Labels.SEARCH} onChange={(value) => {
            //Make sure we are not loading and that the value that we are searching for is not empty
            //otherwise this will reutrn and error.
          }}/>
        </View>
        <View style={[Styles.SearchContent]}>
          
        </View>
      </View>
    );
  }

  renderPreference(item) {
    switch(item.type) {
      case 'boolean':
        return <SsListItem onPress={(event) => {
          //First find the preference that we are toggling
          let prefs = Object.assign([],this.state.preferences);
          //change the value to of given preference and then reset the preference state with the new value.
          prefs.map(pref => {
            if(pref.id === item.id) {
              pref.value = !item.value;
            }
          });

          this.setState({
            preferences: prefs
          });
        }} style={[Styles.SettingsItem]}>{item.label && <Text style={[Styles.ItemLabel]}>{item.label}</Text>}<SsSwitch checked={item.value}/></SsListItem>
      case 'button':
        return <SsListItem onPress={(event) => {
          this.props.showDrawer && this.props.showDrawer({
            title: 'Logout',
            height: Dimensions.get('window').height / 3,
            content: <View>
              <SsButton primary label={Labels.LOGOUT} onPress={item.dialog.positive}/>
            </View>
          });
        }} style={[Styles.SettingsItem]}>{item.label && <Text style={[Styles.ItemLabel]}>{item.label}</Text>}</SsListItem>
      default:
        return <Text></Text>
    }
  }

  async _setDefault() {
    await SaveValue('settings',this.state.settings);
  }
}

export default Settings;
