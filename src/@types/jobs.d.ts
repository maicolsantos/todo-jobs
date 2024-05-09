export interface Jobs {
  key: number;
  id: number;
  link: string;
  evidencies: string[];
  status?: "Active" | "Ready2Test" | "Resolved";
  info: string;
  updatedAt: string;
  createdAt: string;
}
