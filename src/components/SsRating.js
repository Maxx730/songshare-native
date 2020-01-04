import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import Labels from '../styles/Labels';
import { FontAwesome,Feather } from '@expo/vector-icons';

const Styles = StyleSheet.create({
  SsRating: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  RatingIcon: {
    margin: Constants.tinyAmount
  }
})

class SsRating extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      number: new Array(this.props.max)
    }
  }

  render() {
    return(
      <View>
        <View style={[Styles.SsRating]}>
          {
            this.GetStars()
          }
        </View>
      </View>
    );
  }

  GetStars() {
    let stars = [];

    for(let i = 0;i < this.props.max;i++) {
      stars.push(<View key={`star-${i}`} style={[Styles.RatingIcon]}><FontAwesome name={'star'} color={(this.props.value - 1) < i ? Colors.BORDER_COLOR : Colors.PRIMARY} size={24}/></View>)
    }

    return stars;
  }
}

export default SsRating;
