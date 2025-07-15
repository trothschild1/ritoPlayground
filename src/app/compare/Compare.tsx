"use client";

import React from "react";
import { Header } from "../../shared/components/Header";
import { ChampGrid } from "./components/ChampGrid";
import { Comparisons } from "./components/Comparisons";

export const Compare = () => {
  return (
    <>
      <Header />
      <Comparisons />
      <ChampGrid />
    </>
  );
};
