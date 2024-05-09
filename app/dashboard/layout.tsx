"use client"
import { userThreadAtom } from "@/atoms";
import Navbar from "@/components/Navbar";
import { UserThread } from "@prisma/client";
import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const [userThread, setUserThread] = useState<UserThread | null>(null)
  const [, setUserThread] = useAtom(userThreadAtom)
  useEffect(() => {
    async function getUserThread() {

      try {
        const response = await axios.get<{
          success: boolean;
          message?: string;
          userThread: UserThread;
        }>("/api/user-thread");


        if (!response.data.success || !response.data.userThread) {
          console.error(response.data.message ?? "unknown error.");
          setUserThread(null)
          return;
        }

        setUserThread(response.data.userThread);

      } catch (error) {
        console.error(error);
        setUserThread(null)

      }
     
    }
    getUserThread();
  }, [setUserThread]);

  // console.log("userThread", userThread)
  return (
    <div>
      <div className="flex bg-primary flex-col h-full w-full">
        {/* Nav */}
        <Navbar />
      </div>

      <div>
        {children}
      </div>
    </div>



  );
}
