export interface Jobs {
  key: number;
  id: number;
  link: string;
  evidencies: string[];
  projects: string[];
  status?: "Active" | "Ready2Test" | "Resolved";
  info: string;
  updatedAt: string;
  createdAt: string;
}
