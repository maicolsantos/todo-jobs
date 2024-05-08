import { Button, Card, Space, message } from "antd";
import { Copy, Plus } from "lucide-react";
import { useEffect } from "react";
import { Table } from "./components/Table";
import { useClipboardStatus } from "./store/useClipboardStatus";
import { useJobs } from "./store/useJobs";
import { handleCopy } from "./utils/clipboard";

export const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { jobs, setJobs } = useJobs();
  const { isCopied, setIsCopied } = useClipboardStatus();

  const handleAddNewJob = () => {
    const createdAt = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    setJobs({
      key: jobs.length + 1,
      id: jobs.length + 1,
      link: "",
      evidencies: [],
      info: "",
      createdAt,
      updatedAt: createdAt,
    });
  };

  useEffect(() => {
    if (isCopied) {
      messageApi.open({
        type: "success",
        content: "Copiado para a área de transferência.",
      });

      setIsCopied(false);
    }
  }, [isCopied]);

  return (
    <>
      {contextHolder}
      <div style={{ padding: "24px" }}>
        <Card
          title="TODO JOBS"
          extra={
            <Space>
              <Button onClick={handleAddNewJob} icon={<Plus size={16} />} />
              <Button
                onClick={() => handleCopy(jobs)}
                icon={<Copy size={16} />}
              />
            </Space>
          }
        >
          <Table />
        </Card>
      </div>
    </>
  );
};
