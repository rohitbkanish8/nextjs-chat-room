"use client";

import Image from "next/image";
import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";

interface iAppProps {
  data: {
    User: {
      image: string | null;
      name: string | null;
    };
    message: string;
  }[];
}

export default function ChatComponent({ data }: iAppProps) {
  const [totalMessage, setTotalMessage] = useState(data);
  const messageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: "ap2",
    });

    let channel = pusher.subscribe("my-channel");
    channel.bind("my-event", function (data: any) {
      const parsedMessage = JSON.parse(data.message);

      setTotalMessage((prev) => [...prev, parsedMessage]);
    });

    return () => {
      pusher.unsubscribe('my-channel')
    }
  }, []);

  const scrolloBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrolloBottom();
  }, [totalMessage]);

  return (
    <div className="p-6 flex-grow max-h-screen overflow-y-auto py-32">
      <div className="flex flex-col gap-4">
        {totalMessage.map((message, index) => (
          <div key={index}>
            <div className="flex items-center gap-8 mb-1">
              <Image
                src={message.User.image as string}
                alt="profile image"
                className="w-12 h-12 object-cover rounded-lg border border-white"
                width={50}
                height={50}
              />
              <p className="rounded-lg bg-white p-4 shadow-md self-start">
                {message.message}
              </p>
            </div>
            <p className="font-light text-xs text-gray-500">
              {message.User.name}
            </p>
          </div>
        ))}
        <div ref={messageRef} />
      </div>
    </div>
  );
}
