export type DoctorDocument = {
  name: string;
  specialization: string;
  clinicAddress: string;
  experience: string;
  about: string;
  profileImage?: string;
  phone: string;
  whatsapp: string;
  email: string;
};

export const doctorModelFields = {
  name: "String",
  specialization: "String",
  clinicAddress: "String",
  experience: "String",
  about: "String",
  profileImage: "String",
  phone: "String",
  whatsapp: "String",
  email: "String"
} as const;
