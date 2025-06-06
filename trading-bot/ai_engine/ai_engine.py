#!/usr/bin/env python3
"""
Quantum Secure Trader - AI Engine
Machine learning-powered trading recommendations and user behavior analysis
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, classification_report
import pickle
import sqlite3
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
import json
import os

logger = logging.getLogger(__name__)

class QuantumAIEngine:
    """Advanced AI engine for trading predictions and user recommendations"""
    
    def __init__(self, db_path: str = "trading-bot/data/quantum_pool_data.db"):
        self.db_path = db_path
        self.model_dir = "trading-bot/models"
        self.prediction_model = None
        self.recommendation_model = None
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()
        
        # Ensure model directory exists
        os.makedirs(self.model_dir, exist_ok=True)
        
        # Model file paths
        self.prediction_model_path = os.path.join(self.model_dir, "prediction_model.pkl")
        self.recommendation_model_path = os.path.join(self.model_dir, "recommendation_model.pkl")
        self.scaler_path = os.path.join(self.model_dir, "scaler.pkl")
        
    def prepare_training_data(self) -> Tuple[pd.DataFrame, pd.Series]:
        """Prepare training data from pool metrics and trading signals"""
        conn = sqlite3.connect(self.db_path)
        
        # Join pool metrics with trading signals for training
        query = """
        SELECT 
            pm.liquidity_usd,
            pm.volume_24h,
            pm.fees_24h,
            pm.apy,
            pm.price_change_24h,
            pm.risk_score,
            pm.health_score,
            pm.volatility_score,
            ts.signal_type,
            ts.strength,
            ts.confidence,
            CASE 
                WHEN ts.signal_type = 'buy' THEN 1
                WHEN ts.signal_type = 'sell' THEN 0
                ELSE 0.5
            END as target_label
        FROM pool_metrics pm
        JOIN trading_signals ts ON pm.address = ts.pool_address
        WHERE pm.timestamp > datetime('now', '-7 days')
        AND pm.liquidity_usd > 0
        AND pm.volume_24h > 0
        """
        
        df = pd.read_sql_query(query, conn)
        conn.close()
        
        if df.empty:
            logger.warning("No training data available")
            return pd.DataFrame(), pd.Series()
            
        # Feature engineering
        df['volume_to_liquidity_ratio'] = df['volume_24h'] / (df['liquidity_usd'] + 1)
        df['fee_efficiency'] = df['fees_24h'] / (df['volume_24h'] + 1)
        df['risk_adjusted_apy'] = df['apy'] / (df['risk_score'] + 1)
        df['momentum_score'] = df['price_change_24h'] * df['volume_to_liquidity_ratio']
        df['quality_score'] = (df['health_score'] * df['apy']) / (df['risk_score'] + 1)
        
        # Select features
        feature_columns = [
            'liquidity_usd', 'volume_24h', 'apy', 'price_change_24h',
            'risk_score', 'health_score', 'volatility_score',
            'volume_to_liquidity_ratio', 'fee_efficiency', 'risk_adjusted_apy',
            'momentum_score', 'quality_score'
        ]
        
        X = df[feature_columns]
        y = df['target_label']
        
        logger.info(f"Prepared training data: {len(X)} samples, {len(feature_columns)} features")
        return X, y
        
    def train_prediction_model(self) -> Dict:
        """Train the pool performance prediction model"""
        X, y = self.prepare_training_data()
        
        if X.empty:
            logger.error("No training data available for prediction model")
            return {"success": False, "error": "No training data"}
            
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Train ensemble model
        self.prediction_model = GradientBoostingClassifier(
            n_estimators=200,
            learning_rate=0.1,
            max_depth=6,
            random_state=42
        )
        
        self.prediction_model.fit(X_train_scaled, y_train)
        
        # Evaluate model
        y_pred = self.prediction_model.predict(X_test_scaled)
        accuracy = accuracy_score(y_test, y_pred)
        
        # Cross-validation
        cv_scores = cross_val_score(self.prediction_model, X_train_scaled, y_train, cv=5)
        
        # Save model
        self.save_models()
        
        results = {
            "success": True,
            "accuracy": accuracy,
            "cv_mean": cv_scores.mean(),
            "cv_std": cv_scores.std(),
            "training_samples": len(X_train),
            "test_samples": len(X_test),
            "feature_importance": dict(zip(X.columns, self.prediction_model.feature_importances_))
        }
        
        logger.info(f"Prediction model trained: {accuracy:.3f} accuracy")
        return results
        
    def train_recommendation_model(self) -> Dict:
        """Train user recommendation model"""
        # For this implementation, we'll create a simpler rule-based system
        # In production, this would use user interaction data
        
        conn = sqlite3.connect(self.db_path)
        
        # Get pool performance data for recommendations
        query = """
        SELECT 
            address,
            name,
            network,
            health_score,
            apy,
            risk_score,
            volatility_score,
            liquidity_usd,
            volume_24h,
            trend_direction
        FROM pool_metrics
        WHERE timestamp > datetime('now', '-1 day')
        AND health_score > 50
        AND liquidity_usd > 100000
        ORDER BY health_score DESC, apy DESC
        LIMIT 100
        """
        
        df = pd.read_sql_query(query, conn)
        conn.close()
        
        if df.empty:
            return {"success": False, "error": "No data for recommendation model"}
            
        # Create recommendation categories
        def categorize_pool(row):
            if row['risk_score'] < 30 and row['apy'] > 15:
                return 'conservative_growth'
            elif row['risk_score'] < 50 and row['apy'] > 25:
                return 'moderate_growth'
            elif row['health_score'] > 80:
                return 'high_quality'
            elif row['volatility_score'] < 20:
                return 'stable'
            else:
                return 'speculative'
                
        df['category'] = df.apply(categorize_pool, axis=1)
        
        # Simple recommendation model (rule-based)
        self.recommendation_model = {
            'categories': df['category'].value_counts().to_dict(),
            'top_pools_by_category': {},
            'risk_profiles': {
                'conservative': {'max_risk': 30, 'min_apy': 10, 'max_volatility': 25},
                'moderate': {'max_risk': 50, 'min_apy': 15, 'max_volatility': 40},
                'aggressive': {'max_risk': 70, 'min_apy': 20, 'max_volatility': 60}
            }
        }
        
        # Get top pools by category
        for category in df['category'].unique():
            category_pools = df[df['category'] == category].head(5)
            self.recommendation_model['top_pools_by_category'][category] = category_pools.to_dict('records')
            
        # Save recommendation model
        with open(os.path.join(self.model_dir, "recommendation_model.json"), 'w') as f:
            json.dump(self.recommendation_model, f, default=str)
            
        return {
            "success": True,
            "categories": len(self.recommendation_model['categories']),
            "pools_analyzed": len(df)
        }
        
    def predict_pool_performance(self, pool_features: Dict) -> Dict:
        """Predict pool performance based on features"""
        if self.prediction_model is None:
            self.load_models()
            
        if self.prediction_model is None:
            return {"error": "Prediction model not available"}
            
        # Convert features to DataFrame
        feature_order = [
            'liquidity_usd', 'volume_24h', 'apy', 'price_change_24h',
            'risk_score', 'health_score', 'volatility_score',
            'volume_to_liquidity_ratio', 'fee_efficiency', 'risk_adjusted_apy',
            'momentum_score', 'quality_score'
        ]
        
        # Calculate derived features
        features = pool_features.copy()
        features['volume_to_liquidity_ratio'] = features['volume_24h'] / (features['liquidity_usd'] + 1)
        features['fee_efficiency'] = (features['volume_24h'] * 0.003) / (features['volume_24h'] + 1)
        features['risk_adjusted_apy'] = features['apy'] / (features['risk_score'] + 1)
        features['momentum_score'] = features['price_change_24h'] * features['volume_to_liquidity_ratio']
        features['quality_score'] = (features['health_score'] * features['apy']) / (features['risk_score'] + 1)
        
        # Create feature vector
        X = np.array([[features.get(col, 0) for col in feature_order]])
        X_scaled = self.scaler.transform(X)
        
        # Make prediction
        prediction = self.prediction_model.predict(X_scaled)[0]
        probability = self.prediction_model.predict_proba(X_scaled)[0]
        
        return {
            "prediction": "buy" if prediction > 0.6 else "sell" if prediction < 0.4 else "hold",
            "confidence": max(probability),
            "buy_probability": probability[1] if len(probability) > 1 else probability[0],
            "sell_probability": probability[0] if len(probability) > 1 else 1 - probability[0]
        }
        
    def get_user_recommendations(self, user_profile: Dict) -> List[Dict]:
        """Generate personalized recommendations for user"""
        if self.recommendation_model is None:
            self.load_recommendation_model()
            
        risk_tolerance = user_profile.get('risk_tolerance', 'moderate')
        investment_amount = user_profile.get('investment_amount', 10000)
        preferences = user_profile.get('preferences', {})
        
        # Get risk profile
        risk_profile = self.recommendation_model['risk_profiles'].get(risk_tolerance, 
                                                                     self.recommendation_model['risk_profiles']['moderate'])
        
        # Get suitable pool categories
        suitable_categories = []
        if risk_tolerance == 'conservative':
            suitable_categories = ['conservative_growth', 'stable', 'high_quality']
        elif risk_tolerance == 'moderate':
            suitable_categories = ['moderate_growth', 'high_quality', 'conservative_growth']
        else:
            suitable_categories = ['speculative', 'moderate_growth', 'high_quality']
            
        recommendations = []
        
        for category in suitable_categories:
            if category in self.recommendation_model['top_pools_by_category']:
                pools = self.recommendation_model['top_pools_by_category'][category]
                
                for pool in pools[:3]:  # Top 3 from each category
                    if (pool['risk_score'] <= risk_profile['max_risk'] and
                        pool['apy'] >= risk_profile['min_apy'] and
                        pool['volatility_score'] <= risk_profile['max_volatility']):
                        
                        # Calculate allocation
                        allocation_pct = min(25, investment_amount / 4 / pool['liquidity_usd'] * 100)
                        
                        recommendations.append({
                            'pool_name': pool['name'],
                            'network': pool['network'],
                            'category': category,
                            'expected_apy': pool['apy'],
                            'risk_score': pool['risk_score'],
                            'health_score': pool['health_score'],
                            'recommended_allocation_pct': allocation_pct,
                            'recommended_amount': investment_amount * allocation_pct / 100,
                            'reasoning': f"Matches {risk_tolerance} risk profile, {category} category"
                        })
                        
        # Sort by health score and limit to top 5
        recommendations.sort(key=lambda x: x['health_score'], reverse=True)
        return recommendations[:5]
        
    def analyze_market_sentiment(self) -> Dict:
        """Analyze overall market sentiment from pool data"""
        conn = sqlite3.connect(self.db_path)
        
        query = """
        SELECT 
            AVG(health_score) as avg_health,
            AVG(apy) as avg_apy,
            AVG(risk_score) as avg_risk,
            AVG(volatility_score) as avg_volatility,
            COUNT(*) as total_pools,
            SUM(CASE WHEN trend_direction LIKE '%bullish%' THEN 1 ELSE 0 END) as bullish_pools,
            SUM(CASE WHEN trend_direction LIKE '%bearish%' THEN 1 ELSE 0 END) as bearish_pools
        FROM pool_metrics
        WHERE timestamp > datetime('now', '-1 day')
        """
        
        df = pd.read_sql_query(query, conn)
        conn.close()
        
        if df.empty:
            return {"sentiment": "unknown", "confidence": 0}
            
        row = df.iloc[0]
        
        # Calculate sentiment score
        health_score = row['avg_health'] / 100
        risk_score = (100 - row['avg_risk']) / 100
        bullish_ratio = row['bullish_pools'] / max(row['total_pools'], 1)
        
        sentiment_score = (health_score + risk_score + bullish_ratio) / 3
        
        if sentiment_score > 0.7:
            sentiment = "very_bullish"
        elif sentiment_score > 0.6:
            sentiment = "bullish"
        elif sentiment_score > 0.4:
            sentiment = "neutral"
        elif sentiment_score > 0.3:
            sentiment = "bearish"
        else:
            sentiment = "very_bearish"
            
        return {
            "sentiment": sentiment,
            "confidence": sentiment_score,
            "market_health": row['avg_health'],
            "average_apy": row['avg_apy'],
            "average_risk": row['avg_risk'],
            "bullish_pools_pct": bullish_ratio * 100,
            "total_pools_analyzed": row['total_pools']
        }
        
    def save_models(self):
        """Save trained models to disk"""
        if self.prediction_model:
            with open(self.prediction_model_path, 'wb') as f:
                pickle.dump(self.prediction_model, f)
                
        with open(self.scaler_path, 'wb') as f:
            pickle.dump(self.scaler, f)
            
        logger.info("Models saved successfully")
        
    def load_models(self):
        """Load trained models from disk"""
        try:
            if os.path.exists(self.prediction_model_path):
                with open(self.prediction_model_path, 'rb') as f:
                    self.prediction_model = pickle.load(f)
                    
            if os.path.exists(self.scaler_path):
                with open(self.scaler_path, 'rb') as f:
                    self.scaler = pickle.load(f)
                    
            logger.info("Models loaded successfully")
        except Exception as e:
            logger.error(f"Error loading models: {e}")
            
    def load_recommendation_model(self):
        """Load recommendation model from disk"""
        try:
            rec_model_path = os.path.join(self.model_dir, "recommendation_model.json")
            if os.path.exists(rec_model_path):
                with open(rec_model_path, 'r') as f:
                    self.recommendation_model = json.load(f)
                logger.info("Recommendation model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading recommendation model: {e}")

def main():
    """Test the AI engine"""
    ai_engine = QuantumAIEngine()
    
    print("Training prediction model...")
    prediction_results = ai_engine.train_prediction_model()
    print(f"Prediction model results: {prediction_results}")
    
    print("\nTraining recommendation model...")
    recommendation_results = ai_engine.train_recommendation_model()
    print(f"Recommendation model results: {recommendation_results}")
    
    print("\nAnalyzing market sentiment...")
    sentiment = ai_engine.analyze_market_sentiment()
    print(f"Market sentiment: {sentiment}")
    
    # Test recommendations
    user_profile = {
        'risk_tolerance': 'moderate',
        'investment_amount': 10000,
        'preferences': {}
    }
    
    recommendations = ai_engine.get_user_recommendations(user_profile)
    print(f"\nRecommendations for moderate risk user:")
    for i, rec in enumerate(recommendations, 1):
        print(f"{i}. {rec['pool_name']} - {rec['recommended_allocation_pct']:.1f}% allocation")

if __name__ == "__main__":
    main()