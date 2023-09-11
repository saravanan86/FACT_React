import React from 'react';
//import DynamicListComponent from './DynamicListComponent.js';
import DynamicTableComponent from './DynamicTableComponent.js';
import InputFormComponent from './InputFormComponent.js';
import 'bootstrap/dist/css/bootstrap.min.css';
// This imports the functional component from the previous sample.
import VideoJS from './VideoJS.js'

const App = () => {
  var dynamicTableCompObj = null;
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    width:640,
    height:360,
    sources: [{
      src: 'https://cdn-a.amazon-adsystem.com/video/ce804f33-cd9f-4bda-8605-fbe6b21eb692/MP4-450kbs-15fps-48khz-96kbs-360p.mp4?c=4187875430601&a=588167329246092228&d=15.134&br=475&w=640&h=360&ct=-&ca=-',
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      VideoJS.log('player is waiting');
    });

    player.on('dispose', () => {
      VideoJS.log('player will dispose');
    });
    //this.DynamicTableComponent.requestLatest();
    //this.requestLatest();
  };

  const handleListClick = (url) => {
    console.log("Playing:", url);
    playerRef.current.src(url);
  }

  const handleInputClick = (vastURL) => {
    console.log("HANDLE INPUT CLICK", vastURL);
    dynamicTableCompObj.requestLatest(vastURL);
  }

  const handleTableReady = (obj) => {
    console.log("HANDLE TABLE READY", obj.requestLatest);
    dynamicTableCompObj = obj;
  };

  return (
    <>
      
      <InputFormComponent onClick={handleInputClick}></InputFormComponent><br/>
      <DynamicTableComponent onTableReady={handleTableReady} onClick={handleListClick}></DynamicTableComponent><br/><br/>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      
    </>
  );
}

export default App;