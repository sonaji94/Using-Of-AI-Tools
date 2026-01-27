export type Department = 'CSE' | 'ISE' | 'ECE' | 'MECH';
export type ResourceType = 'Textbook' | 'Notes' | 'PYQ';

export interface Resource {
  id: string;
  title: string;
  author: string;
  department: Department;
  type: ResourceType;
  description: string;
  fileUrl: string;
}
