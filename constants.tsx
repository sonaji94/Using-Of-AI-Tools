
import { Resource, ResourceType, Department } from './types';

export const MOCK_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Data Structures and Algorithms',
    author: 'Dr. S.B. Patil',
    department: Department.CSE,
    type: ResourceType.TEXTBOOK,
    description: 'A comprehensive guide to fundamental data structures and their implementations in C++ and Java.',
    thumbnail: 'https://picsum.photos/seed/dsa/400/600',
    downloadUrl: '#',
    year: 2023,
    pages: 450
  },
  {
    id: '2',
    title: 'Digital Electronics Lecture Notes',
    author: 'Prof. Anitha Reddy',
    department: Department.EEE,
    type: ResourceType.NOTES,
    description: 'Handwritten notes covering Boolean algebra, K-maps, and sequential circuit design.',
    thumbnail: 'https://picsum.photos/seed/elec/400/600',
    downloadUrl: '#',
    year: 2024
  },
  {
    id: '3',
    title: 'Principles of Management',
    author: 'V.S.P. Rao',
    department: Department.MBA,
    type: ResourceType.TEXTBOOK,
    description: 'Essential textbook for first-year MBA students covering organizational behavior and leadership.',
    thumbnail: 'https://picsum.photos/seed/mgmt/400/600',
    downloadUrl: '#',
    pages: 320
  },
  {
    id: '4',
    title: 'Database Management Systems',
    author: 'Raghu Ramakrishnan',
    department: Department.BCA,
    type: ResourceType.TEXTBOOK,
    description: 'Advanced concepts of SQL, normalization, and transaction management.',
    thumbnail: 'https://picsum.photos/seed/dbms/400/600',
    downloadUrl: '#',
    year: 2022,
    pages: 580
  },
  {
    id: '5',
    title: 'Fluid Mechanics - PYQ (2018-2023)',
    author: 'Exam Cell',
    department: Department.CIVIL,
    type: ResourceType.QUESTION_PAPER,
    description: 'Collection of previous year university question papers for Fluid Mechanics.',
    thumbnail: 'https://picsum.photos/seed/fluid/400/600',
    downloadUrl: '#',
    year: 2023
  },
  {
    id: '6',
    title: 'Python for Data Science',
    author: 'Department of CSE',
    department: Department.CSE,
    type: ResourceType.NOTES,
    description: 'Lab manuals and quick reference notes for Python programming for Data Science.',
    thumbnail: 'https://picsum.photos/seed/python/400/600',
    downloadUrl: '#',
    year: 2024
  }
];

export const DEPARTMENTS = Object.values(Department);
export const RESOURCE_TYPES = Object.values(ResourceType);
