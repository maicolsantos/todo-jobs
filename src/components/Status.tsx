import { Badge } from "antd";
import { Jobs } from "../@types/jobs";

type StatusProps = {
  currentItem: Jobs;
};

export const Status = ({ currentItem }: StatusProps) => {
  const handleStatus = () => {
    const status = {
      Active: { status: "processing", text: "Active" },
      Ready2Test: { status: "warning", text: "Ready2Test" },
      Resolved: { status: "success", text: "Resolved" },
    };

    return status[currentItem?.status || "Resolved"];
  };

  return (
    <Badge status={handleStatus().status as never} text={handleStatus().text} />
  );
};
