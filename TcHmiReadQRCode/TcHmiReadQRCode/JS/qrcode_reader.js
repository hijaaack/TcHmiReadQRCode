// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.758.8/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    // If you want to unregister an event outside the event code you need to use the return value of the method register()
    let destroyOnInitialized = TcHmi.EventProvider.register('Desktop.onAttached', (e, data) => {
        // This event will be raised only once, so we can free resources. 
        // It's best practice to use destroy function of the event object within the callback function to avoid conflicts.
        e.destroy();

        const html5QrCode = new Html5Qrcode("reader");
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            /* handle success */
            TcHmi.Symbol.writeEx("%i%outputString%/i%", decodedText);
        };
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        TcHmi.EventProvider.register("TcHmiButton_StartScanning.onPressed", function (callback) {

            let cameraId = TcHmi.Symbol.read("SelectedCameraId", TcHmi.SymbolType.Internal);

            html5QrCode.start({ deviceId: { exact: cameraId } }, config, qrCodeSuccessCallback);

        });

        TcHmi.EventProvider.register("TcHmiButton_StartScanningBackCamera.onPressed", function (callback) {

            // If you want to prefer back camera
            html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);

        });

        TcHmi.EventProvider.register("TcHmiButton_StopScanning.onPressed", function (callback) {

            html5QrCode.stop().then((ignore) => {
                console.log(ignore);
                // QR Code scanning is stopped.
            }).catch((err) => {
                // Stop failed, handle it.
                console.log(err);
            });

        });

    });
})(TcHmi);