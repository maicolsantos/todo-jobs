import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Jobs } from "../@types/jobs";

type Store = {
  jobs: Jobs[];
  selectedRows: number[];
  setJobs: (jobs: Jobs) => void;
  setAllJobs: (jobs: Jobs[]) => void;
  updateJobs: (jobs: Jobs) => void;
  deleteJobs: (key: number) => void;
  setSelectedRows: (keys: number[]) => void;
  deleteMultipleJobs: () => void;
};

export const useJobs = create<Store>()(
  persist(
    (set, get) => ({
      jobs: [],
      selectedRows: [],
      setJobs: (jobs) => set({ jobs: [...get().jobs, jobs] }),
      setAllJobs: (jobs) => set({ jobs }),
      updateJobs: (jobs) => {
        const updatedJobs = get().jobs.map((job) => {
          if (job.key === jobs.key) {
            return {
              ...jobs,
              updatedAt: new Date().toLocaleDateString("pt-PT", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }),
            };
          }

          return job;
        });

        set({ jobs: updatedJobs });
      },
      deleteJobs: (key) =>
        set({ jobs: get().jobs.filter((job) => job.key !== key) }),
      setSelectedRows: (key) => set({ selectedRows: key }),
      deleteMultipleJobs: () =>
        set({
          jobs: get().jobs.filter(
            (job) => !get().selectedRows.includes(job.key)
          ),
          selectedRows: [],
        }),
    }),
    {
      name: "TDJOBS",
    }
  )
);
