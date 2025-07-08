import { House } from "lucide-react";
import { Box, Flex, IconButton } from "@radix-ui/themes";
import Link from "next/link";
import "./Header.css";

export const Header = ({ page }: { page: string }) => {
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
