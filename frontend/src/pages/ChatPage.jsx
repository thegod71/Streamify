import React, { useState ,useEffect} from "react";
import {useQuery} from "@tanstack/react-query"
import useAuthUser from "../hooks/useAuthuser" 
import {getStreamToken} from "../lib/api.js"
import {useParams} from "react-router"

import {
  Channel,
  ChannelHeader,
  Chat,
   MessageComposer,
 // MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

function ChatPage() {

  const {authUser}=useAuthUser()
  // id because app.jsx pass value and this is come is url by add
  // id in friendCard.jsx
  const {id:targetUserId}=useParams();
  
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);


  const {data:tokenData}=useQuery({
    queryKey:["streamToken"],
    queryFn:getStreamToken, 
    enabled:!!authUser// jb tk authUser nhi aa jaata tb tk essko run nhi krna 
    //(!! )-> meaning  convert result to boolean
  })
  useEffect(()=>{
    const init=async ()=>{
        if(!authUser || !tokenData?.token)return ;
        try {
         // console.log("This is chatpage ")
           const client=StreamChat.getInstance(STREAM_API_KEY)
            await client.connectUser({
             id: authUser._id,
            name:authUser.fullName,
            image:authUser.profilePic
            },tokenData.token)

            //sorting because either you start a chat  or second person
            //Channel is same by using sorting like, take a example in in which
            // my id is 2675 and jiska message  open hua  hain targetUserId=129
            // then final channelId is -1235679
            // if i start chat channelID=[Myid,targetUserId]
            // if friend start chat  channelId=[targetUserId,Myid]
            const channelId=[authUser._id,targetUserId].sort().join("-"); 
            
            const currChannel=client.channel("messaging",channelId,{
              members:[authUser._id,targetUserId],
            });

            await currChannel.watch();
            setChannel(currChannel);
            setChatClient(client);
        } catch (error) {
          console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
        }
        finally{
          setLoading(false )
        }
    }
    init();
  },[authUser,targetUserId,tokenData])
     if (loading || !chatClient || !channel) return <ChatLoader />;


  const handleVideoCall=()=>{
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  }

     
  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
                <MessageComposer />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}

export default ChatPage;
