import { Space } from "antd";
import { ExternalLink } from "lucide-react";

type LinkProps = {
  url: string;
};

export const Link = ({ url }: LinkProps) => {
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
      <a href={url} target="_blank">
        <ExternalLink size={16} className="icon-table" />
      </a>
    </Space>
  );
};
