import React from 'react';
import axios from 'axios';
import ChatList from './ChatList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    setInterval(async () => {
      const {data} = await axios.get('/api')
      console.log(data);
      this.setState({
        messages: data
      });
    }, 1000)
  }

  render() {
    return (
      <div className="App">
        <h1>Chat App</h1>
        <ChatList messages={this.state.messages} />
      </div>
    );
  }
}

export default App;
