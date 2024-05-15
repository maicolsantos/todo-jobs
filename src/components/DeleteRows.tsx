import { Button, Popconfirm } from "antd";
import { Trash2 } from "lucide-react";
import { useJobs } from "../store/useJobs";

export const DeleteRows = () => {
  const { deleteMultipleJobs } = useJobs();

  return (
    <>
      <Popconfirm
        title="Deseja deletar todos os itens selecionados?"
        placement="bottomRight"
        okText="Deletar"
        cancelText="Cancelar"
        onConfirm={deleteMultipleJobs}
        okButtonProps={{ danger: true }}
      >
        <Button danger icon={<Trash2 size={16} className="icon-table" />}>
          Deletar selecionados
        </Button>
      </Popconfirm>
    </>
  );
};
