import { DataList } from "@radix-ui/themes";
import { Stats } from "../hooks/useGetBaseStats";

export const ChampStats = ({ data }: { data?: Stats }) => {
  if (!data) return null;

  return (
    <DataList.Root>
      <DataList.Item key={data.champion}>
        <DataList.Label>Base HP</DataList.Label>
        <DataList.Value>{data.hp}</DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
};
