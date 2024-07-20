import React, { useState } from "react";
import OpenAI from "openai";
import "./styles.css";

export default function Translation() {
  const [isInitialState, setIsInitialState] = useState(true);
  const [translatedText, setTranslatedText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!isInitialState) {
      setIsInitialState(prev => !prev);
      setTranslatedText('')
      // form.reset();
      return;
    }

    const getForm = e.target;
    const formData = new FormData(getForm);

    const textToTranslate = formData.get("textToTranslate");
    const language = formData.get("language");

    const openai = new OpenAI({
      dangerouslyAllowBrowser: true,
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });

    const messages = [
      {
        role: "system",
        content:
          "Act like you are an expert in translating text of any language.",
      },
      {
        role: "user",
        content: `Translate this given english text: "${textToTranslate}" in ${language} language`,
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
    });

    setIsInitialState((prev) => !prev);
    setTranslatedText(response.choices[0].message.content);
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="translation-container">
        <div className="input-section">
          <h3 className="input-title">{`${
            isInitialState ? "Text to translate" : "Original text"
          } 👇`}</h3>
          <textarea
            name="textToTranslate"
            rows={5}
            placeholder="Type here..."
            className="textarea"
            readOnly={!isInitialState}
          />
        </div>
        <div className="output-section">
          <h3 className="output-title">{`${
            isInitialState ? "Select language" : "Your translation"
          } 👇`}</h3>
          {isInitialState ? (
            <div className="language-options">
              <input
                type="radio"
                id="languageChoice1"
                name="language"
                value="french"
                defaultChecked
              />
              <label htmlFor="languageChoice1">
                French <img src="/assets/fr-flag.png" alt="france-flag" />
              </label>

              <input
                type="radio"
                id="languageChoice2"
                name="language"
                value="spanish"
              />
              <label htmlFor="languageChoice2">
                Spanish <img src="/assets/sp-flag.png" alt="spain-flag" />
              </label>

              <input
                type="radio"
                id="languageChoice3"
                name="language"
                value="japanese"
              />
              <label htmlFor="languageChoice3">
                Japanese <img src="/assets/jpn-flag.png" alt="japan-flag" />
              </label>
            </div>
          ) : (
            <textarea
              rows={5}
              placeholder="Type here..."
              className="textarea"
              value={translatedText}
              readOnly
            />
          )}
        </div>

        <button className="translate-button">
          {isInitialState ? "Translate" : "Start Over"}
        </button>
      </div>
    </form>
  );
}
