import { QueryFunction } from "@tanstack/react-query";
import { Assignment } from "../types/assignment";
import { ApiResponse } from "../types/common";
import { createAxiosInstance } from "./axiosInstance";
const baseURL = import.meta.env.VITE_BASE_URL;
const axiosInstance = createAxiosInstance(baseURL);

type GetAllAssignmentsResponse = ApiResponse<Assignment[]>;
export const getAllAssignments: QueryFunction<Assignment[]> = async ({
  queryKey,
}): Promise<Assignment[]> => {
  const [, selectedClassId] = queryKey as [string, string];

  try {
    const response = await axiosInstance.get<GetAllAssignmentsResponse>(
      `/assignments/class/${selectedClassId}`
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

type CreateAssignmentRequest = {
  name: string;
  classId: string;
  date: string;
};

type CreateAssignmentResponse = ApiResponse<Assignment>;

export const createAssignment = async (
  data: CreateAssignmentRequest
): Promise<Assignment> => {
  try {
    const response = await axiosInstance.post<CreateAssignmentResponse>(
      `/assignments`,
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
