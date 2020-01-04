import React from 'react';
import { View,Text,StyleSheet,KeyboardAvoidingView,TouchableOpacity,Image } from 'react-native';
import Constants from '../styles/Constants';
import Colors from '../styles/Colors';
import Labels from '../styles/Labels';
import Global from '../styles/Global';

const Styles= StyleSheet.create({
  Feed: {
    paddingTop: Constants.largestAmount,
    flex: 1
  },
  Header: {

  }
})

//Class that makes a query to the Songshare API to find all the tracks,
//shared by this user's friends.
class Feed extends React.Component {
  render() {
    return(
      <View style={[Styles.Feed]}>
        <View>
          <Text style={[Global.ScreenTitle]}>
            {Labels.FEED}
          </Text>
          <Text style={[Global.ScreenSubTitle]}>
            {Labels.FRIENDS_SHARED}
          </Text>
        </View>
      </View>
    )
  }
}

export default Feed;
