import React from 'react';
import five, { Board } from 'johnny-five';
import { Firmata } from 'firmata-io';
import SerialPort from 'avrgirl-arduino/lib/browser-serialport';
import hrtime from 'browser-process-hrtime';

import './App.css';

process.hrtime = hrtime;
global.five = five;

function handleStart() {
  const io = global.io = new Firmata(new SerialPort({}));
  io.once('ready', () => {
    const board = global.board =  new Board({io, repl: false});  
    board.on('ready', () => {
      console.log('johnny five in browser !!!!');
      const led = new five.Led(13);
      // "blink" the led in 500ms on-off phase periods
      led.blink(500);
    });
    board.on('error', console.error);
  });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {navigator.serial ? (
          <p>
            Look in dev tools.  You should have <span style={{color: 'yellow'}}>five, board, & io</span> objects.
            <br/>
            <button onClick={handleStart} style={{fontSize: '2rem'}}>start</button>
          </p>
        ) : (
          <p>
            <a href="https://wicg.github.io/serial/" rel="noopener noreferrer" target="_blank" style={{color: 'white'}}>Web Serial API not available</a>
          </p>
        )}
        
        
      </header>
    </div>
  );
}

export default App;
