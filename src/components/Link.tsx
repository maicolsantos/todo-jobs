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

  return <a href={url}>{handleLink()}</a>;
};
