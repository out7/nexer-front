import { AlarmLinear } from "@/icons/Alarm";
import { CheckCircleLinear } from "@/icons/Check";
import { ForbiddenCircleLinear } from "@/icons/Forbidden";

type StatusType = "active" | "expired" | "noSubscription";

interface StatusIconProps {
  type: StatusType;
}

export const StatusIcon = ({ type }: StatusIconProps) => {
  const Icon = (() => {
    switch (type) {
      case "active":
        return CheckCircleLinear;
      case "expired":
        return AlarmLinear;
      case "noSubscription":
        return ForbiddenCircleLinear;
    }
  })();

  return (
    <span data-status={type}>
      <Icon />
    </span>
  );
};
