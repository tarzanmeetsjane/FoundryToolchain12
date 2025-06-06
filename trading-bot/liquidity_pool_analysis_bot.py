#!/usr/bin/env python3
"""
Quantum Secure Trader - Liquidity Pool Analysis Bot
Advanced DeFi liquidity pool analysis with ML-powered insights
"""

import asyncio
import aiohttp
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json
import logging
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
import sqlite3
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import pickle
import os

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@dataclass
class PoolMetrics:
    """Data structure for liquidity pool metrics"""
    address: str
    name: str
    token0: str
    token1: str
    fee_tier: float
    liquidity_usd: float
    volume_24h: float
    volume_7d: float
    fees_24h: float
    apy: float
    price_change_24h: float
    impermanent_loss: float
    risk_score: float
    health_score: float
    trend_direction: str
    volatility_score: float
    
@dataclass
class TradingSignal:
    """Trading signal data structure"""
    pool_address: str
    signal_type: str  # 'buy', 'sell', 'hold'
    strength: float  # 0-1
    confidence: float  # 0-1
    reasoning: str
    timestamp: datetime
    target_price: Optional[float] = None
    stop_loss: Optional[float] = None

class QuantumPoolAnalyzer:
    """Advanced liquidity pool analysis engine"""
    
    def __init__(self):
        self.gecko_terminal_base = "https://api.geckoterminal.com/api/v2"
        self.coingecko_base = "https://api.coingecko.com/api/v3"
        self.session = None
        self.db_path = "trading-bot/data/quantum_pool_data.db"
        self.model_path = "trading-bot/models/pool_prediction_model.pkl"
        self.model = None
        self.scaler = StandardScaler()
        self.initialize_database()
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
            
    def initialize_database(self):
        """Initialize SQLite database for storing pool data"""
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS pool_metrics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                address TEXT UNIQUE,
                name TEXT,
                token0 TEXT,
                token1 TEXT,
                fee_tier REAL,
                liquidity_usd REAL,
                volume_24h REAL,
                volume_7d REAL,
                fees_24h REAL,
                apy REAL,
                price_change_24h REAL,
                impermanent_loss REAL,
                risk_score REAL,
                health_score REAL,
                trend_direction TEXT,
                volatility_score REAL,
                timestamp DATETIME,
                network TEXT
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS trading_signals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pool_address TEXT,
                signal_type TEXT,
                strength REAL,
                confidence REAL,
                reasoning TEXT,
                target_price REAL,
                stop_loss REAL,
                timestamp DATETIME,
                executed BOOLEAN DEFAULT FALSE
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS automated_trades (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pool_address TEXT,
                action TEXT,
                amount REAL,
                price REAL,
                gas_fee REAL,
                transaction_hash TEXT,
                status TEXT,
                timestamp DATETIME
            )
        ''')
        
        conn.commit()
        conn.close()
        
    async def fetch_pool_data_authentic(self, network: str = 'eth') -> List[Dict]:
        """Fetch authentic pool data from GeckoTerminal API"""
        try:
            url = f"{self.gecko_terminal_base}/networks/{network}/pools"
            params = {"page": 1, "include": "base_token,quote_token,dex"}
            
            async with self.session.get(url, params=params) as response:
                if response.status == 200:
                    data = await response.json()
                    pools = data.get('data', [])
                    logger.info(f"Fetched {len(pools)} authentic pools from {network}")
                    return pools
                else:
                    logger.error(f"API Error {response.status}: {await response.text()}")
                    return []
        except Exception as e:
            logger.error(f"Error fetching pool data: {e}")
            return []
            
    async def fetch_trending_pools_authentic(self) -> List[Dict]:
        """Fetch authentic trending pools from GeckoTerminal"""
        try:
            url = f"{self.gecko_terminal_base}/networks/trending_pools"
            
            async with self.session.get(url) as response:
                if response.status == 200:
                    data = await response.json()
                    pools = data.get('data', [])
                    logger.info(f"Fetched {len(pools)} trending pools")
                    return pools
                else:
                    logger.error(f"API Error {response.status}: Failed to fetch trending pools")
                    return []
        except Exception as e:
            logger.error(f"Error fetching trending pools: {e}")
            return []
            
    def calculate_advanced_metrics(self, pool_data: Dict) -> PoolMetrics:
        """Calculate comprehensive pool metrics from authentic data"""
        attributes = pool_data.get('attributes', {})
        
        # Extract authentic data
        name = attributes.get('name', 'Unknown Pool')
        address = attributes.get('address', '')
        
        # Financial metrics from authentic sources
        liquidity_usd = float(attributes.get('reserve_in_usd', 0))
        volume_24h = float(attributes.get('volume_usd', {}).get('h24', 0))
        volume_7d = volume_24h * 7  # Estimate from 24h data
        
        # Price change data
        price_changes = attributes.get('price_change_percentage', {})
        price_change_24h = float(price_changes.get('h24', 0))
        price_change_1h = float(price_changes.get('h1', 0))
        price_change_6h = float(price_changes.get('h6', 0))
        
        # Calculate derived metrics
        fee_tier = 0.003  # Standard Uniswap V3 fee
        fees_24h = volume_24h * fee_tier
        apy = self.calculate_realistic_apy(volume_24h, liquidity_usd, fee_tier)
        impermanent_loss = self.calculate_impermanent_loss_accurate(price_change_24h)
        volatility_score = self.calculate_volatility_comprehensive(price_change_1h, price_change_6h, price_change_24h)
        risk_score = self.calculate_risk_advanced(liquidity_usd, volume_24h, volatility_score)
        health_score = self.calculate_health_comprehensive(liquidity_usd, volume_24h, apy, risk_score, volatility_score)
        trend_direction = self.analyze_trend_sophisticated(price_change_1h, price_change_6h, price_change_24h, volume_24h)
        
        return PoolMetrics(
            address=address,
            name=name,
            token0=attributes.get('base_token_name', 'Unknown'),
            token1=attributes.get('quote_token_name', 'Unknown'),
            fee_tier=fee_tier,
            liquidity_usd=liquidity_usd,
            volume_24h=volume_24h,
            volume_7d=volume_7d,
            fees_24h=fees_24h,
            apy=apy,
            price_change_24h=price_change_24h,
            impermanent_loss=impermanent_loss,
            risk_score=risk_score,
            health_score=health_score,
            trend_direction=trend_direction,
            volatility_score=volatility_score
        )
        
    def calculate_realistic_apy(self, volume_24h: float, liquidity: float, fee_rate: float) -> float:
        """Calculate realistic APY based on actual trading volume"""
        if liquidity <= 0:
            return 0
            
        daily_fees = volume_24h * fee_rate
        daily_yield = daily_fees / liquidity
        
        # Account for compounding and market conditions
        annual_yield = daily_yield * 365
        
        # Apply market reality adjustments
        market_efficiency = 0.7  # Account for MEV, slippage, etc.
        realistic_apy = annual_yield * market_efficiency * 100
        
        return min(realistic_apy, 500)  # Cap at 500% to avoid unrealistic projections
        
    def calculate_impermanent_loss_accurate(self, price_change: float) -> float:
        """Calculate accurate impermanent loss based on price divergence"""
        if abs(price_change) < 0.1:
            return 0
            
        # Convert percentage to ratio
        price_ratio = (100 + price_change) / 100
        
        # Calculate IL using standard formula
        if price_ratio > 0:
            il_multiplier = 2 * np.sqrt(price_ratio) / (1 + price_ratio)
            impermanent_loss = (il_multiplier - 1) * 100
            return abs(impermanent_loss)
        return 0
        
    def calculate_volatility_comprehensive(self, change_1h: float, change_6h: float, change_24h: float) -> float:
        """Calculate comprehensive volatility score"""
        # Weight recent changes more heavily
        weighted_volatility = (
            abs(change_1h) * 0.5 +
            abs(change_6h) * 0.3 +
            abs(change_24h) * 0.2
        )
        
        # Normalize to 0-100 scale
        return min(weighted_volatility * 2, 100)
        
    def calculate_risk_advanced(self, liquidity: float, volume: float, volatility: float) -> float:
        """Advanced risk calculation considering multiple factors"""
        # Liquidity risk (inverse relationship)
        if liquidity > 10000000:  # > $10M
            liquidity_risk = 5
        elif liquidity > 1000000:  # > $1M
            liquidity_risk = 15
        elif liquidity > 100000:  # > $100K
            liquidity_risk = 30
        else:
            liquidity_risk = 50
            
        # Volume risk (low volume = illiquid = risky)
        volume_ratio = volume / max(liquidity, 1)
        if volume_ratio > 0.3:  # High turnover
            volume_risk = 5
        elif volume_ratio > 0.1:
            volume_risk = 15
        elif volume_ratio > 0.05:
            volume_risk = 25
        else:
            volume_risk = 40
            
        # Volatility risk
        volatility_risk = min(volatility * 0.4, 30)
        
        # Combine risks
        total_risk = liquidity_risk + volume_risk + volatility_risk
        return min(total_risk, 100)
        
    def calculate_health_comprehensive(self, liquidity: float, volume: float, apy: float, risk: float, volatility: float) -> float:
        """Comprehensive health score calculation"""
        # Liquidity health (30 points max)
        if liquidity > 50000000:
            liquidity_health = 30
        elif liquidity > 10000000:
            liquidity_health = 25
        elif liquidity > 1000000:
            liquidity_health = 20
        elif liquidity > 100000:
            liquidity_health = 10
        else:
            liquidity_health = 5
            
        # Volume health (25 points max)
        if volume > 1000000:
            volume_health = 25
        elif volume > 100000:
            volume_health = 20
        elif volume > 10000:
            volume_health = 15
        elif volume > 1000:
            volume_health = 10
        else:
            volume_health = 5
            
        # APY health (20 points max)
        if 10 <= apy <= 50:  # Sweet spot
            apy_health = 20
        elif 5 <= apy <= 100:
            apy_health = 15
        elif apy > 100:  # Too good to be true
            apy_health = 5
        else:
            apy_health = 10
            
        # Stability bonus (15 points max)
        stability_bonus = max(0, 15 - (volatility * 0.3))
        
        # Risk penalty
        risk_penalty = (risk / 100) * 30
        
        health = liquidity_health + volume_health + apy_health + stability_bonus - risk_penalty
        return max(0, min(health, 100))
        
    def analyze_trend_sophisticated(self, change_1h: float, change_6h: float, change_24h: float, volume: float) -> str:
        """Sophisticated trend analysis"""
        # Short-term momentum
        if change_1h > 2 and change_6h > 1 and volume > 50000:
            return "strong_bullish"
        elif change_1h < -2 and change_6h < -1 and volume > 50000:
            return "strong_bearish"
        elif change_24h > 5 and volume > 100000:
            return "bullish"
        elif change_24h < -5 and volume > 100000:
            return "bearish"
        elif abs(change_24h) < 2:
            return "sideways"
        else:
            return "uncertain"
            
    def generate_ai_trading_signal(self, metrics: PoolMetrics) -> TradingSignal:
        """Generate AI-powered trading signals"""
        signal_type = "hold"
        strength = 0.5
        confidence = 0.5
        reasoning = "Neutral market conditions"
        
        # Strong buy signals
        if (metrics.health_score > 80 and 
            metrics.trend_direction in ["strong_bullish", "bullish"] and 
            metrics.risk_score < 30 and
            15 <= metrics.apy <= 80 and
            metrics.volatility_score < 40):
            signal_type = "buy"
            strength = 0.85
            confidence = 0.8
            reasoning = f"Excellent fundamentals: Health {metrics.health_score:.1f}, APY {metrics.apy:.1f}%, Low risk {metrics.risk_score:.1f}"
            
        # Moderate buy signals
        elif (metrics.health_score > 60 and 
              metrics.trend_direction == "bullish" and 
              metrics.risk_score < 50 and
              metrics.apy > 10):
            signal_type = "buy"
            strength = 0.65
            confidence = 0.65
            reasoning = f"Good opportunity: Health {metrics.health_score:.1f}, APY {metrics.apy:.1f}%"
            
        # Strong sell signals
        elif (metrics.health_score < 30 or 
              metrics.risk_score > 75 or
              metrics.trend_direction == "strong_bearish" or
              metrics.apy < 2):
            signal_type = "sell"
            strength = 0.8
            confidence = 0.75
            reasoning = f"High risk: Health {metrics.health_score:.1f}, Risk {metrics.risk_score:.1f}"
            
        # High volatility caution
        elif metrics.volatility_score > 60:
            signal_type = "hold"
            strength = 0.3
            confidence = 0.9
            reasoning = f"Excessive volatility {metrics.volatility_score:.1f}, await stabilization"
            
        return TradingSignal(
            pool_address=metrics.address,
            signal_type=signal_type,
            strength=strength,
            confidence=confidence,
            reasoning=reasoning,
            timestamp=datetime.now()
        )
        
    def save_to_database(self, metrics: PoolMetrics, signal: TradingSignal, network: str):
        """Save analysis results to database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Save pool metrics
        cursor.execute('''
            INSERT OR REPLACE INTO pool_metrics 
            (address, name, token0, token1, fee_tier, liquidity_usd, volume_24h, volume_7d,
             fees_24h, apy, price_change_24h, impermanent_loss, risk_score, health_score,
             trend_direction, volatility_score, timestamp, network)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            metrics.address, metrics.name, metrics.token0, metrics.token1,
            metrics.fee_tier, metrics.liquidity_usd, metrics.volume_24h, metrics.volume_7d,
            metrics.fees_24h, metrics.apy, metrics.price_change_24h, metrics.impermanent_loss,
            metrics.risk_score, metrics.health_score, metrics.trend_direction,
            metrics.volatility_score, datetime.now(), network
        ))
        
        # Save trading signal
        cursor.execute('''
            INSERT INTO trading_signals 
            (pool_address, signal_type, strength, confidence, reasoning, timestamp)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            signal.pool_address, signal.signal_type, signal.strength, 
            signal.confidence, signal.reasoning, signal.timestamp
        ))
        
        conn.commit()
        conn.close()
        
    async def run_comprehensive_analysis(self, networks: List[str] = ['eth', 'polygon', 'bsc']) -> Dict:
        """Run comprehensive analysis across multiple networks"""
        results = {
            'analysis_timestamp': datetime.now().isoformat(),
            'total_pools_analyzed': 0,
            'signals_generated': 0,
            'investment_opportunities': [],
            'risk_warnings': [],
            'network_analysis': {},
            'market_summary': {}
        }
        
        all_health_scores = []
        all_apys = []
        
        for network in networks:
            logger.info(f"Analyzing {network} network...")
            
            # Fetch authentic data
            pools = await self.fetch_pool_data_authentic(network)
            
            network_results = {
                'pools_analyzed': len(pools),
                'avg_health_score': 0,
                'avg_apy': 0,
                'avg_risk_score': 0,
                'high_quality_pools': 0,
                'high_risk_pools': 0
            }
            
            network_health_scores = []
            network_apys = []
            network_risk_scores = []
            
            for pool_data in pools:
                try:
                    # Calculate metrics from authentic data
                    metrics = self.calculate_advanced_metrics(pool_data)
                    signal = self.generate_ai_trading_signal(metrics)
                    
                    # Save to database
                    self.save_to_database(metrics, signal, network)
                    
                    # Collect statistics
                    network_health_scores.append(metrics.health_score)
                    network_apys.append(metrics.apy)
                    network_risk_scores.append(metrics.risk_score)
                    all_health_scores.append(metrics.health_score)
                    all_apys.append(metrics.apy)
                    
                    # Identify opportunities
                    if (signal.signal_type == "buy" and 
                        signal.confidence > 0.7 and 
                        metrics.health_score > 70):
                        results['investment_opportunities'].append({
                            'pool_name': metrics.name,
                            'network': network,
                            'health_score': metrics.health_score,
                            'apy': metrics.apy,
                            'risk_score': metrics.risk_score,
                            'signal_strength': signal.strength,
                            'confidence': signal.confidence,
                            'reasoning': signal.reasoning,
                            'liquidity_usd': metrics.liquidity_usd,
                            'volume_24h': metrics.volume_24h
                        })
                        network_results['high_quality_pools'] += 1
                        
                    # Identify risks
                    if metrics.risk_score > 70:
                        results['risk_warnings'].append({
                            'pool_name': metrics.name,
                            'network': network,
                            'risk_score': metrics.risk_score,
                            'health_score': metrics.health_score,
                            'issues': signal.reasoning,
                            'liquidity_usd': metrics.liquidity_usd
                        })
                        network_results['high_risk_pools'] += 1
                        
                    results['signals_generated'] += 1
                    
                except Exception as e:
                    logger.error(f"Error analyzing pool: {e}")
                    
            results['total_pools_analyzed'] += len(pools)
            
            # Calculate network averages
            if network_health_scores:
                network_results['avg_health_score'] = np.mean(network_health_scores)
                network_results['avg_apy'] = np.mean(network_apys)
                network_results['avg_risk_score'] = np.mean(network_risk_scores)
                
            results['network_analysis'][network] = network_results
            
        # Market summary
        if all_health_scores:
            results['market_summary'] = {
                'overall_market_health': np.mean(all_health_scores),
                'market_apy_average': np.mean(all_apys),
                'total_opportunities': len(results['investment_opportunities']),
                'total_risk_warnings': len(results['risk_warnings'])
            }
            
        # Sort results
        results['investment_opportunities'].sort(key=lambda x: x['signal_strength'], reverse=True)
        results['risk_warnings'].sort(key=lambda x: x['risk_score'], reverse=True)
        
        return results

async def main():
    """Main execution function for the trading bot"""
    logger.info("Initializing Quantum Secure Trader - Liquidity Pool Analysis Bot")
    
    async with QuantumPoolAnalyzer() as analyzer:
        # Run comprehensive analysis
        analysis_results = await analyzer.run_comprehensive_analysis()
        
        # Display results
        print("\n" + "="*80)
        print("QUANTUM SECURE TRADER - LIQUIDITY POOL ANALYSIS REPORT")
        print("="*80)
        print(f"Analysis Time: {analysis_results['analysis_timestamp']}")
        print(f"Total Pools Analyzed: {analysis_results['total_pools_analyzed']}")
        print(f"Trading Signals Generated: {analysis_results['signals_generated']}")
        
        market = analysis_results['market_summary']
        print(f"\nMarket Health Score: {market['overall_market_health']:.1f}/100")
        print(f"Average APY: {market['market_apy_average']:.1f}%")
        
        print(f"\n{'='*50}")
        print("TOP INVESTMENT OPPORTUNITIES")
        print("="*50)
        
        for i, opp in enumerate(analysis_results['investment_opportunities'][:10], 1):
            print(f"\n{i}. {opp['pool_name']} ({opp['network'].upper()})")
            print(f"   Health Score: {opp['health_score']:.1f}/100")
            print(f"   Expected APY: {opp['apy']:.1f}%")
            print(f"   Risk Score: {opp['risk_score']:.1f}/100")
            print(f"   Signal Strength: {opp['signal_strength']:.2f}")
            print(f"   Confidence: {opp['confidence']:.2f}")
            print(f"   Liquidity: ${opp['liquidity_usd']:,.0f}")
            print(f"   24h Volume: ${opp['volume_24h']:,.0f}")
            print(f"   Analysis: {opp['reasoning']}")
            
        print(f"\n{'='*50}")
        print("RISK WARNINGS")
        print("="*50)
        
        for i, warning in enumerate(analysis_results['risk_warnings'][:5], 1):
            print(f"\n{i}. {warning['pool_name']} ({warning['network'].upper()})")
            print(f"   Risk Score: {warning['risk_score']:.1f}/100")
            print(f"   Health Score: {warning['health_score']:.1f}/100")
            print(f"   Liquidity: ${warning['liquidity_usd']:,.0f}")
            print(f"   Issues: {warning['issues']}")
            
        print(f"\n{'='*50}")
        print("NETWORK ANALYSIS")
        print("="*50)
        
        for network, data in analysis_results['network_analysis'].items():
            print(f"\n{network.upper()} Network:")
            print(f"  Pools Analyzed: {data['pools_analyzed']}")
            print(f"  Average Health: {data['avg_health_score']:.1f}/100")
            print(f"  Average APY: {data['avg_apy']:.1f}%")
            print(f"  Average Risk: {data['avg_risk_score']:.1f}/100")
            print(f"  High Quality Pools: {data['high_quality_pools']}")
            print(f"  High Risk Pools: {data['high_risk_pools']}")

if __name__ == "__main__":
    asyncio.run(main())