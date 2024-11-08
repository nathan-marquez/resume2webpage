export const extractTextFromPdf = async (file: File): Promise<string> => {
  return "test";
};

export type UploadProgress = (progress: number) => void;

export const uploadResume = async (
  file: File,
  onProgress?: UploadProgress
): Promise<{ resumeId: string }> => {
  try {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      onProgress?.(progress);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    return { resumeId: "testID" };
  } catch (error) {
    console.error("Resume upload error:", error);
    throw error;
  }
};
