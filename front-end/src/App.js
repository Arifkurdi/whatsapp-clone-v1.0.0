import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./component/Chat";
import SideBar from "./component/SideBar";
import Pusher from "pusher-js";
import axios from "./axios";
function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/messages/sync").then((response) => setMessages(response.data));
  }, []);

  useEffect(() => {
    // Pusher Id
    const pusher = new Pusher("2236d1a468de40f73e18", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      // alert(JSON.stringify(data));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        {/* SideBar */}
        <SideBar />
        {/* Chat */}
        {/* <Chat messages={messages} /> */}
      </div>
    </div>
  );
}

export default App;
