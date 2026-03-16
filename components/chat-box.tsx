"use client";

import { useEffect, useRef } from "react";
import { MessageCircle, X, RotateCcw, Send, ChevronDown } from "lucide-react";
import { useChatbot, type ChatMessage } from "@/hooks/use-chatbot";
import { quickQuestions, type QuickQuestion } from "@/data/chatbot";

/* ─── ChatMessage bubble ─── */
function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        }`}
      >
        {message.content.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={i} className="font-semibold">
                {part.slice(2, -2)}
              </strong>
            );
          }
          // Render links
          const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
          const parts: React.ReactNode[] = [];
          let lastIndex = 0;
          let match;
          while ((match = linkRegex.exec(part)) !== null) {
            if (match.index > lastIndex) {
              parts.push(part.slice(lastIndex, match.index));
            }
            parts.push(
              <a
                key={`${i}-${match.index}`}
                href={match[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-80"
              >
                {match[1]}
              </a>,
            );
            lastIndex = match.index + match[0].length;
          }
          if (lastIndex < part.length) {
            parts.push(part.slice(lastIndex));
          }
          return parts.length > 0 ? <span key={i}>{parts}</span> : part;
        })}
      </div>
    </div>
  );
}

/* ─── Quick Questions ─── */
function QuickQuestions({
  questions,
  onSelect,
}: {
  questions: QuickQuestion[];
  onSelect: (label: string, key: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5 px-1">
      {questions.map((q) => (
        <button
          key={q.key}
          onClick={() => onSelect(q.label, q.key)}
          className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground transition-colors duration-200 hover:bg-hover hover:text-foreground"
        >
          {q.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Chat Window ─── */
function ChatWindow({
  onClose,
  messages,
  inputValue,
  setInputValue,
  handleQuickQuestion,
  handleSend,
  handleReset,
  scrollRef,
}: {
  onClose: () => void;
  messages: ChatMessage[];
  inputValue: string;
  setInputValue: (v: string) => void;
  handleQuickQuestion: (label: string, key: string) => void;
  handleSend: () => void;
  handleReset: () => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  // scroll to bottom on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, scrollRef]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-4 duration-300 flex w-90 flex-col overflow-hidden rounded-xl border border-border bg-background shadow-lg sm:w-100"
      style={{ maxHeight: "min(520px, calc(100vh - 120px))" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <MessageCircle className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">
              Asistente del portafolio
            </p>
            <p className="text-[11px] text-muted-foreground">
              Pregúntame sobre mi perfil
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleReset}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-hover"
            aria-label="Reiniciar conversación"
            title="Reiniciar conversación"
          >
            <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-hover"
            aria-label="Cerrar chat"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4"
        style={{ minHeight: "200px" }}
      >
        <div className="flex flex-col gap-3">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
        </div>

        {/* Show quick questions after last assistant message */}
        {messages.length <= 2 && (
          <div className="mt-4">
            <QuickQuestions
              questions={quickQuestions}
              onSelect={handleQuickQuestion}
            />
          </div>
        )}
      </div>

      {/* Quick questions toggle for later in conversation */}
      {messages.length > 2 && (
        <div className="border-t border-border px-4 py-2">
          <details className="group">
            <summary className="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ChevronDown className="h-3 w-3 transition-transform group-open:rotate-180" />
              Preguntas sugeridas
            </summary>
            <div className="mt-2 pb-1">
              <QuickQuestions
                questions={quickQuestions}
                onSelect={handleQuickQuestion}
              />
            </div>
          </details>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border px-3 py-3">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Escribe tu pregunta..."
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Enviar mensaje"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ChatBox (FAB + Window) ─── */
export function ChatBox() {
  const {
    isOpen,
    toggleOpen,
    messages,
    inputValue,
    setInputValue,
    handleQuickQuestion,
    handleSend,
    handleReset,
    scrollRef,
  } = useChatbot();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <ChatWindow
          onClose={toggleOpen}
          messages={messages}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleQuickQuestion={handleQuickQuestion}
          handleSend={handleSend}
          handleReset={handleReset}
          scrollRef={scrollRef}
        />
      )}

      <button
        onClick={toggleOpen}
        className={`group flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-secondary text-secondary-foreground hover:bg-hover"
            : "bg-primary text-primary-foreground hover:shadow-xl hover:shadow-primary/20"
        }`}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? (
          <ChevronDown className="h-5 w-5 transition-transform duration-200" />
        ) : (
          <MessageCircle className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
        )}
      </button>
    </div>
  );
}
