import { Button, Space } from "antd";
import { useState } from "react";
import { Jobs } from "../@types/jobs";
import { useJobs } from "../store/useJobs";

type GroupButtonsProps = {
  items: string[];
  options: string[];
  currentItem: Jobs;
  type: "evidencies" | "projects";
};

export const GroupButtons = ({ items, options, type, currentItem }: GroupButtonsProps) => {
  const [itemsSelected, setItemsSelected] = useState<string[]>(items);
  const { updateJobs } = useJobs();

  const handleItemsSelected = (item: string) => {
    if (itemsSelected.includes(item)) {
      updateJobs({
        ...currentItem,
        [type]: itemsSelected.filter((i) => i !== item),
      });
      setItemsSelected(itemsSelected.filter((i) => i !== item));
    } else {
      updateJobs({
        ...currentItem,
        [type]: [...itemsSelected, item],
      });
      setItemsSelected([...itemsSelected, item]);
    }
  };

  return (
    <Space.Compact size="small">
      {options?.map((item: string) => (
        <Button
          key={item}
          className="uppercase"
          value={item}
          type={itemsSelected?.includes(item) ? "primary" : "default"}
          onClick={() => handleItemsSelected(item)}
        >
          {item}
        </Button>
      ))}
    </Space.Compact>
  );
};
