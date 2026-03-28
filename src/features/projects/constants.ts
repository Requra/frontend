export const STEPPER_STEPS = [
  { title: "Project Details" },
  { title: "Add Sources" },
  { title: "AI Generate" },
] as const;

export const ALLOWED_EXTENSIONS = ["pdf", "docx", "txt", "mp3", "mp4"];

export const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
