import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { routes } from './util/RoutesPath'
import store from "./store";
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

import { Provider } from "react-redux";
import setupAxiosInterceptors from "./util/axios-interceptor";
function App() {
  const router = createBrowserRouter(routes);

  setupAxiosInterceptors();
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={5}>
      <RouterProvider router={router} />
      </SnackbarProvider>
    </Provider>
  )
}

export default App