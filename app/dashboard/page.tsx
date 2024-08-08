"use client";
import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const Page = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const { firstName, fullName, emailAddresses } = user;
      const email = emailAddresses[0].emailAddress;
      const name = firstName || "";
      const full_name = fullName || "";

      const fetchData = async () => {
        try {
          const response = await fetch(
            `/api/users?email=${encodeURIComponent(
              email
            )}&name=${encodeURIComponent(name)}&full_name=${encodeURIComponent(
              full_name
            )}`
          );
          const data = await response.json();
          console.log("data", data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [user]);

  return (
    <div className="p-6 text-red-600">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. At laboriosam
      harum odio iusto, eligendi repellendus esse obcaecati sapiente doloremque
      sit ad ut. Unde nobis fuga alias placeat doloremque, modi quia!
    </div>
  );
};

export default Page;
