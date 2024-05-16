import { Button, Dropdown, MenuProps, Space } from "antd";
import { Copy, Moon, Plus, SunMoon, Upload as UploadIcon } from "lucide-react";
import { useJobs } from "../store/useJobs";
import { useTheme } from "../store/useTheme";
import { handleCopyJSON, handleCopyText } from "../utils/clipboard";
import { generateUniqueId } from "../utils/generateUniqueId";
import { DeleteRows } from "./DeleteRows";
import { Upload, drawerRef } from "./Upload";

export const ExtraCard = () => {
  const { isDark, setIsDark } = useTheme();
  const { jobs, setJobs, selectedRows } = useJobs();
  const jobsSelected = jobs.filter((job) => selectedRows.includes(job.key));

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Texto",
      onClick: () => handleCopyText(jobs),
    },
    {
      key: "3",
      label: "JSON",
      onClick: () => handleCopyJSON(jobs),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Textos (selecionados)",
      onClick: () => handleCopyText(jobsSelected),
      disabled: jobsSelected.length === 0,
    },
    {
      key: "4",
      label: "JSON (selecionados)",
      onClick: () => handleCopyJSON(jobsSelected),
      disabled: jobsSelected.length === 0,
    },
  ];

  const handleAddNewJob = () => {
    const id = generateUniqueId()
    const createdAt = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    setJobs({
      key: id,
      id,
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
        {selectedRows.length > 0 && <DeleteRows />}
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
          <Dropdown.Button
            arrow
            menu={{ items }}
            onClick={() => handleCopyText(jobs)}
          >
            <Space align="center">
              <Copy size={16} className="icon-table" />
              Copiar
            </Space>
          </Dropdown.Button>
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
