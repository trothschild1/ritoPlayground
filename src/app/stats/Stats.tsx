"use client";

import { Header } from "../../shared/components/Header";
import { StatsTable } from "./components/StatsTable";
import { useGetAllChampionStats } from "./hooks/useGetAllChampionStats";

const page = "Stats";

export const Stats = () => {
  const stats = useGetAllChampionStats();

  return (
    <>
      <Header page={page} />
      <StatsTable data={stats} />
    </>
  );
};
