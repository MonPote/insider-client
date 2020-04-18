import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import * as Colyseus from 'colyseus.js';

var client = new Colyseus.Client('ws://localhost:2567');

function App() {
  const [room, setRoom] = useState(null);
  useEffect(() => {
    console.log('client', client);

    client
      .create('my_room')
      .then((room) => {
        console.log('joined successfully', room);
        setRoom(room);
        room.send({ type: 'PLAY_CARD', test: 'toto' });
      })
      .catch((e) => {
        console.error('join error', e);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          onClick={() => {
            console.log('click');
            room.send({ move: 'left' });
            room.send({ move: 'right' });
          }}
        >
          Send
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
