import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";

const YOU = "you";
const AI = "ai";

function App() {
  const inputRef = useRef();
  const [qna, setQna] = useState([
    {from : AI, value : "Hello, I am Aisha. How can I help you?"},
  ]);
  const [loading, setLoading] = useState(false);

  const updateQNA = (from, value) => {
    setQna((qna) => [...qna, { from, value }]);
  };

  const handleSend = () => {
    const question = inputRef.current.value;
    updateQNA(YOU, question);
  
    setLoading(true);
    axios
      .post("http://localhost:3000/chat", { question })
      .then((response) => {
        console.log(response.data)
        updateQNA(AI, response.data.answer);
      })
      .finally(() => {
        setLoading(false);
      });
      inputRef.current.value = "";
  };
  

  const renderContent = (qna) => {
    const value = qna.value;

    if (Array.isArray(value)) {
      return value.map((v) => <p className="message-text">{v}</p>);
    }

    return <p className="message-text">{value}</p>;
  };
  return (
    <main className="container">
      <div className="chats">
        {qna.map((qna) => {
          if (qna.from === YOU) {
            return (
              <div className="send chat">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                  alt=""
                  className="avtar"
                />
                <p>{renderContent(qna)}</p>
              </div>
            );
          }
          return (
            <div className="recieve chat">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
                alt=""
                className="avtar"
              />
              <p>{renderContent(qna)}</p>
            </div>
          );
        })}

        {loading && (
          <div className="recieve chat">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
              alt=""
              className="avtar"
            />
            <p>Typing...</p>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          ref={inputRef}
          class="form-control col"
          placeholder="Type Something"
        />
        <button disabled={loading} className="btn btn-success" onClick={handleSend}>
          Send
        </button>
      </div>
    </main>
  );
}

export default App;