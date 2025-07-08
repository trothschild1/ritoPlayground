import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button, Flex } from "@radix-ui/themes";
import { ChevronDown } from "lucide-react";
import "./SearchBar.css";

type SearchBarProps<T> = {
  data: T[];
  displayName: string;
  getOptionLabel: (item: T) => string;
  onSelect: (value: string) => void;
};

export const SearchBar = <T,>({
  data,
  displayName,
  getOptionLabel,
  onSelect
}: SearchBarProps<T>) => {
  return (
    <Flex gap="3" align="center">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button size="3" variant="soft">
            {displayName}
            <ChevronDown />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={4}
            className="dropdown-content dropdown-scroll-container"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            {data.map((item) => (
              <DropdownMenu.Item
                key={getOptionLabel(item)}
                onSelect={() => onSelect(getOptionLabel(item))}
                className="dropdown-item"
              >
                {getOptionLabel(item)}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </Flex>
  );
};
