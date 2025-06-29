import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { parseUnits, formatUnits, encodeFunctionData } from 'viem'
import { UNISWAP_V3_ADDRESSES, WETH_ADDRESSES, COMMON_TOKENS } from './wagmi-config'
import { useToast } from '@/hooks/use-toast'

// Uniswap V3 Position Manager ABI (key functions)
const POSITION_MANAGER_ABI = [
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      {
        name: 'params',
        type: 'tuple',
        components: [
          { name: 'token0', type: 'address' },
          { name: 'token1', type: 'address' },
          { name: 'fee', type: 'uint24' },
          { name: 'tickLower', type: 'int24' },
          { name: 'tickUpper', type: 'int24' },
          { name: 'amount0Desired', type: 'uint256' },
          { name: 'amount1Desired', type: 'uint256' },
          { name: 'amount0Min', type: 'uint256' },
          { name: 'amount1Min', type: 'uint256' },
          { name: 'recipient', type: 'address' },
          { name: 'deadline', type: 'uint256' }
        ]
      }
    ],
    outputs: [
      { name: 'tokenId', type: 'uint256' },
      { name: 'liquidity', type: 'uint128' },
      { name: 'amount0', type: 'uint256' },
      { name: 'amount1', type: 'uint256' }
    ]
  },
  {
    name: 'increaseLiquidity',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      {
        name: 'params',
        type: 'tuple',
        components: [
          { name: 'tokenId', type: 'uint256' },
          { name: 'amount0Desired', type: 'uint256' },
          { name: 'amount1Desired', type: 'uint256' },
          { name: 'amount0Min', type: 'uint256' },
          { name: 'amount1Min', type: 'uint256' },
          { name: 'deadline', type: 'uint256' }
        ]
      }
    ],
    outputs: [
      { name: 'liquidity', type: 'uint128' },
      { name: 'amount0', type: 'uint256' },
      { name: 'amount1', type: 'uint256' }
    ]
  },
  {
    name: 'decreaseLiquidity',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'params',
        type: 'tuple',
        components: [
          { name: 'tokenId', type: 'uint256' },
          { name: 'liquidity', type: 'uint128' },
          { name: 'amount0Min', type: 'uint256' },
          { name: 'amount1Min', type: 'uint256' },
          { name: 'deadline', type: 'uint256' }
        ]
      }
    ],
    outputs: [
      { name: 'amount0', type: 'uint256' },
      { name: 'amount1', type: 'uint256' }
    ]
  },
  {
    name: 'positions',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [
      { name: 'nonce', type: 'uint96' },
      { name: 'operator', type: 'address' },
      { name: 'token0', type: 'address' },
      { name: 'token1', type: 'address' },
      { name: 'fee', type: 'uint24' },
      { name: 'tickLower', type: 'int24' },
      { name: 'tickUpper', type: 'int24' },
      { name: 'liquidity', type: 'uint128' },
      { name: 'feeGrowthInside0LastX128', type: 'uint256' },
      { name: 'feeGrowthInside1LastX128', type: 'uint256' },
      { name: 'tokensOwed0', type: 'uint128' },
      { name: 'tokensOwed1', type: 'uint128' }
    ]
  }
] as const

// ERC20 ABI for token approvals
const ERC20_ABI = [
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    name: 'allowance',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }]
  }
] as const

interface CreatePositionParams {
  token0Address: string
  token1Address: string
  fee: number
  amount0: string
  amount1: string
  tickLower: number
  tickUpper: number
  slippageTolerance: number
}

export function useCreateV3Position() {
  const { address, chain } = useAccount()
  const { toast } = useToast()
  const { writeContract, isPending } = useWriteContract()

  const createPosition = async (params: CreatePositionParams) => {
    if (!address || !chain) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to create a position",
        variant: "destructive"
      })
      return
    }

    const chainAddresses = UNISWAP_V3_ADDRESSES[chain.id as keyof typeof UNISWAP_V3_ADDRESSES]
    if (!chainAddresses) {
      toast({
        title: "Unsupported network",
        description: "Uniswap V3 is not available on this network",
        variant: "destructive"
      })
      return
    }

    try {
      // Calculate minimum amounts with slippage
      const amount0Desired = parseUnits(params.amount0, 18)
      const amount1Desired = parseUnits(params.amount1, 18)
      const slippageMultiplier = BigInt(Math.floor((100 - params.slippageTolerance) * 100))
      const amount0Min = (amount0Desired * slippageMultiplier) / BigInt(10000)
      const amount1Min = (amount1Desired * slippageMultiplier) / BigInt(10000)

      // Set deadline (20 minutes from now)
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 1200)

      const mintParams = {
        token0: params.token0Address as `0x${string}`,
        token1: params.token1Address as `0x${string}`,
        fee: params.fee,
        tickLower: params.tickLower,
        tickUpper: params.tickUpper,
        amount0Desired,
        amount1Desired,
        amount0Min,
        amount1Min,
        recipient: address,
        deadline
      }

      await writeContract({
        address: chainAddresses.positionManager as `0x${string}`,
        abi: POSITION_MANAGER_ABI,
        functionName: 'mint',
        args: [mintParams]
      })

      toast({
        title: "Position creation initiated",
        description: "Transaction submitted to the blockchain"
      })
    } catch (error) {
      toast({
        title: "Failed to create position",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      })
    }
  }

  return { createPosition, isPending }
}

export function useTokenApproval(tokenAddress: string, spenderAddress: string) {
  const { address, chain } = useAccount()
  const { writeContract, isPending } = useWriteContract()
  const { toast } = useToast()

  // Check current allowance
  const { data: allowance } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address && spenderAddress ? [address, spenderAddress as `0x${string}`] : undefined,
    query: {
      enabled: !!address && !!spenderAddress && !!tokenAddress
    }
  })

  const approve = async (amount: string, decimals: number = 18) => {
    if (!address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to approve tokens",
        variant: "destructive"
      })
      return
    }

    try {
      const approvalAmount = parseUnits(amount, decimals)
      
      await writeContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [spenderAddress as `0x${string}`, approvalAmount]
      })

      toast({
        title: "Approval initiated",
        description: "Token approval transaction submitted"
      })
    } catch (error) {
      toast({
        title: "Approval failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      })
    }
  }

  const approveMax = async () => {
    if (!address) return

    try {
      // Approve maximum amount
      const maxAmount = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
      
      await writeContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [spenderAddress as `0x${string}`, maxAmount]
      })

      toast({
        title: "Max approval initiated",
        description: "Maximum token approval transaction submitted"
      })
    } catch (error) {
      toast({
        title: "Approval failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      })
    }
  }

  return { approve, approveMax, allowance, isPending }
}

export function useTokenBalance(tokenAddress: string) {
  const { address } = useAccount()

  const { data: balance, isLoading } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!tokenAddress,
      refetchInterval: 10000 // Refetch every 10 seconds
    }
  })

  const { data: decimals } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'decimals',
    query: {
      enabled: !!tokenAddress
    }
  })

  const formattedBalance = balance && decimals ? formatUnits(balance, decimals) : '0'

  return { balance, decimals, formattedBalance, isLoading }
}

// Utility function to calculate tick from price
export function priceToTick(price: number, decimals0: number, decimals1: number): number {
  const adjustedPrice = price * Math.pow(10, decimals0 - decimals1)
  return Math.floor(Math.log(adjustedPrice) / Math.log(1.0001))
}

// Utility function to calculate price from tick
export function tickToPrice(tick: number, decimals0: number, decimals1: number): number {
  const price = Math.pow(1.0001, tick)
  return price / Math.pow(10, decimals0 - decimals1)
}