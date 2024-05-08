import { Button, Card, message } from "antd";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Table, dataSource } from "./components/Table";
import { useClipboardStatus } from "./store/useClipboardStatus";
import { useJobs } from "./store/useJobs";
import { handleCopy } from "./utils/clipboard";

export const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [hasUpdated, setHasUpdated] = useState(false);
  const { jobs, setAllJobs } = useJobs();
  const { isCopied, setIsCopied } = useClipboardStatus();

  useEffect(() => {
    if (hasUpdated) {
      console.log(1);
      setAllJobs(dataSource);
      setHasUpdated(false);
    }
  }, [hasUpdated]);

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
            <Button
              type="link"
              ghost
              onClick={() => handleCopy(jobs)}
              icon={<Copy size={16} />}
            />
          }
        >
          <Table />
        </Card>
      </div>
    </>
  );
};
