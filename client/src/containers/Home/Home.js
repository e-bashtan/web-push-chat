import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'

import Registration from '../../components/Registration/Registration'
import Login from '../../components/Login/Login'
import Messages from '../../components/Messages/Messages'
import PostMessage from '../../components/PostMessage/PostMessage'
import { Wrapper, Header } from './Style'

@inject("store") @observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;

    this.onLogin = this.onLogin.bind(this);
    this.onRegistration = this.onRegistration.bind(this);
    this.onPostMessage = this.onPostMessage.bind(this);

    this.state = {
      user: 'Unknown user'
    }
  }

  onLogin(user){
    this.setState({user});
  }

  onRegistration(user){
    this.setState({user});
  }

  onPostMessage(text){
    const {user: sender} = this.state;
    this.store.postMessage({sender, text});
  }

  render() {
    const { messages, totalMessages } = this.store;

    return (
      <Wrapper>
        <Header>Web chat by PUSH API[through Firebase]</Header>
        <Header>{`Total messages: ${totalMessages}`}</Header>
        <Registration onRegistration={this.onRegistration}/>
        <Login onLogin={this.onLogin}/>
        <Messages messages={messages}/>
        <PostMessage onPostMessage={this.onPostMessage}/>
      </Wrapper>
    );
  }
}
