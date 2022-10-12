import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  requireNativeComponent,
  ViewStyle,
  UIManager,
  findNodeHandle,
  NativeSyntheticEvent,
} from 'react-native';

// RN methods
type ReactNativeLivestreamMethods = {
  startStreaming: () => void;
  stopStreaming: () => void;
  setZoomRatio: (zoomRatio: number) => void; // ios新增
};
// RN props
type ReactNativeLivestreamProps = {
  style?: ViewStyle;
  liveStreamKey: string;
  rtmpServerUrl: string;
  camera: 'front' | 'back';
  video: {
    fps: number;
    resolution: '240p' | '360p' | '480p' | '720p' | '1080p' | '2160p';
    bitrate: number;
    orientation: 'landscape' | 'portrait'; // 废弃
  };
  isMuted: boolean;
  audio: {
    bitrate: number;
    sampleRate: 8000 | 16000 | 32000 | 44100 | 48000; // ios新增
    isStereo: boolean; // ios新增
  };
  zoomRatio: number; // ios新增
  enablePinchedZoom: Boolean; // ios新增
  onConnectionSuccess: (event: any) => void;
  onConnectionFailed: (event: any) => void;
  onDisconnect: (event: any) => void;
  onStartStreaming: (event: any) => void;
};

// RN default props
const LIVE_STREAM_PROPS_DEFAULTS: ReactNativeLivestreamProps = {
  style: {},
  liveStreamKey: "",
  rtmpServerUrl: "",
  camera: "front",
  video: {
    fps: 30,
    resolution: '720p',
    bitrate: 2000000,
    orientation: "portrait"
  },
  isMuted: false,
  audio: {
    bitrate: 128000,
    sampleRate: 44100,
    isStereo: true,
  },
  zoomRatio: 1.0,
  enablePinchedZoom: false,
  onConnectionSuccess: () => {},
  onConnectionFailed: () => {},
  onDisconnect: () => {},
  onStartStreaming: () => {}
};

// native props
type ReactNativeLivestreamNativeProps = {
  style?: ViewStyle;
  liveStreamKey: string;
  rtmpServerUrl: string;
  onConnectionSuccess: (event: NativeSyntheticEvent<{}>) => void;
  onConnectionFailed: (event: NativeSyntheticEvent<{ code: string }>) => void;
  onDisconnect: (event: NativeSyntheticEvent<{}>) => void;

  // android 0.2.1
  videoFps: number;
  videoResolution: '240p' | '360p' | '480p' | '720p' | '1080p' | '2160p';
  videoBitrate: number;
  videoCamera: 'front' | 'back';
  videoOrientation: 'landscape' | 'portrait';
  audioMuted: boolean;
  audioBitrate: number;

  // ios 1.2.2
  camera: "front" | "back";
  video: {
    fps: number;
    resolution: '240p' | '360p' | '480p' | '720p' | '1080p' | '2160p';
    bitrate: number;
    orientation: 'landscape' | 'portrait';
  };

  isMuted: boolean;
  audio: {
    bitrate: number;
    sampleRate: number;
    isStereo: boolean;
  },

  zoomRatio: number;
  enablePinchedZoom: boolean;

  onStartStreaming: (event: NativeSyntheticEvent<{}>) => void;
};

export const ReactNativeLivestreamViewNative =
  requireNativeComponent<ReactNativeLivestreamNativeProps>(
    'ReactNativeLivestreamView'
  );

ReactNativeLivestreamViewNative.displayName = 'ReactNativeLivestreamViewNative';

const LivestreamView = forwardRef<
  ReactNativeLivestreamMethods,
  ReactNativeLivestreamProps
>(
  (props: ReactNativeLivestreamProps, forwardedRef: any) => {

    const nativeProps: ReactNativeLivestreamProps = {
      ...LIVE_STREAM_PROPS_DEFAULTS,
      ...props,
      video: {
        ...LIVE_STREAM_PROPS_DEFAULTS.video,
        ...props.video
      },
      audio: {
        ...LIVE_STREAM_PROPS_DEFAULTS.audio,
        ...props.audio
      },
      // 以下暂不支持
      zoomRatio: 1.0,
      enablePinchedZoom: false,
    }

    const nativeRef = useRef<typeof ReactNativeLivestreamViewNative | null>(
      null
    );

    useImperativeHandle(forwardedRef, () => ({
      startStreaming: () => {
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(nativeRef.current),
          UIManager.getViewManagerConfig('ReactNativeLivestreamView').Commands
            .startStreamingFromManager,
          []
        );
      },
      stopStreaming: () => {
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(nativeRef.current),
          UIManager.getViewManagerConfig('ReactNativeLivestreamView').Commands
            .stopStreamingFromManager,
          []
        );
      },
      // 暂不支持
      // setZoomRatio: (zoomRatio: number) => {
      //   UIManager.dispatchViewManagerCommand(
      //     findNodeHandle(nativeRef.current),
      //     UIManager.getViewManagerConfig('ReactNativeLiveStreamView').Commands
      //       .zoomRatioFromManager,
      //     [zoomRatio]
      //   );
      // },
    }));

    return (
      <ReactNativeLivestreamViewNative
        ref={nativeRef as any}
        style={nativeProps.style}
        liveStreamKey={nativeProps.liveStreamKey}
        rtmpServerUrl={nativeProps.rtmpServerUrl}
        onConnectionSuccess={nativeProps.onConnectionSuccess}
        onConnectionFailed={nativeProps.onConnectionFailed}
        onDisconnect={nativeProps.onDisconnect}

        // android 0.2.1
        videoCamera={nativeProps.camera}
        videoResolution={nativeProps.video.resolution}
        videoFps={nativeProps.video.fps}
        videoBitrate={nativeProps.video.bitrate}
        videoOrientation={nativeProps.video.orientation}

        audioMuted={nativeProps.isMuted}
        audioBitrate={nativeProps.audio.bitrate}

        // ios 1.2.2
        camera={nativeProps.camera}
        video={nativeProps.video}

        isMuted={nativeProps.isMuted}
        audio={nativeProps.audio}

        zoomRatio={nativeProps.zoomRatio}
        enablePinchedZoom={nativeProps.enablePinchedZoom}

        onStartStreaming={nativeProps.onStartStreaming} // 限ios

      />
    );
  }
);

export { LivestreamView };
