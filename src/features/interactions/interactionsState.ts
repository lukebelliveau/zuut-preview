export type InteractionsState = {
  drag: {
    id: string;
    x: number;
    y: number;
  } | null;
  snap: {
    interval: number;
    enabled: boolean;
  };
};
