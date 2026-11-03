export type ReviewDocument = {
  patientName: string;
  rating: number;
  comment: string;
  result?: string;
  createdAt: Date;
  approved: boolean;
};

export const reviewModelFields = {
  patientName: "String",
  rating: "Number",
  comment: "String",
  result: "String",
  createdAt: "Date",
  approved: "Boolean"
} as const;
