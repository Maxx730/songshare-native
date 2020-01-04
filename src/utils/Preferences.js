import Labels from '../styles/Labels';

export default {
  preferences : [{
    id: 0,
    label: 'Boolean 1',
    type: 'boolean',
    value: true
  },{
    id: 1,
    label: 'Boolean 2',
    type: 'boolean',
    value: false
  },{
    id: 2,
    label: 'Boolean 3',
    type: 'boolean',
    value: true
  },{
    id: 3,
    label: 'Logout',
    type: 'button',
    dialog: {
      title: Labels.LOGOUT,
      message: Labels.CONFIRM_LOGOUT,
      onPress: (context) => {
        console.log(context)
      }
    }
  },
  {
    id: 4,
    type: 'button',
    label: Labels.ABOUT,
    dialog: {
      title: Labels.ABOUT,
      message: 'Created by John M Kinghorn'
    }
  }]
}
