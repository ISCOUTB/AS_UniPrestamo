export enum ResourceStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  LOANED = 'LOANED',
}

export class Resource {
  id: number;
  name: string;
  type: string;
  location: string;
  status: ResourceStatus;
}
