"use client";

import { useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { FormEvent, useState } from "react";
import { MessageSquare } from "lucide-react";
import { DefaultChatTransport } from "ai";

const MAX_LENGTH = 300;

export default function Chatbot({ pdfId }: { pdfId: string }) {
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

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
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <MessageSquare className="h-10 w-10 text-blue-500" />
                <p className="text-sm font-medium">
                  Start chatting with your document
                </p>
                <p className="text-xs text-center max-w-xs">
                  Ask questions, summaries, or explanations based on the PDF.
                </p>
              </div>
            </ConversationEmptyState>
          ) : (
            <>
              {messages.map((message) => (
                <Message from={message.role} key={message.id}>
                  <MessageContent className={`bg-neutral-100 p-4 rounded-lg break-words`}>
                    {message.parts.map((part, i) => {
                      if (part.type === "text") {
                        return (
                          <MessageResponse key={i}>{part.text}</MessageResponse>
                        );
                      }
                      return null;
                    })}
                  </MessageContent>
                </Message>
              ))}

              {status === "submitted" && (
                <Message from="assistant">
                  <MessageContent className="p-4 rounded-lg bg-gray-200 animate-pulse">
                    <div className="flex space-x-1">
                      <span className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" />
                      <span className="h-2 w-2 rounded-full bg-gray-500 animate-bounce delay-150" />
                      <span className="h-2 w-2 rounded-full bg-gray-500 animate-bounce delay-300" />
                    </div>
                  </MessageContent>
                </Message>
              )}
            </>
          )}
        </ConversationContent>

        <ConversationScrollButton />
      </Conversation>

      {/* Input */}
      <PromptInput
        onSubmit={handleSubmit}
        className="flex items-end gap-2 border-t bg-background p-3"
      >
        <PromptInputTextarea
          maxLength={MAX_LENGTH}
          disabled={status === "streaming"}
          onChange={(e) => setInputLength(e.target.value.length)}
          className="max-h-20 resize-none"
        />

        <div className="flex flex-col items-end gap-1 p-2">
          <PromptInputSubmit
            status={status}
            disabled={status === "submitted"}
            className={`h-9 w-9 rounded-lg text-white shadow-sm transition
              ${
                status === "streaming"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }
            `}
          />

          <span
            className={`text-xs ${
              inputLength >= MAX_LENGTH
                ? "text-red-500"
                : inputLength >= MAX_LENGTH * 0.8
                  ? "text-yellow-500"
                  : "text-muted-foreground"
            }`}
          >
            {inputLength}/{MAX_LENGTH}
          </span>
        </div>
      </PromptInput>
    </div>
  );
}
