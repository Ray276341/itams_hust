export interface AssetModel {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface Status {
  id: number;
  name: string;
}

export interface Supplier {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Asset {
  id: number;
  name: string;
  image: string;
  assetModel: string;
  department: string;
  supplier: string;
  status: string;
  statusColor: string;
}

export interface RequestAsset {
  id: number;
  category: string;
  date: string;
  status: string;
  note: string;
}

export enum RequestAssetStatus {
  REQUESTED = 'Requested',
  REJECTED = 'Rejected',
  ACCEPTED = 'Accepted',
}

export interface NewRequestAsset {
  categoryId: number;
  note: string;
}

export enum Actions {
  CREATE,
  UPDATE,
  CLONE,
}

export interface Service {
  id: number;
  name: string;
  service_type: string
  supplier: string;
  status: string;
  statusColor: string;
}

export interface NewRequestService {
  categoryId: number;
  note: string;
}

export interface RequestService {
  id: number;
  category: string;
  date: string;
  status: string;
  note: string;
}

export enum RequestServiceStatus {
  REQUESTED = 'Requested',
  REJECTED = 'Rejected',
  ACCEPTED = 'Accepted',
}