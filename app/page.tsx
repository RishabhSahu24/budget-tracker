"use client";
import Heading from "@/components/Heading";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { redirectAsPerContext } from "@/common/authHelper";
import SubTitle from "@/components/Subtitle";

export default function Home() {
  const { user, isSignedIn } = useUser();
  const route = useRouter();

  useEffect(() => {
    const routeToRedirect = redirectAsPerContext(isSignedIn);
    route.push(routeToRedirect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, user]);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <section className="flex-grow flex items-center justify-center">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-xl text-center">
          <Heading level={1} size="xxl" variant="primary">
            Empower Your Projects
            <strong className="block text-rose-700">
              With Clarity & Precision
            </strong>
          </Heading>
          <SubTitle className="mt-4 sm:text-xl/relaxed" size={"md"}>
            Seamlessly plan, track, and execute your projects with our intuitive
            portal designed to bring your ideas to life.
          </SubTitle>

          <div className="mt-8 flex gap-4 text-center justify-center">
            <Link href={"/sign-in"}>
              <Button
                variant={"destructive"}
                className="font-bold py-6 px-16 text-md"
              >
                Get Started
              </Button>
            </Link>
            <Link href={"#"}>
              <Button
                type="button"
                variant={"secondary"}
                className="font-bold py-6 px-16 text-md"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
