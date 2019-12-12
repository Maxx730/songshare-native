import React from 'react';
import { View,Text,StyleSheet,TextInput,TouchableOpacity,Modal,ScrollView } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import Labels from '../styles/Labels';
import { Feather } from '@expo/vector-icons';

import SsButton from './SsButton';

const Styles = StyleSheet.create({
  SsModal: {
    flex: 1
  },
  Head: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER_COLOR,
    flexDirection: 'row'
  },
  Content: {
    paddingTop: Constants.largeAmount,
    paddingBottom: Constants.largeAmount,
    paddingLeft: Constants.largeAmount + 12,
    paddingRight: Constants.largeAmount + 12
  },
  Actions: {
    flex:1,
    justifyContent: 'flex-end',
    borderTopColor: Colors.BORDER_COLOR,
    borderTopWidth: 1,
    padding: Constants.largeAmount
  },
  CloseBox: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.BORDER_COLOR,
    justifyContent: 'flex-end',
    padding: Constants.largeAmount
  }
})

class SsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: this.props.visible || false
    }
  }

  render() {
    return(
      <View style={[Styles.SsModal]}>
        <Modal
        animationType='slide'
        transparent={false}
        visible={this.state.visible}
        style={[Styles.SsModal]}>
          <View style={[Styles.Head]}>
            <Text style={[{
              fontWeight: 'bold',
              fontSize: 18,
              flex: 1,
                padding: Constants.largeAmount,
            }]}>
              {this.props.title}
            </Text>
            <TouchableOpacity style={[Styles.CloseBox]} onPress={() => {
              this.props.onClose && this.props.onClose();
            }}>
              <Feather name='x' size={24}/>
            </TouchableOpacity>
          </View>
          <ScrollView style={[Styles.Content]}>
            {this.props.children}
          </ScrollView>
        </Modal>
      </View>
    );
  }
}

export default SsModal;
