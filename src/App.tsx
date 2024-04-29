import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { authProvider, dataProvider, liveProvider } from "./providers";

import { Home, LoginPage } from "./pages"
import { Layout } from "./components/layout";
import { resources } from "./config/resources";
import { CompanyList } from "./pages/company/list";
import { CompanyCreateModal } from "./pages";
import { CompanyEditPage } from "./pages";
import { TasksListPage } from "./pages/tasks";
import { TasksCreatePage } from "./pages/tasks/create";
import { TasksEditPage } from "./pages/tasks/edit";


function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  liveMode: "auto",
                  useNewQueryKeys: true,
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-layout"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <Layout>
                           <Outlet />
                        </Layout>
                      </Authenticated>
                    }
                  >
                    <Route index element={<Home />} />

                    <Route path="/tasks" element={
                      <TasksListPage>
                        <Outlet />
                      </TasksListPage>
                    }>
                      <Route path="new" element={<TasksCreatePage />} />
                      <Route path="edit/:id" element={<TasksEditPage />} />
                    </Route>

                    <Route path="/companies">
                      <Route index element={<CompanyList />} />
                      <Route path="new" element={<CompanyCreateModal />} />
                      <Route path="edit/:id" element={<CompanyEditPage />} />
                    </Route>

                  </Route>
                
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-auth"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource resource="home" />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<LoginPage />} />
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
