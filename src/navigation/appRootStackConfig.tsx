import type { ComponentType } from 'react';

export type AppRootStackParamList = Record<never, never>;
// Example when adding routes:
// type AppRootStackParamList = {
//   Screen1: undefined;
//   Screen2: undefined;
//   Screen3: undefined;
// };

type AppRootStackRoute<Name extends keyof AppRootStackParamList> = {
  name: Name;
  component: ComponentType<any>;
};

export const appRootStackRoutes: AppRootStackRoute<keyof AppRootStackParamList>[] = [
  // { name: 'Screen1', component: Screen1 },
  // { name: 'Screen2', component: Screen2 },
  // { name: 'Screen3', component: Screen3 },
];
