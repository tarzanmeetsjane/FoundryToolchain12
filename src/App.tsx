const ETHRecoveryExecution = () => {
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);

  const executeRecovery = async () => {
    setStatus('executing');
    try {
      const response = await fetch('/api/execute-recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      setResult(data);
      setStatus('completed');
    } catch (error) {
      console.error('Recovery failed:', error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">🚀 ETH Recovery Execution</h1>
        <p className="text-lg">Execute your ETHG → ETH recovery process</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recovery Details</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">Contract Address</p>
            <p className="font-mono">0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Expected Tokens</p>
            <p className="font-bold text-green-600">1,990,000 ETHGR</p>
          </div>
        </div>

        <button
          onClick={executeRecovery}
          disabled={status === 'executing'}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg disabled:opacity-50"
        >
          {status === 'executing' ? 'Executing Recovery...' : 'Execute ETH Recovery'}
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Recovery Result:</h3>
            <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

const TokenValueProof = () => {
}
const executeRecovery = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/execute-recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (result.success) {
        setMessage(`✅ Recovery successful! Details: ${JSON.stringify(result.details)}`);
      } else {
        setMessage(`❌ Recovery failed: ${result.message}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const executeETHRecovery = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/execute-eth-recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (result.success) {
        setMessage(`🎉 ETH Recovery Complete!
        ETHGR Recovered: ${result.ethgrRecovered}
        ETH Received: ${result.ethReceived}
        Transaction: ${result.transactionHash}`);
      } else {
        setMessage(`❌ ETH Recovery failed: ${result.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
const TARGET_WALLET = "0x1234567890123456789012345678901234567890";

const Card = ({ className, children }) => (
  <div className={`rounded-lg shadow-md p-4 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="mb-2">{children}</div>
);

const CardTitle = ({ className, children }) => (
  <h3 className={`text-xl font-semibold ${className}`}>{children}</h3>
);

const CardContent = ({ children }) => (
  <div>{children}</div>
);

const Button = ({ className, children, onClick, disabled }) => (
  <button
    className={`py-2 px-4 rounded-md font-bold ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">ETHGR Recovery Portal</h1>
      {message && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-6" role="alert">
          <span className="block sm:inline">{message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">🔄 ETHGR Recovery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 mb-4">
                  Execute token recovery for wallet: {TARGET_WALLET}
                </p>
                <Button 
                  onClick={executeRecovery}
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 mb-2"
                >
                  {isLoading ? "Executing..." : "Execute Recovery"}
                </Button>
                <Button 
                  onClick={executeETHRecovery}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? "Converting..." : "Convert to ETH"}
                </Button>
              </CardContent>
            </Card>

        {/* Token Value Proof Card (Unchanged) */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">💰 Verify Token Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 mb-4">
              Prove the value of your ETHGR tokens for: {TARGET_WALLET}
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Generate Value Proof
            </Button>
          </CardContent>
        </Card>

        {/* Transaction Submission Card (Unchanged) */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800">✉️ Submit Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-purple-700 mb-4">
              Submit a signed transaction for approval: {TARGET_WALLET}
            </p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Submit Transaction
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;