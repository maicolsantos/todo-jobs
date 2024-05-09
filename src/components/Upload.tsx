import { Drawer as AntdDrawer, Button, Input, Space, Typography } from "antd";
import { Save } from "lucide-react";
import { createRef, forwardRef, useImperativeHandle, useState } from "react";
import { Jobs } from "../@types/jobs";
import { useJobs } from "../store/useJobs";
import { validateUpload } from "../utils/validateUpload";

interface ForwardRefProps {
  showDrawer: () => void;
  onClose: () => void;
}

const { TextArea } = Input;
const { Paragraph, Text } = Typography;

// eslint-disable-next-line react-refresh/only-export-components
export const drawerRef = createRef<ForwardRefProps>();

export const Upload = forwardRef<ForwardRefProps>(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  (_, _ref) => {
    const [open, setOpen] = useState(false);
    // const [isJSONValid, setIsJSONValid] = useState(false);
    const [uploadValue, setUploadValue] = useState("");
    const { jobs, setAllJobs } = useJobs();

    const showDrawer = () => {
      console.log(123);

      setOpen(true);
    };

    const onClose = () => {
      setOpen(false);
    };

    const handleSubmit = () => {
      const data: Jobs[] = JSON.parse(uploadValue || "[]");
      const lastId = jobs.length > 0 ? jobs[jobs.length - 1].id : 0;

      if (validateUpload(data)) {
        const dataFormatted = data.map((item) => ({
          ...item,
          id: lastId + 1,
          key: lastId + 1,
        }));

        setAllJobs([...jobs, ...dataFormatted]);
        setUploadValue("");
        setOpen(false);
      } else {
        console.log("Invalid JSON");
      }
    };

    useImperativeHandle(drawerRef, () => ({
      showDrawer,
      onClose,
    }));

    return (
      <AntdDrawer
        destroyOnClose
        closeIcon={false}
        size="large"
        title="Upload JSON"
        maskClosable={false}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            <Button type="primary" onClick={handleSubmit}>
              <Space align="center">
                <Save size={16} className="icon-table" />
                Enviar
              </Space>
            </Button>
          </Space>
        }
      >
        <Paragraph>Envie seu array no seguinte formato:</Paragraph>
        <Text>
          <pre>
            <code>
              {JSON.stringify(
                [
                  {
                    link: "string",
                    evidencies: ["string"],
                    info: "string",
                    createdAt: "09/05/2024",
                    updatedAt: "09/05/2024",
                  },
                ],
                null,
                2
              )}
            </code>
          </pre>
        </Text>
        <TextArea
          showCount
          rows={9}
          // status={isJSONValid ? "" : "error"}
          onChange={(e) => {
            setUploadValue(e.target.value);
            // setIsJSONValid(validateUpload(JSON.parse(e.target.value)));
          }}
        />
      </AntdDrawer>
    );
  }
);
