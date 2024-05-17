import {
  Affix,
  Card,
  ConfigProvider,
  Flex,
  Layout,
  Space,
  Typography,
  message,
  theme,
} from "antd";
import { useEffect } from "react";
import { ExtraCard } from "./components/ExtraCard";
import { IconsHeader } from "./components/IconsHeader";
import { Table } from "./components/Table";
import { useClipboardStatus } from "./store/useClipboardStatus";
import { useTheme } from "./store/useTheme";

const { Text } = Typography;
const { Header } = Layout;
const colorBgDarkContainer = "#1d1d1d";

export const App = () => {
  const { isDark } = useTheme();
  const [messageApi, contextHolder] = message.useMessage();
  const { isCopied, setIsCopied } = useClipboardStatus();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
      <Affix offsetTop={0}>
        <Header
          style={{
            background: isDark ? colorBgDarkContainer : colorBgContainer,
          }}
        >
          <Flex gap="middle" justify="space-between" align="center">
            <Space>
              <IconsHeader />
              <Text strong>TODO LIST</Text>
            </Space>
            <ExtraCard />
          </Flex>
        </Header>
      </Affix>
      <Layout className="layout">
        <Card title="Tasks">
          <div className="table-responsive">
            <Table />
          </div>
        </Card>
      </Layout>
    </ConfigProvider>
  );
};
