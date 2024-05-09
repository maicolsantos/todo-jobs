import { Button, Dropdown, MenuProps, Space } from "antd";
import { Copy, Moon, Plus, SunMoon, Upload as UploadIcon } from "lucide-react";
import { useJobs } from "../store/useJobs";
import { useTheme } from "../store/useTheme";
import { handleCopyJSON, handleCopyText } from "../utils/clipboard";
import { Upload, drawerRef } from "./Upload";

export const ExtraCard = () => {
  const { isDark, setIsDark } = useTheme();
  const { jobs, setJobs } = useJobs();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Copiar texto",
      onClick: () => handleCopyText(jobs),
    },
    {
      key: "2",
      label: "Copiar JSON",
      onClick: () => handleCopyJSON(jobs),
    },
  ];

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

  return (
    <>
      <Space wrap>
        <Button
          onClick={handleAddNewJob}
          icon={<Plus size={16} className="icon-table" />}
        >
          Item
        </Button>
        <Button
          onClick={() => drawerRef.current?.showDrawer()}
          icon={<UploadIcon size={16} className="icon-table" />}
        >
          Upload
        </Button>
        {jobs.length > 0 && (
          <Dropdown arrow menu={{ items }}>
            <Button>
              <Space align="center">
                <Copy size={16} className="icon-table" />
                Copiar
              </Space>
            </Button>
          </Dropdown>
        )}
        <Button
          onClick={() => setIsDark(!isDark)}
          icon={isDark ? <SunMoon size={16} /> : <Moon size={16} />}
        />
      </Space>
      <Upload />
    </>
  );
};
