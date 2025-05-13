import { QueryFunction } from "@tanstack/react-query";
import { createAxiosInstance } from "./axiosInstance";
import { ApiResponse, Option } from "../types/common";
import { Subject } from "../types/subject";
const baseURL = import.meta.env.VITE_BASE_URL;
const axiosInstance = createAxiosInstance(baseURL);

type GetAllSubjectResponse = ApiResponse<Subject[]>;

export const getAllSubjects: QueryFunction<Subject[]> = async (): Promise<
  Subject[]
> => {
  try {
    const response = await axiosInstance.get<GetAllSubjectResponse>(
      `/subjects`
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
export const getSubjectList: QueryFunction<Option[]> = async (): Promise<
  Option[]
> => {
  try {
    const response = await axiosInstance.get<GetAllSubjectResponse>(
      `/subjects`
    );

    return response.data.data.map((subject) => ({
      name: subject.name,
      id: subject.id.toString(),
    }));
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Network error. Please check your connection.");
    }
  }
};
type CreateSubjectRequest = {
  name: string;
};

type CreateSubjectResponse = ApiResponse<{
  registrationNumber: string;
  userId: number;
}>;

export const createSubject = async (
  data: CreateSubjectRequest
): Promise<{ registrationNumber: string; userId: number }> => {
  try {
    const response = await axiosInstance.post<CreateSubjectResponse>(
      `/subjects`,
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
