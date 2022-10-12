import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  UIManager,
  findNodeHandle,
} from 'react-native';
import type { ReactNativeLivestreamProps, ReactNativeLivestreamMethods } from './types';
import { NativeLivestreamView } from './nativeComponent';
import { LIVESTREAM_PROPS_DEFAULTS } from "./config"


const LivestreamView = forwardRef<
  ReactNativeLivestreamMethods,
  ReactNativeLivestreamProps
>(
  (props: ReactNativeLivestreamProps, ref: any) => {

    const nativeProps: ReactNativeLivestreamProps = {
      ...LIVESTREAM_PROPS_DEFAULTS,
      ...props,
      video: {
        ...LIVESTREAM_PROPS_DEFAULTS.video,
        ...props.video
      },
      audio: {
        ...LIVESTREAM_PROPS_DEFAULTS.audio,
        ...props.audio
      },
      // 以下暂不支持
      zoomRatio: 1.0,
      enablePinchedZoom: false,
    }

    const nativeRef = useRef<typeof NativeLivestreamView | null>(null);

    let _nextRequestId = useRef<number>(1);
    const _requestMap = useRef<
      Map<
        number,
        { resolve: (result: boolean) => void; reject: (error?: string) => void }
      >
    >(new Map());

    useImperativeHandle(ref, () => ({
      startStreaming: (streamKey: string, url?: string): Promise<boolean> => {
        const requestId = _nextRequestId.current++;
        const requestMap = _requestMap;

        const promise = new Promise<boolean>((resolve, reject) => {
          requestMap.current.set(requestId, { resolve, reject });
        });

        UIManager.dispatchViewManagerCommand(
          findNodeHandle(nativeRef.current),
          UIManager.getViewManagerConfig('ReactNativeLivestreamView').Commands
            .startStreamingFromManager,
          [requestId, streamKey, url]
        );

        return promise
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
      <NativeLivestreamView
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
