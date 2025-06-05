import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { BarChart3, Shield, Monitor, Search, Bell } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center space-x-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6" />
            <span className="font-bold">DEX Analytics</span>
          </div>
          
          <div className="flex space-x-1">
            <Link href="/">
              <Button 
                variant={location === "/" ? "default" : "ghost"} 
                size="sm"
                className="h-9"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Trading Dashboard
              </Button>
            </Link>
            
            <Link href="/liquidity-scanner">
              <Button 
                variant={location === "/liquidity-scanner" ? "default" : "ghost"} 
                size="sm"
                className="h-9"
              >
                <Search className="h-4 w-4 mr-2" />
                Liquidity Scanner
              </Button>
            </Link>
            
            <Link href="/wallet-security">
              <Button 
                variant={location === "/wallet-security" ? "default" : "ghost"} 
                size="sm"
                className="h-9"
              >
                <Shield className="h-4 w-4 mr-2" />
                Wallet Security
              </Button>
            </Link>
            
            <Link href="/alerts">
              <Button 
                variant={location === "/alerts" ? "default" : "ghost"} 
                size="sm"
                className="h-9"
              >
                <Bell className="h-4 w-4 mr-2" />
                Price Alerts
              </Button>
            </Link>
            
            <Link href="/widget">
              <Button 
                variant={location === "/widget" ? "default" : "ghost"} 
                size="sm"
                className="h-9"
              >
                <Monitor className="h-4 w-4 mr-2" />
                Widget Builder
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}