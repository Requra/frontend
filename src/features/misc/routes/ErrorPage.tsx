import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();

  let errorMessage = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-lg bg-white p-10 rounded-2xl shadow-sm border border-neutral-100">
        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-neutral-900">
            Oops! Something went wrong
          </h2>
          <p className="text-neutral-500">
            {errorMessage}
          </p>
        </div>
        
        <div className="pt-6 border-t border-neutral-100">
          <Button
            onClick={() => window.location.assign(window.location.origin)}
            variant="default"
            size="lg"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-95 m-auto"
          >
            <ChevronLeft size={20} />
            Go back to safety
          </Button>
        </div>
      </div>
    </div>
  );
};
