// Define the type for a single Project
declare interface IProject {
    
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    createdDate: string;
    updatedDate: string | null;
  }