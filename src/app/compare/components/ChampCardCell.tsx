import { Card, Flex, Text } from "@radix-ui/themes";
import { CirclePlus } from "lucide-react";
import React from "react";
import "./ChampCardCell.css";

export const ChampCardCell = ({
  id,
  name,
  image_splash,
  title,
  height,
  width
}: {
  id: string;
  name: string;
  image_splash?: string;
  title?: string;
  height: number;
  width: number;
}) => {
  return (
    <Card key={id} className="card">
      <Flex align="center" gap="2">
        <img
          className="card-icon"
          src={`/tiles/${image_splash}`}
          alt={name}
          width={width}
          height={height}
        />
        <Text className="card-name">{name}</Text>
        <Text className="card-title">{title}</Text>
        <CirclePlus size={16} className="card-add-icon" />
      </Flex>
    </Card>
  );
};
