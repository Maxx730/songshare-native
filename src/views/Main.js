import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,FlatList,Dimensions,StatusBar } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { Feather } from '@expo/vector-icons';
import Labels from '../styles/Labels';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthSession } from 'expo';
import { ApiRequest } from '../utils/Network.js';

//Import components here.
import SsTabs from '../components/SsTabs';
import SsHeader from '../components/SsHeader';
import SsButton from '../components/SsButton';
import SsInput from '../components/SsInput';
import SsCarousel from '../components/SsCarousel';
import SsTrackItem from '../components/SsTrackItem';
import SsDropdown from '../components/SsDropdown';
import SsSpinner from '../components/SsSpinner';

//Import views here.
import Profile from './Profile';
import Search from './Search';
import Settings from './Settings';

import Scopes from '../utils/Spotify/Scopes';
import { GetSpotCode,GetTokens,SaveApiInfo,SpotifyRequest } from '../utils/Spotify/Api';
import { SaveValue,GetValue,HasValue,DeleteValue } from '../utils/Storage';

const Styles = StyleSheet.create({
  Main: {
    flex: 1
  },
  MainContent: {
    flex: 1
  },
  MainTabs: {

  },
  MainHeader: {
    paddingTop: Constants.mediumAmount
  },
  HeaderActions: {
    flexDirection: 'row',
    paddingRight: Constants.largeAmount,
    paddingLeft: Constants.largeAmount,
    paddingTop: Constants.largeAmount
  },
  Action: {

  },
  Title: {
    flex: 2.5
  },
  TitleText: {
    flex: 1,
    justifyContent: 'center',
    padding: Constants.largeAmount,
    textAlignVertical: 'center',
    textTransform: 'uppercase',
    fontSize: Constants.largerAmount,
    color: Colors.WHITE
  }
});

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        focused: 'home',
        searchValue: '',
        credentials: {},
        data: null,
        menuOpen: false,
        loading: true,
        albums: []
    }
  }

  componentDidMount() {
    //Make API request here.
    //Check if the user has a Auth code if not then we need to get access to Spotify from the user.
    //Otherwise we can start making requests.
    HasValue('authCode').then(value => {
      if(!value) {
        console.log('RETRIEVING NEW SPOTIFY AUTH CODE');
        GetSpotCode('maxx730','drmario').then(code => {
          GetTokens().then(tokenCode => {
            // console.log(code);
            SaveApiInfo(tokenCode).then(success => {
              this.RequestData();
            });
          });
        });
      } else {
        // DeleteValue('authCode').then(success => {
        //   if(success) {
        //     console.log('KEY DELETED');
        //   }
        // });
        this.RequestData();
      }
    });
  }

  render() {
    return(
      <View style={[Styles.Main]}>
        <View style={{
          width: Dimensions.get('window').width * 1.5,
          height: 450,
          backgroundColor: Colors.PRIMARY_LIGHT,
          position: 'absolute',
          transform: [{ rotate: '-10deg'}],
          top: -250,
          left: -200
        }}>

        </View>
        <View style={{
          width: Dimensions.get('window').width * 1.5,
          height: 400,
          backgroundColor: Colors.PRIMARY,
          position: 'absolute',
          transform: [{ rotate: '-10deg'}],
          top: -250,
          left: -200
        }}>

        </View>
        <View style={[Styles.MainHeader]}>
          <View style={[Styles.HeaderActions]}>
            <View style={[Styles.Title]}>
              {this.getTitle()}
            </View>
            <View style={[Styles.Action]}>
              <SsDropdown onPress={() => {
                this.setState({
                  menuOpen: !this.state.menuOpen
                })
              }} open={this.state.menuOpen} data={[
                {
                  label: 'Search',
                  icon: 'search',
                  onPress:() => {

                  }
                },
                {
                  label: 'Settings',
                  icon: 'settings',
                  onPress: () => {
                      const {navigate} = this.props.navigation;
                      navigate('Settings')
                  }
                }
              ]} icon={'more-vertical'} iconColor={Colors.WHITE}/>
            </View>
          </View>
        </View>
        <View style={[Styles.MainContent]}>
          {this.getScreen()}
        </View>
        <View style={[Styles.MainTabs]}>
            <SsTabs tabs={[{
              icon: 'home',
              label: Labels.HOME,
              onPress: () => {
                this.setState({
                  focused: 'home',
                  menuOpen: false
                });
              }
            },{
              icon: 'heart',
              label: Labels.SHARES,
              onPress: () => {
                this.setState({
                  focused: 'shares',
                  menuOpen: false
                });
              }
            },{
              icon: 'play',
              label: Labels.SHARES,
              onPress: () => {
                this.setState({
                  focused: 'playing',
                  menuOpen: false
                });
              }
            },{
              icon: 'search',
              label: Labels.SEARCH,
              onPress: () => {
                this.setState({
                  focused: 'search',
                  menuOpen: false,
                  menuOpen: false
                });
              }
            },{
              icon: 'user',
              label: Labels.PROFILE,
              onPress: () => {
                this.setState({
                  focused: 'profile',
                  menuOpen: false
                });
              }
            }]}/>
        </View>
      </View>
    );
  }

  getScreen() {
    switch(this.state.focused) {
      case 'home':
        return <View>
            {
              (!this.state.loading && this.state.data) && <SsCarousel style={[{
                transform: [{ rotate: '-10deg'}],
                width: Dimensions.get('window').width + 100,
                marginLeft: - 50
              }]} headerStyle={[{
                paddingLeft: Constants.superAmount + Constants.largeAmount
              }]} header={'Explore'} subtitle={'Categories'} data={this.state.data.categories.items}/>
            }

            {
              (!this.state.loading && this.state.data) && <SsCarousel style={[{
                transform: [{ rotate: '-10deg'}],
                width: Dimensions.get('window').width + 100,
                marginLeft: - 50
              }]} headerStyle={[{
                paddingLeft: Constants.superAmount + Constants.largeAmount
              }]} header={'Explore'} data={this.state.data.categories.items}/>
            }
          </View>
      case 'shares':
        return <View><Text></Text></View>
      case 'search':
        return <Search term={this.state.searchValue}/>
      case 'profile':
       return <Profile/>
      case 'settings':
        return <Settings/>
      default:
        return <View><Text></Text></View>
    }
  }

  getTitle() {
    switch(this.state.focused) {
      case 'search':
        return <SsInput clear={this.state.searchValue !== '' ? true : false} search tinted placeholder={Labels.SEARCH} onChange={(value) => {
          this.setState({
            searchValue: value
          });
        }}/>
      default:
        return <Text style={[Styles.TitleText]}></Text>
    }
  }

  RequestData() {
    GetValue('authCode').then(value => {
      SpotifyRequest('https://api.spotify.com/v1/browse/categories').then(data => {
        this.setState({
          data: data.error ? null : data
        });
      });

      SpotifyRequest(`https://api.spotify.com/v1/browse/new-releases`).then(data => {
        this.setState({
          albums: data.albums.items,
          loading: false
        });
      });
    })
  }
}

export default Main;
