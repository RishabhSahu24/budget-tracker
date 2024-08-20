"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  fetchProjectDetails,
  fetchProjects,
  fetchUserData,
} from "@/common/authHelper";
import PageLoader from "@/components/PageLoader";
import RoundedIcon from "@/components/RoundedIcon";
import Heading from "@/components/Heading";
import { FaCode } from "react-icons/fa6";
import CreateProject from "@/components/modals/CreateProject";
import SubTitle from "@/components/Subtitle";
import Filters from "@/components/filters/Filters";

const Page = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [projectLoading, setProjectLoading] = useState<boolean>(false);

  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    fullName: "",
    currentProject: null,
  });

  const [projectInfo, setProjectInfo] = useState({
    data: [],
    count: 0,
  });

  const fetch = () => {
    if (user) {
      setIsLoading(true);
      const { firstName, fullName, emailAddresses } = user;
      const email = emailAddresses[0].emailAddress;
      const name = firstName || "";
      const full_name = fullName || "";

      const getData = async () => {
        try {
          // Fetch user data
          const userData = await fetchUserData(email, name, full_name);

          if (userData?.user) {
            setUserInfo({
              name: userData?.user.name || "",
              email: userData?.user.email || "",
              fullName: userData?.user?.full_name || "",
              currentProject: userData?.user?.current_project,
            });

            // Fetch projects data
            const projectData = await fetchProjects(email);

            setProjectInfo({
              data: projectData?.data || [],
              count: projectData?.count || 0,
            });
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setIsLoading(false);
        }
      };

      getData();
    }
  };

  useEffect(() => {
    if (user) {
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      if (userInfo.currentProject) {
        setProjectLoading(true);
        try {
          const result = await fetchProjectDetails(userInfo.currentProject);
          setProjectDetails(result.data);
        } catch (error) {
          console.error("Error fetching project details:", error);
        } finally {
          setProjectLoading(false);
        }
      }
    };

    fetchProjectDetail();
  }, [userInfo.currentProject]);

  return (
    <>
      <main>
        {isLoading || projectLoading ? (
          <div className="p-6">
            <PageLoader />
          </div>
        ) : (
          <>
            {!projectInfo?.count ? (
              <main className="fixed inset-0 flex flex-col justify-center items-center">
                <div className="items-center justify-center flex flex-col border border-secondary-200 rounded-md ">
                  <RoundedIcon>
                    <FaCode size={100} />
                  </RoundedIcon>

                  <Heading
                    variant="primary"
                    level={1}
                    size="xl"
                    className="mt-5"
                  >
                    Welcome to Your Project Tracker
                  </Heading>

                  <SubTitle size="lg" className="text-center mt-5 text-white">
                    Get started by creating your first project!
                  </SubTitle>
                  <CreateProject userInfo={userInfo} reFetch={fetch} />
                </div>
              </main>
            ) : (
              <div className=" p-6">
                <Heading level={1} size="lg">
                  {projectDetails?.name ?? ""}
                  <Filters />
                </Heading>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Page;
