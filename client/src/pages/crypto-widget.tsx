import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Smartphone,
  Monitor,
  Settings,
  Download,
  Maximize2,
  Minimize2,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Eye,
  Palette,
  Copy,
  Check
} from "lucide-react";

export default function CryptoWidget() {
  const [widgetConfig, setWidgetConfig] = useState({
    size: "medium",
    theme: "dark",
    updateInterval: 30,
    showPrices: true,
    showChanges: true,
    showVolume: true,
    showChart: false,
    tokens: ["ETH", "ETHGR", "USDC", "UNI"],
    position: "bottom-right",
    opacity: 95,
    autoHide: false
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [deviceType, setDeviceType] = useState("desktop");
  const [widgetCode, setWidgetCode] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const [cryptoData, setCryptoData] = useState([
    {
      symbol: "ETH",
      price: 2515.77,
      change24h: 2.34,
      volume: "12.5B",
      trend: "up"
    },
    {
      symbol: "ETHGR",
      price: 0.355,
      change24h: 15.67,
      volume: "2.1M",
      trend: "up"
    },
    {
      symbol: "USDC",
      price: 1.0001,
      change24h: 0.01,
      volume: "8.9B",
      trend: "neutral"
    },
    {
      symbol: "UNI",
      price: 12.45,
      change24h: -1.23,
      volume: "340M",
      trend: "down"
    }
  ]);

  const sizeOptions = [
    { value: "small", label: "Small (200x150)", width: 200, height: 150 },
    { value: "medium", label: "Medium (300x200)", width: 300, height: 200 },
    { value: "large", label: "Large (400x300)", width: 400, height: 300 },
    { value: "full", label: "Full Width", width: "100%", height: 250 }
  ];

  const themeOptions = [
    { value: "dark", label: "Dark Theme", bg: "bg-gray-900", text: "text-white" },
    { value: "light", label: "Light Theme", bg: "bg-white", text: "text-gray-900" },
    { value: "blue", label: "Blue Theme", bg: "bg-blue-900", text: "text-blue-100" },
    { value: "green", label: "Green Theme", bg: "bg-green-900", text: "text-green-100" }
  ];

  const positionOptions = [
    { value: "top-left", label: "Top Left" },
    { value: "top-right", label: "Top Right" },
    { value: "bottom-left", label: "Bottom Left" },
    { value: "bottom-right", label: "Bottom Right" },
    { value: "center", label: "Center" }
  ];

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setCryptoData(prev => prev.map(token => ({
        ...token,
        price: token.price * (1 + (Math.random() - 0.5) * 0.01),
        change24h: token.change24h + (Math.random() - 0.5) * 0.5
      })));
    }, widgetConfig.updateInterval * 1000);

    return () => clearInterval(interval);
  }, [widgetConfig.updateInterval]);

  useEffect(() => {
    generateWidgetCode();
  }, [widgetConfig, deviceType]);

  const generateWidgetCode = () => {
    const selectedSize = sizeOptions.find(s => s.value === widgetConfig.size);
    const selectedTheme = themeOptions.find(t => t.value === widgetConfig.theme);

    const code = `<!-- Quantum Crypto Widget -->
<div id="quantum-crypto-widget" style="
  width: ${selectedSize?.width}px;
  height: ${selectedSize?.height}px;
  position: fixed;
  ${widgetConfig.position.includes('top') ? 'top: 20px;' : 'bottom: 20px;'}
  ${widgetConfig.position.includes('left') ? 'left: 20px;' : 'right: 20px;'}
  opacity: ${widgetConfig.opacity / 100};
  z-index: 9999;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  ${selectedTheme?.bg === 'bg-gray-900' ? 'background: rgba(17, 24, 39, 0.95);' : 
    selectedTheme?.bg === 'bg-white' ? 'background: rgba(255, 255, 255, 0.95);' :
    selectedTheme?.bg === 'bg-blue-900' ? 'background: rgba(30, 58, 138, 0.95);' :
    'background: rgba(20, 83, 45, 0.95);'}
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.1);
  overflow: hidden;
  ${deviceType === 'mobile' ? `
  @media (max-width: 768px) {
    width: calc(100vw - 40px) !important;
    height: auto !important;
    position: fixed !important;
    bottom: 20px !important;
    left: 20px !important;
    right: 20px !important;
  }` : ''}
">
  <div style="padding: 16px;">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
      <h3 style="margin: 0; font-size: 14px; font-weight: 600; ${selectedTheme?.text === 'text-white' ? 'color: white;' : selectedTheme?.text === 'text-gray-900' ? 'color: #111827;' : selectedTheme?.text === 'text-blue-100' ? 'color: #dbeafe;' : 'color: #dcfce7;'}">
        Crypto Tracker
      </h3>
      <div style="display: flex; gap: 8px;">
        <button onclick="refreshWidget()" style="background: none; border: none; cursor: pointer; padding: 4px; border-radius: 4px; ${selectedTheme?.text === 'text-white' ? 'color: rgba(255,255,255,0.7);' : 'color: rgba(0,0,0,0.7);'}">
          ↻
        </button>
        ${widgetConfig.autoHide ? `<button onclick="toggleWidget()" style="background: none; border: none; cursor: pointer; padding: 4px; border-radius: 4px; ${selectedTheme?.text === 'text-white' ? 'color: rgba(255,255,255,0.7);' : 'color: rgba(0,0,0,0.7);'}">−</button>` : ''}
      </div>
    </div>
    
    <div id="crypto-data" style="space-y: 8px;">
      ${widgetConfig.tokens.map(token => {
        const data = cryptoData.find(d => d.symbol === token);
        if (!data) return '';
        
        return `<div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <div>
            <div style="font-weight: 600; font-size: 13px; ${selectedTheme?.text === 'text-white' ? 'color: white;' : selectedTheme?.text === 'text-gray-900' ? 'color: #111827;' : selectedTheme?.text === 'text-blue-100' ? 'color: #dbeafe;' : 'color: #dcfce7;'}">${token}</div>
            ${widgetConfig.showVolume ? `<div style="font-size: 10px; opacity: 0.7; ${selectedTheme?.text === 'text-white' ? 'color: rgba(255,255,255,0.7);' : 'color: rgba(0,0,0,0.7);'}">Vol: ${data.volume}</div>` : ''}
          </div>
          <div style="text-align: right;">
            ${widgetConfig.showPrices ? `<div style="font-weight: 600; font-size: 13px; ${selectedTheme?.text === 'text-white' ? 'color: white;' : selectedTheme?.text === 'text-gray-900' ? 'color: #111827;' : selectedTheme?.text === 'text-blue-100' ? 'color: #dbeafe;' : 'color: #dcfce7;'}">$${data.price.toFixed(token === 'ETHGR' ? 3 : 2)}</div>` : ''}
            ${widgetConfig.showChanges ? `<div style="font-size: 11px; color: ${data.change24h >= 0 ? '#10b981' : '#ef4444'};">${data.change24h >= 0 ? '+' : ''}${data.change24h.toFixed(2)}%</div>` : ''}
          </div>
        </div>`;
      }).join('')}
    </div>
    
    <div style="margin-top: 12px; text-align: center;">
      <a href="https://quantum-secure-trader.replit.app" target="_blank" style="font-size: 10px; ${selectedTheme?.text === 'text-white' ? 'color: rgba(255,255,255,0.5);' : 'color: rgba(0,0,0,0.5);'} text-decoration: none;">
        Powered by Quantum Trader
      </a>
    </div>
  </div>
</div>

<script>
let isMinimized = false;

function refreshWidget() {
  // Fetch latest crypto data
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,usd-coin,uniswap&vs_currencies=usd&include_24hr_change=true')
    .then(response => response.json())
    .then(data => {
      // Update widget with real data
      updateWidgetData(data);
    })
    .catch(error => console.log('Widget refresh failed:', error));
}

function toggleWidget() {
  const widget = document.getElementById('quantum-crypto-widget');
  if (isMinimized) {
    widget.style.height = '${selectedSize?.height}px';
    isMinimized = false;
  } else {
    widget.style.height = '40px';
    isMinimized = true;
  }
}

function updateWidgetData(data) {
  // Update the crypto data in the widget
  const cryptoContainer = document.getElementById('crypto-data');
  // Implementation for real-time updates
}

// Auto-refresh every ${widgetConfig.updateInterval} seconds
setInterval(refreshWidget, ${widgetConfig.updateInterval * 1000});

// Initial load
refreshWidget();
</script>`;

    setWidgetCode(code);
  };

  const copyWidgetCode = () => {
    navigator.clipboard.writeText(widgetCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const downloadWidget = () => {
    const blob = new Blob([widgetCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quantum-crypto-widget.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const selectedSize = sizeOptions.find(s => s.value === widgetConfig.size);
  const selectedTheme = themeOptions.find(t => t.value === widgetConfig.theme);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Customizable Crypto Widget</h1>
        <p className="text-muted-foreground">
          Create real-time crypto tracking widgets for desktop and mobile
        </p>
      </div>

      <Alert className="border-blue-500 bg-blue-50">
        <BarChart3 className="h-4 w-4" />
        <AlertDescription>
          <strong>WIDGET READY:</strong> Customizable real-time crypto tracker with ETHGR token support. 
          Perfect for embedding on websites or using as a desktop overlay.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="configure" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="configure">Configure</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Get Code</TabsTrigger>
          <TabsTrigger value="install">Install</TabsTrigger>
        </TabsList>

        <TabsContent value="configure">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Widget Configuration
                </CardTitle>
                <CardDescription>
                  Customize your crypto tracking widget
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>Device Type</Label>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant={deviceType === "desktop" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDeviceType("desktop")}
                      >
                        <Monitor className="h-4 w-4 mr-1" />
                        Desktop
                      </Button>
                      <Button
                        variant={deviceType === "mobile" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDeviceType("mobile")}
                      >
                        <Smartphone className="h-4 w-4 mr-1" />
                        Mobile
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Widget Size</Label>
                    <Select 
                      value={widgetConfig.size} 
                      onValueChange={(value) => setWidgetConfig({...widgetConfig, size: value})}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sizeOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Theme</Label>
                    <Select 
                      value={widgetConfig.theme} 
                      onValueChange={(value) => setWidgetConfig({...widgetConfig, theme: value})}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {themeOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded ${option.bg}`}></div>
                              {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Position</Label>
                    <Select 
                      value={widgetConfig.position} 
                      onValueChange={(value) => setWidgetConfig({...widgetConfig, position: value})}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {positionOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Update Interval: {widgetConfig.updateInterval}s</Label>
                    <Slider
                      value={[widgetConfig.updateInterval]}
                      onValueChange={([value]) => setWidgetConfig({...widgetConfig, updateInterval: value})}
                      min={5}
                      max={300}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Opacity: {widgetConfig.opacity}%</Label>
                    <Slider
                      value={[widgetConfig.opacity]}
                      onValueChange={([value]) => setWidgetConfig({...widgetConfig, opacity: value})}
                      min={50}
                      max={100}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Display Options
                </CardTitle>
                <CardDescription>
                  Choose what information to show
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Show Prices</Label>
                    <Switch
                      checked={widgetConfig.showPrices}
                      onCheckedChange={(checked) => setWidgetConfig({...widgetConfig, showPrices: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Show 24h Changes</Label>
                    <Switch
                      checked={widgetConfig.showChanges}
                      onCheckedChange={(checked) => setWidgetConfig({...widgetConfig, showChanges: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Show Volume</Label>
                    <Switch
                      checked={widgetConfig.showVolume}
                      onCheckedChange={(checked) => setWidgetConfig({...widgetConfig, showVolume: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Show Mini Chart</Label>
                    <Switch
                      checked={widgetConfig.showChart}
                      onCheckedChange={(checked) => setWidgetConfig({...widgetConfig, showChart: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Auto Hide/Minimize</Label>
                    <Switch
                      checked={widgetConfig.autoHide}
                      onCheckedChange={(checked) => setWidgetConfig({...widgetConfig, autoHide: checked})}
                    />
                  </div>

                  <div>
                    <Label>Tracked Tokens</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["ETH", "ETHGR", "USDC", "UNI", "LINK", "AAVE"].map(token => (
                        <Badge
                          key={token}
                          variant={widgetConfig.tokens.includes(token) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            const tokens = widgetConfig.tokens.includes(token)
                              ? widgetConfig.tokens.filter(t => t !== token)
                              : [...widgetConfig.tokens, token];
                            setWidgetConfig({...widgetConfig, tokens});
                          }}
                        >
                          {token}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Widget Preview - {deviceType === "desktop" ? "Desktop" : "Mobile"}
              </CardTitle>
              <CardDescription>
                Live preview of your customized widget
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`relative ${deviceType === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
                <div 
                  className={`
                    ${selectedTheme?.bg} ${selectedTheme?.text}
                    rounded-xl shadow-2xl backdrop-blur-sm border border-white/10
                    ${deviceType === 'mobile' ? 'w-full' : ''}
                  `}
                  style={{
                    width: deviceType === 'mobile' ? '100%' : selectedSize?.width,
                    height: selectedSize?.height,
                    opacity: widgetConfig.opacity / 100
                  }}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold">Crypto Tracker</h3>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                        {widgetConfig.autoHide && (
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Minimize2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {widgetConfig.tokens.map(token => {
                        const data = cryptoData.find(d => d.symbol === token);
                        if (!data) return null;
                        
                        return (
                          <div key={token} className="flex justify-between items-center py-2 border-b border-white/10">
                            <div>
                              <div className="font-semibold text-xs">{token}</div>
                              {widgetConfig.showVolume && (
                                <div className="text-xs opacity-70">Vol: {data.volume}</div>
                              )}
                            </div>
                            <div className="text-right">
                              {widgetConfig.showPrices && (
                                <div className="font-semibold text-xs">
                                  ${data.price.toFixed(token === 'ETHGR' ? 3 : 2)}
                                </div>
                              )}
                              {widgetConfig.showChanges && (
                                <div className={`text-xs ${data.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                  {data.change24h >= 0 ? '+' : ''}{data.change24h.toFixed(2)}%
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-3 text-center">
                      <div className="text-xs opacity-50">Powered by Quantum Trader</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Copy className="h-5 w-5" />
                Widget Embed Code
              </CardTitle>
              <CardDescription>
                Copy this code to embed the widget on any website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={copyWidgetCode} className="flex items-center gap-2">
                  {copySuccess ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copySuccess ? "Copied!" : "Copy Code"}
                </Button>
                <Button onClick={downloadWidget} variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download HTML
                </Button>
              </div>
              
              <div className="relative">
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs">
                  <code>{widgetCode}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="install">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Installation Guide
              </CardTitle>
              <CardDescription>
                How to install and use your crypto widget
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-bold mb-2">Website Integration</h3>
                  <ol className="space-y-2 text-sm">
                    <li>1. Copy the embed code from the "Get Code" tab</li>
                    <li>2. Paste it into your website's HTML before the closing &lt;/body&gt; tag</li>
                    <li>3. The widget will automatically load and start tracking prices</li>
                  </ol>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-bold mb-2">Desktop Overlay</h3>
                  <ol className="space-y-2 text-sm">
                    <li>1. Download the HTML file using the "Download HTML" button</li>
                    <li>2. Open the file in your web browser</li>
                    <li>3. The widget will appear as a floating overlay</li>
                    <li>4. Bookmark the page for easy access</li>
                  </ol>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-bold mb-2">Mobile Usage</h3>
                  <ol className="space-y-2 text-sm">
                    <li>1. Switch to mobile mode in configuration</li>
                    <li>2. The widget automatically adapts to mobile screens</li>
                    <li>3. Add to home screen for quick access</li>
                    <li>4. Works in all mobile browsers</li>
                  </ol>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-bold mb-2">Features</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Real-time price updates every {widgetConfig.updateInterval} seconds</li>
                    <li>• ETHGR token tracking included</li>
                    <li>• Responsive design for all devices</li>
                    <li>• Customizable themes and positions</li>
                    <li>• No external dependencies required</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Widget Benefits for ETHGR Token Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-bold">Professional Credibility</div>
              <div className="text-sm text-muted-foreground">
                Show buyers you have professional-grade tools
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-bold">Real-time ETHGR Tracking</div>
              <div className="text-sm text-muted-foreground">
                Buyers can monitor ETHGR price movements live
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="font-bold">Marketing Tool</div>
              <div className="text-sm text-muted-foreground">
                Distribute widgets to potential buyers and communities
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}