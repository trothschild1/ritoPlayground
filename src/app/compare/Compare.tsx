"use client";

import React, { useState } from "react";
import { Header } from "../../shared/components/Header";
import { Comparisons } from "./components/Comparisons";
import { Button } from "@radix-ui/themes";
import ChampGridV2 from "./components/ChampGridV2";

export const Compare = () => {
  const [champList, setChampList] = useState<string[]>([]);

  const handleAddChamp = (id: string) => {
    setChampList((prev) => {
      if (prev.includes(id) || prev.length >= 4) return prev;
      const updated = [...prev, id];
      // console.log("champList:", updated);
      return updated;
    });
  };

  return (
    <>
      <Header />
      <Comparisons champList={champList} />
      <Button onClick={() => setChampList([])}>Reset</Button>
      <ChampGridV2 onClick={handleAddChamp} />
    </>
  );
};
