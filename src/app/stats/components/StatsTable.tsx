import { Table } from "@radix-ui/themes";
import { ChampionStats } from "../hooks/useGetAllChampionStats";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const columns: { key: keyof ChampionStats; label: string }[] = [
  { key: "champion_id", label: "Champion" },
  { key: "hp", label: "Base HP" },
  { key: "hpperlevel", label: "HP/Lvl" },
  { key: "mp", label: "Mana" },
  { key: "mpperlevel", label: "Mana/Lvl" },
  { key: "movespeed", label: "Movespeed" },
  { key: "armor", label: "Armor" },
  { key: "armorperlevel", label: "Armor/Lvl" },
  { key: "spellblock", label: "MR" },
  { key: "spellblockperlevel", label: "MR/Lvl" },
  { key: "attackrange", label: "Range" },
  { key: "hpregen", label: "HP Regen" },
  { key: "hpregenperlevel", label: "HP Regen/Lvl" },
  { key: "mpregen", label: "Mana Regen" },
  { key: "mpregenperlevel", label: "Mana Regen/Lvl" },
  { key: "crit", label: "Crit" },
  { key: "critperlevel", label: "Crit/Lvl" },
  { key: "attackdamage", label: "AD" },
  { key: "attackdamageperlevel", label: "AD/Lvl" },
  { key: "attackspeed", label: "AS" },
  { key: "attackspeedperlevel", label: "AS/Lvl" }
];

export const StatsTable = ({ data }: { data: ChampionStats[] }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ChampionStats;
    direction: "asc" | "desc";
  } | null>({
    key: "champion_id",
    direction: "asc"
  });

  // log(n) operation
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    console.log(sortConfig.direction);
    return 0;
  });

  const handleSort = (key: keyof ChampionStats) => {
    setSortConfig((prev) =>
      prev?.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Icon</Table.ColumnHeaderCell>
          {columns.map((col) => (
            <Table.ColumnHeaderCell
              key={col.key}
              onClick={() => handleSort(col.key)}
              className="column-cell"
            >
              {col.label}
              {sortConfig?.key === col.key &&
                (sortConfig.direction === "asc" ? (
                  <ChevronDown />
                ) : (
                  <ChevronUp />
                ))}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedData.map((item) => (
          <Table.Row key={item.champion_id}>
            <Table.RowHeaderCell>
              <img
                src={`/tiles/${item.image_splash}`}
                alt={item.champion_id}
                width={40}
                height={40}
              />
            </Table.RowHeaderCell>
            {columns.map((col) => (
              <Table.Cell key={col.key} width="200px">
                {item[col.key]}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
