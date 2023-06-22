import React from "react";
import { Header } from "../components/Header";
import { Summoner } from "../components/Summoner";
import { Footer } from "../components/Footer";

const SearchedSummoner = () => {
  return (
    <>
      <Header />
      <div className="heroSearch">
        <Summoner />
        <Footer />
      </div>
    </>
  );
};

export default SearchedSummoner;
