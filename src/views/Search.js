import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,FlatList } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { FontAwesome } from '@expo/vector-icons';
import Labels from '../styles/Labels';
import Global from '../styles/Global';

//Import components
import SsInput from '../components/SsInput';
import SsCarousel from '../components/SsCarousel';
import SsHeader from '../components/SsHeader';
import SsSpinner from '../components/SsSpinner';

import { SpotifyRequest } from '../utils/Spotify/Api';

const Styles = StyleSheet.create({
  Search: {
    paddingTop: Constants.largestAmount,
    flex: 1
  },
  SearchTop: {

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
  }
});

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      loading: false,
      results: []
    }
  }

  componentDidMount() {

  }

  render() {
    return(
      <View style={[Styles.Search]}>
        <Text style={[Global.ScreenTitle]}>
          {Labels.SEARCH}
        </Text>
        <Text style={[Global.ScreenSubTitle]}>
          {Labels.FIND_TRACKS}
        </Text>
        <SsInput onClear={() => {
          this.setState({
            searchValue: ''
          });
        }} style={[{
          marginTop: Constants.mediumAmount
        }]} clear={this.state.searchValue !== '' ? true : false} value={this.state.searchValue} search placeholder={Labels.SEARCH} onChange={(value) => {
          //Make sure we are not loading and that the value that we are searching for is not empty
          //otherwise this will reutrn and error.
          if(!this.state.loading && value !== '') {
            SpotifyRequest(`https://api.spotify.com/v1/search?q=${value}&type=track`).then(data => {
              this.setState({
                results: data.tracks.items,
                loading: false
              });
            });
          }

          this.setState({
            searchValue: value,
            loading: true
          });
        }}/>
        {
          this.state.loading && <View style={[{
            flex: 1
          }]}>
            <SsSpinner/>
          </View>
        }
        <View style={[Styles.SearchContents]}>
          {
            (!this.state.loading && this.state.results.length > 0) && <FlatList keyExtractor={(item, index) => item.id} data={this.state.results} renderItem={(item,index) => {
                return(
                  <TouchableOpacity style={[Styles.ResultItem,Styles.BorderTop]}>
                    <Text style={[Styles.ItemTrackTitle]} numberOfLines={1}>{item.item.name}</Text>
                    <Text numberOfLines={1}>{item.item.album.artists[0].name}</Text>
                  </TouchableOpacity>
                )
              }
            }/>
          }
        </View>
      </View>
    );
  }
}

export default Search;
