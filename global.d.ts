interface Window {
    solana?: {
      isPhantom?: boolean;
      publicKey: import('@solana/web3.js').PublicKey;
      connect: () => Promise<{ publicKey: import('@solana/web3.js').PublicKey }>;
      disconnect: () => Promise<void>;
      signTransaction: (transaction: import('@solana/web3.js').Transaction) => Promise<import('@solana/web3.js').Transaction>;
      signAllTransactions: (transactions: import('@solana/web3.js').Transaction[]) => Promise<import('@solana/web3.js').Transaction[]>;
      on: (event: string, handler: (args: any) => void) => void;
      request: (params: { method: string; params?: any }) => Promise<any>;
    };
  }
  