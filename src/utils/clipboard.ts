/* eslint-disable @typescript-eslint/no-explicit-any */
import { Jobs } from "../@types/jobs";
import { useClipboardStatus } from "../store/useClipboardStatus";

export const handleCopy = (jobs: Jobs[]) => {
  // Step 1: Group data by createdAt date
  const groupedData = jobs.reduce((acc: any, item) => {
    const date = item.createdAt;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // Step 2: Format each group
  const formattedData = Object.entries(groupedData).map(
    ([date, items]: any) => {
      // Format entries for the current date group
      const entries = items.map((item: any) => {
        const evidences = item.evidencies.join(", ");
        const info = item.info ? ` ${item.info}` : "";
        const updatedAt = ` (Atualizado em: ${item.updatedAt})`;

        // Combine components into a single string
        return `${item.link} Evidências: ("${evidences}")${info}${updatedAt}`;
      });

      // Combine date and entries into a single string
      return `# ${date}\n${entries.join("\n")}`;
    }
  );

  // Step 3: Join all formatted groups with a newline character
  const clipboardText = formattedData.join("\n\n");

  // Step 4: Copy the formatted text to the clipboard
  navigator.clipboard
    .writeText(clipboardText)
    .then(() => {
      useClipboardStatus.getState().setIsCopied(true);
    })
    .catch((err) => {
      console.error("Failed to copy data: ", err);
    });
};
