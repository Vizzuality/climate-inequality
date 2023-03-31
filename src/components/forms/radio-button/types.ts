export type RadioButtonProps = {
  name: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  id?: string;
};
