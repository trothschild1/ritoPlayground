"use client";

import { Flex } from "@radix-ui/themes";
import { Header } from "../../shared/components/Header";
import { useGetAllChampions } from "../../shared/hooks/useGetAllChampions";
import { DropDown } from "../../shared/components/DropDown";
import { useState } from "react";
import "../styles/index.css";

const page = "Skins";
/* TODO
  1. Write custom hook to get the skins for a given champ. 
    Use /get-all/skins-by-champion
  2. Create second SearchBar that takes in the selected champion as a prop & passes that as the championId to the custom hook
  3. Create new component that takes in N skin_ids and returns the splash art image `./public/splash/${data.img_full}`
*/

export default function SkinsPage() {
  const champions = useGetAllChampions();
  const [selected, setSelected] = useState("");

  return (
    <>
      <Header page={page} />
      <Flex className="search">
        <DropDown
          data={champions}
          displayName="Select a champion..."
          getOptionLabel={(champions) => champions.name}
          onSelect={(value) => {
            setSelected(value);
            return selected;
          }}
        />
      </Flex>
    </>
  );
}
