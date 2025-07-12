'use client'
import React, { useState } from 'react';
import './crt.css';

const CRTBox = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== '') {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <div className="crt-container max-w-md p-6 text-center relative">
      <h1 className="text-crt text-2xl md:text-3xl font-bold mb-4">
        WELCOME BACK TWIT!<br />WHAT’S NEW?
      </h1>

      <div className="bg-black/10 text-left text-crt font-mono h-40 overflow-y-auto p-2 mb-4 rounded-sm border border-black">
        {messages.length === 0 ? (
          <p className="text-crt/50">No messages yet...</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="mb-1"> {msg}</div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="type to chat"
          className="w-full px-4 py-2 rounded border border-black font-mono text-sm bg-black/10 text-crt placeholder:text-crt/50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 px-3 py-2 bg-black text-crt border border-crt rounded"
        >
          →
        </button>
      </form>
    </div>
  );
};

export default CRTBox;
