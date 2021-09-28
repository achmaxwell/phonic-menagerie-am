import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import NavMain from './components/Common/NavMain'
import Login from './components/Auth/Login';

interface sessionTokenState {
 sessionToken: string | null
 isAdmin: string | null
}

class App extends React.Component <{},sessionTokenState> {
    state = {
      sessionToken: '',
      isAdmin: ''
    }
  

  componentDidMount = () => {
    if (localStorage.getItem('token')) {
      this.setState({sessionToken: localStorage.getItem('token')} );
    }
    if (localStorage.getItem('admin')) {
      this.setState({isAdmin: localStorage.getItem('admin')} );
    }
  }

  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    this.setState({sessionToken: newToken});
  }

  updateAdmin = (newAdmin: string) => {
    localStorage.setItem('admin', newAdmin);
    this.setState({isAdmin: newAdmin});
  }

  clearToken = () => {
    localStorage.clear();
    this.setState({sessionToken: ('')});
  }

  protectedViews = () => {
    return (
      this.state.sessionToken === localStorage.getItem('token') ? 
      <div className="bgDiv">
        
          <NavMain token={this.state.sessionToken} clickLogout={this.clearToken} isAdmin={this.state.isAdmin}/>
        
      
      </div>
      : <Login updateToken={this.updateToken} clickLogout={this.clearToken} updateAdmin={this.updateAdmin}/>
      )

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
