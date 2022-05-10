export interface Project {
  id: string;
  name: string;
  customer: string;
  createDate: string;
}

export interface Indexable {
  [key: string]: any;
}
