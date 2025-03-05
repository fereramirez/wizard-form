import {cn} from "@/helpers/cn";

type BoxWrapperProps = {
  children: React.ReactNode;
  fieldset?: boolean;
  className?: string;
};

export function BoxWrapper({fieldset = false, children, className}: BoxWrapperProps) {
  if (fieldset)
    return (
      <fieldset className={cn("w-full", className)} data-testid="common-box-fieldset">
        {children}
      </fieldset>
    );

  return (
    <div className={cn("w-full", className)} data-testid="common-box-div">
      {children}
    </div>
  );
}
