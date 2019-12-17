import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,FlatList } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { FontAwesome } from '@expo/vector-icons';
import Labels from '../styles/Labels';

//Import components here.
import SsTabs from '../components/SsTabs';

//Import views here.
import Profile from './Profile';

const Styles = StyleSheet.create({
  Main: {
    flex: 1
  },
  MainContent: {
    flex: 1
  },
  MainTabs: {
    borderTopColor: Colors.BORDER_COLOR,
    borderTopWidth: 1
  }
});

class Main extends React.Component {
  render() {
    return(
      <View style={[Styles.Main]}>
        <View style={[Styles.MainContent]}>
          <Profile/>
        </View>
        <View style={[Styles.MainTabs]}>
            <SsTabs tabs={[{
              icon: 'home',
              label: Labels.HOME
            },{
              icon: 'heart',
              label: Labels.SHARES
            },{
              icon: 'search',
              label: Labels.SEARCH
            },{
              icon: 'user',
              label: Labels.PROFILE
            }]}/>
        </View>
      </View>
    );
  }
}

export default Main;
