export interface AssetModel {
  id: number;
  name: string;
  image: string;
  cpe: string;
  category: string;
  manufacturer: string;
  numOfAssets: number;
}

export interface AssetModelQuery {
  categoryId?: number;
  manufacturerId?: number;
}

export interface NewAssetModel {
  name: string;
  categoryId: number;
  manufacturerId: number;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  assetModels: number;
  licenses: number;
}

export interface NewCategory {
  name: string;
}

export interface Department {
  id: number;
  name: string;
  assets: number;
  users: number;
  location: string;
}

export interface DepartmentQuery {
  locationId?: number;
}

export interface NewDepartment {
  name: string;
  locationId: number;
}

export interface Manufacturer {
  id: number;
  name: string;
  image: string;
  assetModels: number;
  licenses: number;
}

export interface NewManufacturer {
  name: string;
}

export interface Status {
  id: number;
  name: string;
  color: string;
  numOfAssets: number;
  numOfLicenses: number;
  numOfServices: number;
}

export interface NewStatus {
  name: string;
  color: string;
}

export interface Supplier {
  id: number;
  name: string;
  assets: number;
  licenses: number;
}

export interface NewSupplier {
  name: string;
}

export interface ServiceType {
  id: number;
  name: string;
  services: number;
}

export interface NewServiceType {
  name: string;
}


export interface Relationship {
  id: number;
  name: string;
  relationshipLicenseEntries: number;
  relationshipServiceEntries: number;
}

export interface NewRelationship {
  name: string;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  numOfDepartments: number;
}

export interface NewLocation {
  name: string;
  address: string;
}

export interface Deprecation {
  id: number;
  name: string;
  months: number;
  category: string;
}

export interface NewDeprecation {
  name: string;
  months: number;
  categoryId: number;
}

export interface Notification {
  itemId: string;
  name: string;
  type: string;
  expiration_date: string;
}

export enum NotificationType {
  ASSET = 'Asset',
  LICENSE = 'License',
  SERVICE = 'Service',
}

export enum CheckType {
  CHECKIN = 'checkin',
  CHECKOUT = 'checkout',
}

export interface Asset {
  id: number;
  name: string;
  image: string;
  assetModel: string;
  department: string;
  purchase_date: string;
  purchase_cost: number;
  current_cost: number;
  supplier: string;
  status: string;
  statusColor: string;
  username: string;
  check_type: CheckType;
  deletedAt: string;
}

export interface NewAsset {
  name: string;
  purchase_cost: number;
  purchase_date: string;
  assetModelId: number;
  departmentId: number;
  statusId: number;
  supplierId: number;
}

export interface CheckoutAsset {
  assetId: number;
  statusId: number;
  userId: number;
  checkout_date: string;
  checkout_note: string;
}

export interface CheckinAsset {
  assetId: number;
  statusId: number;
  departmentId: number;
  checkin_date: string;
  checkin_note: string;
}

export interface AssetQuery {
  assetModelId?: number;
  departmentId?: number;
  statusId?: number;
  supplierId?: number;
  userId?: number;
}

export interface AssetHistory {
  id: number;
  assetId: number;
  assetName: string;
  userId: number;
  userName: string;
  checkout_date: string;
  checkin_date: string;
}

export interface AssetHistoryQuery {
  assetId?: number;
  userId?: number;
}

export interface AssetMaintenance {
  id: number;
  asset_id: string;
  asset_name: string;
  supplier: string;
  start_date: string;
  end_date: string;
  cost: number;
  note: string;
}

export interface AssetMaintenanceQuery {
  assetId?: number;
}

export interface NewAssetMaintenance {
  assetId: number;
  supplierId: number;
  start_date: string;
  end_date: string;
  cost: number;
  note: string;
}

export interface SourceCode {
  id: number;
  name: string;
  owner: string;
  description: string;
  isPrivate: string;
  url: string;
}

export interface NewSourceCode {
  name: string;
  owner: string;
  description: string;
  isPrivate: boolean;
  url: string;
}

export interface CheckoutSourceCode {
  sourceCodeId: number;
  userId: number;
  start_date: string;
  start_note: string;
}

export interface CheckinSourceCode {
  sourceCodeToUserId: number;
  end_date: string;
  end_note: string;
}

export interface SourceCodeToUser {
  id: number;
  sourceCodeId: number;
  sourceCodeName: string;
  userId: number;
  userName: string;
  start_date: string;
  end_date: string;
}

export interface SourceCodeToUserQuery {
  sourceCodeId?: number;
  userId?: number;
  withDeleted?: boolean;
}

export interface DigitalContent {
  id: number;
  name: string;
  owner: string;
  description: string;
  isPrivate: string;
  url: string;
}

export interface NewDigitalContent {
  name: string;
  owner: string;
  description: string;
  isPrivate: boolean;
  url: string;
}

export interface CheckoutDigitalContent {
  digitalContentId: number;
  sourceCodeId: number;
  checkout_date: string;
  checkout_note: string;
}

export interface CheckinDigitalContent {
  digitalContentToSourceCodeId: number;
  checkin_date: string;
  checkin_note: string;
}

export interface DigitalContentToSourceCode {
  id: number;
  digitalContentId: number;
  digitalContentName: string;
  sourceCodeId: number;
  sourceCodeName: string;
  checkout_date: string;
  checkin_date: string;
}

export interface DigitalContentToSourceCodeQuery {
  digitalContentId?: number;
  sourceCodeId?: number;
  withDeleted?: boolean;
}

export interface License {
  id: number;
  name: string;
  key: string;
  license_link: string;
  version: string;
  description: string;
  purchase_cost: string;
  current_cost: string;
  purchase_date: string;
  expiration_date: string;
  seats: string;
  available: string;
  status: string;
  statusColor: string;
  category: string;
  manufacturer: string;
  supplier: string;
}

export interface LicenseQuery {
  statusId?: number;
  categoryId?: number;
  manufacturerId?: number;
  supplierId?: number;
}

export interface CheckoutLicense {
  licenseId: number;
  assetId: number;
  checkout_date: string;
  checkout_note: string;
}

export interface CheckinLicense {
  licenseToAssetId: number;
  checkin_date: string;
  checkin_note: string;
}

export interface LicenseToAsset {
  id: number;
  licenseId: number;
  licenseName: string;
  assetId: number;
  assetName: string;
  checkout_date: string;
  checkin_date: string;
}

export interface LicenseToAssetQuery {
  licenseId?: number;
  assetId?: number;
  withDeleted?: boolean;
}

export interface NewLicense {
  name: string;
  key: string;
  license_link: string;
  description: string;
  purchase_cost: string;
  purchase_date: string;
  expiration_date: string;
  seats: number;
  statusId: number;
  categoryId: number;
  manufacturerId: number;
  supplierId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  birthday: string;
  department: string;
  assets: number;
}

export interface UserQuery {
  departmentId?: number;
}

export interface NewUser {
  name: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  birthday: string;
  departmentId: number;
}

export interface Inventory {
  id: number;
  name: string;
  start_date: string; 
  end_date: string;
  department: string;
  assets: number;
  remaining: number;
  licenses: number;
  remainingl: number;
  services: number;
  remainings: number;
  note: string;
  done: string;
}

export interface NewInventory {
  name: string;
  start_date: string;
  end_date: string;
  departmentId: number;
  note: string;
  done?: boolean;
}

export interface AssetToInventory {
  id: number;
  asset_name: string;
  asset_id: number;
  purchase_date: string;
  purchase_cost: string;
  old_cost: number;
  old_status: string;
  estimated_cost: number;
  new_cost: number;
  new_status: string;
  check: string;
}

export interface UpdateAssetToInventory {
  assetId: number;
  new_cost: number;
  newStatusId: number;
  check: boolean;
}

export interface LicenseToInventory {
  id: number;
  license_name: string;
  license_id: number;
  purchase_date: string;
  purchase_cost: string;
  expiration_date: string;
  old_cost: number;
  old_status: string;
  estimated_cost: number;
  new_cost: number;
  new_status: string;
  check: string;
}

export interface UpdateLicenseToInventory {
  licenseId: number;
  new_cost: number;
  newStatusId: number;
  check: boolean;
}

export interface ServiceToInventory {
  id: number;
  service_name: string;
  service_id: number;
  total_unit: number;
  estimated_cost: number;
  unit: string;
  old_cost: number;
  old_status: string;
  new_cost: number;
  new_status: string;
  check: string;
}

export interface UpdateServiceToInventory {
  serviceId: number;
  new_cost: number;
  newStatusId: number;
  check: boolean;
}

export enum Actions {
  CREATE,
  UPDATE,
  CLONE,
}

export interface RequestAsset {
  id: number;
  name: string;
  username: string;
  category: string;
  categoryId: number;
  date: string;
  note: string;
  status: string;
}

export interface AcceptRequest {
  id: number;
  assetId: number;
}

export enum RequestAssetStatus {
  REQUESTED = 'Requested',
  REJECTED = 'Rejected',
  ACCEPTED = 'Accepted',
}

export interface MenuItem {
  name: string;
  destination: string;
}



export interface Service {
  id: number;
  name: string;
  version: string;
  current_cost: string;
  used: number;
  unit: string;
  description: string;
  status: string;
  statusColor: string;
  service_type: string;
  category: string;
  manufacturer: string;
  supplier: string;
}

export interface ServiceQuery {
  statusId?: number;
  serviceTypeId?: number;
  categoryId?: number;
  manufacturerId?: number;
  supplierId?: number;
}

export interface CheckoutService {
  serviceId: number;
  userId: number;
  checkout_date: string;
  checkout_note: string;
}

export interface CheckinService {
  serviceToUserId: number;
  checkin_date: string;
  checkin_note: string;
}

export interface ServiceToUser {
  id: number;
  serviceId: number;
  serviceName: string;
  userId: number;
  userName: string;
  checkout_date: string;
  checkin_date: string;
}

export interface ServiceToUserQuery {
  serviceId?: number;
  userId?: number;
  withDeleted?: boolean;
}

export interface NewService {
  name: string;
  description: string;
  unit: string;
  statusId: number;
  serviceTypeId: number;
  categoryId: number;
  manufacturerId: number;
  supplierId: number;
}


export interface ServicePriceDto {
  servicePriceId?: number;
  serviceId?: number;
  purchase_cost?: number;
  purchase_date?: string;    
  expiration_date?: string;  
  pricing_model?: string;
  unit?: string;
  unit_price?: number;
  description?: string;
  withDeleted?: boolean;
}

export interface ServicePrice {
  id: number;
  service: Service;
  purchase_cost: number;
  purchase_date: string;
  expiration_date: string;
  pricing_model: string;
  unit: string;
  unit_price: number;
  description: string;
  deletedAt?: string | null;
}

export interface ServiceDependency {
  id: number;
  serviceId: number;
  serviceName: string;
  dependencyId: number;
  dependencyName: string;
  relationshipId: number;
  relationshipName: string;
  note: string | null;
  deletedAt: string | null;
}

export interface NewServiceDependency {
  serviceId: number;
  dependencyId: number;
  relationshipId: number;
  note?: string;
}

export interface ServiceUpdate {
  id: number;
  serviceId: number;
  version: string;
  release_date: string; 
  note: string | null;
  deletedAt: string | null;
}

export interface NewServiceUpdate {
  serviceId: number;
  version: string;
  release_date: string; 
  note: string | null;
}



export interface LicenseDependency {
  id: number;
  licenseId: number;
  licenseName: string;
  dependencyId: number;
  dependencyName: string;
  relationshipId: number;
  relationshipName: string;
  note: string | null;
  deletedAt: string | null;
}

export interface NewLicenseDependency {
  licenseId: number;
  dependencyId: number;
  relationshipId: number;
  note?: string;
}

export interface LicenseUpdate {
  id: number;
  licenseId: number;
  version: string;
  release_date: string; 
  note: string | null;
  deletedAt: string | null;
}

export interface NewLicenseUpdate {
  licenseId: number;
  version: string;
  release_date: string; 
  note: string | null;
}

export interface SoftwareUsage {
  id: number;
  licenseId: number;
  assetId: number;
  usage_metric: string;
  usage_value: string;
  cost: number;
  record_at: string;
}

export interface NewSoftwareUsage {
  licenseId: number;
  assetId: number;
  usage_metric: string;
  usage_value: string;
  cost: number;
  record_at: string;
}

export interface ServiceUsage {
  id: number;
  serviceId: number;
  user: User;
  usage_metric: string;
  usage_value: string;
  cost: number;
  record_at: string;
}

export interface NewServiceUsage {
  serviceId: number;
  userId: number;
  usage_metric: string;
  usage_value: string;
  cost: number;
  record_at: string;
}

export interface LicenseUsage {
  id: number;
  licenseId: number;
  asset: Asset;
  usage_metric: string;
  usage_value: string;
  cost: number;
  record_at: string;
}

export interface NewLicenseUsage {
  licenseId: number;
  assetId: number;
  usage_metric: string;
  usage_value: string;
  cost: number;
  record_at: string;
}

export interface RequestService {
  id: number;
  name: string;
  username: string;
  category: string;
  categoryId: number;
  date: string;
  note: string;
  status: string;
}

export interface AcceptRequestService {
  id: number;
  serviceId: number;
}

export enum RequestServiceStatus {
  REQUESTED = 'Requested',
  REJECTED = 'Rejected',
  ACCEPTED = 'Accepted',
}