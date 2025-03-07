import {type CheckboxData} from "@/components/inputs/checkbox";

function fakeRequest(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

const mockedData: CheckboxData[] = [
  {value: "data", label: "Data"},
  {value: "received", label: "Received"},
  {value: "from", label: "From"},
  {value: "api", label: "API"},
];

function getFakeApiData(delay: number): Promise<{data: CheckboxData[]}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({data: mockedData});
    }, delay);
  });
}

export type RandomValueResponse = {
  data: number;
};

function getRandomValue(delay: number): Promise<RandomValueResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({data: Math.ceil(Math.random() * 10)});
    }, delay);
  });
}

export const fakeApi = {fakeRequest, getFakeApiData, getRandomValue};
