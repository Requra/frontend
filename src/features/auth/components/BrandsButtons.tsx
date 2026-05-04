import { useEffect } from "react";
import { Button } from "@/components/ui/Button/Button";
import { useGoogleLogin } from "../api/useGoogleLogin";

let isGsiInitialized = false;

const BrandsButtons = () => {
  const googleLoginMutation = useGoogleLogin();

  useEffect(() => {
    // Initialize Google GSI only once
    if (window.google && !isGsiInitialized) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: (response: any) => {
          googleLoginMutation.mutate({
            idToken: response.credential,
            platform: "web",
          });
        },
        itp_support: true,
        use_fedcm_for_prompt: true,
      });
      isGsiInitialized = true;
    }

    // Always render the button if the script is loaded
    if (window.google) {
      window.google.accounts.id.renderButton(
        document.getElementById("google-button-container")!,
        { 
          theme: "outline", 
          size: "large", 
          shape: "rectangular",
          text: "signin_with",
          logo_alignment: "left",
          width: 280 // Standard width to match other buttons in the grid
        }
      );
    }
  }, [googleLoginMutation]);

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-100" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-neutral-600">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-4">
        {/* Google Button Container */}
        <div id="google-button-container" className="flex-1 h-[42px] overflow-hidden rounded-md border border-input"></div>

        {/* GitHub */}
        <Button type="button" variant="outline" className="flex-1 h-[42px]">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="GitHub"
            className="size-5"
            fill="#181717"
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </Button>

        {/* Facebook */}
        <Button type="button" variant="outline" className="flex-1 h-[42px]">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Facebook"
            className="size-5"
            fill="#1877F2"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </Button>
      </div>
    </>
  );
};

export default BrandsButtons;
