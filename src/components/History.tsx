import { useState, useEffect } from "react"
import type { Message } from "../App";

export interface History {
  id: number
  message: string,
}

export interface NavigationProps {
  messageHistory: Message[],  
  started: boolean  
}

function HistoryPage({messageHistory, started}: NavigationProps) {
  const [recent, setRecent] = useState<History[]>([])

  useEffect(() => {
    if (started && messageHistory.length > 0) {
    
      const userMessages = messageHistory
        .filter(msg => msg.type === "user")
        .map(msg => ({
          id: msg.id,
          message: msg.text
        }));
      
      setRecent(userMessages);
    }
  }, [messageHistory, started]);
    
  return recent;
}

export default HistoryPage;