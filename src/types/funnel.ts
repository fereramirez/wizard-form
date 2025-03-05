import {type Prettify, type UnionToIntersection} from "./utilility-types";

import {type CheckboxData} from "@/components/inputs/checkbox";

type UrlParams = {
  utm_source?: string;
  affiliate_id?: string;
};

type StepsHiddenData = {
  userStepIndex: number;
  realStepIndex: number;
};

export type HiddenDataAction = Prettify<
  | {userAgent: string | null}
  | {queryParams: string}
  | UrlParams
  | StepsHiddenData
  | {randomValue: number}
  | {fakeApiData: CheckboxData[]}
>;

export type HiddenData = Prettify<UnionToIntersection<HiddenDataAction>>;

export type FunnelForms = {
  // step 1
  autosubmit: [string] | null;
  autosubmit_2: [string] | null;

  // step 2
  autosubmit_fetch: [string] | null;
  autosubmit_fetch_2: [string] | null;

  // step 3
  repeat: "true" | "false";

  // step 4
  name: string | null;
};

export type FunnelState = FunnelForms & HiddenData;
