# Frontend Integration Guide

This guide provides instructions for connecting a frontend application to the Product Authentication smart contracts.

## Table of Contents

- [Overview](#overview)
- [Getting Contract ABIs](#getting-contract-abis)
- [Getting Contract Addresses](#getting-contract-addresses)
- [Interacting with Contracts](#interacting-with-contracts)
  - [1. ManufacturerRegistry](#1-manufacturerregistry)
  - [2. ProductRegistry](#2-productregistry)
  - [3. ProductAuthentication](#3-productauthentication)

## Overview

The system consists of three main smart contracts:

1.  `ProductAuthentication`: The main entry point contract that deploys and links the other two contracts.
2.  `ManufacturerRegistry`: Manages a list of approved manufacturers, controlled by a `regulator` role.
3.  `ProductRegistry`: Allows approved manufacturers to register and manage products.

The typical flow is:
1.  A `regulator` (the deployer of `ProductAuthentication`) approves a manufacturer's address using `ManufacturerRegistry`.
2.  The approved manufacturer registers a product using `ProductRegistry`.
3.  A consumer or other actor can then verify a product's authenticity using `ProductRegistry`.

## Getting Contract ABIs

The Application Binary Interfaces (ABIs) for all contracts are necessary for any frontend interaction. These are generated automatically during the compilation process.

You can find the ABIs in the `artifacts/contracts/` directory.

-   **ManufacturerRegistry ABI**: `artifacts/contracts/ManufacturerRegistry.sol/ManufacturerRegistry.json`
-   **ProductRegistry ABI**: `artifacts/contracts/ProductRegistry.sol/ProductRegistry.json`
-   **ProductAuthentication ABI**: `artifacts/contracts/ProductAuthentication.sol/ProductAuthentication.json`

Your frontend application will need to load the `abi` object from these JSON files.

## Getting Contract Addresses

When the `ProductAuthentication` contract is deployed, it also deploys new instances of `ManufacturerRegistry` and `ProductRegistry`.

1.  **Deploy the `ProductAuthentication` contract.** You can do this using the provided `scripts/deploy.js` script with Hardhat:
    ```bash
    npx hardhat run scripts/deploy.js --network <your_network>
    ```
2.  **Get the deployed `ProductAuthentication` address** from the output of the deployment script.
3.  **Get the other contract addresses:** The `ProductAuthentication` contract stores the addresses of the other two contracts. You can call its `getManufacturerRegistry()` and `getProductRegistry()` view functions to retrieve them.

## Interacting with Contracts

Once you have the ABIs and the deployed contract addresses, you can use a library like `ethers.js` or `web3.js` to interact with them.

### 1. ManufacturerRegistry

-   **Address**: Get from `ProductAuthentication.getManufacturerRegistry()`.
-   **ABI**: `artifacts/contracts/ManufacturerRegistry.sol/ManufacturerRegistry.json`

#### Key Functions

-   `approveManufacturer(address manufacturer)`: (Regulator only) Approves a new manufacturer.
-   `revokeManufacturer(address manufacturer)`: (Regulator only) Revokes an existing manufacturer's approval.
-   `isManufacturerApproved(address manufacturer)`: (View) Checks if a manufacturer is currently approved.
-   `regulator()`: (View) Returns the address of the regulator.

### 2. ProductRegistry

-   **Address**: Get from `ProductAuthentication.getProductRegistry()`.
-   **ABI**: `artifacts/contracts/ProductRegistry.sol/ProductRegistry.json`

#### Key Functions

-   `registerProduct(string name, string batchNumber, string expiryDate, string qrCodeHash, string metadataURI)`: (Approved Manufacturer only) Registers a new product.
-   `recallProduct(uint256 productId)`: (Product's Manufacturer only) Recalls a product, marking it as inactive.
-   `verifyProduct(uint256 productId, string qrCodeHash)`: (Public) Verifies if a product is active and its QR code hash matches. Returns a boolean and the product data.
-   `getProduct(uint256 productId)`: (View) Retrieves the details of a specific product.
-   `getTotalProducts()`: (View) Returns the total number of products ever registered.

### 3. ProductAuthentication

-   **Address**: The primary address from the deployment script.
-   **ABI**: `artifacts/contracts/ProductAuthentication.sol/ProductAuthentication.json`

#### Key Functions

-   `getManufacturerRegistry()`: (View) Returns the address of the `ManufacturerRegistry` contract.
-   `getProductRegistry()`: (View) Returns the address of the `ProductRegistry` contract.
