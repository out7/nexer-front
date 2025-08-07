declare module "eruda" {
  const eruda: {
    init: () => void;
    position: (options: { x: number; y: number }) => void;
  };
  export default eruda;
}
