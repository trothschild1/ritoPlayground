"use client";

import { useState } from "react";
import { Header } from "../../shared/components/Header";
import { InputField } from "./components/InputField";
import { StatsTable } from "./components/StatsTable";
import { useGetAllChampionStats } from "./hooks/useGetAllChampionStats";
import { Flex } from "@radix-ui/themes";

const page = "Stats";

export const Stats = () => {
  const [championValue, setChampionValue] = useState("");
  const [statValue, setStatValue] = useState("");
  const stats = useGetAllChampionStats();

  // TODO:
  // 1.) Debounce and/or separate out into different components
  // -- Problem --> Stats manages the state and gets rerendered on each keystroke causing noticable type latency
  // 2.) Search doesn't do anything ATM
  // -- Have it filter the rows if entered (champs) and/or columns (stats) if entered
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Champ: ", championValue);
      console.log("Stat: ", statValue);
    }
  };

  return (
    <>
      <Header page={page} />
      <Flex>
        <InputField
          placeholder="a champion"
          value={championValue}
          onChange={setChampionValue}
          onKeyDown={handleKeyDown}
        />
        <InputField
          placeholder="a stat"
          value={statValue}
          onChange={setStatValue}
          onKeyDown={handleKeyDown}
        />
      </Flex>
      <StatsTable data={stats} />
    </>
  );
};
