function Skeleton({ className = "", ...props }) {
  const baseClasses = "animate-pulse rounded-md bg-muted";
  return (
    <div
      className={`${baseClasses}${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export { Skeleton };