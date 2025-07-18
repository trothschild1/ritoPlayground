"use client";

import { useState } from "react";
import { Header } from "../../shared/components/Header";
import { Comparisons } from "./components/Comparisons";
import { Button } from "@radix-ui/themes";
import ChampGridV2 from "./components/ChampGrid";
import { InputField } from "../../shared/components/InputField";
import { useGetAllChampions } from "../../shared/hooks/useGetAllChampions";

export const Compare = () => {
  const [champList, setChampList] = useState<string[]>([]);
  const [championValue, setChampionValue] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const champs = useGetAllChampions();

  const handleAddChamp = (id: string) => {
    setChampList((prev) => {
      if (prev.includes(id) || prev.length >= 4) return prev;
      const updated = [...prev, id];
      // console.log("champList:", updated);
      return updated;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const newFilters: string[] = [];
      if (championValue.trim()) {
        newFilters.push(championValue.trim());
        setChampionValue("");
      }
      if (newFilters.length > 0) {
        setActiveFilters((prev) => [...prev, ...newFilters]);
      }
    }
  };
  const filteredData = champs.filter((item) => {
    if (activeFilters.length === 0) return true;

    return activeFilters.some((filter) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(filter.toLowerCase())
      )
    );
  });

  return (
    <>
      <Header />
      <Comparisons champList={champList} />
      <InputField
        placeholder="a champion"
        value={championValue}
        onChange={setChampionValue}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={() => setChampList([])}>Reset</Button>
      <ChampGridV2 data={filteredData} onClick={handleAddChamp} />
    </>
  );
};
