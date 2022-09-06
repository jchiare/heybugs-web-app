export type Bug = {
  description: string;
  productArea: string;
  status: string;
  numReports: number;
  numViews: number;
  stepsToReproduce?: string;
  expectedBehaviour?: string;
  knownWorkaround?: string;
  id: number;
  accountId: number;
};
