import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,FlatList,Dimensions,StatusBar } from 'react-native';
import SnackBar from 'react-native-snackbar-component';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import { Feather } from '@expo/vector-icons';
import Labels from '../styles/Labels';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthSession } from 'expo';
import { ApiRequest } from '../utils/Network';
import { Analytics, PageHit } from 'expo-analytics';
import { registerForPushNotificationsAsync } from '../utils/Notification';

//Import components here.
import SsTabs from '../components/SsTabs';
import SsHeader from '../components/SsHeader';
import SsButton from '../components/SsButton';
import SsInput from '../components/SsInput';
import SsCarousel from '../components/SsCarousel';
import SsTrackItem from '../components/SsTrackItem';
import SsDropdown from '../components/SsDropdown';
import SsSpinner from '../components/SsSpinner';
import SsNowPlaying from '../components/SsNowPlaying';
import SsDrawer from '../components/SsDrawer';

//Import views here.
import Profile from './Profile';
import Search from './Search';
import Settings from './Settings';
import Feed from './Feed';

import Scopes from '../utils/Spotify/Scopes';
import { GetSpotCode,GetTokens,SaveApiInfo,SpotifyRequest } from '../utils/Spotify/Api';
import { SaveValue,GetValue,HasValue,DeleteValue,SaveSecure,GetSecure } from '../utils/Storage';
import { RecordEvent } from '../utils/Analytics';

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

    this._showSnackbar = this._showSnackbar.bind(this);
    this._showDrawer = this._showDrawer.bind(this);

    this.state = {
        drawerOpen: false,
        drawer: {
          title: 'Default Head',
          content: null
        },
        focused: 'home',
        snackbar: {
          visible: false,
          message: 'test message'
        }
    }
  }

  componentDidMount() {
    //Check if the user has already had data set, if so let them continue if not then check next
    //otherwise send them back to the login screen.
    //Make sure we are passed a user object which should happen if the login happened successfully.
    HasValue('user_id').then(async data => {
      //If the id has not been set, check to see if there are login credentials.
      if(!data) {
        if(this.props.navigation.state.params) {
          //If these params exist, then we want to get the auth code and all
          //the information needed to start making API calls.
          let user = this.props.navigation.state.params.user;

          SaveValue('user_id',`${user._id}`);
          SaveValue('username',user.username);
          SaveValue('email',user.email);
          //Securely save the password for later api calls.
          await SaveSecure('password',this.props.navigation.state.params.password).catch(err => {
            //If unable to save the password redirect the user to the login page.
            this.props.navigation.navigate('Login');
          });

          //Make API request here.
          //Check if the user has a Auth code if not then we need to get access to Spotify from the user.
          //Otherwise we can start making requests.
          HasValue('authCode').then(async value => {
            if(!value) {
              console.log('SETTING NOTIFICATION TOKEN');
              //Send the notification token to the server.
              await GetSecure('password').then(password => {
                //Send the notification token to the server.
                registerForPushNotificationsAsync().then(data => {
                    ApiRequest(user.username,password,'/notification',{
                      id: user._id,
                      token: data
                    },'POST').then(result => {
                      console.log(result)
                    });
                });
              })

              console.log('RETRIEVING NEW SPOTIFY AUTH CODE');
              GetSpotCode('maxx730','drmario').then(code => {
                GetTokens().then(tokenCode => {
                  SaveApiInfo(tokenCode).then(success => {
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
              this.RequestData();
            }
          });
        }
      }
    });
  }

  render() {
    return(
      <View style={[Styles.Main]}>
        <StatusBar barStyle="dark-content" />
        <SnackBar visible={this.state.snackbar.visible} accentColor={Colors.WHITE} backgroundColor={Colors.PRIMARY} textMessage={this.state.snackbar.message} actionHandler={()=>{
          this.setState({
            snackbar: {
              visible: false,
              message: this.state.snackbar.message
            }
          })
        }} actionText="Close"/>
        {
          this.state.focused === 'home' && <View style={[Styles.MainHeader]}>
            <View style={[Styles.HeaderActions]}>
              <View style={[Styles.Title]}>
                {this.getTitle()}
              </View>
              <View style={[Styles.Action]}>

              </View>
            </View>
          </View>
        }
        <View style={[Styles.MainContent]}>
          {this.getScreen()}
        </View>
        <View style={[{
          justifyContent: 'flex-end'
        }]}>
          <View style={[Styles.MainTabs]}>
              <SsTabs tabs={[{
                icon: 'home',
                label: Labels.HOME,
                onPress: () => {
                  this.setState({
                    focused: 'home'
                  });
                  RecordEvent('tabs','home','home');
                }
              },{
                icon: 'heart',
                label: Labels.SHARES,
                onPress: () => {
                  this.setState({
                    focused: 'shares'
                  });
                  RecordEvent('tabs','feed','feed');
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
                  RecordEvent('tabs','profile','profile');
                }
              },{
                icon: 'settings',
                label: Labels.PROFILE,
                onPress: () => {
                  this.setState({
                    focused: 'settings'
                  });
                  RecordEvent('tabs','settings','settings');
                }
              }]}/>
          </View>
          {
            this.state.drawerOpen && <SsDrawer height={this.state.drawer.height} head={this.state.drawer.title} onClose={() => {
              this.setState({
                drawerOpen: false
              })
            }}>
              {this.state.drawer.content && this.state.drawer.content}
            </SsDrawer>
          }
        </View>
      </View>
    );
  }

  getScreen() {
    switch(this.state.focused) {
      case 'home':
        return <View>


          </View>
      case 'shares':
        return <Feed/>
      case 'search':
        return <Search showDrawer={this._showDrawer} showSnackbar={this._showSnackbar} term={this.state.searchValue}/>
      case 'profile':
       return <View></View>
      case 'settings':
        return <Settings showDrawer={this._showDrawer} navigate={this.props.navigation.navigate}/>
      default:
        return <View><Text></Text></View>
    }
  }

  getTitle() {
    switch(this.state.focused) {
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
      }).catch(err => {
        console.log(err)
      });
    })
  }

  //Method for other views such as search etc to show the snackbar with a message.
  _showSnackbar(data) {
    this.setState({
      snackbar: {
        visible: true,
        message: data.message
      }
    });

    //Once the snackbar has been shown, we want to hide it unless the user tells it not to be hidden.
    setTimeout(() => {
      this.setState({
        snackbar: {
          visible: false
        }
      })
    },data.timeout || 1000);
  }

  //Shows the drawer, method that is passed to other child screens and components.
  _showDrawer(drawer) {
    this.setState({
      drawerOpen: true,
      drawer: drawer
    });
  }
}

export default Main;
