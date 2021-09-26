import React from 'react';
import './App.css';
// import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Collection from './components/Collection/Collection'

interface sessionTokenState {
 sessionToken: string | null
}

class App extends React.Component <{},sessionTokenState> {
    state = {
      sessionToken: '',
    }
  

  componentDidMount = () => {
    if (localStorage.getItem('token')) {
      this.setState({sessionToken: localStorage.getItem('token')} );
    }

  }

  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    this.setState({sessionToken: (newToken)});
  }

  clearToken = () => {
    localStorage.clear();
    this.setState({sessionToken: ('')});
  }

  protectedViews = () => {

    return (this.state.sessionToken === localStorage.getItem('token') ? <Collection token={this.state.sessionToken} clickLogout={this.clearToken} />
      : <Signup updateToken={this.updateToken} />)

      // clickLogout={this.clearToken}

  }
  render() {
  return (
    <div>
      {this.protectedViews()}
    </div>

  )};
  }

export default App;
