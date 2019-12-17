import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,FlatList } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { FontAwesome } from '@expo/vector-icons';

//Import components here.
import SsListItem from '../components/SsListItem';
import SsSwitch from '../components/SsSwitch';

const Styles = StyleSheet.create({
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
      preferences : [{
        id: 0,
        label: 'Boolean 1',
        type: 'boolean',
        value: true
      },{
        id: 1,
        label: 'Boolean 2',
        type: 'boolean',
        value: false
      }]
    }
  }

  render() {
    return(
      <FlatList
        data={this.state.preferences}
        renderItem={({item}) => {
          return (<View>
              {
                this.renderPreference(item)
              }
            </View>)
        }}/>
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
      default:
        return <Text></Text>
    }
  }
}

export default Settings;
