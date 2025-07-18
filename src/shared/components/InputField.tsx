import { Box, TextField } from "@radix-ui/themes";
import { Search } from "lucide-react";
import "./InputField.scss";

type InputFieldProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const InputField = ({
  placeholder,
  value,
  onChange,
  onKeyDown
}: InputFieldProps) => {
  return (
    <Box className="input-box">
      <TextField.Root
        placeholder={`Search for ${placeholder}...`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="input-field"
        onKeyDown={onKeyDown}
      >
        <TextField.Slot>
          <Search size="20" />
        </TextField.Slot>
      </TextField.Root>
    </Box>
  );
};
