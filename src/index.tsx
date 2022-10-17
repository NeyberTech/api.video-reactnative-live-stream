import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  UIManager,
  findNodeHandle,
} from 'react-native';
import type { ReactNativeLivestreamProps, ReactNativeLivestreamMethods } from './types';
import { NativeLivestreamView } from './nativeComponent';

const LivestreamView = forwardRef<
  ReactNativeLivestreamMethods,
  ReactNativeLivestreamProps
>(
  (props: ReactNativeLivestreamProps, ref: any) => {

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
        style={props.style}
        liveStreamKey={props.liveStreamKey}
        rtmpServerUrl={props.rtmpServerUrl}
        onConnectionSuccess={props.onConnectionSuccess}
        onConnectionFailed={props.onConnectionFailed}
        onDisconnect={props.onDisconnect}

        // android 0.2.1
        videoCamera={props.camera}
        videoResolution={props.video.resolution}
        videoFps={props.video.fps}
        videoBitrate={props.video.bitrate}
        videoOrientation={props.orientation}

        audioMuted={props.isMuted}
        audioBitrate={props.audio.bitrate}

        // ios 1.2.2
        camera={props.camera}
        video={props.video}

        isMuted={props.isMuted}
        audio={props.audio}

        zoomRatio={props.zoomRatio}
        enablePinchedZoom={props.enablePinchedZoom}

        onStartStreaming={props.onStartStreaming} // 限ios

      />
    );
  }
);

export { LivestreamView };
