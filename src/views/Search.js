import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,FlatList } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { FontAwesome } from '@expo/vector-icons';
import Labels from '../styles/Labels';

//Import components
import SsInput from '../components/SsInput';
import SsCarousel from '../components/SsCarousel';
import SsHeader from '../components/SsHeader';
import SsSpinner from '../components/SsSpinner';

import { SpotifyRequest } from '../utils/Spotify/Api';

const Styles = StyleSheet.create({
  Search: {
    padding: Constants.largeAmount
  },
  SearchTop: {

  },
  SearchReccomendations: {

  }
});

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      results: []
    }
  }

  componentDidMount() {
    SpotifyRequest('https://api.spotify.com/v1/browse/categories').then(results => {
      console.log('working')
      this.setState({
        results: results
      })
    })
  }

  render() {
    return(
      <View style={[Styles.Search]}>
      <Text>{JSON.stringify(this.state.results)}</Text>
        {
          this.props.term !== '' && <SsSpinner/>
        }
      </View>
    );
  }
}

export default Search;
