"use client";

import {
  Champion,
  useGetAllChampions
} from "../../shared/hooks/useGetAllChampions";
import { SearchBar } from "../../shared/components/SearchBar";
import { useState } from "react";
import { Header } from "../../shared/components/Header";
import { Text, Flex } from "@radix-ui/themes";
import "../styles/index.css";
import { useGetAllSpells } from "./hooks/useGetAllSpells";
import { ChampionSpellTable } from "./components/Spells";
import "./champions.css";
// import { useGetBaseStats } from "./hooks/useGetBaseStats";

const page = "Champions";

export const Champions = () => {
  const [selected, setSelected] = useState<Champion>();

  const champions = useGetAllChampions();
  const spells = useGetAllSpells(selected ? selected.name : "");
  // const stats = useGetBaseStats(selected ? selected.name : "");

  return (
    <>
      <Header page={page} />
      {/* Search bar */}
      <Flex align="center" className="search">
        <SearchBar
          displayName="Select a champion..."
          data={champions}
          getOptionLabel={(champions) => champions.name}
          onSelect={(value) => {
            // add error handling if a champ is undefined
            const champ = champions.find((c) => c.name === value);
            setSelected(champ);
          }}
        />
      </Flex>
      {/* Name & title */}
      <Flex direction="column" align="center" className="champion-name-title">
        <Text size="7" weight="bold">
          {selected ? selected.name : null}
        </Text>
        <Text className="champion-title">
          {selected ? selected.title : null}
        </Text>
      </Flex>
      {/* Splash art */}
      <Flex>
        {selected && (
          <img
            className="splash"
            src={`/splash/${selected.image_splash}`}
            alt={selected.name}
          />
        )}
      </Flex>
      {/* Spell table */}
      <ChampionSpellTable data={spells} />
    </>
  );
};
