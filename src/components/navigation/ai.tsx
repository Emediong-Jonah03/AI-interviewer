import { IoSparkles } from "react-icons/io5";

interface AIMessageProps {
  text: string;
}

function AIMessage({ text }: AIMessageProps) {
  return (
    <div className="flex items-start space-x-3 max-w-4xl mt-5">
      {/* AI Avatar */}
      <div className="shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
        <IoSparkles className="w-4 h-4 text-white" />
      </div>
      
      {/* Message Content */}
      <div className="flex-1 px-4 py-3 rounded-lg bg-secondary border border-border">
        <p className="text-sm leading-relaxed text-text-assistant">
          {text}
        </p>
      </div>
    </div>
  );
}

export default AIMessage;