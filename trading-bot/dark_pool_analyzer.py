#!/usr/bin/env python3
"""
Quantum Secure Trader - Dark Pool & Meme Token Analyzer
Specialized analysis for low-cap tokens, meme coins, and emerging pools
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
import re
from urllib.parse import quote

logger = logging.getLogger(__name__)

@dataclass
class DarkPoolMetrics:
    """Metrics for dark/meme pools with specialized risk indicators"""
    address: str
    name: str
    token0: str
    token1: str
    market_cap: float
    liquidity_usd: float
    volume_24h: float
    age_hours: float
    holder_count: int
    honeypot_risk: float
    rug_pull_risk: float
    whale_concentration: float
    social_sentiment: float
    meme_score: float
    volatility_extreme: float
    pump_potential: float
    dump_risk: float
    creator_verified: bool
    contract_renounced: bool
    liquidity_locked: bool

@dataclass
class MemeTokenSignal:
    """Trading signal specifically for meme tokens"""
    pool_address: str
    signal_type: str  # 'pump_incoming', 'dump_warning', 'hold_steady', 'avoid_scam'
    urgency: str  # 'immediate', 'within_hour', 'within_day', 'monitor'
    pump_probability: float
    target_multiplier: float  # Expected price multiplier (2x, 10x, etc.)
    risk_level: str  # 'extreme', 'very_high', 'high', 'medium'
    reasoning: str
    social_indicators: List[str]
    technical_indicators: List[str]
    timestamp: datetime

class DarkPoolAnalyzer:
    """Specialized analyzer for dark pools and meme tokens"""
    
    def __init__(self):
        self.gecko_terminal_base = "https://api.geckoterminal.com/api/v2"
        self.dexscreener_base = "https://api.dexscreener.com/latest"
        self.session = None
        self.db_path = "trading-bot/data/dark_pools.db"
        
        # Meme token patterns and indicators
        self.meme_keywords = [
            'doge', 'shib', 'pepe', 'wojak', 'chad', 'moon', 'rocket', 'safe',
            'baby', 'mini', 'elon', 'floki', 'inu', 'akita', 'bonk', 'wif',
            'pump', 'gem', 'x1000', 'lambo', 'diamond', 'hodl', 'ape'
        ]
        
        self.risk_keywords = [
            'test', 'fork', 'copy', 'clone', 'scam', 'rug', 'honey', 'trap'
        ]
        
        self.initialize_database()
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
            
    def initialize_database(self):
        """Initialize database for dark pool tracking"""
        import os
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS dark_pools (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                address TEXT UNIQUE,
                name TEXT,
                token0 TEXT,
                token1 TEXT,
                market_cap REAL,
                liquidity_usd REAL,
                volume_24h REAL,
                age_hours REAL,
                holder_count INTEGER,
                honeypot_risk REAL,
                rug_pull_risk REAL,
                whale_concentration REAL,
                social_sentiment REAL,
                meme_score REAL,
                volatility_extreme REAL,
                pump_potential REAL,
                dump_risk REAL,
                creator_verified BOOLEAN,
                contract_renounced BOOLEAN,
                liquidity_locked BOOLEAN,
                first_detected DATETIME,
                last_updated DATETIME,
                network TEXT
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS meme_signals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pool_address TEXT,
                signal_type TEXT,
                urgency TEXT,
                pump_probability REAL,
                target_multiplier REAL,
                risk_level TEXT,
                reasoning TEXT,
                social_indicators TEXT,
                technical_indicators TEXT,
                timestamp DATETIME,
                executed BOOLEAN DEFAULT FALSE
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS social_mentions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                token_address TEXT,
                platform TEXT,
                mentions_count INTEGER,
                sentiment_score REAL,
                timestamp DATETIME
            )
        ''')
        
        conn.commit()
        conn.close()
        
    async def fetch_new_pools(self, network: str = 'eth', min_age_minutes: int = 5) -> List[Dict]:
        """Fetch newly created pools that might be dark/meme pools"""
        try:
            url = f"{self.gecko_terminal_base}/networks/{network}/new_pools"
            
            async with self.session.get(url) as response:
                if response.status == 200:
                    data = await response.json()
                    pools = data.get('data', [])
                    
                    # Filter by age
                    recent_pools = []
                    current_time = datetime.now()
                    
                    for pool in pools:
                        pool_created = pool.get('attributes', {}).get('pool_created_at')
                        if pool_created:
                            created_time = datetime.fromisoformat(pool_created.replace('Z', '+00:00'))
                            age_hours = (current_time - created_time).total_seconds() / 3600
                            
                            if age_hours >= (min_age_minutes / 60):  # At least X minutes old
                                recent_pools.append(pool)
                    
                    logger.info(f"Found {len(recent_pools)} new pools on {network}")
                    return recent_pools
                    
        except Exception as e:
            logger.error(f"Error fetching new pools: {e}")
            
        return []
        
    async def fetch_trending_tokens(self) -> List[Dict]:
        """Fetch trending tokens that might include meme coins"""
        try:
            url = f"{self.gecko_terminal_base}/tokens/trending"
            
            async with self.session.get(url) as response:
                if response.status == 200:
                    data = await response.json()
                    tokens = data.get('data', [])
                    logger.info(f"Found {len(tokens)} trending tokens")
                    return tokens
                    
        except Exception as e:
            logger.error(f"Error fetching trending tokens: {e}")
            
        return []
        
    async def analyze_token_contract(self, token_address: str, network: str) -> Dict:
        """Analyze token contract for honeypot and rug pull risks"""
        try:
            # This would integrate with honeypot detection APIs
            # For now, simulate analysis based on patterns
            
            contract_analysis = {
                'is_honeypot': False,
                'can_buy': True,
                'can_sell': True,
                'transfer_tax': 0.0,
                'ownership_renounced': False,
                'liquidity_locked': False,
                'verified_contract': False,
                'proxy_contract': False,
                'mint_function': False,
                'pause_function': False
            }
            
            # Simulate some risk indicators
            import random
            contract_analysis.update({
                'transfer_tax': random.uniform(0, 15),  # 0-15% tax
                'ownership_renounced': random.choice([True, False]),
                'liquidity_locked': random.choice([True, False]),
                'verified_contract': random.choice([True, False])
            })
            
            return contract_analysis
            
        except Exception as e:
            logger.error(f"Error analyzing contract {token_address}: {e}")
            return {}
            
    def calculate_meme_score(self, token_name: str, token_symbol: str) -> float:
        """Calculate how "meme-like" a token is based on name and symbol"""
        name_lower = token_name.lower()
        symbol_lower = token_symbol.lower()
        
        meme_score = 0.0
        
        # Check for meme keywords
        for keyword in self.meme_keywords:
            if keyword in name_lower or keyword in symbol_lower:
                meme_score += 0.15
                
        # Check for numbers/dates (often used in meme tokens)
        if re.search(r'\d+', name_lower) or re.search(r'\d+', symbol_lower):
            meme_score += 0.1
            
        # Check for emojis or special characters
        if re.search(r'[🚀🌙💎🦍🐕🐸]', token_name):
            meme_score += 0.2
            
        # Check for "safe" or "baby" prefixes
        if name_lower.startswith(('safe', 'baby', 'mini', 'micro')):
            meme_score += 0.25
            
        # Check for animal names
        animal_keywords = ['dog', 'cat', 'ape', 'monkey', 'frog', 'penguin', 'bear', 'bull']
        for animal in animal_keywords:
            if animal in name_lower:
                meme_score += 0.2
                break
                
        return min(meme_score, 1.0)
        
    def calculate_rug_pull_risk(self, metrics: Dict, contract_analysis: Dict) -> float:
        """Calculate rug pull risk score"""
        risk_score = 0.0
        
        # Low liquidity increases risk
        liquidity = metrics.get('liquidity_usd', 0)
        if liquidity < 10000:
            risk_score += 0.3
        elif liquidity < 50000:
            risk_score += 0.2
        elif liquidity < 100000:
            risk_score += 0.1
            
        # High tax rates are suspicious
        transfer_tax = contract_analysis.get('transfer_tax', 0)
        if transfer_tax > 10:
            risk_score += 0.25
        elif transfer_tax > 5:
            risk_score += 0.15
            
        # Ownership not renounced is risky
        if not contract_analysis.get('ownership_renounced', False):
            risk_score += 0.2
            
        # Liquidity not locked is risky
        if not contract_analysis.get('liquidity_locked', False):
            risk_score += 0.15
            
        # Very new tokens are riskier
        age_hours = metrics.get('age_hours', 24)
        if age_hours < 1:
            risk_score += 0.3
        elif age_hours < 6:
            risk_score += 0.2
        elif age_hours < 24:
            risk_score += 0.1
            
        # Unverified contracts are riskier
        if not contract_analysis.get('verified_contract', False):
            risk_score += 0.1
            
        return min(risk_score, 1.0)
        
    def calculate_pump_potential(self, metrics: Dict, social_data: Dict) -> float:
        """Calculate potential for price pump"""
        pump_score = 0.0
        
        # High volume relative to market cap
        volume_24h = metrics.get('volume_24h', 0)
        market_cap = metrics.get('market_cap', 1)
        
        if market_cap > 0:
            volume_ratio = volume_24h / market_cap
            if volume_ratio > 2.0:
                pump_score += 0.3
            elif volume_ratio > 1.0:
                pump_score += 0.2
            elif volume_ratio > 0.5:
                pump_score += 0.1
                
        # Social sentiment
        social_sentiment = social_data.get('sentiment_score', 0)
        if social_sentiment > 0.7:
            pump_score += 0.25
        elif social_sentiment > 0.5:
            pump_score += 0.15
            
        # Low market cap (more room to grow)
        if market_cap < 100000:
            pump_score += 0.2
        elif market_cap < 1000000:
            pump_score += 0.15
        elif market_cap < 10000000:
            pump_score += 0.1
            
        # Recent creation (new narrative potential)
        age_hours = metrics.get('age_hours', 24)
        if 6 <= age_hours <= 72:  # Sweet spot for pumps
            pump_score += 0.15
            
        return min(pump_score, 1.0)
        
    async def simulate_social_sentiment(self, token_name: str) -> Dict:
        """Simulate social sentiment analysis (would integrate with Twitter/Reddit APIs)"""
        import random
        
        # Simulate social metrics
        sentiment_data = {
            'sentiment_score': random.uniform(0, 1),
            'mentions_24h': random.randint(0, 1000),
            'twitter_followers': random.randint(0, 50000),
            'telegram_members': random.randint(0, 10000),
            'reddit_mentions': random.randint(0, 100)
        }
        
        # Boost sentiment for actual meme-like names
        if self.calculate_meme_score(token_name, token_name) > 0.3:
            sentiment_data['sentiment_score'] = min(sentiment_data['sentiment_score'] + 0.2, 1.0)
            
        return sentiment_data
        
    async def analyze_dark_pool(self, pool_data: Dict, network: str) -> DarkPoolMetrics:
        """Comprehensive analysis of a dark/meme pool"""
        attributes = pool_data.get('attributes', {})
        
        # Basic pool info
        name = attributes.get('name', 'Unknown Pool')
        address = attributes.get('address', '')
        base_token = attributes.get('base_token_name', 'Unknown')
        quote_token = attributes.get('quote_token_name', 'Unknown')
        
        # Financial metrics
        market_cap = float(attributes.get('fdv_usd', 0))
        liquidity_usd = float(attributes.get('reserve_in_usd', 0))
        volume_24h = float(attributes.get('volume_usd', {}).get('h24', 0))
        
        # Calculate age
        pool_created = attributes.get('pool_created_at')
        age_hours = 24  # Default
        if pool_created:
            try:
                created_time = datetime.fromisoformat(pool_created.replace('Z', '+00:00'))
                age_hours = (datetime.now() - created_time).total_seconds() / 3600
            except:
                pass
                
        # Analyze contract
        base_token_address = pool_data.get('relationships', {}).get('base_token', {}).get('data', {}).get('id', '')
        contract_analysis = await self.analyze_token_contract(base_token_address, network)
        
        # Social sentiment
        social_data = await self.simulate_social_sentiment(base_token)
        
        # Calculate specialized metrics
        meme_score = self.calculate_meme_score(base_token, base_token)
        rug_pull_risk = self.calculate_rug_pull_risk({
            'liquidity_usd': liquidity_usd,
            'age_hours': age_hours
        }, contract_analysis)
        
        pump_potential = self.calculate_pump_potential({
            'volume_24h': volume_24h,
            'market_cap': market_cap,
            'age_hours': age_hours
        }, social_data)
        
        return DarkPoolMetrics(
            address=address,
            name=name,
            token0=base_token,
            token1=quote_token,
            market_cap=market_cap,
            liquidity_usd=liquidity_usd,
            volume_24h=volume_24h,
            age_hours=age_hours,
            holder_count=social_data.get('telegram_members', 100),
            honeypot_risk=contract_analysis.get('is_honeypot', False) * 1.0,
            rug_pull_risk=rug_pull_risk,
            whale_concentration=0.3,  # Would calculate from holder distribution
            social_sentiment=social_data.get('sentiment_score', 0.5),
            meme_score=meme_score,
            volatility_extreme=min(volume_24h / max(liquidity_usd, 1) * 10, 1.0),
            pump_potential=pump_potential,
            dump_risk=max(rug_pull_risk, contract_analysis.get('transfer_tax', 0) / 20),
            creator_verified=contract_analysis.get('verified_contract', False),
            contract_renounced=contract_analysis.get('ownership_renounced', False),
            liquidity_locked=contract_analysis.get('liquidity_locked', False)
        )
        
    def generate_meme_signal(self, metrics: DarkPoolMetrics) -> MemeTokenSignal:
        """Generate specialized trading signal for meme tokens"""
        signal_type = "hold_steady"
        urgency = "monitor"
        pump_probability = metrics.pump_potential
        target_multiplier = 1.0
        risk_level = "medium"
        reasoning = "Standard meme token analysis"
        
        social_indicators = []
        technical_indicators = []
        
        # Determine signal based on metrics
        if metrics.rug_pull_risk > 0.7 or metrics.honeypot_risk > 0.5:
            signal_type = "avoid_scam"
            urgency = "immediate"
            risk_level = "extreme"
            reasoning = f"High scam risk: rug pull {metrics.rug_pull_risk:.2f}, honeypot {metrics.honeypot_risk:.2f}"
            
        elif metrics.pump_potential > 0.7 and metrics.rug_pull_risk < 0.3:
            signal_type = "pump_incoming"
            urgency = "within_hour" if metrics.social_sentiment > 0.8 else "within_day"
            target_multiplier = 2.0 + (metrics.pump_potential * 8)  # 2x to 10x potential
            risk_level = "very_high" if metrics.meme_score > 0.5 else "high"
            reasoning = f"Strong pump potential: {metrics.pump_potential:.2f}, good fundamentals"
            
            if metrics.social_sentiment > 0.7:
                social_indicators.append("high_social_buzz")
            if metrics.volume_24h > metrics.liquidity_usd:
                technical_indicators.append("high_volume_ratio")
            if metrics.age_hours < 48:
                technical_indicators.append("new_token_momentum")
                
        elif metrics.dump_risk > 0.6:
            signal_type = "dump_warning"
            urgency = "within_hour"
            risk_level = "very_high"
            reasoning = f"Dump risk detected: {metrics.dump_risk:.2f}"
            
        elif metrics.meme_score > 0.6 and metrics.rug_pull_risk < 0.4:
            signal_type = "pump_incoming"
            urgency = "within_day"
            target_multiplier = 1.5 + (metrics.meme_score * 3)  # 1.5x to 4.5x potential
            risk_level = "high"
            reasoning = f"Meme potential detected: score {metrics.meme_score:.2f}"
            
        return MemeTokenSignal(
            pool_address=metrics.address,
            signal_type=signal_type,
            urgency=urgency,
            pump_probability=pump_probability,
            target_multiplier=target_multiplier,
            risk_level=risk_level,
            reasoning=reasoning,
            social_indicators=social_indicators,
            technical_indicators=technical_indicators,
            timestamp=datetime.now()
        )
        
    def save_dark_pool_data(self, metrics: DarkPoolMetrics, signal: MemeTokenSignal, network: str):
        """Save dark pool analysis to database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Save pool metrics
        cursor.execute('''
            INSERT OR REPLACE INTO dark_pools 
            (address, name, token0, token1, market_cap, liquidity_usd, volume_24h, age_hours,
             holder_count, honeypot_risk, rug_pull_risk, whale_concentration, social_sentiment,
             meme_score, volatility_extreme, pump_potential, dump_risk, creator_verified,
             contract_renounced, liquidity_locked, first_detected, last_updated, network)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            metrics.address, metrics.name, metrics.token0, metrics.token1,
            metrics.market_cap, metrics.liquidity_usd, metrics.volume_24h, metrics.age_hours,
            metrics.holder_count, metrics.honeypot_risk, metrics.rug_pull_risk,
            metrics.whale_concentration, metrics.social_sentiment, metrics.meme_score,
            metrics.volatility_extreme, metrics.pump_potential, metrics.dump_risk,
            metrics.creator_verified, metrics.contract_renounced, metrics.liquidity_locked,
            datetime.now(), datetime.now(), network
        ))
        
        # Save signal
        cursor.execute('''
            INSERT INTO meme_signals 
            (pool_address, signal_type, urgency, pump_probability, target_multiplier,
             risk_level, reasoning, social_indicators, technical_indicators, timestamp)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            signal.pool_address, signal.signal_type, signal.urgency, signal.pump_probability,
            signal.target_multiplier, signal.risk_level, signal.reasoning,
            json.dumps(signal.social_indicators), json.dumps(signal.technical_indicators),
            signal.timestamp
        ))
        
        conn.commit()
        conn.close()
        
    async def scan_dark_pools(self, networks: List[str] = ['eth', 'bsc', 'polygon']) -> Dict:
        """Comprehensive dark pool scan across networks"""
        results = {
            'scan_timestamp': datetime.now().isoformat(),
            'networks_scanned': networks,
            'total_pools_found': 0,
            'pump_signals': [],
            'scam_warnings': [],
            'high_risk_pools': [],
            'meme_opportunities': [],
            'network_summary': {}
        }
        
        for network in networks:
            logger.info(f"Scanning dark pools on {network}...")
            
            # Fetch new pools
            new_pools = await self.fetch_new_pools(network, min_age_minutes=10)
            
            network_results = {
                'pools_scanned': len(new_pools),
                'pump_signals': 0,
                'scam_warnings': 0,
                'avg_meme_score': 0,
                'avg_pump_potential': 0
            }
            
            meme_scores = []
            pump_potentials = []
            
            for pool_data in new_pools:
                try:
                    # Analyze pool
                    metrics = await self.analyze_dark_pool(pool_data, network)
                    signal = self.generate_meme_signal(metrics)
                    
                    # Save to database
                    self.save_dark_pool_data(metrics, signal, network)
                    
                    meme_scores.append(metrics.meme_score)
                    pump_potentials.append(metrics.pump_potential)
                    
                    # Categorize results
                    if signal.signal_type == "pump_incoming" and signal.urgency in ["immediate", "within_hour"]:
                        results['pump_signals'].append({
                            'pool_name': metrics.name,
                            'network': network,
                            'pump_probability': metrics.pump_potential,
                            'target_multiplier': signal.target_multiplier,
                            'urgency': signal.urgency,
                            'meme_score': metrics.meme_score,
                            'reasoning': signal.reasoning
                        })
                        network_results['pump_signals'] += 1
                        
                    elif signal.signal_type == "avoid_scam":
                        results['scam_warnings'].append({
                            'pool_name': metrics.name,
                            'network': network,
                            'rug_pull_risk': metrics.rug_pull_risk,
                            'honeypot_risk': metrics.honeypot_risk,
                            'reasoning': signal.reasoning
                        })
                        network_results['scam_warnings'] += 1
                        
                    elif metrics.rug_pull_risk > 0.5 or metrics.dump_risk > 0.5:
                        results['high_risk_pools'].append({
                            'pool_name': metrics.name,
                            'network': network,
                            'rug_pull_risk': metrics.rug_pull_risk,
                            'dump_risk': metrics.dump_risk
                        })
                        
                    elif metrics.meme_score > 0.5:
                        results['meme_opportunities'].append({
                            'pool_name': metrics.name,
                            'network': network,
                            'meme_score': metrics.meme_score,
                            'pump_potential': metrics.pump_potential,
                            'risk_level': signal.risk_level
                        })
                        
                except Exception as e:
                    logger.error(f"Error analyzing pool: {e}")
                    
            results['total_pools_found'] += len(new_pools)
            
            if meme_scores:
                network_results['avg_meme_score'] = np.mean(meme_scores)
                network_results['avg_pump_potential'] = np.mean(pump_potentials)
                
            results['network_summary'][network] = network_results
            
        # Sort results by priority
        results['pump_signals'].sort(key=lambda x: x['pump_probability'], reverse=True)
        results['scam_warnings'].sort(key=lambda x: x['rug_pull_risk'], reverse=True)
        results['meme_opportunities'].sort(key=lambda x: x['meme_score'], reverse=True)
        
        return results

async def main():
    """Main execution function for dark pool analysis"""
    logger.info("Starting Dark Pool & Meme Token Analyzer")
    
    async with DarkPoolAnalyzer() as analyzer:
        # Scan for dark pools and meme tokens
        scan_results = await analyzer.scan_dark_pools()
        
        print("\n" + "="*80)
        print("QUANTUM SECURE TRADER - DARK POOL & MEME TOKEN ANALYSIS")
        print("="*80)
        print(f"Scan Time: {scan_results['scan_timestamp']}")
        print(f"Total Pools Analyzed: {scan_results['total_pools_found']}")
        
        print(f"\n{'='*50}")
        print("🚀 PUMP SIGNALS (HIGH PRIORITY)")
        print("="*50)
        
        for i, signal in enumerate(scan_results['pump_signals'][:10], 1):
            print(f"\n{i}. {signal['pool_name']} ({signal['network'].upper()})")
            print(f"   Pump Probability: {signal['pump_probability']:.2f}")
            print(f"   Target Multiplier: {signal['target_multiplier']:.1f}x")
            print(f"   Urgency: {signal['urgency']}")
            print(f"   Meme Score: {signal['meme_score']:.2f}")
            print(f"   Analysis: {signal['reasoning']}")
            
        print(f"\n{'='*50}")
        print("⚠️  SCAM WARNINGS")
        print("="*50)
        
        for i, warning in enumerate(scan_results['scam_warnings'][:5], 1):
            print(f"\n{i}. {warning['pool_name']} ({warning['network'].upper()})")
            print(f"   Rug Pull Risk: {warning['rug_pull_risk']:.2f}")
            print(f"   Honeypot Risk: {warning['honeypot_risk']:.2f}")
            print(f"   Warning: {warning['reasoning']}")
            
        print(f"\n{'='*50}")
        print("🎭 MEME TOKEN OPPORTUNITIES")
        print("="*50)
        
        for i, meme in enumerate(scan_results['meme_opportunities'][:10], 1):
            print(f"\n{i}. {meme['pool_name']} ({meme['network'].upper()})")
            print(f"   Meme Score: {meme['meme_score']:.2f}")
            print(f"   Pump Potential: {meme['pump_potential']:.2f}")
            print(f"   Risk Level: {meme['risk_level']}")
            
        print(f"\n{'='*50}")
        print("NETWORK SUMMARY")
        print("="*50)
        
        for network, summary in scan_results['network_summary'].items():
            print(f"\n{network.upper()} Network:")
            print(f"  Pools Scanned: {summary['pools_scanned']}")
            print(f"  Pump Signals: {summary['pump_signals']}")
            print(f"  Scam Warnings: {summary['scam_warnings']}")
            print(f"  Avg Meme Score: {summary['avg_meme_score']:.2f}")
            print(f"  Avg Pump Potential: {summary['avg_pump_potential']:.2f}")

if __name__ == "__main__":
    asyncio.run(main())