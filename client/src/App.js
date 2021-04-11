import React, {useState, useEffect} from "react";
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import './App.css';

const socket = io.connect('http://localhost:4000');

function App() {
  const [state, setState] = useState({message: '', name: '', whisper: ''})
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('message', ({name, message, whisper}) => {
      setChat([...chat, {name, message, whisper}])
    });
  });

  const onTextChange = (e) => {
    setState({...state, [e.target.name]: e.target.value})
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const {name, message, whisper} = state;
    if(whisper==="") {
      socket.emit('message', {name, message})
    }
    socket.emit('message', {name, message, whisper})
    setState({message: '', name, whisper})
  };

  const renderChat = () => {
    return chat.map(({name, message, whisper}, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message} </span> to: <span>{whisper === "" ? "all" : whisper}</span>
        </h3>
      </div>
    ))
  }

  return (
    <div className="card">
      <div className="render-chat">
        {renderChat()}
      </div>
      <form onSubmit={onMessageSubmit}>
        <div className='message-field'>
          <TextField 
          name='message'
          onChange={e => onTextChange(e)} 
          value={state.message}
          id="outlined-multiline-static"
          variant="outlined"
          label="Message"
          style={{width: '100%'}}
          required
          />
        </div>
        <div className='name-field'>
          <TextField 
          name='name' 
          onChange={e => onTextChange(e)} 
          value={state.name} 
          style={{width: '100%'}}
          label="Name"
          />
        </div>
        <div className='name-field'>
          <TextField 
          name='whisper' 
          onChange={e => onTextChange(e)} 
          value={state.whisper} 
          style={{width: '100%'}}
          label="Whisper"
          />
        </div>
        <button>Send Message</button>
      </form>
    </div>
  );
}

export default App;