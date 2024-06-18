import { Question } from "./question.model";

export interface Test {
    id: number;
    dateCreation: Date;
    type: string;
    questions: Question[];
  }
  
