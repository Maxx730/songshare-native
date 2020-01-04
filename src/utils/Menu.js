import Labels from '../styles/Labels';

export default [
  {
    icon: 'home',
    label: Labels.HOME,
    onPress: () => {
      this.setState({
        focused: 'home',
        menuOpen: false
      });
    }
  },{
    icon: 'heart',
    label: Labels.SHARES,
    onPress: () => {
      this.setState({
        focused: 'shares',
        menuOpen: false
      });
    }
  },{
    icon: 'search',
    label: Labels.SEARCH,
    onPress: () => {
      this.setState({
        focused: 'search',
        menuOpen: false
      });
    }
  },{
    icon: 'user',
    label: Labels.SEARCH,
    onPress: () => {
      this.setState({
        focused: 'profile',
        menuOpen: false
      });
    }
  },{
    icon: 'settings',
    label: Labels.PROFILE,
    onPress: () => {
      this.setState({
        focused: 'settings',
        menuOpen: false
      });
    }
  }
]
