import React from 'react';
import { View,Text,StyleSheet,KeyboardAvoidingView,TouchableOpacity,Image } from 'react-native';
import Constants from '../styles/Constants';
import Colors from '../styles/Colors';
import Labels from '../styles/Labels';

const Styles= StyleSheet.create({
  Feed: {

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
        <View style={[Styles.Header]}>
          <Text>
            {Labels.FEED}
          </Text>
          <Text>
            {Labels.FRIENDS_SHARED}
          </Text>
        </View>
      </View>
    )
  }
}

export default Feed;
