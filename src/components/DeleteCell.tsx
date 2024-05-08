import { Button, Popconfirm } from "antd";
import { Trash2 } from "lucide-react";
import { useJobs } from "../store/useJobs";

type DeleteCellProps = {
  id: number;
};

export const DeleteCell = ({ id }: DeleteCellProps) => {
  const { deleteJobs } = useJobs();

  const handleDelete = () => {
    deleteJobs(id);
  };

  return (
    <>
      <Popconfirm
        title="Deseja deletar?"
        placement="left"
        okText="Deletar"
        cancelText="Cancelar"
        onConfirm={handleDelete}
        okButtonProps={{ danger: true }}
      >
        <Button type="link" danger icon={<Trash2 size={16} />} />
      </Popconfirm>
    </>
  );
};
