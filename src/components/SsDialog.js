import React from 'react';
import { View,Text,StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import Colors from '../styles/Colors';
import Constants from '../styles/Constants';
import Global from '../styles/Global';
import { Feather } from '@expo/vector-icons';
import { Dialog,ConfirmDialog } from 'react-native-simple-dialogs';

const Styles = StyleSheet.create({
  SsDialog: {

  },
  DialogTitle: {
    textAlign: 'left'
  }
})

//Class used for showing different types of dialogs.
class SsDialog extends React.Component {
  render() {
    return(
      <View style={[Styles.SsDialog]}>
        {
          this.getDialogType(this.props.type)
        }
      </View>
    )
  }

  //Returns a bunch of different types of dialogs from standard to progress dialogs.
  getDialogType(type) {
    switch(type) {
      case 'confirm':
        return <ConfirmDialog titleStyle={[Global.AlignTextLeft]} messageStyle={[Global.AlignTextLeft]} visible={this.props.visible} title={this.props.title} message={this.props.message} positiveButton={this.props.positiveButton} negativeButton={this.props.negativeButton}/>
      default:
        return <Dialog visible={this.props.visible} title={this.props.title} message={this.props.message}/>
    }
  }
}

export default SsDialog;
