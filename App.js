import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SsInput from './src/components/SsInput';
import SsButton from './src/components/SsButton';
import SsButtonSet from './src/components/SsButtonSet';
import SsCard from './src/components/SsCard';
import SsCollapse from './src/components/SsCollapse';

//Import the different app screens here.
import Login from './src/views/Login';
import Register from './src/views/Register';
import Forgot from './src/views/Forgot';
import Profile from './src/views/Profile';
import Settings from './src/views/Settings';
import Main from './src/views/Main';

const MainNavigation = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      title: 'Songshare',
      header: null
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings'
    }
  },
  Profile: {
    screen: Profile
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      header: null
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      header: null
    }
  },
  Forgot: {screen: Forgot}
});

const App = createAppContainer(MainNavigation);

export default App;
