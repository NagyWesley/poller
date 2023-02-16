import { useEffect, useState } from "react";
import socket from "../utils/websocket";
import { messageType } from "../utils/enums";
import { parseMessage } from "../utils/parser";
import Question from "./Question";

const QuestionsList = ({ questions, setQuestions }) => {
  useEffect(() => {
    socket.addEventListener("message", (event) => {
      const message = parseMessage(event.data);

      if (message[messageType.all_questions]) {
        setQuestions(message[messageType.all_questions]);
      }

      const approvedQuestion = message[messageType.question_approved];

      if (
        approvedQuestion &&
        approvedQuestion.id &&
        questions[approvedQuestion.id] === undefined
      ) {
        setQuestions({
          ...questions,
          [approvedQuestion.id]: approvedQuestion,
        });
      }
    });
  }, []);

  return (
    <>
      {Object.values(questions)
        .sort((a, b) => {
          return Date(a.created) <= Date(b.created) ? 1 : -1;
        })
        .map((question) => (
          <Question key={question.id} data={question} />
        ))}
    </>
  );
};

export default QuestionsList;
