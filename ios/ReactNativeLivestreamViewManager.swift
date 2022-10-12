import ApiVideoLiveStream
import CoreGraphics
import Foundation

@objc(ReactNativeLivestreamViewManager)
class ReactNativeLivestreamViewManager: RCTViewManager {
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    override func view() -> (ReactNativeLivestreamView) {
        return ReactNativeLivestreamView()
    }

    @objc func startStreamingFromManager(_ node: NSNumber, withRequestId requestId: NSNumber, withStreamKey streamKey: String, withUrl url: String?) {
        DispatchQueue.main.async {
            let component = self.bridge.uiManager.view(
                forReactTag: node
            ) as! ReactNativeLivestreamView
            component.startStreaming(requestId: Int(truncating: requestId), streamKey: streamKey, url: url)
        }
    }

    @objc func stopStreamingFromManager(_ node: NSNumber) {
        DispatchQueue.main.async {
            let component = self.bridge.uiManager.view(
                forReactTag: node
            ) as! ReactNativeLivestreamView
            component.stopStreaming()
        }
    }

    @objc func zoomRatioFromManager(_ node: NSNumber, withZoomRatio zoomRatio: NSNumber) {
        DispatchQueue.main.async {
            let component = self.bridge.uiManager.view(
                forReactTag: node
            ) as! ReactNativeLivestreamView
            component.setZoomRatio(zoomRatio: CGFloat(zoomRatio))
        }
    }
}
