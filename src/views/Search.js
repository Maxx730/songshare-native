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
      searchValue: ''
    }
  }

  render() {
    return(
      <View style={[Styles.Search]}>
        <View style={[Styles.SearchReccomendations]}>
          <SsCarousel/>
          <SsCarousel/>
        </View>
      </View>
    );
  }
}

export default Search;
