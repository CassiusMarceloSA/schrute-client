type Name =
  | 'amber'
  | 'blue'
  | 'cyan'
  | 'emerald'
  | 'fuchsia'
  | 'gray'
  | 'green'
  | 'indigo'
  | 'lime'
  | 'neutral'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'rose'
  | 'sky'
  | 'slate'
  | 'stone'
  | 'teal'
  | 'violet'
  | 'yellow'
  | 'zinc';

type Level = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type Color =
  | `${Name}-${Level}`
  | 'inherit'
  | 'current'
  | 'transparent'
  | 'black'
  | 'white';

export type TwBackgroundColor = `bg-${Color}`;

export type TwTextColor = `text-${Color}`;

export const TW_BOARD_COLORS = [
  "orange-500",
  "yellow-500",
  "sky-500",
  "emerald-500",
] satisfies Color[];