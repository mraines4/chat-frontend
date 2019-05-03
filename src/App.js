import React from 'react';
import axios from 'axios';
import ChatList from './ChatList';
import ChatForm from './ChatForm';
import qs from 'qs';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: ''
    };
  }

  componentDidMount() {

    const url = 'ws://localhost:3010/chat'; //cant use CRA proxy because of 🐞
    this.connection = new WebSocket(url);

    this.connection.onmessage = (e) => {
      console.log(e.data);
      // if(this.state.messages.length === 0) {
      //   this.setState({
      //     messages: JSON.parse(e.data)
      //   })
      // } else {
      //   this.setState({
      //     messages: [...this.state.messages, JSON.parse(e.data)]
      //   })
      // }
      const newData = JSON.parse(e.data)
      this.setState({
        messages: this.state.messages.concat(newData) // .concat will handle arrays or individual messages
      })
    };


    // setInterval(async () => {
    //   const {data} = await axios.get('/api')
    //   // console.log(data);
    //   this.setState({
    //     messages: data
    //   });
    // }, 1000)
  }

  render() {
    return (
      <div className="App">
        <h1>Chat App</h1>
        <ChatList messages={this.state.messages} />
        <ChatForm text={this.state.text} handleChange={this._setText} handleSend={this._sendMessage} />
      </div>
    );
  }

  _setText = (text) => {
    console.log(text);
    this.setState({
      text
    })
  }

  _sendMessage = async () => {
    console.log('sent');
    this.connection.send(JSON.stringify({
      bran: this.state.text
    }));
    // await axios({
    //   method: 'post',
    //   url: '/api',
    //   data: qs.stringify({
    //    message: this.state.text
    //   }),
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // });
    this.setState({
      text: ''
    });
  }
}

export default App;
