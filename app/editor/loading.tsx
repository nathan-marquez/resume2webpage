import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
        <h2 className="mt-4 text-lg font-medium">Generating your website...</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This will just take a moment.
        </p>
      </div>
    </div>
  );
}
