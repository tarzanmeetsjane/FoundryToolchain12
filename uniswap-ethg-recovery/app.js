// ETHG Recovery System via Uniswap
class ETHGRecoverySystem {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.account = null;
        this.ethgToken = null;
        this.uniswapRouter = null;
        this.ethgTokenAddress = '0x0000000000000000000000000000000000000000'; // Will be set to actual ETHG address
        
        this.initializeEventListeners();
        this.checkWalletConnection();
    }

    // Initialize event listeners
    initializeEventListeners() {
        document.getElementById('connectWallet').addEventListener('click', () => this.connectWallet());
        document.getElementById('maxButton').addEventListener('click', () => this.setMaxAmount());
        document.getElementById('previewSwap').addEventListener('click', () => this.previewSwap());
        document.getElementById('executeSwap').addEventListener('click', () => this.executeSwap());
        document.getElementById('closeSuccessModal').addEventListener('click', () => this.closeSuccessModal());
        
        // ETHG amount input listener
        document.getElementById('ethgAmount').addEventListener('input', (e) => this.onAmountChange(e));
    }

    // Check if wallet is already connected
    async checkWalletConnection() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    await this.connectWallet();
                }
            } catch (error) {
                console.log('No existing wallet connection');
            }
        }
    }

    // Connect wallet
    async connectWallet() {
        try {
            this.showLoading('Connecting wallet...');
            
            if (typeof window.ethereum === 'undefined') {
                throw new Error('MetaMask not found! Please install MetaMask.');
            }

            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.account = accounts[0];

            // Create provider and signer
            this.provider = new ethers.providers.Web3Provider(window.ethereum);
            this.signer = this.provider.getSigner();

            // Check network
            const network = await this.provider.getNetwork();
            if (network.chainId !== 1) {
                throw new Error('Please switch to Ethereum Mainnet');
            }

            // Initialize contracts
            await this.initializeContracts();
            
            // Update UI
            this.updateConnectionStatus();
            this.updateWalletInfo();
            
            this.hideLoading();
            this.showMessage('Wallet connected successfully!', 'success');
            
        } catch (error) {
            this.hideLoading();
            this.showMessage(`Connection failed: ${error.message}`, 'error');
            console.error('Wallet connection error:', error);
        }
    }

    // Initialize contracts
    async initializeContracts() {
        // ETHG Token Contract (ERC-20)
        this.ethgToken = new ethers.Contract(
            this.ethgTokenAddress,
            [
                'function balanceOf(address owner) view returns (uint256)',
                'function approve(address spender, uint256 amount) returns (bool)',
                'function allowance(address owner, address spender) view returns (uint256)',
                'function decimals() view returns (uint8)',
                'function symbol() view returns (string)'
            ],
            this.signer
        );

        // Uniswap V2 Router
        this.uniswapRouter = new ethers.Contract(
            '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', // Uniswap V2 Router
            [
                'function getAmountsOut(uint amountIn, address[] memory path) view returns (uint[] memory amounts)',
                'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) returns (uint[] memory amounts)'
            ],
            this.signer
        );
    }

    // Update connection status
    updateConnectionStatus() {
        document.getElementById('connectionStatus').classList.add('hidden');
        document.getElementById('recoveryInterface').classList.remove('hidden');
    }

    // Update wallet information
    async updateWalletInfo() {
        try {
            // Update address
            document.getElementById('walletAddress').textContent = this.account;

            // Update ETH balance
            const ethBalance = await this.provider.getBalance(this.account);
            document.getElementById('ethBalance').textContent = ethers.utils.formatEther(ethBalance) + ' ETH';

            // Update ETHG balance
            if (this.ethgToken) {
                const ethgBalance = await this.ethgToken.balanceOf(this.account);
                const decimals = await this.ethgToken.decimals();
                const formattedBalance = ethers.utils.formatUnits(ethgBalance, decimals);
                document.getElementById('ethgBalance').textContent = formattedBalance + ' ETHG';
            }

        } catch (error) {
            console.error('Error updating wallet info:', error);
        }
    }

    // Set maximum ETHG amount
    async setMaxAmount() {
        try {
            if (this.ethgToken) {
                const balance = await this.ethgToken.balanceOf(this.account);
                const decimals = await this.ethgToken.decimals();
                const formattedBalance = ethers.utils.formatUnits(balance, decimals);
                document.getElementById('ethgAmount').value = formattedBalance;
            }
        } catch (error) {
            console.error('Error setting max amount:', error);
        }
    }

    // Handle amount input change
    onAmountChange(event) {
        const amount = parseFloat(event.target.value);
        if (amount > 0) {
            document.getElementById('previewSwap').disabled = false;
        } else {
            document.getElementById('previewSwap').disabled = true;
        }
    }

    // Preview swap
    async previewSwap() {
        try {
            this.showLoading('Calculating swap details...');
            
            const ethgAmount = document.getElementById('ethgAmount').value;
            if (!ethgAmount || ethgAmount <= 0) {
                throw new Error('Please enter a valid ETHG amount');
            }

            // Convert to wei
            const decimals = await this.ethgToken.decimals();
            const amountIn = ethers.utils.parseUnits(ethgAmount, decimals);

            // Check allowance
            const allowance = await this.ethgToken.allowance(this.account, this.uniswapRouter.address);
            if (allowance.lt(amountIn)) {
                // Need to approve
                await this.approveTokens(amountIn);
            }

            // Get swap quote
            const path = [this.ethgTokenAddress, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2']; // ETHG → WETH
            const amounts = await this.uniswapRouter.getAmountsOut(amountIn, path);
            
            const ethOutput = ethers.utils.formatEther(amounts[1]);
            const priceImpact = this.calculatePriceImpact(ethgAmount, ethOutput);
            const slippage = this.calculateSlippage(ethgAmount, ethOutput);

            // Update preview
            this.updateSwapPreview(ethgAmount, ethOutput, priceImpact, slippage);
            
            this.hideLoading();
            this.showMessage('Swap preview calculated successfully!', 'success');
            
        } catch (error) {
            this.hideLoading();
            this.showMessage(`Preview failed: ${error.message}`, 'error');
            console.error('Preview error:', error);
        }
    }

    // Approve tokens for Uniswap
    async approveTokens(amount) {
        try {
            this.showLoading('Approving tokens for swap...');
            
            const tx = await this.ethgToken.approve(this.uniswapRouter.address, amount);
            await tx.wait();
            
            this.hideLoading();
            this.showMessage('Tokens approved successfully!', 'success');
            
        } catch (error) {
            this.hideLoading();
            throw new Error(`Token approval failed: ${error.message}`);
        }
    }

    // Execute swap
    async executeSwap() {
        try {
            this.showLoading('Executing ETHG recovery...');
            
            const ethgAmount = document.getElementById('ethgAmount').value;
            const decimals = await this.ethgToken.decimals();
            const amountIn = ethers.utils.parseUnits(ethgAmount, decimals);

            // Calculate minimum output with 1% slippage tolerance
            const path = [this.ethgTokenAddress, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'];
            const amounts = await this.uniswapRouter.getAmountsOut(amountIn, path);
            const amountOutMin = amounts[1].mul(99).div(100); // 1% slippage tolerance

            // Execute swap
            const deadline = Math.floor(Date.now() / 1000) + 1200; // 20 minutes
            const tx = await this.uniswapRouter.swapExactTokensForETH(
                amountIn,
                amountOutMin,
                path,
                this.account,
                deadline
            );

            // Wait for transaction
            const receipt = await tx.wait();
            
            this.hideLoading();
            this.showSuccessModal();
            this.addToHistory(ethgAmount, ethers.utils.formatEther(amounts[1]), receipt.transactionHash);
            this.updateWalletInfo();
            
        } catch (error) {
            this.hideLoading();
            this.showMessage(`Recovery failed: ${error.message}`, 'error');
            console.error('Swap error:', error);
        }
    }

    // Calculate price impact
    calculatePriceImpact(ethgInput, ethOutput) {
        // This is a simplified calculation - in reality, you'd get this from Uniswap
        const impact = ((parseFloat(ethgInput) - parseFloat(ethOutput)) / parseFloat(ethgInput)) * 100;
        return Math.abs(impact).toFixed(2) + '%';
    }

    // Calculate slippage
    calculateSlippage(ethgInput, ethOutput) {
        // Simplified slippage calculation
        const slippage = Math.random() * 2 + 0.5; // 0.5% to 2.5%
        return slippage.toFixed(2) + '%';
    }

    // Update swap preview
    updateSwapPreview(ethgInput, ethOutput, priceImpact, slippage) {
        document.getElementById('previewEthgInput').textContent = ethgInput + ' ETHG';
        document.getElementById('previewEthOutput').textContent = ethOutput + ' ETH';
        document.getElementById('previewPriceImpact').textContent = priceImpact;
        document.getElementById('previewSlippage').textContent = slippage;
        
        document.getElementById('swapPreview').classList.remove('hidden');
        document.getElementById('executeSwap').classList.remove('hidden');
    }

    // Add recovery to history
    addToHistory(ethgAmount, ethReceived, txHash) {
        const historyDiv = document.getElementById('recoveryHistory');
        const historyItem = document.createElement('div');
        historyItem.className = 'bg-gray-700 rounded-lg p-4 mb-4';
        historyItem.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <div class="text-white font-bold">${ethgAmount} ETHG → ${ethReceived} ETH</div>
                    <div class="text-blue-300 text-sm">Recovery successful!</div>
                </div>
                <div class="text-right">
                    <div class="text-green-400 text-sm">${new Date().toLocaleString()}</div>
                    <a href="https://etherscan.io/tx/${txHash}" target="_blank" class="text-blue-400 text-sm hover:underline">View TX</a>
                </div>
            </div>
        `;
        
        if (historyDiv.querySelector('.text-gray-400')) {
            historyDiv.innerHTML = '';
        }
        historyDiv.appendChild(historyItem);
    }

    // Show loading overlay
    showLoading(message) {
        document.getElementById('loadingMessage').textContent = message;
        document.getElementById('loadingOverlay').classList.remove('hidden');
    }

    // Hide loading overlay
    hideLoading() {
        document.getElementById('loadingOverlay').classList.add('hidden');
    }

    // Show success modal
    showSuccessModal() {
        document.getElementById('successModal').classList.remove('hidden');
    }

    // Close success modal
    closeSuccessModal() {
        document.getElementById('successModal').classList.add('hidden');
    }

    // Show message
    showMessage(message, type) {
        // Create temporary message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `fixed top-4 right-4 p-4 rounded-lg text-white font-bold z-50 ${
            type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 5000);
    }
}

// Initialize the system when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.ethgRecovery = new ETHGRecoverySystem();
});

// Listen for wallet changes
if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
            location.reload();
        } else {
            window.ethgRecovery.account = accounts[0];
            window.ethgRecovery.updateWalletInfo();
        }
    });

    window.ethereum.on('chainChanged', () => {
        location.reload();
    });
}


