# Web3 Multivendor E-commerce Platform

A decentralized multivendor e-commerce platform built with blockchain technology, enabling sellers to list products and buyers to securely transact using cryptocurrencies. The platform includes a **React Native mobile app**, a **Next.js dashboard** for admins and sellers, and **Solidity smart contracts** for payment and order management.

---

## 🚀 Features

### General Features
- **Decentralized Payments**: Secure cryptocurrency payments with an escrow system.
- **Product Listings**: Vendors can list products with descriptions, prices, and images.
- **Order Management**: Real-time order tracking for buyers and sellers.
- **Commission System**: Dynamic admin commission fees per transaction.
- **Ratings & Reviews**: Buyers can review products.
- **KYC Verification**: Sellers must pass KYC for onboarding.

### Mobile App Features (React Native)
- User Registration/Login (via WalletConnect).
- Browse products by categories.
- Add to Cart & Wishlist.
- Secure Checkout with Crypto Wallet.
- Real-time Order Tracking.
- Push Notifications for Offers & Updates.

### Admin Features (Next.js)
- Manage Users (Sellers & Buyers).
- Seller Approval & KYC Verification.
- View Platform Revenue & Analytics.
- Manage Dispute Resolution.

### Seller Dashboard Features (Next.js)
- Manage Products (Add, Update, Delete).
- View & Process Orders.
- Earnings Dashboard with Withdrawal Option.
- Access Seller-Specific Analytics.

---

## 🛠️ Tech Stack

### Frontend
- **Mobile App**: React Native
- **Admin & Seller Dashboard**: Next.js

### Blockchain
- **Smart Contracts**: Solidity (Ethereum-compatible networks like Polygon)

### Backend Services
- **APIs**: Node.js & Express
- **Real-Time Database**: Firebase
- **Decentralized Storage**: IPFS (for product images)

### Wallet Integration
- MetaMask (Admin & Sellers on desktop)
- WalletConnect (Mobile users)

### Deployment
- **Smart Contracts**: Deployed on Ethereum-compatible blockchain (e.g., Polygon)
- **Frontend**: 
  - Vercel (Next.js)
  - Expo (React Native)

---

## 🏗️ Architecture

![Architecture Diagram](path/to/architecture-diagram.png)

1. **Frontend**: React Native app for customers and Next.js dashboards for admin and sellers.
2. **Smart Contracts**: Manage payments, orders, and vendor relationships.
3. **Backend Services**: APIs for syncing real-time data and facilitating blockchain interactions.
4. **Database**: Firebase for metadata and IPFS for decentralized file storage.

---

## 📜 Smart Contract Details

### Key Functionalities
- **Product Listing**:
  ```solidity
  function addProduct(string memory name, uint price, string memory imageHash, address seller) public;
