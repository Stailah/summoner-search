import React from "react";
import { Header } from "../components/Header";
import { Summoner } from "../components/Summoner";
import { Hero } from "../components/Hero";
import { Footer } from "../components/Footer";

const Home = ({ summonerName }) => {
  return (
    <>
      <Header />
      <Hero />
      <Summoner />
      <Footer />
    </>
  );
};

export default Home;
