import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Bell, TrendingUp, TrendingDown, Volume2, Wallet, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  type: 'price_above' | 'price_below' | 'volume_spike' | 'large_transaction' | 'whale_movement';
  poolAddress: string;
  tokenSymbol: string;
  threshold: number;
  isActive: boolean;
  createdAt: Date;
  triggeredAt?: Date;
  message: string;
}

interface AlertTrigger {
  id: string;
  alertId: string;
  timestamp: Date;
  currentValue: number;
  threshold: number;
  message: string;
}

export default function AlertSystem() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [recentTriggers, setRecentTriggers] = useState<AlertTrigger[]>([]);
  const [newAlert, setNewAlert] = useState({
    type: 'price_above' as Alert['type'],
    poolAddress: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640',
    tokenSymbol: 'USDC/ETH',
    threshold: 0,
    message: ''
  });
  const { toast } = useToast();

  // Demo data for immediate functionality
  useEffect(() => {
    const demoAlerts: Alert[] = [
      {
        id: '1',
        type: 'price_above',
        poolAddress: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640',
        tokenSymbol: 'USDC/ETH',
        threshold: 2600,
        isActive: true,
        createdAt: new Date(),
        message: 'ETH price above $2,600'
      },
      {
        id: '2',
        type: 'volume_spike',
        poolAddress: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640',
        tokenSymbol: 'USDC/ETH',
        threshold: 1000000,
        isActive: true,
        createdAt: new Date(),
        message: 'Volume spike above $1M in 1 hour'
      },
      {
        id: '3',
        type: 'large_transaction',
        poolAddress: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640',
        tokenSymbol: 'USDC/ETH',
        threshold: 100000,
        isActive: false,
        createdAt: new Date(),
        message: 'Large transaction above $100K'
      }
    ];
    setAlerts(demoAlerts);

    const demoTriggers: AlertTrigger[] = [
      {
        id: '1',
        alertId: '1',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        currentValue: 2615.50,
        threshold: 2600,
        message: 'ETH price reached $2,615.50 (target: $2,600)'
      },
      {
        id: '2',
        alertId: '2',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        currentValue: 1250000,
        threshold: 1000000,
        message: 'Volume spike: $1.25M in 1 hour (target: $1M)'
      }
    ];
    setRecentTriggers(demoTriggers);
  }, []);

  const createAlert = () => {
    if (!newAlert.threshold || !newAlert.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const alert: Alert = {
      id: Date.now().toString(),
      ...newAlert,
      isActive: true,
      createdAt: new Date()
    };

    setAlerts(prev => [...prev, alert]);
    setNewAlert({
      type: 'price_above',
      poolAddress: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640',
      tokenSymbol: 'USDC/ETH',
      threshold: 0,
      message: ''
    });

    toast({
      title: "Alert Created",
      description: `Alert for ${alert.message} has been activated`,
    });
  };

  const toggleAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    toast({
      title: "Alert Deleted",
      description: "The alert has been removed",
    });
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'price_above':
      case 'price_below':
        return <TrendingUp className="h-4 w-4" />;
      case 'volume_spike':
        return <Volume2 className="h-4 w-4" />;
      case 'large_transaction':
        return <Wallet className="h-4 w-4" />;
      case 'whale_movement':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getAlertTypeLabel = (type: Alert['type']) => {
    switch (type) {
      case 'price_above': return 'Price Above';
      case 'price_below': return 'Price Below';
      case 'volume_spike': return 'Volume Spike';
      case 'large_transaction': return 'Large Transaction';
      case 'whale_movement': return 'Whale Movement';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Bell className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Alert System</h1>
        <Badge variant="outline" className="ml-2">Premium Feature</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create New Alert */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Alert</CardTitle>
            <CardDescription>
              Set up custom alerts for price movements, volume spikes, and large transactions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="alert-type">Alert Type</Label>
                <Select
                  value={newAlert.type}
                  onValueChange={(value: Alert['type']) => 
                    setNewAlert(prev => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price_above">Price Above</SelectItem>
                    <SelectItem value="price_below">Price Below</SelectItem>
                    <SelectItem value="volume_spike">Volume Spike</SelectItem>
                    <SelectItem value="large_transaction">Large Transaction</SelectItem>
                    <SelectItem value="whale_movement">Whale Movement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="threshold">Threshold Value</Label>
                <Input
                  id="threshold"
                  type="number"
                  placeholder="Enter threshold"
                  value={newAlert.threshold || ''}
                  onChange={(e) => 
                    setNewAlert(prev => ({ 
                      ...prev, 
                      threshold: parseFloat(e.target.value) || 0 
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pool-address">Pool Address</Label>
              <Input
                id="pool-address"
                placeholder="0x..."
                value={newAlert.poolAddress}
                onChange={(e) => 
                  setNewAlert(prev => ({ ...prev, poolAddress: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="token-symbol">Token Pair</Label>
              <Input
                id="token-symbol"
                placeholder="e.g., USDC/ETH"
                value={newAlert.tokenSymbol}
                onChange={(e) => 
                  setNewAlert(prev => ({ ...prev, tokenSymbol: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Alert Message</Label>
              <Input
                id="message"
                placeholder="Describe your alert"
                value={newAlert.message}
                onChange={(e) => 
                  setNewAlert(prev => ({ ...prev, message: e.target.value }))
                }
              />
            </div>

            <Button onClick={createAlert} className="w-full">
              <Bell className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </CardContent>
        </Card>

        {/* Recent Triggers */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Triggers</CardTitle>
            <CardDescription>
              Alerts that have been triggered in the last 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTriggers.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No recent triggers
                </p>
              ) : (
                recentTriggers.map((trigger) => (
                  <div
                    key={trigger.id}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-orange-50 dark:bg-orange-950/20"
                  >
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                        {trigger.message}
                      </p>
                      <p className="text-xs text-orange-700 dark:text-orange-300">
                        {trigger.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Your Alerts ({alerts.length})</CardTitle>
          <CardDescription>
            Manage your active and inactive alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No alerts configured. Create your first alert above.
              </p>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    {getAlertIcon(alert.type)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{alert.message}</span>
                        <Badge variant={alert.isActive ? "default" : "secondary"}>
                          {alert.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {getAlertTypeLabel(alert.type)} • {alert.tokenSymbol} • 
                        Threshold: {alert.threshold.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={alert.isActive}
                      onCheckedChange={() => toggleAlert(alert.id)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteAlert(alert.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}