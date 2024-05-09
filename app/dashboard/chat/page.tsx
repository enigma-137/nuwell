"use client"

import { userThreadAtom } from "@/atoms";
import axios from "axios";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react"
// import { threadId } from "worker_threads";


interface ThreadMessage {

  id: number;
  sender: string;
  content: string;
  created_at: Date

}

const POLLING_FREQUENCY = 1000;

const ChatPage = () => {

  const [userThread] = useAtom(userThreadAtom)

  const [fetching, setFetching] = useState(false);
  const [messages, setMessages] = useState<ThreadMessage[]>([]);

  // console.log("User Thread",  userThread)
  // console.log("Messages" , messages)


  const fetchMessages = useCallback(
    async () => {
      if (!userThread) return;
      setFetching(true);
      try {
        const response = await axios.post<{
          success: boolean;
          error?: string;
          messages?: ThreadMessage[];
        }>("/api/message/list", { threadId: userThread.threadId });

        // check
        if (!response.data.success || !response.data.messages) {
          console.error(response.data.error ?? "Unknown error.");
        
          return;
        }

        let newMessages = response.data.messages;

        newMessages = newMessages
          .sort((a, b) => {
            return (
              new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            );
          }).filter(
            (message) =>
          //     // ######### TYPE ERRORS ON TYPE AND TEXT
              message.content[0].type === "text" &&
              message.content[0].text.value.trim() !== ""
          );
        setMessages(newMessages)
        console.log("New Messages", newMessages);

      } catch (error) {
        console.log(error)
        setFetching(false)
        setMessages([])
      }finally {
        setFetching(false)
      }


    }, [userThread]
  )

  useEffect(() => {
    const intervalId = setInterval(fetchMessages, POLLING_FREQUENCY);
// To clean up on mount
    return () => clearInterval(intervalId)
  }, [fetchMessages])

  return (
    <div className='w-screen h-full flex flex-col bg-white text-primary '>

      <div className="flex-grow overflow-y-hidden p-8 space-y-2">
        {fetching && messages.length === 0 &&  ( <div className="text-center font-bold text-primary" > Fetching Messages...</div>)}

        {messages.length === 0 && !fetching && (
          <div className="text-center font-bold text-primary" > No Messages...</div>

        )}

        {/* TYPE ERRORS ON TYPE AND TEXT! */}

        {/* {messages.map((message) => (
          <div
            key={message.id }
          >
            {message.content[0].type === "text"
              ? message.content[0].text.value
                .split("\n")
                .map((text, index) => <p key={index}>{text}</p>)
              : null}
          </div>
        ))} */}
      </div>{messages.map((message) => (
        <div>{message.content[0]}</div>
      ))}


    </div>
     

  )
}

export default ChatPage