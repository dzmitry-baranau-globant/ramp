import store from "./store";

export { default } from './store';
export type RootState = ReturnType<typeof store.getState>;
