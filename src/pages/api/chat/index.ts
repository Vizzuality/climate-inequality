import { StreamingTextResponse, LangChainStream, Message } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AIMessage, HumanMessage } from 'langchain/schema';
import { Configuration, OpenAIApi } from 'openai-edge';

// Create an OpenAI API client (that's edge friendly!)
const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(openAIConfig);

// Set the runtime to edge for best performance
export const runtime = 'experimental-edge';
const response = async function POST(req: Request) {
  const { messages } = await req.json();

  const { stream, handlers } = LangChainStream();

  const llm = new ChatOpenAI({
    streaming: true,
  });

  llm
    .call(
      (messages as Message[]).map((m) =>
        m.role == 'user' ? new HumanMessage(m.content) : new AIMessage(m.content)
      ),
      {},
      [handlers]
    )
    .catch(console.error);

  return new StreamingTextResponse(stream);
};

export default response;
