import { useState } from "react";
import socket from "../utils/websocket";
import { messageType } from "../utils/enums";

const Question = ({ setView, notify }) => {
  const [question, setQuestion] = useState("");
  const [name, setName] = useState("");
  const [errorText, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "question") {
      setQuestion(e.target.value);
    } else if (e.target.name === "name") {
      setName(e.target.value);
    }
  };

  const sendQuestion = () => {
    if (question !== "") {
      const message = JSON.stringify({
        type: messageType.question_asked,
        value: { question, name },
      });
      socket.send(message);
      setQuestion("");
      setName("");
      setError("");
      notify();
      setView("homepage");
    } else {
      setError("ضروري تكتب سؤال");
    }
  };

  return (
    <>
      <p>
        <textarea
          className="question-body"
          name="question"
          value={question}
          onChange={handleChange}
          placeholder="اكتب سؤالك"
        />
        *
        <br />
        <span style={{ color: "red" }}>{errorText}</span>
      </p>
      <input
        name="name"
        type="text"
        placeholder="اكتب اسمك لو اردت"
        value={name}
        onChange={handleChange}
        style={{ height: "4vh" }}
      />
      <button
        className="main-btn"
        onClick={() => {
          sendQuestion();
        }}
      >
        Post
      </button>
    </>
  );
};

export default Question;
