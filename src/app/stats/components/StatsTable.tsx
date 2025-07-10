import { Table } from "@radix-ui/themes";
import { ChampionStats } from "../hooks/useGetAllChampionStats";

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
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Icon</Table.ColumnHeaderCell>
          {columns.map((col) => (
            <Table.ColumnHeaderCell key={col.key}>
              {col.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((item) => (
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
