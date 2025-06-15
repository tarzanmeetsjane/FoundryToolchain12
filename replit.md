# Quantum Secure Trader - Multi-Chain DeFi Analytics Platform

## Overview

Quantum Secure Trader is a comprehensive full-stack DeFi analytics platform that provides advanced liquidity pool analysis, wallet security assessment, and automated trading bot capabilities. The platform combines a React-based frontend with an Express.js backend, utilizing PostgreSQL for data persistence and Drizzle ORM for database operations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom dark theme
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Wallet Integration**: Web3 wallet connections with Wagmi and ConnectKit

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Connection**: Neon serverless PostgreSQL with connection pooling
- **API Design**: RESTful APIs with real-time WebSocket support
- **Development**: Vite for build tooling and hot module replacement

## Key Components

### 1. Multi-Chain DEX Analytics
- **Supported Platforms**: Uniswap V3, SushiSwap, PancakeSwap, 1inch
- **Chain Support**: Ethereum, BSC, Polygon, Arbitrum, Optimism, Base
- **Real-time Data**: Live swap event tracking and pool statistics
- **External APIs**: Integration with Etherscan, Moralis, CoinGecko, GeckoTerminal

### 2. Wallet Security & Portfolio Analysis
- **Address Validation**: Multi-chain wallet address verification
- **Portfolio Tracking**: Token balances and holdings analysis
- **Risk Assessment**: Smart contract security analysis
- **Transaction History**: Detailed transaction examination

### 3. Liquidity Pool Management
- **V2 Pools**: Traditional AMM liquidity provision
- **V3/V4 Positions**: Concentrated liquidity management
- **Position Dashboard**: Real-time position monitoring
- **Automated Strategies**: Yield farming and position optimization

### 4. Advanced Trading Bot System
- **Python-based**: Quantum Trading Orchestrator with AI-powered analysis
- **Dark Pool Analysis**: Specialized meme token and low-cap analysis
- **Task Automation**: Puppeteer-based form filling and transaction execution
- **Browser Extension**: Real-time monitoring and manual trade execution

### 5. Cross-Chain Capabilities
- **Bridge Integration**: Symbiosis Finance protocol for cross-chain swaps
- **Multi-Network Support**: Seamless operation across different blockchains
- **Unified Interface**: Single dashboard for all supported networks

## Data Flow

### 1. Real-time Data Pipeline
```
External APIs → Backend Routes → Database → WebSocket → Frontend Components
```

### 2. Trading Bot Integration
```
Python Analytics → SQLite Local Storage → REST API → Main Application
```

### 3. Wallet Connection Flow
```
Web3 Wallet → Wagmi Provider → React Components → Blockchain Interactions
```

## External Dependencies

### Blockchain APIs
- **Etherscan API**: Transaction and contract data
- **Moralis Web3 API**: Multi-chain wallet and token data
- **CoinGecko API**: Price feeds and market data
- **GeckoTerminal API**: DEX pool analytics

### Development Tools
- **Neon Database**: Serverless PostgreSQL hosting
- **Replit**: Development environment and deployment
- **Vite**: Build tool and development server
- **Drizzle Kit**: Database migration and management

### Trading Bot Dependencies
- **Python Libraries**: pandas, numpy, scikit-learn for data analysis
- **Puppeteer**: Browser automation for form filling
- **WebSocket**: Real-time communication between bot and frontend

## Deployment Strategy

### Development Environment
- **Replit Integration**: Configured for Replit development with hot reload
- **Local Development**: Vite development server on port 5000
- **Database**: Neon PostgreSQL with environment variable configuration

### Production Deployment
- **Build Process**: Vite builds frontend to `dist/public`, esbuild bundles backend
- **Deployment**: Replit autoscale deployment with production optimizations
- **Environment Variables**: Secure API key management
- **Static Assets**: Served from Express with Vite integration

### Database Management
- **Migrations**: Drizzle migrations in `./migrations` directory
- **Schema**: Centralized schema definitions in `shared/schema.ts`
- **Connection Pooling**: Neon serverless with automatic scaling

## Recent Changes

### Smart Contract Security & Development Suite (June 15, 2025)
- **ETHG Token Crisis Resolution**: Identified and analyzed user's 1,990,000 ETHG tokens trapped in unverified honeypot contract
- **Smart Wallet Generator**: Secure wallet creation with private keys, mnemonic phrases, and fresh start capability
- **Honeypot Detector**: Real-time analysis of suspicious token contracts with transfer restriction detection
- **Contract Verifier & Generator**: DappTools-inspired interface for smart contract development and Etherscan verification
- **Remix IDE Integration**: Direct links to Remix for contract compilation and testing
- **User Issue**: ETHG contract (0x3fc...ead) confirmed as unverified honeypot blocking all token transfers

### Interface Simplification (June 14, 2025)
- **Major UI Overhaul**: Replaced complex multi-tab interface with clean 3-tab dashboard
- **User Feedback**: "YES IT LOOKS PERFECT" - successful simplification
- **Dashboard Design**: 
  - Quick Tools tab with essential features (pool analysis, transaction checker)
  - Pool Analysis tab with live trending data
  - Market Data tab with platform statistics
- **Advanced Features**: Still accessible but moved to dedicated pages to reduce complexity
- **Core Tools**: GeckoTerminal pool analysis, Polygon NFT transaction checking, CSV import capabilities

### Technical Implementation
- Maintained all production-grade features while improving accessibility
- Real-time data feeds from authentic APIs (GeckoTerminal, Polygonscan, Moralis, CoinGecko)
- Preserved advanced capabilities: StarkNet integration, Cairo development, cross-chain analysis
- Enhanced user experience with focused interface design
- Added comprehensive contract security analysis and wallet generation capabilities

## Changelog

```
Changelog:
- June 14, 2025. Initial setup and major interface simplification
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```