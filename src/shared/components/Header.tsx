import { House } from "lucide-react";
import { Box, Flex, IconButton } from "@radix-ui/themes";
import Link from "next/link";
import "./Header.css";
import { usePathname } from "next/navigation";

export const Header = () => {
  // Derive the page name from the current route
  // Might break once I start adding subroutes, but fine for now
  const pathname = usePathname();
  const routeName = pathname.split("/").pop() || "Route Not Found";
  const page = routeName.charAt(0).toUpperCase() + routeName.slice(1);

  return (
    <Box className="header">
      <Flex align="center">
        <Link href="/">
          <IconButton className="home-button" variant="soft">
            <House className="home-icon" />
          </IconButton>
        </Link>
        {page}
      </Flex>
    </Box>
  );
};
