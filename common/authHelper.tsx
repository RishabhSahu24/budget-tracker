export const redirectAsPerContext = (isSignedIn: any = {}) => {
  if (isSignedIn) {
    return "/dashboard";
  }
  return "/";
};

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

export const fetchProjectDetails = async (projectId: string) => {
  try {
    console.log("projectId", projectId);
    const response = await fetch(
      `/api/project_details?id=${encodeURIComponent(projectId)}`
    );
    const data = await response.json();
    console.log("Project Detdsadsaails:", data);
    return data;
  } catch (error) {
    console.error("Error fetching project details:", error);
    throw error;
  }
};
