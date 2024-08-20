import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Input, InputBox, InputLabel } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ModalProcessing from "./modal-status/ModalProcessing";
import ModalSuccess from "./modal-status/ModalSuccess";
import ModalFailed from "./modal-status/ModalFailed";

interface CreateProjectProps {
  userInfo: any;
  reFetch: any;
}

export default function CreateProject({
  userInfo,
  reFetch,
}: CreateProjectProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<string>("active");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    role: "owner",
    email: userInfo?.email || "",
    owner_name: userInfo?.name || "Unknown",
  });
  const [formError, setFormError] = useState<any>(null);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    setFormError(null);
    let error = false;

    Object.keys(formData).forEach((key) => {
      const typedKey = key as keyof typeof formData;
      if (formData[typedKey] === "") {
        setFormError((prev: any) => ({
          ...prev,
          [typedKey]: `${typedKey} is required`,
        }));
        error = true;
      }
    });

    if (error) return error;

    if (formData.name.length > 130) {
      console.log("formData.name.length", formData.name.length);
      setFormError((prev: any) => ({
        ...prev,
        name: "Project name is too long (max 130 characters)",
      }));
      error = true;
    }

    if (formData.description && formData.description.length > 255) {
      console.log("formData.name.length", formData.description.length);
      setFormError((prev: any) => ({
        ...prev,
        description: "Description is too long (max 255 characters)",
      }));
      error = true;
    }

    return error;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      if (validateForm()) return;

      setModalStatus("processing");

      // Create the project
      const projectResponse = await fetch("/api/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const projectData = await projectResponse.json();

      console.log("projectData", projectData);

      if (!projectResponse.ok) {
        if (projectResponse.status === 400) {
          setModalStatus("active");
          setFormError((prev: any) => ({
            ...prev,
            name: "A project with this name already exists for the given email.",
          }));
          return;
        }
        setModalStatus("failed");
      }

      // Update the user's current project
      const updateUserResponse = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo.email, // Use email to identify the user
          projectId: projectData.project._id,
        }),
      });

      const updateUserData = await updateUserResponse.json();

      if (!updateUserResponse.ok) {
        console.log("updateUserResponse", updateUserResponse);
        setModalStatus("failed");
        console.error(
          "Failed to update user's current project:",
          updateUserData?.error
        );
        return;
      }

      setModalStatus("success");
    } catch (error) {
      console.error("Error during project creation:", error);
      setModalStatus("failed");
    }
  };

  useEffect(() => {
    setModalStatus("active");
    setFormData({
      name: "",
      description: "",
      role: "owner",
      email: userInfo?.email || "",
      owner_name: userInfo?.name || "Unknown",
    });
    setFormError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button variant="default" className="p-6 mt-2 mb-2">
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent
        className={
          modalStatus === "processing" || modalStatus === "success"
            ? "rounded-md bg-white p-6 max-w-96"
            : "rounded-md bg-white p-6 max-w-lg"
        }
        primitiveClose={
          modalStatus === "processing" || modalStatus === "success"
        }
        preventCloseOnOutsideClick={
          modalStatus === "processing" || modalStatus === "success"
        }
      >
        {modalStatus === "processing" && (
          <ModalProcessing
            title={"Create a new project"}
            description={"This may take a while. Please do not exit the page."}
          />
        )}
        {modalStatus === "success" && (
          <ModalSuccess
            title={"You’ve successfully created a Project"}
            description={
              "Now you can add tasks. You can manage it from your dashboard."
            }
            onClick={reFetch}
          />
        )}
        {modalStatus === "failed" && (
          <ModalFailed
            title={"Project Creation Failed"}
            description={
              "An error occurred while creating the project. Please try again."
            }
          />
        )}
        {modalStatus === "active" && (
          <>
            <div className="flex flex-col max-h-[85vh] overflow-y-auto">
              <DialogTitle className=" leading-6 pb-2">
                Create Project
              </DialogTitle>
              <DialogDescription className="text-black-500 pb-2">
                Enter the details for your new project below.
              </DialogDescription>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="w-full">
                  <InputLabel htmlFor="name" label="Project Name" />
                  <Input className="mt-1">
                    <InputBox
                      name="name"
                      type="text"
                      className="py-3 placeholder:text-gray-500 focus:border-indigo-500 hover:border-indigo-500 "
                      id="name"
                      placeholder="Enter your project name"
                      onChange={handleInputChange}
                      value={formData?.name}
                      error={formError?.name}
                    />
                  </Input>
                </div>

                <div className="w-full relative">
                  <InputLabel
                    htmlFor="description"
                    label="Project Description"
                  />
                  <Textarea
                    className="mt-1 placeholder:text-gray-500 max-h-80 focus:border-indigo-500 hover:border-indigo-500"
                    id="description"
                    placeholder="Provide a brief description of the project"
                    name="description"
                    onChange={handleInputChange}
                    value={formData?.description}
                    error={formError?.description}
                  />
                </div>

                <div className="w-full mt-6 text-black">
                  <InputLabel htmlFor="role" label="Select the role" />
                  <RadioGroup
                    className="mt-2 grid grid-cols-2 gap-4"
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, role: value }))
                    }
                  >
                    <div className="flex items-center border border-primary-400 rounded-lg p-4 cursor-pointer">
                      <RadioGroupItem
                        value="owner"
                        id="owner"
                        className="text-black"
                      />
                      <Label htmlFor="owner" className="w-full text-center">
                        Owner
                      </Label>
                    </div>
                    <div className="flex items-center border border-primary-400 rounded-lg p-4 cursor-pointer">
                      <RadioGroupItem
                        value="member"
                        id="member"
                        className="text-black"
                      />
                      <Label htmlFor="member" className="w-full text-center">
                        Member
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="p-4 flex gap-3 justify-start rounded-md items-start w-full bg-yellow-50 border-l-4 border-yellow-400 mt-8">
                  <Image
                    src="/warning.svg"
                    alt="Warning icon"
                    className="mt-1"
                    height={24}
                    width={24}
                    priority
                  />
                  <div className="text-sm text-yellow-800">
                    <strong>Important:</strong> Only project owners can add,
                    edit, or remove tasks. If you need to make changes, please
                    contact the project owner or request elevated access.
                  </div>
                </div>

                <div className="flex flex-row gap-4">
                  <DialogClose asChild>
                    <Button
                      variant={"outline"}
                      fullWidth={true}
                      className="py-6"
                    >
                      Close
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    variant={"default"}
                    fullWidth={true}
                    className="py-6"
                  >
                    Create Project
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
