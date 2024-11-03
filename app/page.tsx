import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Wand2, Zap, Globe2 } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="relative">
        <div className="container flex flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
          <div className="mx-auto max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Transform Your Resume into a Beautiful Website
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Create a stunning portfolio website from your resume in minutes. No coding required.
            </p>
          </div>
          <div className="w-full max-w-xl mx-auto">
            <UploadZone />
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/40">
        <div className="container py-16 md:py-24">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl">
            Why Choose Resume2Webpage?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Instant Conversion</h3>
              <p className="text-muted-foreground">
                Upload your resume and get a beautiful website in seconds. No technical skills needed.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Wand2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">AI-Powered Customization</h3>
              <p className="text-muted-foreground">
                Use our intuitive chat interface to customize your site. Just describe what you want.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Globe2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Professional Presence</h3>
              <p className="text-muted-foreground">
                Stand out with a polished online presence that showcases your skills and experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}