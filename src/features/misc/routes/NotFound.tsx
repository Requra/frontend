import { Link } from "react-router-dom";
import { paths } from "@/routes/paths";
import { Button } from "@/components/ui/Button/Button";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-lg">
        <h1 className="text-9xl font-extrabold text-primary-600 tracking-tight">
          404
        </h1>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-neutral-800">
            Page not found
          </h2>
          <p className="text-neutral-500 text-lg">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been removed or the link might be broken.
          </p>
        </div>

        <div className="pt-8">
          <Link to={paths.home}>
            <Button
              size="lg"
              className="px-10 h-14 text-lg bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/20 border-none"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
