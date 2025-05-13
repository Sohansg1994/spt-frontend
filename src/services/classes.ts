import { QueryFunction } from "@tanstack/react-query";
import { createAxiosInstance } from "./axiosInstance";
import { ApiResponse } from "../types/common";
import { Class, ClassSummary } from "../types/class";
import { Option } from "../types/common";
const baseURL = import.meta.env.VITE_BASE_URL;
const axiosInstance = createAxiosInstance(baseURL);

type GetAllClassResponse = ApiResponse<Class[]>;
type GetAllClassSummaryResponse = ApiResponse<ClassSummary[]>;
export const getAllClasss: QueryFunction<Class[]> = async (): Promise<
  Class[]
> => {
  try {
    const response = await axiosInstance.get<GetAllClassResponse>(`/classes`);

    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Network error. Please check your connection.");
    }
  }
};

export const getClassesSummary: QueryFunction<
  ClassSummary[]
> = async (): Promise<ClassSummary[]> => {
  try {
    const response = await axiosInstance.get<GetAllClassSummaryResponse>(
      `/classes/summary`
    );

    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Network error. Please check your connection.");
    }
  }
};
export const getClassList: QueryFunction<Option[]> = async (): Promise<
  Option[]
> => {
  try {
    const response = await axiosInstance.get<GetAllClassResponse>(`/classes`);

    return response.data.data.map((cl) => ({
      name: cl.name,
      id: cl.id.toString(),
    }));
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Network error. Please check your connection.");
    }
  }
};
type CreateStudentRequest = {
  name: string;
  email: string;
  password: string;
  gradeLevel: string;
};

type CreateStudentResponse = ApiResponse<{
  registrationNumber: string;
  userId: number;
}>;

export const createStudent = async (
  data: CreateStudentRequest
): Promise<{ registrationNumber: string; userId: number }> => {
  try {
    const response = await axiosInstance.post<CreateStudentResponse>(
      `/students`,
      data
    );

    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Network error. Please check your connection.");
    }
  }
};
type CreateClassRequest = {
  name: string;
  teacherId: number;
  subjectId: number;
  batchYear: number;
  type: string;
};

type CreateClassResponse = ApiResponse<{
  id: number;
  name: string;
  teacherId: number;
  subjectId: number;
  instituteId: number;
  batchYear: number;
  type: string;
}>;

export const createClass = async (
  data: CreateClassRequest
): Promise<{
  id: number;
  name: string;
  teacherId: number;
  subjectId: number;
  instituteId: number;
  batchYear: number;
  type: string;
}> => {
  try {
    const response = await axiosInstance.post<CreateClassResponse>(`/classes`, {
      name: data.name,
      teacherId: data.teacherId,
      subjectId: data.subjectId,
      batchYear: data.batchYear,
      type: data.type,
      instituteId: 1,
    });

    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Network error. Please check your connection.");
    }
  }
};
