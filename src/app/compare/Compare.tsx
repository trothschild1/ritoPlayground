"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "../../shared/components/Header";
import { ChampGrid } from "./components/ChampGrid";
import { Comparisons } from "./components/Comparisons";

export const Compare = () => {
  const pathname = usePathname();
  const routeName = pathname.split("/").pop() || "compareisfjd";
  const page = routeName.charAt(0).toUpperCase() + routeName.slice(1);

  return (
    <>
      <Header page={page} />
      <Comparisons />
      <ChampGrid />
    </>
  );
};
