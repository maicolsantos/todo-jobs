import { Input } from "antd";
import { useState } from "react";
import { Jobs } from "../@types/jobs";
import { useJobs } from "../store/useJobs";

type EditableCellProps = {
  dataKey: string;
  text: string;
  currentItem: Jobs;
  children?: React.ReactNode;
};

export const EditableCell = ({
  dataKey,
  text,
  currentItem,
  children,
}: EditableCellProps) => {
  const [editItem, setEditItem] = useState(false);
  const [newText, setNewText] = useState(text);
  const { updateJobs } = useJobs();

  const handleEditInfo = (value: string) => {
    setNewText(value);
    updateJobs({
      ...currentItem,
      [dataKey]: value,
    });
  };

  const handleSave = () => {
    setEditItem(false);
  };

  return (
    <>
      {editItem ? (
        <Input
          autoFocus
          size="small"
          onPressEnter={handleSave}
          onBlur={handleSave}
          value={newText}
          onChange={(e) => handleEditInfo(e.target.value)}
        />
      ) : (
        <div className="edit-cell" onClick={() => setEditItem(true)}>
          {children ? children : text}
        </div>
      )}
    </>
  );
};
