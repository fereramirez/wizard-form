import {createContext, useContext, useReducer, type ReactNode} from "react";
import {type FieldValues} from "react-hook-form";

import {STEP_INDEXES} from "@/components/funnel/current-step";
import {type CheckboxData} from "@/components/inputs/checkbox";
import {type UnionToIntersection, type Prettify} from "@/types/utilility-types";

type SourceParams = {
  utmSource?: string | null;
  affiliateId?: string | null;
};

type HiddenDataAction = Prettify<
  | {userAgent: string | null}
  | {queryParams: string}
  | SourceParams
  | {randomValue: number}
  | {fillTime: number}
  | {fakeApiData: CheckboxData[]}
>;

type HiddenData = Prettify<UnionToIntersection<HiddenDataAction>>;

type FunnelForms = {
  //! VOLVER A VER actualizar el type de FunnelState

  // Steps
  realStepIndex: number;
  userStepIndex: number;

  // step 0
  // intro

  // step 1
  name: string | null;
  name_2: string | null;

  // step 2
  back: boolean;

  // step 3
  optional: string | null;
  purple: string | null;
  blue: string | null;
  green: string | null;
  optional_2: string | null;
  purple_2: string | null;
  blue_2: string | null;
  green_2: string | null;

  // step 4
  repeat: "true" | "false";

  // step 5
  storePromise: string | null;

  // step 6
  autosubmit: [string] | null;

  // step 7
  autosubmitFetch: [string] | null;

  // step 8
  autosubmitShow: [string] | null;

  // step 9
  // wait for promise,
};

type FunnelState = FunnelForms & HiddenData;

type StepValue = number; //! VOLVER A VER agregar type de step, ahora se usa StepPayload, deberia concordar con los stepNumber asignados en current-step

type FunnelStore = {
  funnelState: FunnelState;
  setFunnelData: (data: FieldValues) => void;
  setHiddenData: (data: HiddenDataAction) => void;
  setRealStepIndex: (step?: StepPayload) => void;
  setUserStepIndex: (step?: StepPayload) => void;
  resetFunnel: () => void;
};

const FunnelContext = createContext<FunnelStore | null>(null);

const INITIAL_FUNNEL_STATE: FunnelState = {
  //! VOLVER A VER actualizar el type de FunnelState
  // Steps
  realStepIndex: 0,
  userStepIndex: 0,

  // step 0
  // intro

  // step 1
  name: null,
  name_2: null,

  // step 2
  back: false,

  // step 3
  optional: null,
  purple: null,
  blue: null,
  green: null,
  optional_2: null,
  purple_2: null,
  blue_2: null,
  green_2: null,

  // step 4
  repeat: "false",

  // step 5
  storePromise: null,

  // step 6
  autosubmit: null,

  // step 7
  autosubmitFetch: null,

  // step 8
  autosubmitShow: null,

  // step 9
  // wait for promise,

  // Hidden data
  fakeApiData: [],
  randomValue: 0,
  fillTime: 0,
  userAgent: null,

  // Query params
  queryParams: "",
  utmSource: null,
  affiliateId: null,
};

export type StepPayload = undefined | number | `+${number}` | `-${number}`;

type FunnelAction =
  | {type: "setFunnelData"; payload: FieldValues}
  | {type: "setHiddenData"; payload: HiddenDataAction}
  | {type: "setRealStepIndex"; payload?: StepPayload}
  | {type: "setUserStepIndex"; payload?: StepPayload}
  | {type: "resetFunnel"; payload?: undefined};

function FunnelReducer(state: FunnelState, action: FunnelAction): FunnelState {
  const {type, payload} = action;

  switch (type) {
    case "setFunnelData":
      return {...state, ...payload};

    case "setHiddenData":
      return {...state, ...payload};

    case "setRealStepIndex": {
      if (state.realStepIndex >= STEP_INDEXES.LAST_REAL) return state;

      let newRealStepIndex: number;

      if (payload === undefined) {
        newRealStepIndex = state.realStepIndex + 1;
      } else if (typeof payload === "number") {
        newRealStepIndex = payload;
      } else if (typeof payload === "string" && payload.startsWith("+")) {
        const addValue = Number(payload.slice(1));

        newRealStepIndex = state.realStepIndex + addValue;
      } else if (typeof payload === "string" && payload.startsWith("-")) {
        const subtractValue = Number(payload.slice(1));

        newRealStepIndex = state.realStepIndex - subtractValue;
      } else {
        newRealStepIndex = state.realStepIndex;
      }

      return {...state, realStepIndex: newRealStepIndex};
    }

    case "setUserStepIndex": {
      if (state.userStepIndex >= STEP_INDEXES.LAST_USER) return state;

      let newUserStepIndex: number;

      if (payload === undefined) {
        newUserStepIndex = state.userStepIndex + 1;
      } else if (typeof payload === "number") {
        newUserStepIndex = payload;
      } else if (typeof payload === "string" && payload.startsWith("+")) {
        const addValue = Number(payload.slice(1));

        newUserStepIndex = state.userStepIndex + addValue;
      } else if (typeof payload === "string" && payload.startsWith("-")) {
        const subtractValue = Number(payload.slice(1));

        newUserStepIndex = state.userStepIndex - subtractValue;
      } else {
        newUserStepIndex = state.userStepIndex;
      }

      return {...state, userStepIndex: newUserStepIndex};
    }

    case "resetFunnel":
      return INITIAL_FUNNEL_STATE;

    default:
      return state;
  }
}

export function FunnelStoreProvider({children}: {children: ReactNode}) {
  const [funnelState, dispatch] = useReducer(FunnelReducer, INITIAL_FUNNEL_STATE);

  const actions = {
    setFunnelData: (data: FieldValues) => dispatch({type: "setFunnelData", payload: data}),
    setHiddenData: (data: HiddenDataAction) => dispatch({type: "setHiddenData", payload: data}),
    setRealStepIndex: (step?: StepPayload) => dispatch({type: "setRealStepIndex", payload: step}),
    setUserStepIndex: (step?: StepPayload) => dispatch({type: "setUserStepIndex", payload: step}),
    resetFunnel: () => dispatch({type: "resetFunnel"}),
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
