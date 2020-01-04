import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,Animated } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import Labels from '../styles/Labels';
import { Feather } from '@expo/vector-icons';

import SsRating from './SsRating';

const Styles = StyleSheet.create({
  SsTrackInfo: {

  },
  TrackTitle: {
    fontWeight: 'bold',
    fontSize: Constants.largerAmount
  },
  TrackArtist: {
    paddingTop: Constants.smallAmount,
    paddingBottom: Constants.smallAmount,
    fontWeight: 'bold'
  },
  TrackInfo: {

  },
  TrackTime: {
    paddingTop: Constants.mediumAmount
  },
  TrackPopularity: {
    padding: Constants.largeAmount
  }
})

class SsTrackInfo extends React.Component {
  render() {
    const track = this.props.track;
    return(
      <View style={[Styles.SsTrackInfo]}>
        <View style={[{
          flexDirection: 'row'
        }]}>
          <View style={[{
            flex: 1
          }]}>
            <Text numberOfLines={1} style={[Styles.TrackTitle]}>{track.name}</Text>
            <Text numberOfLines={1}>{track.album.name}</Text>
            <Text style={[Styles.TrackArtist]}>{track.album.artists[0].name}</Text>
          </View>
          <View style={[Styles.TrackInfo]}>
            <Text style={[Styles.TrackTime]}>{this.convertTime(track.duration_ms)}</Text>
            <Text>{JSON.stringify(track.explicit)}</Text>
          </View>
        </View>
        <View>
          <Image source={{
            uri: track.album.images[0].url,
            width: 320,
            height: 320
          }}/>
        </View>
        <View style={[Styles.TrackPopularity]}>
          <SsRating max={10} value={Math.round(track.popularity / 10)}/>
        </View>
      </View>
    )
  }

  //Convert the track length from milliseconds to minutes and seconds.
  convertTime(milliseconds) {
    let minutes = Math.floor(milliseconds / 60000);
    let seconds = Math.floor((milliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10) ? `0${seconds}` : seconds}`;
  }
}

export default SsTrackInfo;
