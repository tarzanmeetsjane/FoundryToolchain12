import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Monitor, Smartphone, Download, Code, Share, Palette } from "lucide-react";
import CryptoWidget from "@/components/crypto-widget";
import DexPlatformSelector from "@/components/dex-platform-selector";
import { cn } from "@/lib/utils";

export default function WidgetPage() {
  const [selectedPlatform, setSelectedPlatform] = useState("uniswap");
  const [selectedChain, setSelectedChain] = useState(1);
  const [poolAddress, setPoolAddress] = useState("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640");
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [widgetSettings, setWidgetSettings] = useState({});

  const handlePlatformChange = (platform: string, chainId: number) => {
    setSelectedPlatform(platform);
    setSelectedChain(chainId);
  };

  const generateEmbedCode = () => {
    const config = {
      poolAddress,
      dexPlatform: selectedPlatform,
      chainId: selectedChain,
      ...widgetSettings
    };

    return `<!-- Crypto Widget Embed Code -->
<div id="crypto-widget-container"></div>
<script>
  window.CryptoWidgetConfig = ${JSON.stringify(config, null, 2)};
  
  // Load widget script
  const script = document.createElement('script');
  script.src = '${window.location.origin}/widget.js';
  script.async = true;
  document.head.appendChild(script);
</script>`;
  };

  const downloadWidget = () => {
    const embedCode = generateEmbedCode();
    const blob = new Blob([embedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crypto-widget-embed.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(generateEmbedCode());
      // Show success toast here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Crypto Widget Builder
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create customizable real-time crypto tracking widgets for your website or desktop
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Widget Configuration
                </CardTitle>
                <CardDescription>
                  Customize your widget appearance and data source
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pool Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Trading Pool</label>
                  <DexPlatformSelector
                    selectedPlatform={selectedPlatform}
                    selectedChain={selectedChain}
                    onPlatformChange={handlePlatformChange}
                  />
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Pool Address</label>
                    <input
                      type="text"
                      value={poolAddress}
                      onChange={(e) => setPoolAddress(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      placeholder="0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640"
                    />
                  </div>
                </div>

                <Separator />

                {/* Preview Mode Toggle */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Preview Mode</label>
                  <div className="flex gap-2">
                    <Button
                      variant={previewMode === 'desktop' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewMode('desktop')}
                      className="flex items-center gap-2"
                    >
                      <Monitor className="h-4 w-4" />
                      Desktop
                    </Button>
                    <Button
                      variant={previewMode === 'mobile' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewMode('mobile')}
                      className="flex items-center gap-2"
                    >
                      <Smartphone className="h-4 w-4" />
                      Mobile
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Export Options */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Export Widget</label>
                  <div className="flex gap-2">
                    <Button
                      onClick={downloadWidget}
                      className="flex items-center gap-2"
                      variant="outline"
                    >
                      <Download className="h-4 w-4" />
                      Download HTML
                    </Button>
                    <Button
                      onClick={copyEmbedCode}
                      className="flex items-center gap-2"
                      variant="outline"
                    >
                      <Code className="h-4 w-4" />
                      Copy Code
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Embed Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Embed Code
                </CardTitle>
                <CardDescription>
                  Copy this code to your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
                  <code>{generateEmbedCode()}</code>
                </pre>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {previewMode === 'desktop' ? <Monitor className="h-5 w-5" /> : <Smartphone className="h-5 w-5" />}
                  Live Preview
                  <Badge variant="secondary" className="ml-auto">
                    {previewMode === 'desktop' ? 'Desktop' : 'Mobile'}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Real-time preview of your crypto widget
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={cn(
                  "border-2 border-dashed border-border rounded-lg relative",
                  previewMode === 'desktop' ? "h-96 p-8" : "h-[600px] w-80 mx-auto p-4"
                )}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />
                  </div>
                  
                  {/* Widget Preview */}
                  <div className="relative z-10">
                    <CryptoWidget
                      isWidget={false}
                      onSettingsChange={setWidgetSettings}
                      initialSettings={{
                        poolAddress,
                        dexPlatform: selectedPlatform,
                        chainId: selectedChain,
                        compactMode: previewMode === 'mobile',
                      }}
                    />
                  </div>
                  
                  {/* Preview Label */}
                  <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                    {previewMode === 'desktop' ? 'Desktop View' : 'Mobile View'}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Widget Features */}
            <Card>
              <CardHeader>
                <CardTitle>Widget Features</CardTitle>
                <CardDescription>
                  What your users will get
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span>Real-time price updates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span>24h volume tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span>Price trend indicators</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      <span>Customizable refresh rates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full" />
                      <span>Multiple display modes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                      <span>Mobile responsive</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}