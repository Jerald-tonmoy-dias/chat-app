import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import "./App.css";

function App() {
  // all state hooks
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // get all message
  let allMessages = [];

  // get all data on render
  useEffect(() => {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher("ac8e7effea63d9f5437f", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      // alert(JSON.stringify(data));

      allMessages.push(data);
      setMessages(allMessages);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        message,
      }),
    };

    await fetch("http://127.0.0.1:8000/api/message", requestOptions)
      .then((response) => setMessage(""))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div className="chat_window">
        <div className="top_menu">
          <div className="buttons">
            <div className="button close"></div>
            <div className="button minimize"></div>
            <div className="button maximize"></div>
          </div>
          <div className="title">Chat</div>
        </div>
        <div className="card mt-2 mb-4 shadow py-2 px-4">
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <ul className="messages">
          {messages.map((item) => {
            return (
              <li className="card m-4 shadow py-2 px-4">
                <h2>{item.username}</h2>
                <p>{item.message}</p>
              </li>
            );
          })}
        </ul>
        <form onSubmit={handleSubmit}>
          <div className="bottom_wrapper clearfix">
            <div className="message_input_wrapper">
              <input
                className="message_input"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button type="submit" className="send_message">
              {/* <div className="icon"></div> */}
              {/* <button type="submit" className="btn btn-primary"> */}
              Send
              {/* </button> */}
            </button>
          </div>
        </form>
      </div>
      <div className="message_template">
        <li className="message">
          <div className="avatar"></div>
          <div className="text_wrapper">
            <div className="text"></div>
          </div>
        </li>
      </div>
    </>
  );
}

export default App;
