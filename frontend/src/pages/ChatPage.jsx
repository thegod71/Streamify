import React, { useState ,useEffect} from "react";
import {useQuery} from "@tanstack/react-query"
import useAuthUser from "../hooks/useAuthuser" 
import {getStreamToken} from "../lib/api.js"
import {useParams} from "react-router"

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
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
  // id because app.jsx pass value 
  const {authUser}=useAuthUser()
  const {id:targetUserId}=useParams();
  const {}=useState()
  const {data:tokenData}=useQuery({
    queryKey:["streamToken"],
    queryFn:getStreamToken, 
    enabled:!!authUser// jb tk authUser nhi aa jaata tb tk essko run nhi krna 
    //(!! )-> meaning  convert result to boolean
  })
  useEffect(()=>{
    const init=async ()=>{
        if(!authUser || !tokenData.token)return ;
        try {
          console.log("This is chatpage ")
           const Client=StreamChat.getInstance(STREAM_API_KEY)
        } catch (error) {
          
        }
    }
    init();
  },[])
  //console.log(id)
  return <div></div>;
}

export default ChatPage;
