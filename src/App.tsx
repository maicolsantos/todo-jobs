import {
  Button,
  Card,
  ConfigProvider,
  Layout,
  Space,
  message,
  theme,
} from "antd";
import { Copy, Moon, Plus, SunMoon } from "lucide-react";
import { useEffect, useState } from "react";
import { Table } from "./components/Table";
import { useClipboardStatus } from "./store/useClipboardStatus";
import { useJobs } from "./store/useJobs";
import { handleCopy } from "./utils/clipboard";

export const App = () => {
  const [isDark, setIsDark] = useState(true);
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
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {contextHolder}
      <Layout style={{ minHeight: "100vh", padding: 24 }}>
        <Card
          title="Task List"
          extra={
            <Space>
              <Button
                onClick={handleAddNewJob}
                icon={
                  <Plus size={16} style={{ position: "relative", top: 3 }} />
                }
              >
                Item
              </Button>
              {jobs.length > 0 && (
                <Button onClick={() => handleCopy(jobs)}>
                  <Space align="center">
                    <Copy size={16} style={{ position: "relative", top: 3 }} />
                    Copiar
                  </Space>
                </Button>
              )}
              <Button
                onClick={() => setIsDark((prev) => !prev)}
                icon={isDark ? <SunMoon size={16} /> : <Moon size={16} />}
              />
            </Space>
          }
        >
          <Table />
        </Card>
      </Layout>
    </ConfigProvider>
  );
};
