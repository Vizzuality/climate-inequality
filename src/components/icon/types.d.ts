type SingleIcon = {
  id: string;
  viewBox: string;
};

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: SingleIcon | string;
  className?: string;
  style?: unknown;
}
