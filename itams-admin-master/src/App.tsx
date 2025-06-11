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
  Profile,
  ChangePassword,
  AllAssets,
  DeletedAssets,
  CreateAsset,
  DetailedAsset,
  CheckoutAsset,
  CheckinAsset,
  AllRequestAssets,
  AcceptRequest,
  AllAssetMaintenances,
  CreateAssetMaintenance,
  AllLicenses,
  DetailedLicense,
  CreateLicense,
  CheckoutLicense,
  CheckinLicense,
  AllUsers,
  DetailedUser,
  CreateUser,
  ImportAssets,
  ImportUsers,
  AllInventories,
  CreateInventory,
  DetailedInventory,
  AllStatuses,
  DetailedStatus,
  CreateStatus,
  AllAssetModels,
  DetailedAssetModel,
  CreateAssetModel,
  AllCategories,
  DetailedCategory,
  CreateCategory,
  AllManufacturers,
  DetailedManufacturer,
  CreateManufacturer,
  AllSuppliers,
  DetailedSupplier,
  CreateSupplier,
  AllDepartments,
  DetailedDepartment,
  CreateDepartment,
  AllLocations,
  DetailedLocation,
  CreateLocation,
  AllDeprecations,
  CreateDeprecation,
  AllSourceCodes,
  DetailedSourceCode,
  CreateSourceCode,
  CheckoutSourceCode,
  CheckinSourceCode,
  AllDigitalContents,
  DetailedDigitalContent,
  CreateDigitalContent,
  CheckoutDigitalContent,
  CheckinDigitalContent,
  Dashboard,
  AllServices,
  CreateService,
  DetailedService,
  AllServiceTypes,
  CreateServiceType,
  DetailedServiceType,
  CheckoutService,
  CheckinService,
  CreateServicePrice,
  AllRelationships,
  CreateRelationship,
  CreateServiceDependency,
  CreateServiceUpdate,
  CreateLicenseDependency,
  CreateLicenseUpdate,
  CreateServiceUsage,
  ServiceGraph,
  CreateLicenseUsage,
  LicenseGraph,
  AllRequestServices,
  AcceptRequestService,
} from "./pages";
import AuthProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Actions } from "./interface/interface";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateWrapper />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="hardware">
                <Route index element={<AllAssets />} />
                <Route path="deleted" element={<DeletedAssets />} />
                <Route
                  path="create"
                  element={<CreateAsset action={Actions.CREATE} />}
                />
                <Route path=":assetId" element={<DetailedAsset />} />
                <Route
                  path=":assetId/edit"
                  element={<CreateAsset action={Actions.UPDATE} />}
                />
                <Route
                  path=":assetId/clone"
                  element={<CreateAsset action={Actions.CLONE} />}
                />
                <Route path=":assetId/checkout" element={<CheckoutAsset />} />
                <Route path=":assetId/checkin" element={<CheckinAsset />} />
              </Route>
              <Route path="request-assets">
                <Route index element={<AllRequestAssets />} />
                <Route
                  path=":requestAssetId/accept"
                  element={<AcceptRequest />}
                />
              </Route>
              <Route path="maintenances">
                <Route index element={<AllAssetMaintenances />} />
                <Route
                  path="create"
                  element={<CreateAssetMaintenance action={Actions.CREATE} />}
                />
                <Route
                  path=":assetMaintenanceId/edit"
                  element={<CreateAssetMaintenance action={Actions.UPDATE} />}
                />
              </Route>
              <Route path="source-code">
                <Route index element={<AllSourceCodes />} />
                <Route path=":sourceCodeId" element={<DetailedSourceCode />} />
                <Route
                  path="create"
                  element={<CreateSourceCode action={Actions.CREATE} />}
                />
                <Route
                  path=":sourceCodeId/edit"
                  element={<CreateSourceCode action={Actions.UPDATE} />}
                />
                <Route
                  path=":sourceCodeId/clone"
                  element={<CreateSourceCode action={Actions.CLONE} />}
                />
                <Route
                  path=":sourceCodeId/checkout"
                  element={<CheckoutSourceCode />}
                />
                <Route
                  path=":sourceCodeId/checkin"
                  element={<CheckinSourceCode />}
                />
              </Route>
              <Route path="digital-content">
                <Route index element={<AllDigitalContents />} />
                <Route
                  path=":digitalContentId"
                  element={<DetailedDigitalContent />}
                />
                <Route
                  path="create"
                  element={<CreateDigitalContent action={Actions.CREATE} />}
                />
                <Route
                  path=":digitalContentId/edit"
                  element={<CreateDigitalContent action={Actions.UPDATE} />}
                />
                <Route
                  path=":digitalContentId/clone"
                  element={<CreateDigitalContent action={Actions.CLONE} />}
                />
                <Route
                  path=":digitalContentId/checkout"
                  element={<CheckoutDigitalContent />}
                />
                <Route
                  path=":digitalContentId/checkin"
                  element={<CheckinDigitalContent />}
                />
              </Route>
              <Route path="licenses">
                <Route index element={<AllLicenses />} />
                <Route path=":licenseId" element={<DetailedLicense />} />
                <Route path=":licenseId/graph" element={<LicenseGraph />} />
                <Route
                  path="create"
                  element={<CreateLicense action={Actions.CREATE} />}
                />
                <Route
                  path=":licenseId/edit"
                  element={<CreateLicense action={Actions.UPDATE} />}
                />
                <Route
                  path=":licenseId/clone"
                  element={<CreateLicense action={Actions.CLONE} />}
                />
                <Route
                  path=":licenseId/checkout"
                  element={<CheckoutLicense />}
                />

                <Route path=":licenseId/dependencies">
                  <Route
                    path="create"
                    element={
                      <CreateLicenseDependency action={Actions.CREATE} />
                    }
                  />
                  <Route
                    path=":dependencyId/edit"
                    element={
                      <CreateLicenseDependency action={Actions.UPDATE} />
                    }
                  />
                </Route>

                <Route path=":licenseId/updates">
                  <Route
                    path="create"
                    element={<CreateLicenseUpdate action={Actions.CREATE} />}
                  />
                  <Route
                    path=":updateId/edit"
                    element={<CreateLicenseUpdate action={Actions.UPDATE} />}
                  />
                </Route>

                <Route path=":licenseId/usage">
                  <Route
                    path="create"
                    element={<CreateLicenseUsage action={Actions.CREATE} />}
                  />
                  <Route
                    path=":updateId/edit"
                    element={<CreateLicenseUsage action={Actions.UPDATE} />}
                  />
                </Route>

                <Route path=":licenseId/checkin" element={<CheckinLicense />} />
              </Route>

              <Route path="services">
                <Route index element={<AllServices />} />
                <Route path=":serviceId" element={<DetailedService />} />
                <Route path=":serviceId/graph" element={<ServiceGraph />} />
                <Route
                  path="create"
                  element={<CreateService action={Actions.CREATE} />}
                />
                <Route
                  path=":serviceId/edit"
                  element={<CreateService action={Actions.UPDATE} />}
                />
                <Route
                  path=":serviceId/clone"
                  element={<CreateService action={Actions.CLONE} />}
                />
                <Route
                  path=":serviceId/checkout"
                  element={<CheckoutService />}
                />
                <Route path=":serviceId/prices">
                  <Route path="create" element={<CreateServicePrice />} />
                  <Route
                    path=":servicePriceId/edit"
                    element={<CreateServicePrice action={Actions.UPDATE} />}
                  />
                  <Route
                    path=":servicePriceId/clone"
                    element={<CreateServicePrice action={Actions.CLONE} />}
                  />
                </Route>

                <Route path=":serviceId/dependencies">
                  <Route
                    path="create"
                    element={
                      <CreateServiceDependency action={Actions.CREATE} />
                    }
                  />
                  <Route
                    path=":dependencyId/edit"
                    element={
                      <CreateServiceDependency action={Actions.UPDATE} />
                    }
                  />
                </Route>

                <Route path=":serviceId/updates">
                  <Route
                    path="create"
                    element={<CreateServiceUpdate action={Actions.CREATE} />}
                  />
                  <Route
                    path=":updateId/edit"
                    element={<CreateServiceUpdate action={Actions.UPDATE} />}
                  />
                </Route>

                <Route path=":serviceId/usage">
                  <Route
                    path="create"
                    element={<CreateServiceUsage action={Actions.CREATE} />}
                  />
                  <Route
                    path=":updateId/edit"
                    element={<CreateServiceUsage action={Actions.UPDATE} />}
                  />
                </Route>

                <Route path=":serviceId/checkin" element={<CheckinService />} />
              </Route>

              <Route path="request-services">
                <Route index element={<AllRequestServices />} />
                <Route
                  path=":requestServiceId/accept"
                  element={<AcceptRequestService />}
                />
              </Route>

              <Route path="users">
                <Route index element={<AllUsers />} />
                <Route path=":userId" element={<DetailedUser />} />
                <Route
                  path="create"
                  element={<CreateUser action={Actions.CREATE} />}
                />
                <Route
                  path=":userId/edit"
                  element={<CreateUser action={Actions.UPDATE} />}
                />
                <Route
                  path=":userId/clone"
                  element={<CreateUser action={Actions.CLONE} />}
                />
              </Route>
              <Route path="import">
                <Route path="asset" element={<ImportAssets />} />
                <Route path="user" element={<ImportUsers />} />
              </Route>
              <Route path="inventory">
                <Route index element={<AllInventories />} />
                <Route
                  path="create"
                  element={<CreateInventory action={Actions.CREATE} />}
                />
                <Route path=":inventoryId" element={<DetailedInventory />} />
                <Route
                  path=":inventoryId/edit"
                  element={<CreateInventory action={Actions.UPDATE} />}
                />
              </Route>
              <Route path="statuses">
                <Route index element={<AllStatuses />} />
                <Route
                  path="create"
                  element={<CreateStatus action={Actions.CREATE} />}
                />
                <Route path=":statusId" element={<DetailedStatus />} />
                <Route
                  path=":statusId/edit"
                  element={<CreateStatus action={Actions.UPDATE} />}
                />
                <Route
                  path=":statusId/clone"
                  element={<CreateStatus action={Actions.CLONE} />}
                />
              </Route>
              <Route path="models">
                <Route index element={<AllAssetModels />} />
                <Route
                  path="create"
                  element={<CreateAssetModel action={Actions.CREATE} />}
                />
                <Route path=":modelId" element={<DetailedAssetModel />} />
                <Route
                  path=":modelId/edit"
                  element={<CreateAssetModel action={Actions.UPDATE} />}
                />
                <Route
                  path=":modelId/clone"
                  element={<CreateAssetModel action={Actions.CLONE} />}
                />
              </Route>
              <Route path="categories">
                <Route index element={<AllCategories />} />
                <Route
                  path="create"
                  element={<CreateCategory action={Actions.CREATE} />}
                />
                <Route path=":categoryId" element={<DetailedCategory />} />
                <Route
                  path=":categoryId/edit"
                  element={<CreateCategory action={Actions.UPDATE} />}
                />
                <Route
                  path=":categoryId/clone"
                  element={<CreateCategory action={Actions.CLONE} />}
                />
              </Route>

              <Route path="serviceTypes">
                <Route index element={<AllServiceTypes />} />
                <Route
                  path="create"
                  element={<CreateServiceType action={Actions.CREATE} />}
                />
                <Route
                  path=":serviceTypeId"
                  element={<DetailedServiceType />}
                />
                <Route
                  path=":serviceTypeId/edit"
                  element={<CreateServiceType action={Actions.UPDATE} />}
                />
                <Route
                  path=":serviceTypeId/clone"
                  element={<CreateServiceType action={Actions.CLONE} />}
                />
              </Route>

              <Route path="relationships">
                <Route index element={<AllRelationships />} />
                <Route
                  path="create"
                  element={<CreateRelationship action={Actions.CREATE} />}
                />
                <Route
                  path=":relationshipId/edit"
                  element={<CreateRelationship action={Actions.UPDATE} />}
                />
                <Route
                  path=":relationshipId/clone"
                  element={<CreateRelationship action={Actions.CLONE} />}
                />
              </Route>

              <Route path="manufacturers">
                <Route index element={<AllManufacturers />} />
                <Route
                  path="create"
                  element={<CreateManufacturer action={Actions.CREATE} />}
                />
                <Route
                  path=":manufacturerId"
                  element={<DetailedManufacturer />}
                />
                <Route
                  path=":manufacturerId/edit"
                  element={<CreateManufacturer action={Actions.UPDATE} />}
                />
                <Route
                  path=":manufacturerId/clone"
                  element={<CreateManufacturer action={Actions.CLONE} />}
                />
              </Route>
              <Route path="suppliers">
                <Route index element={<AllSuppliers />} />
                <Route
                  path="create"
                  element={<CreateSupplier action={Actions.CREATE} />}
                />
                <Route path=":supplierId" element={<DetailedSupplier />} />
                <Route
                  path=":supplierId/edit"
                  element={<CreateSupplier action={Actions.UPDATE} />}
                />
                <Route
                  path=":supplierId/clone"
                  element={<CreateSupplier action={Actions.CLONE} />}
                />
              </Route>
              <Route path="departments">
                <Route index element={<AllDepartments />} />
                <Route
                  path="create"
                  element={<CreateDepartment action={Actions.CREATE} />}
                />
                <Route path=":departmentId" element={<DetailedDepartment />} />
                <Route
                  path=":departmentId/edit"
                  element={<CreateDepartment action={Actions.UPDATE} />}
                />
                <Route
                  path=":departmentId/clone"
                  element={<CreateDepartment action={Actions.CLONE} />}
                />
              </Route>
              <Route path="locations">
                <Route index element={<AllLocations />} />
                <Route path=":locationId" element={<DetailedLocation />} />
                <Route
                  path="create"
                  element={<CreateLocation action={Actions.CREATE} />}
                />
                <Route
                  path=":locationId/edit"
                  element={<CreateLocation action={Actions.UPDATE} />}
                />
                <Route
                  path=":locationId/clone"
                  element={<CreateLocation action={Actions.CLONE} />}
                />
              </Route>
              <Route path="deprecations">
                <Route index element={<AllDeprecations />} />
                <Route
                  path="create"
                  element={<CreateDeprecation action={Actions.CREATE} />}
                />
                <Route
                  path=":deprecationId/edit"
                  element={<CreateDeprecation action={Actions.UPDATE} />}
                />
              </Route>
              <Route path="account">
                <Route path="profile" element={<Profile />} />
                <Route path="password" element={<ChangePassword />} />
              </Route>
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
