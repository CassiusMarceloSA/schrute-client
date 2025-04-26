import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type Step = {
  label: string;
};

type Props = {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
};

type StepItemProps = {
  step: Step;
  isActive: boolean;
  isCompleted: boolean;
  index: number;
  onStepChange: (step: number) => void;
};

const StepItem = ({
  step,
  isActive,
  isCompleted,
  index,
  onStepChange,
}: StepItemProps) => {
  return (
    <>
      <div
        className={cn(
          "flex items-center gap-3 cursor-default",
          isCompleted && "cursor-pointer"
        )}
        onClick={() => isCompleted && onStepChange(index)}
      >
        <span
          className={cn(
            "text-sm text-white rounded-full h-8 min-w-8 flex items-center justify-center",
            isCompleted
              ? "bg-green-400"
              : isActive
              ? "bg-purple-400"
              : "bg-neutral-700"
          )}
        >
          {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
        </span>
        <div className="flex flex-col gap-1">
          <p
            className={cn(
              "text-sm font-medium",
              isCompleted
                ? "text-green-400"
                : isActive
                ? "text-purple-400"
                : "text-white"
            )}
          >
            Step {index + 1}
          </p>
          <p className="text-xs text-neutral-400">{step.label}</p>
        </div>
      </div>
      <span className="ml-[15px] w-[2px] h-8 rounded-sm bg-neutral-700 last-of-type:hidden" />
    </>
  );
};

const Stepper = ({ steps, currentStep, onStepChange }: Props) => {
  return (
    <div className="flex flex-col min-w-[200px]">
      {steps.map((step, index) => (
        <StepItem
          key={index}
          step={step}
          isActive={index === currentStep}
          isCompleted={index < currentStep}
          index={index}
          onStepChange={onStepChange}
        />
      ))}
    </div>
  );
};

export default Stepper;
