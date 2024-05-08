import { Space } from "antd";
import { CircleX, ExternalLink } from "lucide-react";

type LinkProps = {
  url: string;
};

export const Link = ({ url }: LinkProps) => {
  const isValidURL = () => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleLink = () => {
    const numberPattern = /\/(\d+)(?:$|\/)/;
    const match = url.match(numberPattern);

    if (match) {
      return parseInt(match[1], 10);
    }

    return url;
  };

  return (
    <Space>
      <a>{handleLink()}</a>
      {isValidURL() && (
        <a href={url} target="_blank">
          <ExternalLink size={16} className="icon-table" />
        </a>
      )}
      {!isValidURL() && (url || "")?.length > 0 && (
        <Space className="link-invalid">
          <CircleX size={16} className="icon-table" />
          <span>Link inválido</span>
        </Space>
      )}
    </Space>
  );
};
