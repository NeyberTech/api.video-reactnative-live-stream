import type { ReactNativeLivestreamProps } from './types'

// RN Default Props
export const LIVESTREAM_PROPS_DEFAULTS: ReactNativeLivestreamProps = {
  style: {},
  liveStreamKey: "",
  rtmpServerUrl: "",
  camera: "front",
  video: {
    fps: 30,
    resolution: '720p',
    bitrate: 2 * 1024 * 1024,
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