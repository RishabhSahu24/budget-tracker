import Heading from "@/components/Heading";
import Header from "@/components/layout/Header";
import Subtitle from "@/components/Subtitle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <section className="flex-grow flex items-center justify-center">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-xl text-center">
          <Heading level={1} size="xxl" variant="primary">
            Take Control of
            <strong className="block text-rose-700">Your Finances </strong>
          </Heading>
          <Subtitle className="mt-4 sm:text-xl/relaxed" size={"md"}>
            Effortlessly track, manage, and optimize your expenses to achieve
            your financial goals with ease.
          </Subtitle>

          <div className="mt-8 flex gap-4 text-center justify-center">
            <Button fullWidth variant={"destructive"} size={"lg"}>
              Get Started
            </Button>
            <Button fullWidth className="text-rose-600" size={"lg"}>
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
