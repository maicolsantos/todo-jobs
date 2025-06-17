import { Button, Space } from "antd";
import { useState } from "react";
import { Jobs } from "../@types/jobs";
import { useJobs } from "../store/useJobs";

type GroupButtonsProps = {
  items: string[];
  currentItem: Jobs;
};

const EVIDENCIES = ["Develop", "Staging", "Prod"];

export const GroupButtons = ({ items, currentItem }: GroupButtonsProps) => {
  const [itemsSelected, setItemsSelected] = useState<string[]>(items);
  const { updateJobs } = useJobs();

  const handleItemsSelected = (item: string) => {
    if (itemsSelected.includes(item)) {
      updateJobs({
        ...currentItem,
        evidencies: itemsSelected.filter((i) => i !== item),
      });
      setItemsSelected(itemsSelected.filter((i) => i !== item));
    } else {
      updateJobs({
        ...currentItem,
        evidencies: [...itemsSelected, item],
      });
      setItemsSelected([...itemsSelected, item]);
    }
  };

  return (
    <Space.Compact size="small">
      {EVIDENCIES?.map((item: string) => (
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
