import { useEffect, useState } from "react";

type Platform = "ios" | "android" | "pc";

const getMobileOS = (): Platform => {
  const ua = navigator.userAgent;

  if (/iPad|iPhone|iPod/.test(ua)) {
    return "ios";
  }

  if (/Android/.test(ua)) {
    return "android";
  }

  return "pc";
};

export const usePlatform = () => {
  const [platform, setPlatform] = useState<Platform>("pc");

  useEffect(() => {
    setPlatform(getMobileOS());
  }, []);

  return platform;
};
