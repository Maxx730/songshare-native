import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,FlatList } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import Labels from '../styles/Labels';
import Global from '../styles/Global';
import Preferences from '../utils/Preferences';
import { FontAwesome } from '@expo/vector-icons';
import { Dialog,ConfirmDialog } from 'react-native-simple-dialogs';

//Import components here.
import SsListItem from '../components/SsListItem';
import SsSwitch from '../components/SsSwitch';
import SsDialog from '../components/SsDialog';

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
  }
})

class Settings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      preferences : Preferences.preferences,
      dialogVisible: false,
      dialog: {
        title: 'TEST 1',
        message: 'TESTING MESSAGE'
      }
    }
  }

  render() {
    return(
      <View style={[Styles.Settings]}>
        <SsDialog type={'confirm'} title={this.state.dialog.title} message={this.state.dialog.message} visible={this.state.dialogVisible} positiveButton={{
          title: 'Confirm',
          onPress: () => {
            this.setState({
              dialogVisible: false
            })
          }
        }} negativeButton={{
          title: 'Cancel',
          onPress: () => {
            this.setState({
              dialogVisible: false
            })
          }
        }}/>
        <View>
          <Text style={[Global.ScreenTitle]}>
            {Labels.SETTINGS}
          </Text>
          <Text style={[Global.ScreenSubTitle]}>
            {Labels.CUSTOMIZE_EXP}
          </Text>
        </View>
        <View>
          <FlatList
            data={this.state.preferences}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => {
              return (<View>
                  {
                    this.renderPreference(item)
                  }
                </View>)
            }}/>
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
          this.setState({
            dialog: item.dialog,
            dialogVisible: true
          })
        }} style={[Styles.SettingsItem]}>{item.label && <Text style={[Styles.ItemLabel]}>{item.label}</Text>}</SsListItem>
      default:
        return <Text></Text>
    }
  }
}

export default Settings;
