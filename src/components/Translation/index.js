import React, { useState } from "react";
import "./styles.css";
import { VIEW_STATES } from "./constants";

export default function Translation() {
  const [viewState, setViewState] = useState(VIEW_STATES.INITIAL);

  return (
    <div className="translation-container">
      <div className="input-section">
        <h3 className="input-title">{`${
          viewState === VIEW_STATES.INITIAL
            ? "Text to translate"
            : "Original text"
        } 👇`}</h3>
        <textarea rows={5} placeholder="Type here..." className="textarea" />
      </div>
      <div className="output-section">
        <h3 className="output-title">{`${
          viewState === VIEW_STATES.INITIAL
            ? "Select language"
            : "Your translation"
        } 👇`}</h3>
        <div className="language-options">
          <input
            type="radio"
            id="languageChoice1"
            name="language"
            value="french"
          />
          <label for="languageChoice1">
            French <img src="/assets/fr-flag.png" alt="france-flag" />
          </label>

          <input
            type="radio"
            id="languageChoice2"
            name="language"
            value="spanish"
          />
          <label for="languageChoice2">
            Spanish <img src="/assets/sp-flag.png" alt="spain-flag" />
          </label>

          <input
            type="radio"
            id="languageChoice3"
            name="language"
            value="japanese"
          />
          <label for="languageChoice3">
            Japanese <img src="/assets/jpn-flag.png" alt="japan-flag" />
          </label>
        </div>
      </div>

      <button className="translate-button">
        {viewState === VIEW_STATES.INITIAL ? "Translate" : "Start Over"}
      </button>
    </div>
  );
}
