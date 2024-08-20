"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { fetchProjects, fetchUserData } from "@/common/authHelper";
import PageLoader from "@/components/PageLoader";
import RoundedIcon from "@/components/RoundedIcon";
import Heading from "@/components/Heading";
import { FaCode } from "react-icons/fa6";
import CreateProject from "@/components/modals/CreateProject";
import SubTitle from "@/components/Subtitle";

const Page = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  useEffect(() => {
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
          console.log("userData", userData);
          if (userData?.user) {
            setUserInfo({
              name: userData?.user.name || "",
              email: userData?.user.email || "",
              fullName: userData?.user?.full_name || "",
              currentProject: userData?.current_project || null,
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
  }, [user]);

  return (
    <>
      <main className="flex-1 flex justify-center items-center p-6">
        {isLoading ? (
          <PageLoader />
        ) : (
          <>
            {!projectInfo?.count ? (
              <div className="items-center justify-center flex flex-col border border-secondary-200 rounded-md">
                <RoundedIcon>
                  <FaCode size={100} />
                </RoundedIcon>

                <Heading variant="primary" level={1} size="xl" className="mt-5">
                  Welcome to Your Project Tracker
                </Heading>

                <SubTitle size="lg" className="text-center mt-5 text-white">
                  Get started by creating your first project!
                </SubTitle>
                <CreateProject userInfo={userInfo} />
              </div>
            ) : (
              <div> </div>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Page;
