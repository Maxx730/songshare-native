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
    borderTopColor: Colors.BORDER_COLOR,
    borderTopWidth: 1
  },
  MainHeader: {

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
    textTransform: 'capitalize',
    fontSize: 16
  }
});

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        focused: 'home',
        searchValue: '',
        credentials: {},
        data: {}
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
          GetTokens().then(code => {
            SaveApiInfo(code).then(success => {
              this.RequestData();
            });
          });
        });
      } else {
        DeleteValue('authCode').then(success => {
          if(success) {
            console.log('KEY DELETED');
          }
        });
      }
    });
  }

  render() {
    return(
      <View style={[Styles.Main]}>
        <View style={[Styles.MainHeader]}>
          <View style={[Styles.HeaderActions]}>
            <View style={[Styles.Title]}>
              {this.getTitle()}
            </View>
            {
              this.state.focused !== 'search' && <View style={[Styles.Action]}>
                <SsButton circle tinted icon={'search'} onPress={() => {
                  this.setState({
                    focused: 'search'
                  });
                }}/>
              </View>
            }
            <View style={[Styles.Action]}>
              <SsButton circle tinted icon={'settings'}/>
            </View>
          </View>
        </View>
        <View style={[Styles.MainContent]}>
          {this.getScreen()}
          <Text>{JSON.stringify(this.state.data)}</Text>
          <Text>{JSON.stringify(AuthSession.getRedirectUrl())}</Text>
        </View>
        <View style={[Styles.MainTabs]}>
            <SsTabs tabs={[{
              icon: 'home',
              label: Labels.HOME,
              onPress: () => {
                this.setState({
                  focused: 'home'
                });
              }
            },{
              icon: 'heart',
              label: Labels.SHARES,
              onPress: () => {
                this.setState({
                  focused: 'shares'
                });
              }
            },{
              icon: 'search',
              label: Labels.SEARCH,
              onPress: () => {
                this.setState({
                  focused: 'search'
                });
              }
            },{
              icon: 'user',
              label: Labels.PROFILE,
              onPress: () => {
                this.setState({
                  focused: 'profile'
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
            <SsCarousel header={'Header 1'} subtitle={'Subtitle 1'}>
              <SsTrackItem/>
              <SsTrackItem/>
              <SsTrackItem/>
              <SsTrackItem/>
            </SsCarousel>
            <SsCarousel header={'Header 2'} subtitle={'Subtitle 2'}/>
          </View>
      case 'shares':
        return <View><Text></Text></View>
      case 'search':
        return <Search/>
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
        return <SsInput clear={this.state.searchValue !== '' ? true : false} search circle placeholder={Labels.SEARCH} onChange={(value) => {
          this.setState({
            searchValue: value
          });
        }}/>
      default:
        return <Text style={[Styles.TitleText]}>{this.state.focused}</Text>
    }
  }

  RequestData() {
    SpotifyRequest('https://api.spotify.com/v1/search?q=tania%20bowra&type=artist').then(data => {
      console.log(data);
    });
  }
}

export default Main;
