import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import {
  PrivateWrapper,
  PrivateWrapperForLogin,
} from "./components/PrivateWrapper";
import {
  Login,
  Layout,
  NoPage,
  MyAssets,
  RequestAsset,
  Profile,
  ChangePassword,
  RequestService,
  MyServices,
} from "./pages";

import AuthProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Actions } from "./interface/interface";
import CreateRequestAsset from "./pages/CreateRequestAsset";
import CreateRequestService from "./pages/CreateRequestService";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateWrapper />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<MyAssets />} />
              <Route path="service">
                <Route index element={<MyServices />} />
              </Route>
              <Route path="request-service">
                <Route index element={<RequestService />} />
                <Route
                  path="create"
                  element={<CreateRequestService action={Actions.CREATE} />}
                />
                <Route
                  path=":statusId/edit"
                  element={<CreateRequestService action={Actions.UPDATE} />}
                />
                <Route
                  path=":statusId/clone"
                  element={<CreateRequestService action={Actions.CLONE} />}
                />
              </Route>
              <Route path="request-asset">
                <Route index element={<RequestAsset />} />
                <Route
                  path="create"
                  element={<CreateRequestAsset action={Actions.CREATE} />}
                />
                <Route
                  path=":statusId/edit"
                  element={<CreateRequestAsset action={Actions.UPDATE} />}
                />
                <Route
                  path=":statusId/clone"
                  element={<CreateRequestAsset action={Actions.CLONE} />}
                />
              </Route>
              <Route path="profile" element={<Profile />} />
              <Route path="password" element={<ChangePassword />} />
            </Route>
          </Route>
          <Route element={<PrivateWrapperForLogin />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="colored" autoClose={2500} />
    </AuthProvider>
  );
}

export default App;
