"use client";

import { Champion } from "../../../shared/hooks/useGetAllChampions";
import { Grid, Text, Flex, Box } from "@radix-ui/themes";
import "./ChampGrid.css";

const ChampCardCell = ({
  data,
  height,
  width,
  onClick
}: {
  data: Champion;
  height: number;
  width: number;
  onClick?: (id: string) => void;
}) => {
  return (
    <Box className="card" onClick={() => onClick?.(data.id)}>
      <img
        className="card-icon"
        src={`/tiles/${data.image_splash}`}
        alt={data.name}
        height={height}
        width={width}
      />
      <Text className="card-name">{data.name}</Text>
    </Box>
  );
};

const ChampGrid = ({
  onClick,
  data
}: {
  onClick: (id: string) => void;
  data: Champion[];
}) => {
  return (
    <Flex className="grid-area">
      <Grid columns="7" gap="3" className="grid-item">
        {data.map((item) => (
          <ChampCardCell
            key={item.id}
            data={item}
            height={64}
            width={64}
            onClick={onClick}
          />
        ))}
      </Grid>
    </Flex>
  );
};

export default ChampGrid;
