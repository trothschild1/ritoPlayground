import { useGetAllChampions } from "../../../shared/hooks/useGetAllChampions";
import { ChampCardCell } from "./ChampCardCell";
import { FixedSizeGrid as Grid } from "react-window";
import { memo, useState, useEffect } from "react";
import { Box } from "@radix-ui/themes";
import "./ChampGrid.css";

const useResponsiveColumns = (
  itemWidth: number,
  minColumns: number = 2,
  maxColumns: number = 14
) => {
  const [columnCount, setColumnCount] = useState(5);

  useEffect(() => {
    const updateColumnCount = () => {
      const containerWidth = window.innerWidth;
      // Calc how many columns can fit in the current container
      const calculatedColumns = Math.floor(containerWidth / itemWidth);
      // Clamps that num to either the min columns (2)
      //    or whichever is lower: maxColumns or the # of columns that can fit in the container
      const clampedColumns = Math.max(
        minColumns,
        Math.min(maxColumns, calculatedColumns)
      );
      setColumnCount(clampedColumns);
    };

    updateColumnCount();
    // Listens for window resizing to trigger rerenders
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, [itemWidth, minColumns, maxColumns]);

  return columnCount;
};
const ITEM_WIDTH = 220;
const ITEM_HEIGHT = 80;

const Cell = memo(
  ({
    columnIndex,
    rowIndex,
    style,
    data
  }: {
    columnIndex: number;
    rowIndex: number;
    style: React.CSSProperties;
    data: {
      champs: any[];
      columnCount: number;
      handleAddChamp: (id: string) => void;
    };
  }) => {
    const { champs, columnCount, handleAddChamp } = data;
    const index = rowIndex * columnCount + columnIndex;
    const champ = champs[index];

    if (!champ) return null;

    return (
      <Box className="grid-item" style={style}>
        <ChampCardCell
          key={champ.id}
          id={champ.id}
          name={champ.name}
          image_splash={champ.image_splash}
          height={40}
          width={40}
          onClick={handleAddChamp}
        />
      </Box>
    );
  }
);

export const ChampGrid = ({ onClick }: { onClick: (id: string) => void }) => {
  const champs = useGetAllChampions();
  const columnCount = useResponsiveColumns(ITEM_WIDTH);
  const rowCount = Math.ceil(champs.length / columnCount);
  const gridWidth = columnCount * ITEM_WIDTH + 20;

  return (
    <Box className="grid-area">
      <Grid
        columnCount={columnCount}
        columnWidth={ITEM_WIDTH}
        height={700}
        rowCount={rowCount}
        rowHeight={ITEM_HEIGHT}
        width={gridWidth}
        itemData={{ champs, columnCount, handleAddChamp: onClick }}
      >
        {Cell}
      </Grid>
    </Box>
  );
};
