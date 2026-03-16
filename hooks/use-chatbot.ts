"use client";

import { useState, useCallback, useRef } from "react";
import {
  WELCOME_MESSAGE,
  getResponse,
  matchFreeInput,
} from "@/data/chatbot";

export interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
}

let messageCounter = 0;
function nextId(): string {
  return `msg-${++messageCounter}-${Date.now()}`;
}

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: nextId(), role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, []);

  const addMessages = useCallback(
    (userMsg: ChatMessage, botMsg: ChatMessage) => {
      setMessages((prev) => [...prev, userMsg, botMsg]);
    },
    []
  );

  const handleQuickQuestion = useCallback(
    (label: string, key: string) => {
      const userMsg: ChatMessage = { id: nextId(), role: "user", content: label };
      const botMsg: ChatMessage = {
        id: nextId(),
        role: "assistant",
        content: getResponse(key),
      };
      addMessages(userMsg, botMsg);
      setTimeout(scrollToBottom, 50);
    },
    [addMessages, scrollToBottom]
  );

  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text) return;
    const userMsg: ChatMessage = { id: nextId(), role: "user", content: text };
    const botMsg: ChatMessage = {
      id: nextId(),
      role: "assistant",
      content: matchFreeInput(text),
    };
    addMessages(userMsg, botMsg);
    setInputValue("");
    setTimeout(scrollToBottom, 50);
  }, [inputValue, addMessages, scrollToBottom]);

  const handleReset = useCallback(() => {
    messageCounter = 0;
    setMessages([
      { id: nextId(), role: "assistant", content: WELCOME_MESSAGE },
    ]);
    setInputValue("");
  }, []);

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    toggleOpen,
    messages,
    inputValue,
    setInputValue,
    handleQuickQuestion,
    handleSend,
    handleReset,
    scrollRef,
  };
}
