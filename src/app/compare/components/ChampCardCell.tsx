import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import "./ChampCardCell.css";

export const ChampCardCell = ({
  id,
  name,
  image_splash,
  onClick
}: {
  id: string;
  name: string;
  image_splash?: string;
  height: number;
  width: number;
  onClick?: (id: string) => void;
}) => {
  return (
    <Card key={id} className="card" onClick={() => onClick?.(id)}>
      <Flex align="center" gap="2">
        <img
          className="card-icon"
          src={`/tiles/${image_splash}`}
          alt={name}
          height={50}
          width={50}
        />
        <Text className="card-name">{name}</Text>
      </Flex>
    </Card>
  );
};
