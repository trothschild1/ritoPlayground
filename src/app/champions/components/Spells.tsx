import { Table } from "@radix-ui/themes";
import { Spells } from "../hooks/useGetAllSpells";

export const ChampionSpellTable = ({ data }: { data: Spells[] }) => {
  if (!data || data.length === 0) return null;

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Image</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Spell</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Cooldown</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Cost</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((item) => (
          <Table.Row key={item.name}>
            <Table.RowHeaderCell>
              <img
                src={`/spell/${item.image_full}`}
                alt={item.name}
                width={42}
                height={42}
              />
            </Table.RowHeaderCell>
            <Table.Cell width="200px">{item.name}</Table.Cell>
            <Table.Cell>{item.description}</Table.Cell>
            <Table.Cell width="200px">{item.cooldown.join(", ")}</Table.Cell>
            <Table.Cell width="200px">{item.cost.join(", ")}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
