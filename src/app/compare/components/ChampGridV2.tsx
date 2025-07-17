"use client";

import { useGetAllChampions } from "../../../shared/hooks/useGetAllChampions";
import { Grid, Box, Text, Flex } from "@radix-ui/themes";
import "./ChampGrid.css";

const ChampCardCell = ({
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
    <Flex key={id} className="card" onClick={() => onClick?.(id)}>
      <img
        className="card-icon"
        src={`/tiles/${image_splash}`}
        alt={name}
        height={50}
        width={50}
      />
      <Text className="card-name">{name}</Text>
    </Flex>
  );
};

const ChampGridV2 = ({ onClick }: { onClick: (id: string) => void }) => {
  const champs = useGetAllChampions();

  if (!champs || champs.length === 0) {
    return <Text>No champions available</Text>;
  }

  return (
    <Box className="grid-area">
      <Grid columns="8" gap="3">
        {champs.map((champ) => (
          <ChampCardCell
            key={champ.id}
            id={champ.id}
            name={champ.name}
            height={70}
            width={70}
            image_splash={champ.image_splash}
            onClick={onClick}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default ChampGridV2;
