import Link from "next/link";
import { Header } from "../shared/components/Header";
import { Flex } from "@radix-ui/themes";
import "./styles/index.css";

const LEAGUE = [
  {
    name: "Champions",
    route: "/champions",
    description: "Find champion stats and abilities"
  },
  {
    name: "Skins",
    route: "/skins",
    description: "View all the skins"
  },
  {
    name: "Stats",
    route: "/stats",
    description: "See all champs base & scaling stats"
  },
  {
    name: "Compare",
    route: "/compare",
    description: "Compare up to 4 champions"
  }
];

export default function HomePage() {
  return (
    <>
      <Header />
      <Flex className="link-list">
        {LEAGUE.map((item) => (
          <Link key={item.route} href={item.route} className="league-link">
            {item.name}
          </Link>
        ))}
      </Flex>
    </>
  );
}
