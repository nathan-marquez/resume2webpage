"use client";

import { UploadZone } from "@/components/home/UploadZone";
import { Button } from "@/components/ui/button";
import { TestAuthNav } from "@/components/test-auth-nav";

import {
  Wand2,
  Zap,
  Globe2,
  CheckCircle,
  ArrowRightCircle,
} from "lucide-react";
import { useEffect } from "react";
import { getProject } from "@/lib/project";
import { useRouter } from "next/navigation";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  current?: boolean;
  upgrade?: boolean;
}

function PricingCard({
  title,
  price,
  features,
  current,
  upgrade,
}: PricingCardProps) {
  return (
    <div className="flex flex-col items-center space-y-4 text-center border rounded-lg p-6 shadow-lg transform transition-transform duration-300 hover:scale-105">
      <div className="text-2xl font-bold text-blue-600">{price}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-muted-foreground">
            {feature}
          </li>
        ))}
      </ul>
      {current && (
        <div className="flex items-center space-x-2 text-green-600">
          <CheckCircle className="h-5 w-5" />
          <span>Current Plan</span>
        </div>
      )}
      {upgrade && (
        <button className="mt-4 flex items-center space-x-2 text-blue-600 hover:text-blue-800">
          <span>Upgrade</span>
          <ArrowRightCircle className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      const project = await getProject();
      if (
        project &&
        (project.uploadingFlag || project.deletingFlag || project.editingFlag)
      ) {
        router.push("/editor");
      }
    };
    fetchProject();
  }, []);

  return (
    <>
      <section className="relative bg-grid-pattern">
        <div className="container max-w-6xl mx-auto px-4 flex flex-col items-center justify-center space-y-8 py-32 text-center md:py-40 animate-fadeIn">
          <div className="mx-auto max-w-3xl space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-slideUp">
              Transform Your Resume into a Beautiful Website
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl animate-slideUp delay-200">
              Create a stunning portfolio website from your resume in minutes.
              No coding required.
            </p>
          </div>
          <div className="w-full max-w-xl mx-auto">
            <UploadZone />
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/40">
        <div className="container max-w-6xl mx-auto px-4 py-16 md:py-24">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl">
            Why Choose Resume2Webpage?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-blue-50 p-4 shadow-lg transform transition-transform duration-300 hover:scale-105">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Instant Conversion</h3>
              <p className="text-muted-foreground">
                Upload your resume and get a beautiful website in seconds. No
                technical skills needed.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-blue-50 p-4">
                <Wand2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">AI-Powered Customization</h3>
              <p className="text-muted-foreground">
                Use our intuitive chat interface to customize your site. Just
                describe what you want.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-blue-50 p-4">
                <Globe2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Professional Presence</h3>
              <p className="text-muted-foreground">
                Stand out with a polished online presence that showcases your
                skills and experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="pricing" className="border-t bg-muted/40">
        <div className="container max-w-6xl mx-auto px-4 py-16 md:py-24">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl">
            Pricing Plans
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <PricingCard
              title="Free Plan"
              price="$0"
              features={["5 Edits", "Free Hosting"]}
              current={true}
            />
            <PricingCard
              title="Pro Plan"
              price="$9.99"
              features={["Custom Domain", "10 Edits/Day"]}
              upgrade={true}
            />
            <PricingCard
              title="Enterprise Plan"
              price="$20"
              features={["Custom Domain", "25 Edits/Day"]}
              upgrade={true}
            />
          </div>
        </div>
      </section>
    </>
  );
}


