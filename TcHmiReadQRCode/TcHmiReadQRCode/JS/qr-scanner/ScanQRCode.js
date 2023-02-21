// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.758.8/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var TcHmiReadQRCode;
        (function (TcHmiReadQRCode) {
            async function ScanQRCode() {

                //Read Viewport
                const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
                const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

                //Create camera area
                var videoArea = $('<video id="qr-video"></video>');
                TcHmi.TopMostLayer.add(this, videoArea, {
                    centerHorizontal: true,
                    centerVertical: true
                });
                const videoElm = document.getElementById('qr-video');
                $("#qr-video").css("width", vw + "px");
                $("#qr-video").css("height", vh + "px");

                //Create Scanner in the videoArea
                const qrScanner = new QrScanner(
                    videoElm,
                    result => getResult(result),
                    {
                        highlightScanRegion: true,
                        highlightCodeOutline: true
                    }
                );

                //Start camera 
                qrScanner.start();
         
                function getResult(result) {
                    //Stop Scanner and remove videoArea
                    qrScanner.stop();
                    TcHmi.TopMostLayer.remove(this, videoArea);

                    alert(result.data);                
                }              

            }
            TcHmiReadQRCode.ScanQRCode = ScanQRCode;
        })(TcHmiReadQRCode = Functions.TcHmiReadQRCode || (Functions.TcHmiReadQRCode = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('ScanQRCode', 'TcHmi.Functions.TcHmiReadQRCode', TcHmi.Functions.TcHmiReadQRCode.ScanQRCode);
