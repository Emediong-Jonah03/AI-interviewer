import { IoSparkles } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";

interface AIMessageProps {
  text: string;
  onDoneTyping?: () => void;
  alreadyTyped?: boolean;
}

function AIMessage({ text, onDoneTyping, alreadyTyped = false }: AIMessageProps) {
  const [visibleText, setVisibleText] = useState(alreadyTyped ? text : "");
  const [index, setIndex] = useState(alreadyTyped ? text.length : 0);
  const doneCalled = useRef(alreadyTyped);

  useEffect(() => {
  if (alreadyTyped || doneCalled.current) return;
  
  let isMounted = true;
  
  if (index >= text.length) {
    doneCalled.current = true;
    onDoneTyping?.();
    return;
  }

  const speed = Math.random() * 25 + 15;
  const timer = setTimeout(() => {
    if (isMounted) {
      setVisibleText(prev => prev + text[index]);
      setIndex(prev => prev + 1);
    }
  }, speed);

  return () => {
    isMounted = false;
    clearTimeout(timer);
  };
}, [index, text, alreadyTyped, onDoneTyping]);


  return (
    <div className="flex items-start space-x-3 max-w-4xl mt-5">
      <div className="shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
        <IoSparkles className="w-4 h-4 text-white" />
      </div>

      <div className="flex-1 px-4 py-5 rounded-lg bg-surface border border-border">
        <p className="text-sm leading-relaxed text-text-assistant whitespace-pre-wrap">
          {visibleText}
          {!alreadyTyped && index < text.length && (
            <span className="inline-block w-2 animate-pulse">/</span>
          )}
        </p>
      </div>
    </div>
  );
}

export default AIMessage;
