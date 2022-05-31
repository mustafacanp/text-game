import produce from "immer";

const immer = (config: any) => (set: any, get: any) => config((fn: any) => set(produce(fn)), get);

export default immer;
