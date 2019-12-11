import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SsInput from './src/components/SsInput';
import SsButton from './src/components/SsButton';
import SsButtonSet from './src/components/SsButtonSet';
import SsCard from './src/components/SsCard';
import SsCollapse from './src/components/SsCollapse';

//Import the different app screens here.
import Login from './src/views/Login';

const MainNavigation = createStackNavigator({
  Login: {screen: Login}
})

const App = createAppContainer(MainNavigation);

export default App;
