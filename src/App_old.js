import React from "react";
import DynamicListComponent from './DynamicListComponent.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  /*var dataObj={};
  fetch("/api")
      .then((res) => res.json())
      .then((data) => {dataObj=data;console.log("1")});
  console.log(2);*/
  return (
    <div>
    <head>
      <link href="https://vjs.zencdn.net/8.0.4/video-js.css" rel="stylesheet"></link>
    </head>
    <div className="App">
      <h1>Hello World!!</h1>
      <DynamicListComponent></DynamicListComponent>
    </div>
    <video id="my-video" class="video-js">
    </video>
    <script src="https://vjs.zencdn.net/8.0.4/video.min.js"></script>
    <script src="./player.js"></script>
    </div>
    )
}



export default App;
