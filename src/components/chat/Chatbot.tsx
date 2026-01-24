"use client";

import { useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message as UIMessageComponent,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { FormEvent, useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { DefaultChatTransport } from "ai";
import { UIMessage as Message } from "@ai-sdk/react";

const MAX_LENGTH = 300;

export default function Chatbot({
  pdfId,
  initialMessages,
}: {
  pdfId: string;
  initialMessages?: Message[];
}) {
  const { messages, setMessages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages, setMessages]);

  const [inputLength, setInputLength] = useState(0);

  const handleSubmit = (
    message: PromptInputMessage,
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const text = message.text.trim();
    if (!text) return;

    if (status === "streaming") {
      stop();
      return;
    }

    sendMessage({
      parts: [{ type: "text", text }],
      metadata: { pdfId },
    });

    setInputLength(0);
  };

  return (
    <div className="flex h-full w-full min-h-0 flex-col rounded-xl border">
      {/* Messages */}
      <Conversation className="flex-1 min-h-0 overflow-hidden">
        <ConversationContent className="h-full overflow-y-auto p-4">
          {messages.length === 0 ? (
            <ConversationEmptyState>
              <div className="flex flex-col items-center gap-4 text-center p-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-gray-200">
                <div className="p-4 bg-blue-50 rounded-full ring-8 ring-blue-50/50">
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-gray-900">
                    Start chatting with your document
                  </p>
                  <p className="text-sm text-gray-500 max-w-xs">
                    Ask questions, summaries, or explanations based on the PDF.
                  </p>
                </div>
              </div>
            </ConversationEmptyState>
          ) : (
            <>
              {messages.map((message) => (
                <UIMessageComponent from={message.role} key={message.id}>
                  <MessageContent
                    className={`bg-neutral-100 p-4 rounded-lg break-words`}
                  >
                    {message.parts.map((part, i) => {
                      if (part.type === "text") {
                        return (
                          <MessageResponse key={i}>{part.text}</MessageResponse>
                        );
                      }
                      return null;
                    })}
                  </MessageContent>
                </UIMessageComponent>
              ))}

              {status === "submitted" && (
                <UIMessageComponent from="assistant">
                  <MessageContent className="p-4 rounded-lg bg-gray-200 animate-pulse">
                    <div className="flex space-x-1">
                      <span className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" />
                      <span className="h-2 w-2 rounded-full bg-gray-500 animate-bounce delay-150" />
                      <span className="h-2 w-2 rounded-full bg-gray-500 animate-bounce delay-300" />
                    </div>
                  </MessageContent>
                </UIMessageComponent>
              )}
            </>
          )}
        </ConversationContent>

        <ConversationScrollButton />
      </Conversation>

      {/* Input */}
      <PromptInput
        onSubmit={handleSubmit}
        className="relative flex flex-col gap-2 border-t border-gray-100 bg-white/80 p-4 backdrop-blur-lg"
      >
        <PromptInputTextarea
          maxLength={MAX_LENGTH}
          disabled={status === "streaming"}
          onChange={(e) => setInputLength(e.target.value.length)}
          className="max-h-40 min-h-[60px] resize-none bg-transparent border-0 focus-visible:ring-0 text-base placeholder:text-gray-400"
          placeholder="Ask a question..."
        />

        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            {/* Optional: Add hint or icon */}
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-medium transition-colors ${
                inputLength >= MAX_LENGTH
                  ? "text-red-500"
                  : inputLength >= MAX_LENGTH * 0.8
                    ? "text-amber-500"
                    : "text-gray-400"
              }`}
            >
              {inputLength}/{MAX_LENGTH}
            </span>
            <PromptInputSubmit
              status={status}
              disabled={status === "submitted"}
              className={`h-10 w-10 rounded-full shadow-lg transition-all duration-200
                ${
                  status === "streaming"
                    ? "bg-red-500 hover:bg-red-600 hover:scale-105 hover:shadow-red-500/25"
                    : "bg-blue-600 hover:bg-blue-700 hover:scale-105 hover:shadow-blue-600/25"
                }
              `}
            />
          </div>
        </div>
      </PromptInput>
    </div>
  );
}
