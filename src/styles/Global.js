import { StyleSheet } from 'react-native';
import Constants from './Constants';

export default StyleSheet.create({
  ScreenTitle: {
    fontSize: Constants.largestAmount,
    fontWeight: 'bold',
    paddingLeft: Constants.mediumAmount
  },
  ScreenSubTitle: {
    paddingLeft: Constants.mediumAmount
  },
  AlignTextLeft: {
    textAlign: 'left'
  }
});
