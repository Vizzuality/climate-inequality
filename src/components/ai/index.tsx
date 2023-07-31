'use client';

import { useChat } from 'ai/react';

import Button from 'components/button';

function AIChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="mx-auto mb-72 flex w-full max-w-[60%] flex-col items-center justify-center text-white">
      <div className="mb-6">
        {messages.map((m) => (
          <div key={m.id}>
            {m.role === 'user' ? (
              <div className="text-500">User: </div>
            ) : (
              <div className="text-500">AI: </div>
            )}
            <div className={m.role === 'user' ? 'text-700' : 'text-white'}>{m.content}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex w-full justify-center">
        <label>
          <input
            className="border-gray-300 rounded mb-8 w-72 border p-2 text-black shadow-xl"
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
          />
        </label>
        <Button className="ml-4 h-11" theme="primary" size="s" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
}

export default AIChat;
