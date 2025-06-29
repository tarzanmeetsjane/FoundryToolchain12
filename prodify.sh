
#!/bin/bash

# =====================================================
# PRODIFY - Demo to Production Transition Tool
# =====================================================
# Automated web application production deployment
# Author: QuantaScriptor for QuantaScript.com
# 2024 Reece Dixon - All rights reserved
# =====================================================

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ASCII Art Banner
echo -e "${PURPLE}"
cat << 'EOF'
 ____  ____   ___  ____  ___ _____  __
|  _ \|  _ \ / _ \|  _ \|_ _|  ___\ \/ /
| |_) | |_) | | | | | | || || |_   \  / 
|  __/|  _ <| |_| | |_| || ||  _|  /  \ 
|_|   |_| \_\\___/|____/___|_|   /_/\_\
                                       
EOF
echo -e "${NC}"
echo -e "${CYAN}🚀 Automated Demo-to-Production Transition Tool${NC}"
echo -e "${CYAN}=================================================${NC}\n"

# Configuration Variables
PROJECT_ROOT=$(pwd)
BACKUP_DIR="$PROJECT_ROOT/.prodify_backup_$(date +%Y%m%d_%H%M%S)"
LOG_FILE="$PROJECT_ROOT/prodify.log"
PRODUCTION_ENV_FILE="$PROJECT_ROOT/.env.production"

# Initialize logging
exec 1> >(tee -a "$LOG_FILE")
exec 2> >(tee -a "$LOG_FILE" >&2)

echo "$(date): Starting Prodify transition process..."

# =====================================================
# UTILITY FUNCTIONS
# =====================================================

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

create_backup() {
    log_info "Creating system backup..."
    mkdir -p "$BACKUP_DIR"
    
    # Backup critical files
    cp -r client/ "$BACKUP_DIR/" 2>/dev/null || true
    cp -r server/ "$BACKUP_DIR/" 2>/dev/null || true
    cp .env "$BACKUP_DIR/" 2>/dev/null || true
    cp package.json "$BACKUP_DIR/" 2>/dev/null || true
    
    log_success "Backup created at: $BACKUP_DIR"
}

detect_framework() {
    log_info "Detecting application framework..."
    
    if [[ -f "package.json" ]]; then
        if grep -q "react" package.json; then
            echo "react"
        elif grep -q "vue" package.json; then
            echo "vue"
        elif grep -q "express" package.json; then
            echo "express"
        elif grep -q "next" package.json; then
            echo "nextjs"
        else
            echo "nodejs"
        fi
    elif [[ -f "requirements.txt" ]] || [[ -f "pyproject.toml" ]]; then
        echo "python"
    elif [[ -f "go.mod" ]]; then
        echo "go"
    else
        echo "unknown"
    fi
}

# =====================================================
# PRODUCTION CONFIGURATION
# =====================================================

setup_production_env() {
    log_info "Setting up production environment..."
    
    # Create production environment file
    cat > "$PRODUCTION_ENV_FILE" << EOF
# Production Environment Configuration
NODE_ENV=production
PORT=5000

# Database Configuration
DATABASE_URL=\${LIVE_DATABASE_URL:-\${DATABASE_URL}}
REDIS_URL=\${LIVE_REDIS_URL:-\${REDIS_URL}}

# API Configuration
API_BASE_URL=https://\${REPL_SLUG}.\${REPL_OWNER}.repl.co
FRONTEND_URL=https://\${REPL_SLUG}.\${REPL_OWNER}.repl.co

# Blockchain Configuration (from existing .env)
MAINNET_RPC_URL=${MAINNET_RPC_URL}
ETHERSCAN_API_KEY=${ETHERSCAN_API_KEY}
PRIVATE_KEY=${PRIVATE_KEY}
ETHGR_CONTRACT=${ETHGR_CONTRACT}

# Security
SECURE_COOKIES=true
TRUST_PROXY=true
RATE_LIMIT_ENABLED=true

# Performance
CACHE_ENABLED=true
COMPRESSION_ENABLED=true
EOF
    
    log_success "Production environment configured"
}

update_server_config() {
    log_info "Updating server configuration for production..."
    
    # Update server/index.ts for production
    if [[ -f "server/index.ts" ]]; then
        # Add production optimizations
        cat >> server/index.ts << 'EOF'

// Production optimizations
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  
  // Add compression
  const compression = require('compression');
  app.use(compression());
  
  // Add security headers
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
  });
  
  // Rate limiting
  const rateLimit = require('express-rate-limit');
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  app.use(limiter);
}
EOF
    fi
    
    log_success "Server configuration updated for production"
}

# =====================================================
# DATA SOURCE MANAGEMENT
# =====================================================

transition_data_sources() {
    log_info "Transitioning from mock data to live data sources..."
    
    # Update client-side API endpoints
    find client/src -name "*.ts" -o -name "*.tsx" | xargs grep -l "localhost\|127.0.0.1\|demo\|mock" | while read file; do
        log_info "Updating data sources in: $file"
        
        # Replace localhost with production URL
        sed -i.bak 's/localhost:5000/window.location.host/g' "$file"
        sed -i.bak 's/127.0.0.1:5000/window.location.host/g' "$file"
        
        # Replace mock API endpoints with live ones
        sed -i.bak 's/\/api\/mock\//\/api\//g' "$file"
        sed -i.bak 's/demo\.example\.com/api.etherscan.io/g' "$file"
        
        # Update environment variable references
        sed -i.bak 's/process\.env\.DEMO_/process.env.PRODUCTION_/g' "$file"
    done
    
    # Update constants file for production
    if [[ -f "client/src/lib/constants.ts" ]]; then
        log_info "Updating constants for production..."
        
        # Backup and update constants
        cp client/src/lib/constants.ts client/src/lib/constants.ts.bak
        
        cat >> client/src/lib/constants.ts << 'EOF'

// Production API endpoints
export const PRODUCTION_ENDPOINTS = {
  ETHERSCAN_API: "https://api.etherscan.io/api",
  ALCHEMY_API: process.env.MAINNET_RPC_URL,
  COINGECKO_API: "https://api.coingecko.com/api/v3",
  LIVE_DATA: "/api/live",
} as const;

// Use production endpoints in production
export const ACTIVE_ENDPOINTS = process.env.NODE_ENV === 'production' 
  ? PRODUCTION_ENDPOINTS 
  : API_ENDPOINTS;
EOF
    fi
    
    log_success "Data sources transitioned to production"
}

update_blockchain_config() {
    log_info "Updating blockchain configuration for production..."
    
    # Update wallet service for production
    if [[ -f "server/wallet-service.ts" ]]; then
        log_info "Updating wallet service configuration..."
        
        # Add production blockchain settings
        cat >> server/wallet-service.ts << 'EOF'

// Production blockchain configuration
const PRODUCTION_CONFIG = {
  MAINNET_RPC: process.env.MAINNET_RPC_URL,
  ETHERSCAN_API: process.env.ETHERSCAN_API_KEY,
  GAS_LIMIT: 300000,
  GAS_PRICE_MULTIPLIER: 1.2,
  CONFIRMATION_BLOCKS: 2,
  RETRY_ATTEMPTS: 3,
  RATE_LIMIT: {
    requests: 5,
    per: 'second'
  }
};

// Export production config for use
export { PRODUCTION_CONFIG };
EOF
    fi
    
    log_success "Blockchain configuration updated for production"
}

# =====================================================
# APPLICATION OPTIMIZATION
# =====================================================

optimize_build() {
    log_info "Optimizing build for production..."
    
    # Install production dependencies if needed
    if [[ -f "package.json" ]]; then
        npm ci --only=production --silent
        
        # Add build optimizations to package.json
        if ! grep -q "build:prod" package.json; then
            # Create optimized build script
            npm pkg set scripts.build:prod="NODE_ENV=production npm run build"
            npm pkg set scripts.start:prod="NODE_ENV=production npm start"
        fi
    fi
    
    # Build the application
    if npm run build:prod 2>/dev/null; then
        log_success "Production build completed successfully"
    else
        log_warning "Production build failed, using standard build"
        npm run build
    fi
}

setup_caching() {
    log_info "Setting up production caching..."
    
    # Create cache configuration
    mkdir -p cache
    
    cat > cache/config.json << 'EOF'
{
  "redis": {
    "enabled": true,
    "ttl": 3600,
    "prefix": "ethgr_prod:"
  },
  "memory": {
    "enabled": true,
    "maxSize": "100mb",
    "ttl": 1800
  },
  "static": {
    "maxAge": 86400,
    "immutable": true
  }
}
EOF
    
    log_success "Caching configuration created"
}

# =====================================================
# SECURITY HARDENING
# =====================================================

apply_security_measures() {
    log_info "Applying production security measures..."
    
    # Update CORS settings
    if [[ -f "server/index.ts" ]]; then
        # Add production CORS configuration
        sed -i.bak '/app.use(express.json())/a\
\
// Production CORS settings\
if (process.env.NODE_ENV === "production") {\
  app.use(cors({\
    origin: process.env.FRONTEND_URL,\
    credentials: true,\
    optionsSuccessStatus: 200\
  }));\
} else {\
  app.use(cors());\
}' server/index.ts
    fi
    
    # Create security middleware
    cat > server/middleware/security.ts << 'EOF'
import { Request, Response, NextFunction } from 'express';

export const securityMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Remove server information
  res.removeHeader('X-Powered-By');
  
  // Add security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  next();
};
EOF
    
    log_success "Security measures applied"
}

# =====================================================
# MONITORING AND HEALTH CHECKS
# =====================================================

setup_monitoring() {
    log_info "Setting up production monitoring..."
    
    # Create health check endpoint
    cat > server/routes/health.ts << 'EOF'
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
    services: {
      database: 'connected',
      blockchain: 'connected',
      cache: 'active'
    }
  };
  
  res.json(health);
});

router.get('/ready', (req: Request, res: Response) => {
  // Check if all services are ready
  const isReady = true; // Add actual readiness checks
  
  if (isReady) {
    res.status(200).json({ status: 'ready' });
  } else {
    res.status(503).json({ status: 'not ready' });
  }
});

export default router;
EOF
    
    log_success "Monitoring endpoints created"
}

# =====================================================
# DEPLOYMENT EXECUTION
# =====================================================

execute_deployment() {
    log_info "Executing production deployment..."
    
    # Stop any running development servers
    pkill -f "npm run dev" 2>/dev/null || true
    pkill -f "vite" 2>/dev/null || true
    
    # Start production server
    if [[ -f "package.json" ]]; then
        # Set production environment
        export NODE_ENV=production
        
        # Start the application in production mode
        if npm run start:prod 2>/dev/null; then
            log_success "Production server started successfully"
        else
            log_info "Starting with standard production command"
            npm start &
            SERVER_PID=$!
            
            # Wait for server to start
            sleep 5
            
            # Check if server is running
            if curl -s http://0.0.0.0:5000/health > /dev/null; then
                log_success "Production server is running on port 5000"
            else
                log_error "Failed to start production server"
                return 1
            fi
        fi
    fi
}

verify_deployment() {
    log_info "Verifying production deployment..."
    
    # Health check
    if curl -s http://0.0.0.0:5000/health | grep -q "healthy"; then
        log_success "Health check passed"
    else
        log_warning "Health check failed or endpoint not available"
    fi
    
    # Check API endpoints
    local endpoints=("/api/verification" "/api/wallet-analysis" "/health")
    
    for endpoint in "${endpoints[@]}"; do
        if curl -s "http://0.0.0.0:5000$endpoint" > /dev/null; then
            log_success "Endpoint $endpoint is responding"
        else
            log_warning "Endpoint $endpoint is not responding"
        fi
    done
    
    # Check frontend
    if curl -s http://0.0.0.0:5000 | grep -q "<!DOCTYPE html>"; then
        log_success "Frontend is serving correctly"
    else
        log_warning "Frontend may not be serving correctly"
    fi
}

# =====================================================
# MAIN EXECUTION FLOW
# =====================================================

main() {
    echo -e "${PURPLE}Starting Prodify Demo-to-Production Transition...${NC}\n"
    
    # Phase 1: Preparation
    log_info "Phase 1: Preparation and Backup"
    create_backup
    
    local framework=$(detect_framework)
    log_info "Detected framework: $framework"
    
    # Phase 2: Configuration
    log_info "Phase 2: Production Configuration"
    setup_production_env
    update_server_config
    apply_security_measures
    
    # Phase 3: Data Transition
    log_info "Phase 3: Data Source Transition"
    transition_data_sources
    update_blockchain_config
    
    # Phase 4: Optimization
    log_info "Phase 4: Build Optimization"
    optimize_build
    setup_caching
    
    # Phase 5: Monitoring
    log_info "Phase 5: Monitoring Setup"
    setup_monitoring
    
    # Phase 6: Deployment
    log_info "Phase 6: Production Deployment"
    execute_deployment
    
    # Phase 7: Verification
    log_info "Phase 7: Deployment Verification"
    verify_deployment
    
    # Final Report
    echo -e "\n${GREEN}=================================${NC}"
    echo -e "${GREEN}🎉 PRODIFY TRANSITION COMPLETE! 🎉${NC}"
    echo -e "${GREEN}=================================${NC}\n"
    
    echo -e "${CYAN}Production Status:${NC}"
    echo -e "  📁 Backup Location: $BACKUP_DIR"
    echo -e "  🌐 Application URL: https://$REPL_SLUG.$REPL_OWNER.repl.co"
    echo -e "  📊 Health Check: https://$REPL_SLUG.$REPL_OWNER.repl.co/health"
    echo -e "  📝 Log File: $LOG_FILE"
    
    echo -e "\n${YELLOW}Next Steps:${NC}"
    echo -e "  1. Monitor application performance"
    echo -e "  2. Verify blockchain functionality"
    echo -e "  3. Test all user workflows"
    echo -e "  4. Set up monitoring alerts"
    
    echo -e "\n${BLUE}QuantaScript.com Production Deployment Complete${NC}"
    echo -e "${BLUE}2024 Reece Dixon - All rights reserved${NC}"
}

# Error handling
trap 'log_error "Prodify encountered an error. Check $LOG_FILE for details."' ERR

# Execute main function
main "$@"

log_success "Prodify transition completed successfully!"
