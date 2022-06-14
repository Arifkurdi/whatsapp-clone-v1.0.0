import React, { useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MicRounded,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
const Chat = ({ messages }) => {
  const [input, setInput] = useState("");

  return (
    <div className="chat">
      {/* Chat Header */}
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last Seen at....</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      {/* Chat Body */}
      <div className="chat__body">
        {messages.foreach((message) => {
          <p
            className={`chat__message ${
              message.recived ? "chat__reciver" : "chat__sender"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            [message.message]
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>;
        })}
      </div>
      {/* Chat Input */}
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a Message"
            type="text"
          />
          <button type="submit">Send</button>
        </form>
        <MicRounded />
      </div>
    </div>
  );
};

export default Chat;
