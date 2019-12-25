import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,Animated } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { Feather } from '@expo/vector-icons';

//import components here
import SsButton from './SsButton';

//Import utils here
import { SpotifyRequest } from '../utils/Spotify/Api';

const Styles = StyleSheet.create({
  SsNowPlaying: {
    backgroundColor: Colors.WHITE,
    paddingTop: Constants.mediumAmount,
    paddingBottom: Constants.mediumAmount,
    paddingLeft: Constants.largerAmount,
    paddingRight: Constants.largerAmount,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.BORDER_COLOR
  },
  TrackTitle: {
    fontWeight: 'bold',
    fontSize: Constants.largerAmount
  },
  Artist: {

  }
});

class SsNowPlaying extends React.Component {
  constructor(props) {
    super(props);

    //When the component loads we are going to make a request to the Spotify API,
    //to see if the user is currently playing anything.  If not we are not going
    //to show this component to save screen realistate.
    this.state = {
      playing: false,
      track: null
    }
  }

  componentDidMount() {
    //Check if the user is actually playing anything currently.
    SpotifyRequest(`https://api.spotify.com/v1/me/player/currently-playing`).then(data => {

    })
  }

  render() {
    return(
      <View style={[Styles.SsNowPlaying]}>
        <View>
          <Text style={[Styles.TrackTitle]}>
            Now Playing
          </Text>
          <Text style={[Styles.Artist]}>
            Artist
          </Text>
        </View>
        <View>

        </View>
      </View>
    );
  }
}

export default SsNowPlaying;
