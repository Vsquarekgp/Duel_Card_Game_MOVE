import React, { useEffect, useState } from 'react';
import './App.css';
import { Types, AptosClient } from 'aptos';

const gameAddress = '0x61315d864828f1508e77744a0f05c26bb10dafbe8a669b894eefb2114016e7f6';

function App() {
  const [address, setAddress] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [tokenAmount, setTokenAmount] = useState<string>('0');
  const [cardName, setCardName] = useState<string>('');
  const [cardDescription, setCardDescription] = useState<string>('');

  const init = async () => {
    try {
      if (window && !window.martian) {
        console.log('Martian not found');
        return;
      }

      const data = await window.martian.connect();

      const { result } = data;
      const address = result.aptos[0].address;
      const publicKey = result.aptos[0].publicKey;
      setAddress(address);
      setPublicKey(publicKey);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const mintToken = async (amount: string) => {
    try {
      const payload = {
        function: `${gameAddress}::duel::game::mint_token`,
        type_arguments: [],
        arguments: [amount],
      };
      console.log(payload);

      const result = await window.martian.generateSignAndSubmitTransaction(address, payload);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const mintCard = async (name: string, description: string) => {
    try {
      const payload = {
        function: `${gameAddress}::duel::game::mint_card`,
        type_arguments: [],
        arguments: [name, description],
      };
      console.log(payload);

      const result = await window.martian.generateSignAndSubmitTransaction(address, payload);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <p>Account Address: <code>{address}</code></p>
      <p>Account Public Key: <code>{publicKey}</code></p>
      <input type="text" id="tokenAmount" placeholder="Token Amount" value={tokenAmount} onChange={(v) => setTokenAmount(v.target.value)} />
      <button onClick={() => mintToken(tokenAmount)}> Click to Mint Tokens! </button>
      <input type="text" id="cardName" placeholder="Card Name" value={cardName} onChange={(v) => setCardName(v.target.value)} />
      <input type="text" id="cardDescription" placeholder="Card Description" value={cardDescription} onChange={(v) => setCardDescription(v.target.value)} />
      <button onClick={() => mintCard(cardName, cardDescription)}> Click to Mint Card! </button>
    </div>
  );
}

export default App;
