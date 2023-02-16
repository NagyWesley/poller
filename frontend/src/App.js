import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ConnectionStatus from "./components/ConnectionStatus";
import AskQuestion from "./components/AskQuestion";

import QuestionsList from "./components/QuestionsList";

function App() {
  const [view, setView] = useState("homepage");

  const notify = () => toast.success("تم، سيتم الموافقة علي السؤال");

  const [questions, setQuestions] = useState({});

  return (
    <div className="App">
      <header className="App-header">
        <ConnectionStatus />
        <button
          className="main-btn"
          onClick={() => {
            view === "homepage" ? setView("ask_question") : setView("homepage");
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
        {view === "homepage" && (
          <QuestionsList questions={questions} setQuestions={setQuestions} />
        )}

        {/* <ToastContainer
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
        /> */}
      </header>
    </div>
  );
}

export default App;
