"use client";

import { useState, useRef, useEffect } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useContracts } from "@/hooks/use-contract";
import { Scanner } from '@yudiel/react-qr-scanner';
// Extend window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Import ABIs

export default function ScanPage() {
  const [providerType, setProviderType] = useState<"sepolia" | "wallet">(
    "sepolia"
  );
  const {
    pa,
    pr,
    mr,
    prAddress,
    mrAddress,
    walletAddress,
    error,
    connectWallet,
  } = useContracts(providerType);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [cameraError, setError] = useState<string | null>(null);

  console.log(pr, "product registry")
  // Verify product function
  const verifyProduct = async (productId: number, qrCodeHash: string) => {
    if (!pr) {
      // setError('Product Registry contract not initialized');
      return;
    }

    try {
      console.log(`Verifying product ${productId} with hash ${qrCodeHash}`);

      // Call the verifyProduct function
      const result = await pr.verifyProduct(productId, qrCodeHash);
      const [valid, product] = result;

      console.log("Verification result:", valid, product);

      if (valid) {
        setVerificationResult({
          valid: true,
          product: {
            productId: product.productId.toString(),
            name: product.name,
            manufacturer: product.manufacturer,
            batchNumber: product.batchNumber,
            expiryDate: product.expiryDate,
            metadataURI: product.metadataURI,
            active: product.active,
            timestamp: new Date(Number(product.timestamp) * 1000).toLocaleDateString()
          }
        });
        setScannedData(`Product ID: ${product.productId}, Name: ${product.name}`);
      } else {
        setVerificationResult({ valid: false });
        setError('Product verification failed. This product may be recalled or invalid.');
      }
    } catch (err: any) {
      console.error('Error verifying product: ', err);
      setError(`Error verifying product: ${err.message || 'Unknown error'}`);
    }
  };

  // Function to handle actual QR code scanning
  const handleQRCodeScan = async (qrData: string) => {
    // console.log(pr)
    // if (!pr) return;
    try {
      console.log(qrData)
      
      // Parse QR code data - adjust this based on your QR code format
      // const qrDataObj = JSON.parse(qrData);
      // const productId = qrDataObj.productId;
      // const qrCodeHash = qrDataObj.qrCodeHash;

      // await verifyProduct(productId, qrCodeHash);
    } catch (err) {
      console.error("Error parsing QR code data:", err);
      setError("Invalid QR code format");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between max-w-7xl">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
              <span className="text-sm font-bold">T</span>
            </div>
            <span className="text-xl font-bold">TrustScan</span>
          </Link>
          <div className="flex items-center gap-3">
            {walletAddress ? (
              <p className="text-sm text-muted-foreground">
                Connected: {walletAddress.substring(0, 6)}...
                {walletAddress.substring(walletAddress.length - 4)}
              </p>
            ) : (
              <Button onClick={connectWallet}>Connect Wallet</Button>
            )}

            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Scan Product
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Point your camera at a product QR code to verify its authenticity.
          </p>
        </div>

        {/* Contract Status */}

        <div className="grid gap-8 md:grid-cols-2">
          {/* Camera Section */}
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Camera Scanner</CardTitle>
              <CardDescription>
                Position the QR code within the camera frame
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
            <div className="relative   bg-muted flex items-center justify-center">
                <Scanner
                onScan={(result) => console.log(result)}
                  // onScan={(result: any) => handleQRCodeScan(result)}
                  onError={(error : any) => setError(error?.message)}
                  constraints={{facingMode: "environment", width: {ideal: 1280}, height: {ideal: 720}  }}
                />
              </div>
            </CardContent>

          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle>Scan Results</CardTitle>
              <CardDescription>
                Product information will appear here after scanning
              </CardDescription>
            </CardHeader>
            <CardContent>
              {verificationResult ? (
                <div className="space-y-6">
                  {verificationResult.valid ? (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="font-semibold text-green-800">
                          Product Verified ✓
                        </span>
                      </div>
                      <p className="text-green-700 text-sm">
                        This product is authentic and registered on blockchain
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-5 h-5 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="font-semibold text-red-800">
                          Verification Failed
                        </span>
                      </div>
                      <p className="text-red-700 text-sm">
                        This product could not be verified. It may be recalled
                        or invalid.
                      </p>
                    </div>
                  )}

                  {verificationResult.product && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Product Details</h4>
                        <div className="grid gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Product ID:
                            </span>
                            <span>{verificationResult.product.productId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Name:</span>
                            <span>{verificationResult.product.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Batch Number:
                            </span>
                            <span>
                              {verificationResult.product.batchNumber}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Expiry Date:
                            </span>
                            <span>{verificationResult.product.expiryDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Status:
                            </span>
                            <span
                              className={`font-medium ${
                                verificationResult.product.active
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {verificationResult.product.active
                                ? "Active"
                                : "Inactive"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Manufacturer:
                            </span>
                            <span className="text-xs font-mono">
                              {verificationResult.product.manufacturer.substring(
                                0,
                                10
                              )}
                              ...
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={() => {
                            setScannedData(null);
                            setVerificationResult(null);
                          }}
                          variant="outline"
                          className="flex-1"
                        >
                          Scan Another
                        </Button>
                        <Link href="/dashboard" className="flex-1">
                          <Button className="w-full">View in Dashboard</Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V4a1 1 0 00-1-1H5a1 1 0 00-1 1v3a1 1 0 001 1zm12 0h2a1 1 0 001-1V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v3a1 1 0 001 1zM5 20h2a1 1 0 001-1v-3a1 1 0 00-1-1H5a1 1 0 00-1 1v3a1 1 0 001 1z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Ready to Scan</h3>
                  {/* <p className='text-muted-foreground'>
                    {prContract 
                      ? 'Start your camera and point it at a QR code to begin verification'
                      : 'Connect to blockchain to enable scanning'
                    }
                  </p> */}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Scanning Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Connect Wallet</h4>
                <p className="text-sm text-muted-foreground">
                  Connect your wallet or use Sepolia network to interact with
                  the blockchain
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Scan QR Code</h4>
                <p className="text-sm text-muted-foreground">
                  Position the product QR code within the camera frame for
                  scanning
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">View Results</h4>
                <p className="text-sm text-muted-foreground">
                  Get instant blockchain verification and detailed product
                  information
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
