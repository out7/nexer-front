import { AlarmLinear } from "@/icons/Alarm";
import { CheckCircleLinear } from "@/icons/Check";
import { ForbiddenCircleLinear } from "@/icons/Forbidden";

type StatusType = "active" | "expired" | "none";

interface StatusIconProps {
  type: StatusType;
  color?: string;
}

export const StatusIcon = ({ type, color }: StatusIconProps) => {
  const Icon = (() => {
    switch (type) {
      case "active":
        return CheckCircleLinear;
      case "expired":
        return AlarmLinear;
      case "none":
        return ForbiddenCircleLinear;
    }
  })();

  return (
    <span data-status={type} style={color ? { color } : undefined}>
      <Icon />
    </span>
  );
};
