import {
  Anchor,
  Cat,
  Cigarette,
  FlameKindling,
  Hammer,
  HandMetal,
  Pizza,
  Shovel,
  Skull,
  Snail,
  TrafficCone,
} from "lucide-react";
import { useEffect, useState } from "react";

const icons = [
  <FlameKindling size={24} className="icon-header" />,
  <Shovel size={24} className="icon-header" />,
  <Skull size={24} className="icon-header" />,
  <Cat size={24} className="icon-header" />,
  <Snail size={24} className="icon-header" />,
  <HandMetal size={24} className="icon-header" />,
  <Pizza size={24} className="icon-header" />,
  <Hammer size={24} className="icon-header" />,
  <Cigarette size={24} className="icon-header" />,
  <Anchor size={24} className="icon-header" />,
  <TrafficCone size={24} className="icon-header" />,
];

const getRandomIcon = () => {
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex];
};

export const IconsHeader = () => {
  const [currentIcon, setCurrentIcon] = useState(getRandomIcon());

  const handleChangeIcon = () => {
    setCurrentIcon(getRandomIcon());
  };

  useEffect(() => {
    const interval = setInterval(handleChangeIcon, 10000);

    return () => clearInterval(interval);
  }, []);

  return <>{currentIcon}</>;
};
