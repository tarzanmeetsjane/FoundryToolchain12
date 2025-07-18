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