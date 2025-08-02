export const isMobileDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    navigator.userAgent.toLowerCase()
  );
};
