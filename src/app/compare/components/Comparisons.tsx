"use client";

import { Flex, Section } from "@radix-ui/themes";
import React from "react";
import { CompareCard } from "./CompareCard";

export const Comparisons = ({ champList }: { champList: string[] }) => {
  return (
    <Section>
      <Flex>
        <CompareCard data={champList} />
      </Flex>
    </Section>
  );
};
