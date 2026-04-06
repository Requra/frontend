export const handleApiError = (error: any): string => {
  const serverData = error?.response?.data;
  
  if (serverData) {
    if (serverData.errors && serverData.errors.length > 0) {
      return serverData.errors[0];
    }
    if (serverData.message) {
      return serverData.message;
    }
  }
  
  return error?.message || "An unexpected error occurred. Please try again.";
};
