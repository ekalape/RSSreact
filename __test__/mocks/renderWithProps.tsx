import { PreloadedState } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { RootState, RootStateType, setupStore } from '../../src/store';

interface ExtendedRenderOptions extends RenderOptions {
  preloadedState?: PreloadedState<RootState>;
  store?: RootStateType;
}
export default function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      customDataReducer: {
        searchWord: '',
        customUsers: [],
      },
    },
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}> {children} </Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
