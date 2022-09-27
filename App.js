import { StatusBar } from 'expo-status-bar';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View,  Button, VStack, } from 'react-native';
import _ from 'lodash';
import LiveAudioStream from 'react-native-live-audio-stream';
// import { mediaDevices } from 'react-native-webrtc';
// import RecordRTC from 'recordrtc';
// import useWebSocket from 'react-native-use-websocket';

const options = {
  sampleRate: 32000,  // default is 44100 but 32000 is adequate for accurate voice recognition
  channels: 1,        // 1 or 2, default 1
  bitsPerSample: 16,  // 8 or 16, default 16
  audioSource: 6,     // android only (see below)
  bufferSize: 4096    // default is 2048
};


export default function App() {

  const [onSubmit, setOnSubmit] = useState(false);

//   const getSocketUrl = useCallback(() => {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve('http://127.0.0.1:5000');
//         }, 2000);
//     });
// }, []);

// const {
//   sendMessage,
//   lastMessage,
//   readyState,
//   getWebSocket
// } = useWebSocket(getSocketUrl, STATIC_OPTIONS);

  LiveAudioStream.init(options);
  LiveAudioStream.on('data', data => {
  // base64-encoded audio data chunks
  // console.log(data);
  console.log('sending data');
  console.log(data);
  // sendMessage({'name':'hello', 'data': data});
  fetch('https://28077.gradio.app/api/predict', { method: "POST", body: JSON.stringify({"data":[ {'data':`data:audio/mp3;base64,${data}`, 'name':'hello'},null, null, 'spanish', null]}), headers: { "Content-Type": "application/json" } }).then(function(response) { return response.json(); }).then(function(json_response){ console.log(json_response) })

  // var chunk = Buffer.from(data, 'base64');
});

   /**
   * 
   */
    const handleOnSubmit = useCallback(async () => {
      LiveAudioStream.start();
      console.log('starting');
      setOnSubmit(true);
    //   mediaDevices.getUserMedia({audio: true, video: false})
    //   .then(stream =>{
    //       console.log("Stream is working now", stream)
          
    //       //5)
    //       recordAudio = RecordRTC(stream, {
    //         type: 'audio',

    //     //6)
    //         mimeType: 'audio/webm',
    //         sampleRate: 44100,
    //         // used by StereoAudioRecorder
    //         // the range 22050 to 96000.
    //         // let us force 16khz recording:
    //         desiredSampRate: 16000,
         
    //         // MediaStreamRecorder, StereoAudioRecorder, WebAssemblyRecorder
    //         // CanvasRecorder, GifRecorder, WhammyRecorder
    //         recorderType: StereoAudioRecorder,
    //         // Dialogflow / STT requires mono audio
    //         numberOfAudioChannels: 1,
    //         //1)
    //         // get intervals based blobs
    //         // value in milliseconds
    //         // as you might not want to make detect calls every seconds
    //         timeSlice: 4000,

    //             //2)
    //             // as soon as the stream is available
    //             ondataavailable: function(blob) {

    //                 // 3
    //                 // making use of socket.io-stream for bi-directional
    //                 // streaming, create a stream
    //                 var stream = ss.createStream();
    //                 // stream directly to server
    //                 // it will be temp. stored locally
    //                 ss(socket).emit('stream', stream, {
    //                     name: 'stream.wav', 
    //                     size: blob.size
    //                 });
    //                 // pipe the audio blob to the read stream
    //                 ss.createBlobReadStream(blob).pipe(stream);
    //             }
    // });


    // recordAudio.startRecording();
    // setOnSubmit(true);
    //   })
    //   .catch(e =>{console.log(e)})
    }, []);
  /**
   * stop sending
   */
    const handleOnStop = useCallback(async () => {
      console.log('stopping');
      setOnSubmit(false);
      LiveAudioStream.stop();
    }, []);
  return (
    <View style={styles.container}>
     
      <Text>Send Live Audio Data</Text>
      <Button
          // flex={1}
          title="Start"
          size="lg"
          onPress={handleOnSubmit}
          isDisabled={onSubmit}
          // isLoading={onSubmit}
          >
          Start
        </Button>
        <Button
         title="Stop"
          size="lg"
          onPress={handleOnStop}
          isDisabled={!onSubmit}
          // isLoading={onSubmit}
          >
          Stop
        </Button>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
