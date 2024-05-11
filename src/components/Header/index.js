import React from "react";
import "./styles.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <img src="/assets/parrot.png" alt="parrot-img" className="logo" />
      </div>
      <div className="text-container">
        <h1 className="title">PollyGlot</h1>
        <p className="subtitle">Perfect Translation Every Time</p>
      </div>
    </header>
  );
}
