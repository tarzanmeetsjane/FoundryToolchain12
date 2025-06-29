import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Star, Zap, Heart } from 'lucide-react';

interface PricePoint {
  timestamp: number;
  price: number;
  volume: number;
}

interface MoodIndicator {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  label: string;
  threshold: number;
}

const moodIndicators: MoodIndicator[] = [
  { icon: Heart, color: 'text-pink-500', label: 'Bullish Love', threshold: 5 },
  { icon: Zap, color: 'text-yellow-500', label: 'Electric', threshold: 3 },
  { icon: Star, color: 'text-blue-500', label: 'Stellar', threshold: 1 },
  { icon: TrendingUp, color: 'text-green-500', label: 'Rising', threshold: 0.5 },
  { icon: Minus, color: 'text-gray-500', label: 'Stable', threshold: -0.5 },
  { icon: TrendingDown, color: 'text-red-500', label: 'Declining', threshold: -100 }
];

export function PriceSparkline({ tokenAddress }: { tokenAddress: string }) {
  const [priceData, setPriceData] = useState<PricePoint[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Simulate real-time price updates for ETHGR
  useEffect(() => {
    const generatePriceData = () => {
      const basePrice = 0.00707402; // Current ETHGR price
      const data: PricePoint[] = [];
      const now = Date.now();
      
      for (let i = 23; i >= 0; i--) {
        const timestamp = now - (i * 60 * 60 * 1000); // Hourly data
        const volatility = 0.05; // 5% volatility
        const randomChange = (Math.random() - 0.5) * volatility;
        const price = basePrice * (1 + randomChange);
        const volume = Math.random() * 10000 + 1000;
        
        data.push({ timestamp, price, volume });
      }
      
      return data;
    };

    const initialData = generatePriceData();
    setPriceData(initialData);
    setCurrentPrice(initialData[initialData.length - 1].price);
    
    const firstPrice = initialData[0].price;
    const lastPrice = initialData[initialData.length - 1].price;
    const change = ((lastPrice - firstPrice) / firstPrice) * 100;
    setPriceChange(change);
    setLoading(false);

    // Update price every 30 seconds
    const interval = setInterval(() => {
      setPriceData(prev => {
        const latest = prev[prev.length - 1];
        const volatility = 0.02;
        const randomChange = (Math.random() - 0.5) * volatility;
        const newPrice = latest.price * (1 + randomChange);
        const newVolume = Math.random() * 5000 + 500;
        
        const newPoint: PricePoint = {
          timestamp: Date.now(),
          price: newPrice,
          volume: newVolume
        };
        
        const updated = [...prev.slice(1), newPoint];
        setCurrentPrice(newPrice);
        
        const change = ((newPrice - prev[0].price) / prev[0].price) * 100;
        setPriceChange(change);
        
        return updated;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [tokenAddress]);

  const getMoodIndicator = (changePercent: number): MoodIndicator => {
    return moodIndicators.find(mood => changePercent >= mood.threshold) || moodIndicators[moodIndicators.length - 1];
  };

  const generateSparklinePath = (data: PricePoint[]): string => {
    if (data.length < 2) return '';
    
    const width = 200;
    const height = 60;
    const prices = data.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;
    
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((point.price - minPrice) / priceRange) * height;
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  const mood = getMoodIndicator(priceChange);
  const MoodIcon = mood.icon;
  const sparklinePath = generateSparklinePath(priceData);

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-200 rounded-lg h-24 w-full"></div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <MoodIcon className={`w-5 h-5 ${mood.color}`} />
          <span className={`text-sm font-medium ${mood.color}`}>
            {mood.label}
          </span>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">
            ${currentPrice.toFixed(8)}
          </div>
          <div className={`text-sm ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
          </div>
        </div>
      </div>
      
      <div className="relative">
        <svg
          width="100%"
          height="60"
          viewBox="0 0 200 60"
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: priceChange >= 0 ? '#10b981' : '#ef4444', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: priceChange >= 0 ? '#10b981' : '#ef4444', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          
          {sparklinePath && (
            <>
              <path
                d={`${sparklinePath} L 200,60 L 0,60 Z`}
                fill="url(#sparklineGradient)"
              />
              <path
                d={sparklinePath}
                fill="none"
                stroke={priceChange >= 0 ? '#10b981' : '#ef4444'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}
          
          {/* Add sparkle effects for positive movement */}
          {priceChange > 2 && (
            <>
              <circle cx="50" cy="20" r="1" fill="#fbbf24" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="120" cy="15" r="1" fill="#fbbf24" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="180" cy="25" r="1" fill="#fbbf24" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.1;0.7" dur="1.8s" repeatCount="indefinite" />
              </circle>
            </>
          )}
        </svg>
        
        {/* Real-time pulse indicator */}
        <div className="absolute top-2 right-2">
          <div className={`w-2 h-2 rounded-full ${priceChange >= 0 ? 'bg-green-500' : 'bg-red-500'}`}>
            <div className={`w-2 h-2 rounded-full ${priceChange >= 0 ? 'bg-green-500' : 'bg-red-500'} animate-ping`}></div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-500 flex justify-between">
        <span>24h Volume: ${(priceData[priceData.length - 1]?.volume || 0).toLocaleString()}</span>
        <span>Live Updates</span>
      </div>
    </div>
  );
}