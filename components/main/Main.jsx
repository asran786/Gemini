import "./main.css";
import { assets } from "../../src/assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../src/context/context";
import Error from "../error/Error";

const Main = () => {
  const {
    input,
    recentPrompt,
    showResult,
    setShowResult,
    loading,
    resultData,
    onSent,
    setInput,
    error, setError
  } = useContext(Context);

  
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p className="hello">
                {" "}
                <span>Hello Dev</span>
              </p>
              <p className="help">How can I help you today?</p>
            </div>
            <div className="cards">
              <div className=" first-row">
                <div className="card">
                  <p>Brainstorm a tagline for my online store.</p>
                  <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                  <p>
                    Help me write a refund email for a product that’s damaged.
                  </p>
                  <img src={assets.compass_icon} alt="" />
                </div>
              </div>
              <div className="second-row">
                <div className="card">
                  <p>Give me a beginner's guide to an activity.</p>
                  <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                  <p>
                    Brainstorm team bonding activities for our work retreat.
                  </p>
                  <img src={assets.code_icon} alt="" />
                </div>
              </div>
            </div>
          </>
        ) : (<>
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
                     {
                      error ? <Error/> :<div className="result-data">
                      <img src={assets.gemini_icon} alt="" />
                      {loading ? (
                        <div className="loading">
                          <hr />
                          <hr />
                          <hr />
                        </div>
                      ) : (
                        <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                      )}
                    </div>
                     }
          </div>
          </>
        ) }

        <div className="input-main">
          <div className="input">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <img src={assets.gallery_icon} alt="" />
            <img src={assets.mic_icon} alt="" />
            <img
              onClick={() => {
                if (input.length == 0)
                 { setShowResult(true)
                  setError(true); 
                  
              }
                else {
                  setError(false);
                  onSent();
                }
              }}
              src={assets.send_icon}
              alt=""
            />
          </div>
          <p className="input-p">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.{" "}
            <a href="">Your privacy and Gemini Apps</a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
