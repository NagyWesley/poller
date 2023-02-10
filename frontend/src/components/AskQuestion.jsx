import { useState } from "react";
import socket from "../utils/websocket";

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
      // socket.send(JSON.stringify({ question, name }));
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
