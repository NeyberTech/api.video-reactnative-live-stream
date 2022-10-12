import type {
  ViewStyle,
  NativeSyntheticEvent,
} from 'react-native';

export type Resolution = '240p' | '360p' | '480p' | '720p' | '1080p';

export type SampleRate = 8000 | 16000 | 32000 | 44100 | 48000;

export type Camera = 'front' | 'back';

export type Orientation = 'landscape' | 'portrait';

// RN props
export type ReactNativeLivestreamProps = {
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
  enablePinchedZoom: boolean; // ios新增
  onConnectionSuccess: (event: any) => void;
  onConnectionFailed: (event: any) => void;
  onDisconnect: (event: any) => void;
  onStartStreaming: (event: any) => void;
};

// RN methods
export type ReactNativeLivestreamMethods = {
  startStreaming: () => void;
  stopStreaming: () => void;
  setZoomRatio: (zoomRatio: number) => void; // ios新增
};

// Native Props
export type NativeLivestreamProps = {
  style: ViewStyle;
  onConnectionSuccess: (event: NativeSyntheticEvent<{}>) => void;
  onConnectionFailed: (event: NativeSyntheticEvent<{ code: string }>) => void;
  onDisconnect: (event: NativeSyntheticEvent<{}>) => void;

  // android 0.2.1
  videoFps: number;
  videoResolution: Resolution;
  videoBitrate: SampleRate;
  videoCamera: Camera;
  videoOrientation: Orientation
  audioMuted: boolean;
  audioBitrate: number;

  // ios 1.2.2
  camera: Camera;
  video: {
    bitrate: number;
    fps: number;
    resolution: Resolution;
  };
  isMuted: boolean;
  audio: {
    bitrate: number;
    sampleRate: SampleRate;
    isStereo: boolean;
  };
  zoomRatio: number;
  enablePinchedZoom: Boolean;

  onStartStreaming: (
    event: NativeSyntheticEvent<{
      requestId: number;
      result: boolean;
      error: string;
    }>
  ) => void;
};