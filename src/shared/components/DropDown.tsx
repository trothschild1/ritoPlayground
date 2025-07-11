import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button, Flex } from "@radix-ui/themes";
import { ChevronDown } from "lucide-react";
import "./DropDown.css";
import { FixedSizeList as List } from "react-window";

type DropDownProps<T> = {
  data: T[];
  displayName: string;
  getOptionLabel: (item: T) => string;
  onSelect: (value: string) => void;
};

export const DropDown = <T,>({
  data,
  displayName,
  getOptionLabel,
  onSelect
}: DropDownProps<T>) => {
  return (
    <Flex gap="3" align="center" className="dropdown-scroll-container">
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
            className="dropdown-content"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            <List
              height={300}
              itemCount={data.length}
              itemSize={40}
              width={150}
            >
              {({ index, style }) => {
                const item = data[index];
                return (
                  <Flex style={style} key={getOptionLabel(item)}>
                    <DropdownMenu.Item
                      onSelect={() => onSelect(getOptionLabel(item))}
                      className="dropdown-item"
                    >
                      {getOptionLabel(item)}
                    </DropdownMenu.Item>
                  </Flex>
                );
              }}
            </List>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </Flex>
  );
};
