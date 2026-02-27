import { useMemo } from "react"
import type { Message } from "../App";

export interface History {
  id: number
  message: string,
}

export interface NavigationProps {
  messageHistory: Message[],
  started: boolean
}

function HistoryPage({ messageHistory, started }: NavigationProps) {
  const recent = useMemo(() => {
    if (started && messageHistory.length > 0) {
      return messageHistory
        .filter(msg => msg.type === "user")
        .map(msg => ({
          id: msg.id,
          message: msg.text
        }));
    }
    return [];
  }, [messageHistory, started]);

  return recent;
}

export default HistoryPage;