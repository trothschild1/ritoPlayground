"use client";

import { useState } from "react";
import { Header } from "../../shared/components/Header";
import { InputField } from "../../shared/components/InputField";
import { StatsTable } from "./components/StatsTable";
import { useGetAllChampionStats } from "../../shared/hooks/useGetStats";
import { Button, Flex } from "@radix-ui/themes";
import "./Stats.css";

export const Stats = () => {
  const [championValue, setChampionValue] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const stats = useGetAllChampionStats();

  // Trigger filter when Enter is pressed
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

  // Fuzzy match filter stats object
  const filteredData = stats.filter((item) => {
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
      <Flex className="search-area">
        <InputField
          placeholder="a champion"
          value={championValue}
          onChange={setChampionValue}
          onKeyDown={handleKeyDown}
        />
        <Button className="reset-button" onClick={() => setActiveFilters([])}>
          Reset
        </Button>
      </Flex>
      <StatsTable data={filteredData} />
    </>
  );
};
