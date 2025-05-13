import { ApiResponse } from "../types/common";
import { createAxiosInstance } from "./axiosInstance";

const baseURL = import.meta.env.VITE_BASE_URL;
const axiosInstance = createAxiosInstance(baseURL);

type EnrollStudentsRequest = {
  classId: number;
  studentIds: number[];
};
type EnrollStudentsResponseData = {
  enrolledStudentIds: number[];
  skippedStudentIds: number[];
  classId: number;
};
type EnrollStudentsResponse = ApiResponse<EnrollStudentsResponseData>;
export const enorollStudents = async (
  data: EnrollStudentsRequest
): Promise<EnrollStudentsResponseData> => {
  try {
    const response = await axiosInstance.post<EnrollStudentsResponse>(
      `/enrollments/multiple`,
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
