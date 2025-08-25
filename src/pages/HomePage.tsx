import React, { useState } from "react";
import {
  Camera,
  QrCode,
  X,
  CheckCircle,
  AlertCircle,
  Scan,
} from "lucide-react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import type { Result } from "@zxing/library";
import medicineVerify from "../services/medicine_verify";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scannedData, setScannedData] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleBarcodeUpdate = async (_: unknown, result?: Result) => {
    if (result) {
      setScannedData(result.getText());
      setIsScanning(false);
      setError("");

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setLocation(location);

            try {
              // Send scanned data to backend
              const response = await medicineVerify({
                medicineId: result.getText(), // barcode text
                location: `${location.latitude},${location.longitude}`, // stringify
                userType: "customer", // or pharmacist/admin/etc, pass dynamically
              });

              console.log("Backend response:", response);
            } catch (err: any) {
              console.error("Error verifying medicine:", err);
              setError("Failed to verify medicine.");
            }
          },
          (err) => {
            setError("Failed to get location: " + err.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    }
  };

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const handleStartScan = (): void => {
    setError("");
    setScannedData("");
    setIsScanning(true);
  };

  const handleStopScan = (): void => {
    setIsScanning(false);
  };

  const clearResult = (): void => {
    setScannedData("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-3xl"></div>
        <header className="relative px-6 py-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
            <QrCode className="w-8 h-8 text-slate-900" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
            QR Scanner Pro
          </h1>
          <p className="text-slate-300 text-lg max-w-md mx-auto">
            Fast, secure, and reliable QR code scanning at your fingertips
          </p>
        </header>
      </div>

      {/* Main Content */}
      <main className="px-6 pb-8">
        <div className="max-w-md mx-auto">
          {/* Scanner Section */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 mb-6 shadow-xl">
            {!isScanning && !scannedData && (
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Scan className="w-10 h-10 text-slate-900" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Ready to Scan
                </h2>
                <p className="text-slate-400 mb-6">
                  Point your camera at a QR code to get started
                </p>
                <button
                  onClick={handleStartScan}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-semibold py-3 px-6 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Camera className="w-5 h-5 inline mr-2" />
                  Start Scanning
                </button>
              </div>
            )}

            {isScanning && (
              <div className="text-center">
                <div className="mb-4">
                  <BarcodeScannerComponent
                    width={300}
                    height={300}
                    onUpdate={handleBarcodeUpdate}
                  />
                </div>

                <p className="text-yellow-400 mb-4 flex items-center justify-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                  Scanning for QR codes...
                </p>

                <button
                  onClick={handleStopScan}
                  className="bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-600 transition duration-300 border border-slate-600"
                >
                  <X className="w-4 h-4 inline mr-2" />
                  Stop Scanning
                </button>
              </div>
            )}

            {scannedData && (
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  QR Code Detected!
                </h2>

                <div className="bg-slate-900 rounded-lg p-4 mb-4 border border-slate-600">
                  <p className="text-slate-400 text-sm mb-2">
                    Scanned Content:
                  </p>
                  <p className="text-yellow-400 font-mono break-all text-sm">
                    {scannedData}
                  </p>
                  {location && (
                    <p className="text-slate-300 text-sm mt-2">
                          Location: Latitude {location.latitude.toFixed(4)},
                      Longitude {location.longitude.toFixed(4)} {" "}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={clearResult}
                    className="flex-1 bg-slate-700 text-white py-2 px-4 rounded-lg hover:bg-slate-600 transition duration-300 border border-slate-600"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleStartScan}
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-semibold py-2 px-4 rounded-lg hover:from-yellow-300 hover:to-orange-400 transition duration-300"
                  >
                    Scan Again
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="text-center pt-10">
                <div className="w-20 h-20 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Access Error
                </h2>
                <p className="text-red-400 mb-4">{error}</p>
                <button
                  onClick={handleStartScan}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-semibold py-2 px-6 rounded-lg hover:from-yellow-300 hover:to-orange-400 transition duration-300"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
