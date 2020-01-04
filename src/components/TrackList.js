import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,Animated,FlatList } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { Feather } from '@expo/vector-icons';

import SsButton from './SsButton';

const Styles = StyleSheet.create({
  Search: {
    paddingTop: Constants.largestAmount,
    flex: 1
  },
  SearchTop: {
    paddingLeft: Constants.mediumAmount,
    paddingRight: Constants.mediumAmount,
    paddingBottom: Constants.mediumAmount,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER_COLOR,
    flexDirection: 'row'
  },
  SearchReccomendations: {

  },
  SearchContents: {
    flex: 1
  },
  ResultItem: {
    padding: Constants.mediumAmount
  },
  BorderTop: {
    borderTopWidth: 1,
    borderTopColor: Colors.BORDER_COLOR
  },
  ItemTrackTitle: {
    fontSize: Constants.largeAmount + 2,
    fontWeight: 'bold'
  },
  TrackArtist: {
    fontSize: Constants.largeAmount,
    paddingTop: Constants.smallAmount,
    paddingBottom: Constants.smallAmount
  },
  TrackTitle: {
    fontSize: Constants.largerAmount,
    fontWeight: 'bold'
  },
  NoResults: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  SearchToggle: {
    paddingLeft: Constants.largeAmount,
    paddingRight: Constants.superAmount
  }
});

class TrackList extends React.Component {
  render() {
    return(
      <FlatList data={this.props.tracks} keyExtractor={(item,index) => index.toString()} renderItem={({item}) => {
          <TouchableOpacity onPress={(event) => {
            this.props.showDrawer && this.props.showDrawer({
              title: Labels.TRACK_DETAILS,
              height: Dimensions.get('window').height / 1.2,
              content: <View>
                <View>
                  <Text style={[Styles.TrackTitle]} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <View style={[{

                  }]}>
                    <Text style={[Styles.TrackArtist]}>
                      {item.album.name}
                    </Text>
                    <Text>
                      {item.artists[0].name}
                    </Text>
                  </View>
                  <View style={[{
                    alignItems: 'center',
                    padding: Constants.smallAmount
                  }]}>
                    <Image source={{
                      uri: item.album.images[0].url,
                      width: 300,
                      height: 300
                    }}/>
                    <SsRating max={10}/>
                  </View>
                </View>
                <SsButton primary label={Labels.SHARE} onPress={() => {

                }}/>
              </View>
            });
          }} style={[Styles.ResultItem,index > 0 && Styles.BorderTop]}>

          </TouchableOpacity>
      }}>
        <Text style={[Styles.ItemTrackTitle]} numberOfLines={1}>{item.name}</Text>
        <Text numberOfLines={1}>{item.album.artists[0].name}</Text>
      </FlatList>
    )
  }
}

export default TrackList;
