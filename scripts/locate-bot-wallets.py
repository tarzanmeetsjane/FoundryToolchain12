#!/usr/bin/env python3
"""
Bot Wallet Location Strategy
Analyzes uploaded files to find additional wallet addresses and profit accounts
"""

import json
import csv
import re
import os
from pathlib import Path

def scan_for_wallet_addresses():
    """Scan all uploaded files for wallet addresses"""
    print("TRADING BOT WALLET DISCOVERY")
    print("=" * 40)
    
    wallet_pattern = r'0x[a-fA-F0-9]{40}'
    private_key_pattern = r'0x[a-fA-F0-9]{64}'
    
    found_wallets = set()
    found_keys = set()
    
    # Scan attached assets directory
    assets_dir = Path('attached_assets')
    if assets_dir.exists():
        for file_path in assets_dir.glob('*'):
            if file_path.is_file():
                try:
                    content = file_path.read_text(encoding='utf-8', errors='ignore')
                    
                    # Find wallet addresses
                    wallets = re.findall(wallet_pattern, content)
                    for wallet in wallets:
                        if wallet not in ['0x0000000000000000000000000000000000000000']:
                            found_wallets.add(wallet)
                    
                    # Find private keys (be careful with these)
                    keys = re.findall(private_key_pattern, content)
                    found_keys.update(keys)
                    
                except Exception as e:
                    continue
    
    print(f"Wallet addresses found: {len(found_wallets)}")
    print(f"Private keys found: {len(found_keys)}")
    
    return list(found_wallets), list(found_keys)

def analyze_csv_files():
    """Analyze CSV files for trading data and wallet addresses"""
    print("\nCSV FILE ANALYSIS:")
    print("-" * 20)
    
    csv_files = []
    assets_dir = Path('attached_assets')
    
    if assets_dir.exists():
        csv_files = list(assets_dir.glob('*.csv'))
    
    total_transactions = 0
    unique_addresses = set()
    
    for csv_file in csv_files:
        try:
            with open(csv_file, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                rows = list(reader)
                total_transactions += len(rows)
                
                # Extract addresses from common columns
                for row in rows:
                    for key, value in row.items():
                        if 'address' in key.lower() or 'wallet' in key.lower():
                            if value and value.startswith('0x') and len(value) == 42:
                                unique_addresses.add(value)
                
                print(f"{csv_file.name}: {len(rows)} transactions")
                
        except Exception as e:
            continue
    
    print(f"Total transactions analyzed: {total_transactions}")
    print(f"Unique addresses from CSV: {len(unique_addresses)}")
    
    return list(unique_addresses)

def check_json_files():
    """Check JSON files for LP token data and wallet info"""
    print("\nJSON FILE ANALYSIS:")
    print("-" * 18)
    
    json_files = []
    assets_dir = Path('attached_assets')
    
    if assets_dir.exists():
        json_files = list(assets_dir.glob('*.json'))
    
    lp_tokens = []
    wallet_addresses = []
    
    for json_file in json_files:
        try:
            with open(json_file, 'r') as f:
                data = json.load(f)
                
                if isinstance(data, list):
                    for item in data:
                        if isinstance(item, dict):
                            # Look for LP token data
                            if 'address' in item and 'protocol' in item:
                                lp_tokens.append(item)
                            
                            # Look for wallet addresses
                            for key, value in item.items():
                                if isinstance(value, str) and value.startswith('0x') and len(value) == 42:
                                    wallet_addresses.append(value)
                
                print(f"{json_file.name}: Contains structured data")
                
        except Exception as e:
            continue
    
    print(f"LP tokens found: {len(lp_tokens)}")
    print(f"Wallet addresses found: {len(set(wallet_addresses))}")
    
    return lp_tokens, list(set(wallet_addresses))

def generate_funding_recommendations():
    """Generate specific recommendations for funding"""
    print("\nFUNDING RECOMMENDATIONS:")
    print("=" * 25)
    
    # Known foundation wallet
    foundation_wallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843"
    
    # Scan all files
    file_wallets, private_keys = scan_for_wallet_addresses()
    csv_addresses = analyze_csv_files()
    lp_tokens, json_addresses = check_json_files()
    
    # Combine all addresses
    all_addresses = set(file_wallets + csv_addresses + json_addresses)
    all_addresses.discard(foundation_wallet)  # Remove known foundation wallet
    
    print(f"\nTotal unique addresses discovered: {len(all_addresses)}")
    print(f"LP token positions identified: {len(lp_tokens)}")
    
    if len(all_addresses) > 0:
        print("\nNEXT STEPS:")
        print("1. Check ETH balances for discovered addresses")
        print("2. Verify LP token holdings")
        print("3. Identify highest-value positions")
        print("4. Plan liquidation strategy")
        
        print(f"\nTop 5 addresses to check:")
        for i, addr in enumerate(list(all_addresses)[:5]):
            print(f"  {i+1}. {addr}")
    else:
        print("\nAlternative strategies needed:")
        print("• Upload additional bot project files")
        print("• Check Replit project repositories")
        print("• Review trading bot configuration files")
    
    return list(all_addresses), lp_tokens

if __name__ == "__main__":
    addresses, tokens = generate_funding_recommendations()
    
    print(f"\nAnalysis complete. Found {len(addresses)} potential funding sources.")
    if len(addresses) > 0:
        print("Ready to check balances and plan liquidation strategy.")
    else:
        print("Additional data needed to locate bot profit accounts.")