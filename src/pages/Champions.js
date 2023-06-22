import React from "react";
import { Header } from "../components/Header";
import { Champion } from "../components/Champion";
import { Footer } from "../components/Footer";

const Champions = () => {
  return (
    <>
      <Header />
      <div className="champion-grid">
        <div>
          <h1>Champions</h1>
        </div>
        <Champion />
        <Footer />
      </div>
    </>
  );
};

export default Champions;
