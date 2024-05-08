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
import { useEffect } from "react";
import { Table } from "./components/Table";
import { useClipboardStatus } from "./store/useClipboardStatus";
import { useJobs } from "./store/useJobs";
import { useTheme } from "./store/useTheme";
import { handleCopy } from "./utils/clipboard";

export const App = () => {
  const { isDark, setIsDark } = useTheme();
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
      <Layout className="layout">
        <Card
          title="Task List"
          extra={
            <Space>
              <Button
                onClick={handleAddNewJob}
                icon={<Plus size={16} className="icon-table" />}
              >
                Item
              </Button>
              {jobs.length > 0 && (
                <Button onClick={() => handleCopy(jobs)}>
                  <Space align="center">
                    <Copy size={16} className="icon-table" />
                    Copiar
                  </Space>
                </Button>
              )}
              <Button
                onClick={() => setIsDark(!isDark)}
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
