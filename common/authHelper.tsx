export const redirectAsPerContext = (isSignedIn: any = {}) => {
  if (isSignedIn) {
    return "/dashboard";
  }
  return "/";
};

// authHelper.tsx

export const fetchUserData = async (
  email: string,
  name: string,
  full_name: string
) => {
  try {
    const response = await fetch(
      `/api/users?email=${encodeURIComponent(email)}&name=${encodeURIComponent(
        name
      )}&full_name=${encodeURIComponent(full_name)}`
    );
    const data = await response.json();
    console.log("User Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const fetchProjects = async (email: string) => {
  try {
    const response = await fetch(
      `/api/projects?email=${encodeURIComponent(email)}`
    );
    const data = await response.json();
    console.log("Projects Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching projects data:", error);
    throw error;
  }
};
