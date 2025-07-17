"use client";

import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { useGetStatsByChamps } from "../../../shared/hooks/useGetStats";

export const CompareCard = ({ data }: { data: string[] }) => {
  const champs = useGetStatsByChamps(data);

  return (
    <>
      {champs.map((champ) => (
        <Card key={champ.champion ?? champ.champion_id}>
          <Flex align="center" gap="2">
            <img
              className="card-icon"
              src={`/tiles/${champ.image_splash}`}
              alt={champ.champion_id}
              height={64}
              width={64}
            />
            <Text>{champ.champion_id}</Text>
          </Flex>
        </Card>
      ))}
    </>
  );
};
