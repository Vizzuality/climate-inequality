type SingleIcon = {
  id: string;
  viewBox: string;
};

export interface IconProps {
  icon: SingleIcon | string;
  className?: string;
  style?: unknown;
}
