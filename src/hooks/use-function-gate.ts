import {useCallback, useState} from "react";

export function useFunctionGate() {
  const [allowedToPass, setAllowedToPass] = useState<boolean>(true);

  const oneTimePass = useCallback(() => {
    if (!allowedToPass) return false;

    setAllowedToPass(false);

    return true;
  }, [allowedToPass]);

  const allowNextPass = useCallback(() => {
    setAllowedToPass(true);
  }, []);

  return {oneTimePass, allowNextPass, notAllowedToPass: !allowedToPass};
}
