import {createContext, useContext, useReducer, type ReactNode} from "react";
import {type FieldValues} from "react-hook-form";

import {STEP_INDEXES} from "@/components/funnel/current-step";
import {type CheckboxData} from "@/components/inputs/checkbox";
import {type UnionToIntersection, type Prettify} from "@/types/utilility-types";

type SourceParams = {
  utm_source?: string;
  affiliate_id?: string;
};

type StepsHiddenData = {
  userStepIndex: number;
  realStepIndex: number;
};

type HiddenDataAction = Prettify<
  | {userAgent: string | null}
  | {queryParams: string}
  | SourceParams
  | StepsHiddenData
  | {randomValue: number}
  | {fakeApiData: CheckboxData[]}
>;

type HiddenData = Prettify<UnionToIntersection<HiddenDataAction>>;

type FunnelForms = {
  //! VOLVER A VER actualizar el type de FunnelState
  // step 0
  // intro

  // step 1
  name: string | null;
  name_2: string | null;

  // step 2
  // back

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

  // Hidden data
  userAgent: string | null;
  randomValue: number;
  fakeApiData: CheckboxData[];
  realStepIndex: number;
  userStepIndex: number;

  // Query params
  queryParams: string;
  utm_source: string | undefined;
  affiliate_id: string | undefined;
};

type FunnelState = FunnelForms & HiddenData;

type StepValue = number; //! VOLVER A VER agregar type de step

type FunnelStore = {
  funnelState: FunnelState;
  setFunnelData: (data: FieldValues) => void;
  setHiddenData: (data: HiddenDataAction) => void;
  setRealStepIndex: (step?: StepValue) => void;
  setUserStepIndex: (step?: StepValue) => void;
  resetFunnel: () => void;
};

const FunnelContext = createContext<FunnelStore | null>(null);

const INITIAL_FUNNEL_STATE: FunnelState = {
  //! VOLVER A VER actualizar el type de FunnelState

  // step 0
  // intro

  // step 1
  name: null,
  name_2: null,

  // step 2
  // back

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
  userAgent: null,
  randomValue: 0,
  fakeApiData: [],
  realStepIndex: 0,
  userStepIndex: 0,

  // Query params
  queryParams: "",
  utm_source: undefined,
  affiliate_id: undefined,
};

type FunnelAction =
  | {type: "setFunnelData"; payload: FieldValues}
  | {type: "setHiddenData"; payload: HiddenDataAction}
  | {type: "setRealStepIndex"; payload?: StepValue}
  | {type: "setUserStepIndex"; payload?: StepValue}
  | {type: "resetFunnel"; payload?: undefined};

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
    setRealStepIndex: (step?: StepValue) => dispatch({type: "setRealStepIndex", payload: step}),
    setUserStepIndex: (step?: StepValue) => dispatch({type: "setUserStepIndex", payload: step}),
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
