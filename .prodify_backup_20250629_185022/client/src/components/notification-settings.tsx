import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Webhook, 
  Settings2, 
  Volume2, 
  MessageSquare,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotificationPreferences {
  browser: {
    enabled: boolean;
    sound: boolean;
    priceAlerts: boolean;
    volumeAlerts: boolean;
    transactionAlerts: boolean;
  };
  email: {
    enabled: boolean;
    address: string;
    frequency: 'instant' | 'hourly' | 'daily';
    priceAlerts: boolean;
    volumeAlerts: boolean;
    transactionAlerts: boolean;
    weeklyReport: boolean;
  };
  sms: {
    enabled: boolean;
    phoneNumber: string;
    priceAlerts: boolean;
    urgentOnly: boolean;
  };
  webhook: {
    enabled: boolean;
    url: string;
    secret: string;
    format: 'json' | 'slack' | 'discord';
  };
  telegram: {
    enabled: boolean;
    botToken: string;
    chatId: string;
    priceAlerts: boolean;
    volumeAlerts: boolean;
  };
}

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    browser: {
      enabled: true,
      sound: true,
      priceAlerts: true,
      volumeAlerts: true,
      transactionAlerts: false,
    },
    email: {
      enabled: false,
      address: '',
      frequency: 'instant',
      priceAlerts: true,
      volumeAlerts: false,
      transactionAlerts: false,
      weeklyReport: true,
    },
    sms: {
      enabled: false,
      phoneNumber: '',
      priceAlerts: true,
      urgentOnly: true,
    },
    webhook: {
      enabled: false,
      url: '',
      secret: '',
      format: 'json',
    },
    telegram: {
      enabled: false,
      botToken: '',
      chatId: '',
      priceAlerts: true,
      volumeAlerts: false,
    },
  });

  const { toast } = useToast();

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        toast({
          title: "Notifications Enabled",
          description: "You'll now receive browser notifications for alerts",
        });
        setPreferences(prev => ({
          ...prev,
          browser: { ...prev.browser, enabled: true }
        }));
      } else {
        toast({
          title: "Notifications Blocked",
          description: "Please enable notifications in your browser settings",
          variant: "destructive"
        });
      }
    }
  };

  const testNotification = () => {
    if (preferences.browser.enabled && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('DEX Analytics Test', {
        body: 'This is a test notification from your DEX Analytics platform',
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      });
      toast({
        title: "Test Sent",
        description: "Check if you received the notification",
      });
    } else {
      toast({
        title: "Enable Notifications First",
        description: "Please enable browser notifications to test",
        variant: "destructive"
      });
    }
  };

  const saveSettings = () => {
    // In a real app, this would save to backend
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated",
    });
  };

  const updatePreference = (section: keyof NotificationPreferences, field: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings2 className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Notification Settings</h1>
        </div>
        <Button onClick={saveSettings}>
          Save All Settings
        </Button>
      </div>

      <Tabs defaultValue="browser" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="browser" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Browser
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="sms" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            SMS
          </TabsTrigger>
          <TabsTrigger value="webhook" className="flex items-center gap-2">
            <Webhook className="h-4 w-4" />
            Webhook
          </TabsTrigger>
          <TabsTrigger value="telegram" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Telegram
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browser">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Browser Notifications
              </CardTitle>
              <CardDescription>
                Receive instant notifications directly in your browser
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="browser-enabled">Enable Browser Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get real-time alerts for price movements and volume spikes
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="browser-enabled"
                    checked={preferences.browser.enabled}
                    onCheckedChange={(value) => updatePreference('browser', 'enabled', value)}
                  />
                  {!preferences.browser.enabled && (
                    <Button onClick={requestNotificationPermission} size="sm">
                      Enable
                    </Button>
                  )}
                </div>
              </div>

              {preferences.browser.enabled && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="browser-sound">Notification Sound</Label>
                      <p className="text-sm text-muted-foreground">
                        Play sound with notifications
                      </p>
                    </div>
                    <Switch
                      id="browser-sound"
                      checked={preferences.browser.sound}
                      onCheckedChange={(value) => updatePreference('browser', 'sound', value)}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Alert Types</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Price Movement Alerts</span>
                        <Switch
                          checked={preferences.browser.priceAlerts}
                          onCheckedChange={(value) => updatePreference('browser', 'priceAlerts', value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Volume Spike Alerts</span>
                        <Switch
                          checked={preferences.browser.volumeAlerts}
                          onCheckedChange={(value) => updatePreference('browser', 'volumeAlerts', value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Large Transaction Alerts</span>
                        <Switch
                          checked={preferences.browser.transactionAlerts}
                          onCheckedChange={(value) => updatePreference('browser', 'transactionAlerts', value)}
                        />
                      </div>
                    </div>
                  </div>

                  <Button onClick={testNotification} variant="outline">
                    <Volume2 className="h-4 w-4 mr-2" />
                    Send Test Notification
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Notifications
                <Badge variant="outline">Premium</Badge>
              </CardTitle>
              <CardDescription>
                Receive detailed email reports and instant alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-enabled">Enable Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get alerts and reports delivered to your inbox
                  </p>
                </div>
                <Switch
                  id="email-enabled"
                  checked={preferences.email.enabled}
                  onCheckedChange={(value) => updatePreference('email', 'enabled', value)}
                />
              </div>

              {preferences.email.enabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email-address">Email Address</Label>
                    <Input
                      id="email-address"
                      type="email"
                      placeholder="your@email.com"
                      value={preferences.email.address}
                      onChange={(e) => updatePreference('email', 'address', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-frequency">Email Frequency</Label>
                    <Select
                      value={preferences.email.frequency}
                      onValueChange={(value) => updatePreference('email', 'frequency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instant">Instant (real-time)</SelectItem>
                        <SelectItem value="hourly">Hourly Summary</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label>Email Alert Types</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Price Movement Alerts</span>
                        <Switch
                          checked={preferences.email.priceAlerts}
                          onCheckedChange={(value) => updatePreference('email', 'priceAlerts', value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Volume Spike Alerts</span>
                        <Switch
                          checked={preferences.email.volumeAlerts}
                          onCheckedChange={(value) => updatePreference('email', 'volumeAlerts', value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Large Transaction Alerts</span>
                        <Switch
                          checked={preferences.email.transactionAlerts}
                          onCheckedChange={(value) => updatePreference('email', 'transactionAlerts', value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Weekly Portfolio Report</span>
                        <Switch
                          checked={preferences.email.weeklyReport}
                          onCheckedChange={(value) => updatePreference('email', 'weeklyReport', value)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                SMS Notifications
                <Badge variant="outline">Premium</Badge>
              </CardTitle>
              <CardDescription>
                Get urgent alerts sent directly to your phone
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-enabled">Enable SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive critical alerts via text message
                  </p>
                </div>
                <Switch
                  id="sms-enabled"
                  checked={preferences.sms.enabled}
                  onCheckedChange={(value) => updatePreference('sms', 'enabled', value)}
                />
              </div>

              {preferences.sms.enabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <Input
                      id="phone-number"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={preferences.sms.phoneNumber}
                      onChange={(e) => updatePreference('sms', 'phoneNumber', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Include country code. SMS rates may apply.
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-price">Price Movement Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified of significant price changes
                      </p>
                    </div>
                    <Switch
                      id="sms-price"
                      checked={preferences.sms.priceAlerts}
                      onCheckedChange={(value) => updatePreference('sms', 'priceAlerts', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-urgent">Urgent Alerts Only</Label>
                      <p className="text-sm text-muted-foreground">
                        Only send SMS for high-priority alerts
                      </p>
                    </div>
                    <Switch
                      id="sms-urgent"
                      checked={preferences.sms.urgentOnly}
                      onCheckedChange={(value) => updatePreference('sms', 'urgentOnly', value)}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhook">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                Webhook Integration
                <Badge variant="outline">Developer</Badge>
              </CardTitle>
              <CardDescription>
                Send alert data to your applications via HTTP webhooks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="webhook-enabled">Enable Webhook</Label>
                  <p className="text-sm text-muted-foreground">
                    Send POST requests to your endpoint with alert data
                  </p>
                </div>
                <Switch
                  id="webhook-enabled"
                  checked={preferences.webhook.enabled}
                  onCheckedChange={(value) => updatePreference('webhook', 'enabled', value)}
                />
              </div>

              {preferences.webhook.enabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input
                      id="webhook-url"
                      type="url"
                      placeholder="https://your-app.com/webhooks/dex-alerts"
                      value={preferences.webhook.url}
                      onChange={(e) => updatePreference('webhook', 'url', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="webhook-secret">Webhook Secret</Label>
                    <Input
                      id="webhook-secret"
                      type="password"
                      placeholder="Your secret key for verification"
                      value={preferences.webhook.secret}
                      onChange={(e) => updatePreference('webhook', 'secret', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Used to verify webhook authenticity via HMAC signature
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="webhook-format">Payload Format</Label>
                    <Select
                      value={preferences.webhook.format}
                      onValueChange={(value) => updatePreference('webhook', 'format', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="json">JSON (Standard)</SelectItem>
                        <SelectItem value="slack">Slack Format</SelectItem>
                        <SelectItem value="discord">Discord Format</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <Label className="text-sm font-medium">Example Payload</Label>
                    <pre className="text-xs mt-2 p-2 bg-background rounded border overflow-x-auto">
{JSON.stringify({
  "type": "price_alert",
  "symbol": "USDC/ETH",
  "pool_address": "0x88e6...",
  "current_price": 2615.50,
  "threshold": 2600,
  "timestamp": "2024-01-15T10:30:00Z",
  "message": "ETH price above $2,600"
}, null, 2)}
                    </pre>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="telegram">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Telegram Bot
                <Badge variant="outline">Advanced</Badge>
              </CardTitle>
              <CardDescription>
                Receive alerts through a custom Telegram bot
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="telegram-enabled">Enable Telegram Bot</Label>
                  <p className="text-sm text-muted-foreground">
                    Get alerts in your Telegram chat
                  </p>
                </div>
                <Switch
                  id="telegram-enabled"
                  checked={preferences.telegram.enabled}
                  onCheckedChange={(value) => updatePreference('telegram', 'enabled', value)}
                />
              </div>

              {preferences.telegram.enabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="bot-token">Bot Token</Label>
                    <Input
                      id="bot-token"
                      type="password"
                      placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                      value={preferences.telegram.botToken}
                      onChange={(e) => updatePreference('telegram', 'botToken', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Get this from @BotFather on Telegram
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chat-id">Chat ID</Label>
                    <Input
                      id="chat-id"
                      placeholder="123456789"
                      value={preferences.telegram.chatId}
                      onChange={(e) => updatePreference('telegram', 'chatId', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Your personal chat ID or group chat ID
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label>Telegram Alert Types</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Price Movement Alerts</span>
                        <Switch
                          checked={preferences.telegram.priceAlerts}
                          onCheckedChange={(value) => updatePreference('telegram', 'priceAlerts', value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Volume Spike Alerts</span>
                        <Switch
                          checked={preferences.telegram.volumeAlerts}
                          onCheckedChange={(value) => updatePreference('telegram', 'volumeAlerts', value)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}