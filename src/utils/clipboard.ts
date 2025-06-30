/* eslint-disable @typescript-eslint/no-explicit-any */
import { Jobs } from "../@types/jobs";
import { useClipboardStatus } from "../store/useClipboardStatus";

export const handleCopyText = (jobs: Jobs[]) => {
  // Step 1: Group data by createdAt date
  const groupedData = jobs.reduce((acc: any, item) => {
    const date = item.createdAt;

    //if (!item.link) return acc;

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
        if (!item.link) return 'Sem Link';

        const evidences = item.evidencies.join(", ");
        const info = item.info ? ` ${item.info}` : "";
        const updatedAt = ` (Atualizado em: ${item.updatedAt})`;

        // Combine components into a single string
        return `- ${item.link} - ("${evidences}")${info}${updatedAt}`;
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

export const handleCopyJSON = (jobs: Jobs[]) => {
  // Convert the object to a JSON string with indentation for readability.
  const jsonString = JSON.stringify(
    jobs.map((item) => ({
      link: item.link,
      evidencies: item.evidencies,
      info: item.info,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    })),
    null,
    2
  );

  // Create a temporary textarea element.
  const textarea = document.createElement("textarea");
  textarea.style.position = "fixed";
  textarea.style.top = "-1000px";
  textarea.style.left = "-1000px";
  textarea.style.zIndex = "-1000";
  // Set the value of the textarea to the JSON string.
  textarea.value = jsonString;
  // Append the textarea to the document body.
  document.body.appendChild(textarea);
  // Select the textarea's content.
  textarea.select();

  try {
    // Copy the content of the textarea to the clipboard.
    document.execCommand("copy");
    useClipboardStatus.getState().setIsCopied(true);
  } catch (err) {
    console.error("Failed to copy: ", err);
  } finally {
    // Remove the textarea from the document.
    document.body.removeChild(textarea);
  }
};
