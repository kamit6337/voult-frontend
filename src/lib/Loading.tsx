type LoadingProps = {
  size?: number;
  color?: string;
  width?: number;
  hScreen?: boolean;
};

const Loading = ({
  size = 32,
  width = 4,
  color = "border-t-blue-600",
  hScreen = false,
}: LoadingProps) => {
  return (
    <div
      className={`${hScreen ? "h-screen" : "h-full"} w-full flex items-center justify-center `}
    >
      <div
        className={`animate-spin rounded-full border-foreground ${color}`}
        style={{
          borderWidth: width,
          width: size,
          height: size,
        }}
      />
    </div>
  );
};

export default Loading;
