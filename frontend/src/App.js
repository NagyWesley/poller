import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ConnectionStatus from "./components/ConnectionStatus";
import AskQuestion from "./components/AskQuestion";
import ContextProvider from "./Context";
import Question from "./components/Question";

const questions = [
  {
    id: "8defe052-2719-4e17-945d-9626085c7565",
    likes_count: Math.round(20 * Math.random()), // temp
    question:
      " و كلام تاني كتير قوي لو اتكلمت كلام كتير يا ترى هيفرق ولا انت ماعندكش مشاكل علشان مليان بالنعمة",
    name: "Nagy Wesley",
    likes: [],
  },
  {
    id: "44ba459b-d3f9-4c18-9584-1b8a7043919f",
    likes_count: Math.round(20 * Math.random()), // temp
    question: "please show me the glory",
    name: "",
    likes: [],
  },
];

function App() {
  const [view, setView] = useState("homepage");

  const notify = () => toast.success("تم، سيتم الموافقة علي السؤال");

  return (
    <div className="App">
      <header className="App-header">
        <ContextProvider>
          <ConnectionStatus />
          <button
            className="main-btn"
            onClick={() => {
              view === "homepage"
                ? setView("ask_question")
                : setView("homepage");
            }}
          >
            {view === "homepage" ? "أسأل" : "الأسئلة"}{" "}
          </button>
          {view === "ask_question" && (
            <AskQuestion
              setView={(toView) => setView(toView)}
              notify={() => {
                notify();
              }}
            />
          )}
          {view === "homepage" &&
            questions
              .sort((a, b) => {
                return a.likes_count <= b.likes_count ? 1 : -1;
              })
              .map((question) => (
                <Question key={question.id} data={question} />
              ))}
        </ContextProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </header>
    </div>
  );
}

export default App;
