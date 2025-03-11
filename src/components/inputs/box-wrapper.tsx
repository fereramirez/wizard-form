import {cn} from "@/helpers/cn";

type BoxWrapperProps = {
  children: React.ReactNode;
  fieldset?: boolean;
  className?: string;
};

//! VOLVER A VER agregar mt-8 para que haya una separacion entre el titulo y el boton de submit, habria que meter todos los inputs dentro de un wrapper y ponerle el margin a ese wrapper

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
