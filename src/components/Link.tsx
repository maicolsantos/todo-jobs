type LinkProps = {
  url: string;
};

export const Link = ({ url }: LinkProps) => {
  return <a href={url}>{url}</a>;
};
