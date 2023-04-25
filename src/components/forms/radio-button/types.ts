export type RadioButtonProps = {
  name: string;
  options: { label: string; value: string }[];
  size?: 'sm' | 'md' | 'lg';
  value: string;
  onChange: (value: string) => void;
  id?: string;
};
