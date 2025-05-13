import Cookies from "js-cookie";
export type SignUpData = {
  name: string;
  email: string;
  password: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
};
export type SignInData = {
  email: string;
  password: string;
};
export async function signUpUser(data: SignUpData): Promise<any> {
  const response = await fetch("http://localhost:3000/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to sign up");
  }

  return response.json();
}

export async function signInUser(data: SignInData): Promise<any> {
  const response = await fetch("http://localhost:3000/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to sign in");
  }

  const responseData = await response.json();

  // Store the token in cookies
  Cookies.set("access_token", responseData.token, {
    secure: true,
    sameSite: "strict",
  });

  return responseData;
}

export async function fetchCurrentUser() {
  const token = Cookies.get("access_token");

  if (!token) throw new Error("No access token found");

  const response = await fetch("http://localhost:3000/api/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch current user");
  }

  return response.json();
}
