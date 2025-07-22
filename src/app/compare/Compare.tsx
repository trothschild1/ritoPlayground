"use client";

import { useState } from "react";
import { Header } from "../../shared/components/Header";
import { Comparisons } from "./components/Comparisons";
import { Button, Flex } from "@radix-ui/themes";
import ChampGrid from "./components/ChampGrid";
import { InputField } from "../../shared/components/InputField";
import { useGetAllChampions } from "../../shared/hooks/useGetAllChampions";
import "./Compare.css";

export const Compare = () => {
  const [champList, setChampList] = useState<string[]>([]);
  const [championValue, setChampionValue] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const champs = useGetAllChampions();

  const handleAddChamp = (id: string) => {
    setChampList((prev) => {
      if (prev.includes(id) || prev.length >= 4) return prev;
      const updated = [...prev, id];
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
      item.id.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <>
      <Header />
      <Comparisons champList={champList} />
      <Flex className="search-area">
        <InputField
          placeholder="a champion"
          value={championValue}
          onChange={setChampionValue}
          onKeyDown={handleKeyDown}
        />
        <Flex className="search-buttons">
          <Button onClick={() => setChampList([])}>Reset Comparisons</Button>
          <Button onClick={() => setActiveFilters([])}>Clear Search</Button>
        </Flex>
      </Flex>
      <ChampGrid data={filteredData} onClick={handleAddChamp} />
    </>
  );
};
