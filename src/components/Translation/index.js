import React, { useState } from 'react';
import OpenAI from 'openai';
import './styles.css';

export default function Translation() {
  const [isInitialState, setIsInitialState] = useState(true);
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isInitialState && textToTranslate === '') {
      alert('Please enter text to translate');
      return;
    }

    if (!isInitialState) {
      setIsInitialState((prev) => !prev);
      setTranslatedText('');
      setTextToTranslate('');
      return;
    }

    const getForm = e.target;
    const formData = new FormData(getForm);

    const language = formData.get('language');

    const openai = new OpenAI({
      dangerouslyAllowBrowser: true,
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });

    const messages = [
      {
        role: 'system',
        content:
          'Act like you are an expert in translating text of any language.',
      },
      {
        role: 'user',
        content: `Translate this given english text: "${textToTranslate}" in ${language} language`,
      },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
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
            isInitialState ? 'Text to translate' : 'Original text'
          } 👇`}</h3>
          <textarea
            name="textToTranslate"
            value={textToTranslate}
            onChange={(e) => setTextToTranslate(e.target.value)}
            rows={5}
            placeholder="Type here..."
            className="textarea"
            readOnly={!isInitialState}
          />
        </div>
        <div className="output-section">
          <h3 className="output-title">{`${
            isInitialState ? 'Select language' : 'Your translation'
          } 👇`}</h3>
          {isInitialState ? (
            <div className="language-options">
              <label htmlFor="languageChoice1">
                <input
                  type="radio"
                  id="languageChoice1"
                  name="language"
                  value="french"
                  defaultChecked
                />
                French <img src="/assets/fr-flag.png" alt="france-flag" />
              </label>

              <label htmlFor="languageChoice2">
                <input
                  type="radio"
                  id="languageChoice2"
                  name="language"
                  value="spanish"
                />
                Spanish <img src="/assets/sp-flag.png" alt="spain-flag" />
              </label>

              <label htmlFor="languageChoice3">
                <input
                  type="radio"
                  id="languageChoice3"
                  name="language"
                  value="japanese"
                />
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
          {isInitialState ? 'Translate' : 'Start Over'}
        </button>
      </div>
    </form>
  );
}
