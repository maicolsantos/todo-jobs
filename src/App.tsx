import { Card, ConfigProvider, Layout, message, theme } from "antd";
import { useEffect } from "react";
import { ExtraCard } from "./components/ExtraCard";
import { Table } from "./components/Table";
import { useClipboardStatus } from "./store/useClipboardStatus";
import { useTheme } from "./store/useTheme";

export const App = () => {
  const { isDark } = useTheme();
  const [messageApi, contextHolder] = message.useMessage();
  const { isCopied, setIsCopied } = useClipboardStatus();

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
        <Card title="Task List" extra={<ExtraCard />}>
          <div className="table-responsive">
            <Table />
          </div>
        </Card>
      </Layout>
    </ConfigProvider>
  );
};
