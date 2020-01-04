import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,FlatList,Dimensions,ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { Feather } from '@expo/vector-icons';
import Labels from '../styles/Labels';
import Global from '../styles/Global';

//Import components
import SsInput from '../components/SsInput';
import SsCarousel from '../components/SsCarousel';
import SsHeader from '../components/SsHeader';
import SsSpinner from '../components/SsSpinner';
import SsDialog from '../components/SsDialog';
import SsTrackInfo from '../components/SsTrackInfo';
import SsRating from '../components/SsRating';
import SsButton from '../components/SsButton';
import SsButtonSet from '../components/SsButtonSet';
import SsSwitch from '../components/SsSwitch';
import SsDrawer from '../components/SsDrawer';
import SsPill from '../components/SsPill';
import SsAvatar from '../components/SsAvatar';

import { LastFmSearchTracks } from '../utils/Last.fm/Api';
import { SpotifyRequest } from '../utils/Spotify/Api';
import { ApiRequest } from '../utils/Network';
import { GetValue,GetSecure } from '../utils/Storage';

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
  },
  User: {
    paddingTop: Constants.largeAmount,
    paddingBottom: Constants.mediumAmount,
    paddingLeft: Constants.largeAmount,
    paddingRight: Constants.largeAmount,
    flexDirection: 'row'
  },
  Username: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  Fullname: {
    fontSize: 12,
    color: Colors.SUBTITLE,
    fontWeight: 'bold'
  }
});

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      loading: false,
      searchUsers: false,
      results: [],
      users: [],
      dialogVisible: false,
      dialogContent: {
        title: '',
        message: '',
        content: null
      }
    }
  }

  componentDidMount() {

  }

  render() {
    return(
      <BlurView style={[Styles.Search]} tint={'light'} intensity={50}>
        <View style={[Styles.SearchTop]}>
          {this._getHeader()}
        </View>
        <View style={[{
            flex: 1
          }]}>
          {this._getContent()}
        </View>
      </BlurView>
    );
  }

  _getHeader() {
      return(
        <View style={[{
          flex: 1,
          flexDirection: 'row'
        }]}>
          <SsInput circle onClear={() => {
            this.setState({
              searchValue: '',
              results: []
            });
          }} style={[{
            marginTop: Constants.mediumAmount,
            flex: 1
          }]} clear={this.state.searchValue !== '' ? true : false} value={this.state.searchValue} search placeholder={Labels.SEARCH} onChange={(value) => {
            //Make sure we are not loading and that the value that we are searching for is not empty
            //otherwise this will reutrn and error.
            if(!this.state.loading && !this.state.searchUsers && value !== '') {
              LastFmSearchTracks('hello').then(response => {
                return response.json();
              }).then(data => {
                this.setState({
                  results: data,
                  loading: false
                });
              });
            }

            if(!this.state.loading && this.state.searchUsers && value != '') {
              GetValue('username').then(username => {
                GetSecure('password').then(password => {
                  ApiRequest(username,password,'/users/find',{
                    username: value
                  },'POST').then(data => {
                    if(data.PAYLOAD){
                      this.setState({
                        users: data.PAYLOAD,
                        loading: false
                      });
                    }
                  });
                });
              });
            }

            if(value !== '') {
              this.setState({
                searchValue: value,
                loading: true
              });
            } else {
              this.setState({
                searchValue: '',
                loading: false
              });
            }
          }}/>
          <TouchableOpacity style={[{
            paddingRight: Constants.mediumAmount,
            paddingLeft: Constants.mediumAmount,
            paddingTop: Constants.largeAmount + 1
          }]} onPress={() => {
            this.setState({
              searchUsers: !this.state.searchUsers
            });
          }}>
            <SsSwitch checked={this.state.searchUsers} icon={'user'}/>
          </TouchableOpacity>
        </View>
      )
  }

  _getContent() {
    if (this.state.loading) {
      return(
        <SsSpinner/>
      )
    } else {
      if(this.state.searchUsers) {
        if(this.state.users.length > 0) {
          return(
            <View>
              {this._getUsers(this.state.users)}
            </View>
          )
        } else {
          return(
            <View style={[{

            }]}>
              <Text>{JSON.stringify(this.state)}</Text>
            </View>
          )
        }
      } else {
        if(this.state.results.length > 0) {
          return(
            <View>

            </View>
          )
        } else {
          return(
            <View>
              <Text>Tracks</Text>
            </View>
          )
        }
      }
    }
  }

  _getTracks() {

  }

  _getUsers(data) {
    return(
      <FlatList data={data} keyExtractor={(key,index) => {return index.toString()}} renderItem={({item,index}) => {
        return (
          <View style={[Styles.User,index > 0 && Styles.BorderTop]}>
            <TouchableOpacity style={[{
              flexDirection: 'row'
            }]}>
              <SsAvatar round name={item.username}/>
              <View style={[{
                paddingLeft: Constants.mediumAmount
              }]}>
                <Text style={[Styles.Username]}>
                  {item.username}
                </Text>
                <Text style={[Styles.Fullname]}>
                  {item.firstname} {item.lastname}
                </Text>
              </View>
              <View style={[{

              }]}>
                <SsButton style={{

                }} small link circle label={'Follow'}/>
              </View>
            </TouchableOpacity>
          </View>
        )
      }}/>
    )
  }
}

export default Search;
