/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  // PermissionsAndroid,
  Text,
} from 'react-native';
import {
  LivestreamView,
  ReactNativeLivestreamMethods,
} from '@api.video/react-native-livestream';

export default function App() {
  const ref = React.useRef<ReactNativeLivestreamMethods | null>(null);
  const [streaming, setStreaming] = React.useState(false);
  const [audioMuted, setAudioMuted] = React.useState(false);
  const [res, setRes] = React.useState<'360p' | '720p'>('360p');
  const [camera, setCamera] = React.useState<'front' | 'back'>('back');

  // const requestPermissions = async () => {
  //   try {
  //     PermissionsAndroid.request;
  //     const granted = await PermissionsAndroid.requestMultiple([
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //     ]);
  //     if (
  //       granted['android.permission.CAMERA'] ===
  //       PermissionsAndroid.RESULTS.GRANTED
  //     ) {
  //       console.log('You can use the camera');
  //     } else {
  //       console.log('Camera permission denied');
  //     }
  //     if (
  //       granted['android.permission.RECORD_AUDIO'] ===
  //       PermissionsAndroid.RESULTS.GRANTED
  //     ) {
  //       console.log('You can use the microphone');
  //     } else {
  //       console.log('Microphone permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  return (
    <View style={styles.container}>
      <LivestreamView
        style={{ flex: 1, backgroundColor: 'black', alignSelf: 'stretch' }}
        ref={ref}
        video={{
          bitrate: 3000000,
          fps: 30,
          resolution: res
        }}
        liveStreamKey={
          Platform.OS === 'android'
            ? '833ae9df-d228-4ff3-b15a-b4ac53280b80'
            : 'd08c582e-e251-4f9e-9894-8c8d69755d45'
        }
        audio={{
          bitrate: 128000,
          sampleRate: 44100,
          isStereo: true
        }}
        camera={camera}
      />
      <View style={{ position: 'absolute', bottom: 40 }}>
        <TouchableOpacity
          style={{
            borderRadius: 50,
            backgroundColor: streaming ? 'red' : 'white',
            width: 50,
            height: 50,
          }}
          onPress={() => {
            //requestPermissions()
            if (streaming) {
              ref.current?.stopStreaming();
              setStreaming(false);
            } else {
              ref.current?.startStreaming();
              setStreaming(true);
            }
          }}
        />
      </View>
      <View style={{ position: 'absolute', bottom: 40, left: 20 }}>
        <TouchableOpacity
          style={{
            borderRadius: 50,
            backgroundColor: 'yellow',
            width: 50,
            height: 50,
          }}
          onPress={() => {
            if (res === '360p') {
              setRes('720p');
            } else {
              setRes('360p');
            }
          }}
        />
      </View>
      <View style={{ position: 'absolute', bottom: 40, right: 20 }}>
        <TouchableOpacity
          style={{
            borderRadius: 50,
            backgroundColor: 'blue',
            width: 50,
            height: 50,
          }}
          onPress={() => {
            if (audioMuted) {
              ref.current?.disableAudio();
            } else {
              ref.current?.enableAudio();
            }
          }}
        />
      </View>
      <View style={{ position: 'absolute', bottom: 110 }}>
        <TouchableOpacity
          style={{
            borderRadius: 50,
            backgroundColor: 'green',
            width: 50,
            height: 50,
          }}
          onPress={() => {
            if (camera === 'back') {
              setCamera('front');
            } else {
              setCamera('back');
            }
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          top: 40,
          right: 20,
          padding: 8,
          backgroundColor: '#00000050',
        }}
      >
        <Text style={{ color: 'white' }}>{`Current Settings:`}</Text>
        <Text style={{ color: 'white' }}>{`Camera: ${camera}`}</Text>
        <Text style={{ color: 'white' }}>{`Muted: ${audioMuted}`}</Text>
        <Text style={{ color: 'white' }}>{`Resolution: ${res}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  box: {
    flex: 1,
    backgroundColor: 'green',
  },
});
