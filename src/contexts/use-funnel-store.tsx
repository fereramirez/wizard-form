import {createContext, useContext, useReducer, type ReactNode} from "react";
import {type FieldValues} from "react-hook-form";

import {type StepValue, STEP_INDEXES} from "@/components/funnel/current-step";
import {type FunnelState, type HiddenDataAction} from "@/types/funnel";

type StepValue = number;

type FunnelStore = {
  funnelState: FunnelState;
  setFunnelData: (data: FieldValues) => void;
  setHiddenData: (data: HiddenDataAction) => void;
  setRealStepIndex: (step?: StepValue) => void;
  setUserStepIndex: (step?: StepValue) => void;
};

const FunnelContext = createContext<FunnelStore | null>(null);

const INITIAL_FUNNEL_STATE: FunnelState = {
  //! VOLVER A VER actualizar el type de FunnelState

  // step 1
  autosubmit: null,
  autosubmit_2: null,

  // step 2
  autosubmit_fetch: null,
  autosubmit_fetch_2: null,

  // step 3
  repeat: "false",

  // step 4
  name: null,

  /* HiddenData */
  userAgent: null,
  queryParams: "",
  randomValue: 0,
  fakeApiData: [],
  realStepIndex: 0,
  userStepIndex: 0,
};

type FunnelAction =
  | {type: "setFunnelData"; payload: FieldValues}
  | {type: "setHiddenData"; payload: HiddenDataAction}
  | {type: "setRealStepIndex"; payload?: StepValue}
  | {type: "setUserStepIndex"; payload?: StepValue};

function FunnelReducer(state: FunnelState, action: FunnelAction): FunnelState {
  const {type, payload} = action;

  switch (type) {
    case "setFunnelData":
      return {...state, ...payload};

    case "setHiddenData":
      return {...state, ...payload};

    case "setRealStepIndex": {
      if (state.realStepIndex < STEP_INDEXES.LAST_REAL) {
        return {
          ...state,
          realStepIndex:
            payload === undefined
              ? state.realStepIndex + 1
              : payload >= 0
                ? payload
                : state.realStepIndex + payload,
        };
      }

      return state;
    }

    case "setUserStepIndex": {
      if (state.userStepIndex < STEP_INDEXES.LAST_USER) {
        return {
          ...state,
          userStepIndex:
            payload === undefined
              ? state.userStepIndex + 1
              : payload >= 0
                ? payload
                : state.userStepIndex + payload,
        };
      }

      return state;
    }

    default:
      return state;
  }
}

export function FunnelStoreProvider({children}: {children: ReactNode}) {
  const [funnelState, dispatch] = useReducer(FunnelReducer, INITIAL_FUNNEL_STATE);

  const actions = {
    setFunnelData: (data: FieldValues) => dispatch({type: "setFunnelData", payload: data}),
    setHiddenData: (data: HiddenDataAction) => dispatch({type: "setHiddenData", payload: data}),
    setRealStepIndex: (step?: StepValue) => dispatch({type: "setRealStepIndex", payload: step}),
    setUserStepIndex: (step?: StepValue) => dispatch({type: "setUserStepIndex", payload: step}),
  };

  return (
    <FunnelContext.Provider value={{funnelState, ...actions}}>{children}</FunnelContext.Provider>
  );
}

export function useFunnelStore() {
  const context = useContext(FunnelContext);

  if (!context) {
    throw new Error("useFunnelStore must be used within a FunnelStoreProvider");
  }

  return {
    ...context.funnelState,
    ...context,
  };
}
