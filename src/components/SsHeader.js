import React from 'react';
import { View,Text,StyleSheet,TextInput } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';

const Styles = StyleSheet.create({
  SsHeader: {
    padding: Constants.mediumAmount
  }
});

class SsHeader extends React.Component {
  render() {
    return(
      <View style={[Styles.SsHeader]}>
        <Text style={[{fontSize: this.getSize(),color: this.getColor()},this.props.style && this.props.style]}>
          {this.props.children}
        </Text>
      </View>
    );
  }

  getSize() {
    let size = this.props.size || 'h1';

    switch(size) {
      default:
        return 36
    }
  }

  getColor() {
    return this.props.light ? Colors.WHITE : Colors.BLACK
  }
}

export default SsHeader;
