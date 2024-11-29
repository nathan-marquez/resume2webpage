import { NextRequest, NextResponse } from "next/server";
import { firestore } from "@/server/firebase/firebaseAdmin";
import { getUser } from "@/server/lib/auth";
import { Project } from "@/types/project";
import "@ungap/with-resolvers";
import { getDocument } from "pdfjs-dist";

export async function POST(req: NextRequest) {
  const user = await getUser(req);

  if (!user) {
    return NextResponse.json(
      { error: "Authorization token missing or unauthorized" },
      { status: 401 }
    );
  }

  try {
    // 1. Parse the pdf resume file into a string
    console.log("called parsePdf");
    const resumeText = await parsePdf(req);
    console.log("1. resumeText", resumeText);

    // 2. Get the user project in firestore. If it doesn't exist, create it.
    const projectDocRef = firestore.collection("project").doc(user.uid);
    const projectDoc = await projectDocRef.get();
    if (!projectDoc.exists) {
      const projectData = {
        editCount: 5,
        uploadingFlag: true,
        deletedFlag: false,
        editingFlag: false,
      };
      await projectDocRef.set(projectData);
    }
    console.log("2. projectDoc", projectDoc);
    // 3. Call openai to generate the htmlFile, cssFile, and jsFile
    const { htmlFile, cssFile, jsFile } = await generateFiles(resumeText);
    console.log("3. htmlFile", htmlFile);
    // 4. Update the project with the generated files
    await projectDocRef.update({
      htmlFile,
      cssFile,
      jsFile,
      uploadingFlag: false,
    });
    console.log("4. projectDoc", projectDoc);
    // 5. Return success with the project
    const project: Project = (await projectDocRef.get()).data() as Project;
    console.log("5. project", project);

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error: " + error },
      { status: 500 }
    );
  }
}

async function parsePdf(req: NextRequest): Promise<string> {
  const formData = await req.formData();
  const file = formData.get("resume") as File;
  const pdfText = await pdfParser(file);
  return pdfText;
}

async function pdfParser(file: File): Promise<string> {
  // @ts-ignore
  await import("pdfjs-dist/build/pdf.worker.mjs");

  const arrayBuffer = await file.arrayBuffer();
  console.log("arrayBuffer", arrayBuffer);
  const pdfDocument = await getDocument(arrayBuffer).promise;
  console.log("pdfDocument", pdfDocument);
  let extractedText = "";

  // Loop through each page and extract text
  for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
    const page = await pdfDocument.getPage(pageNumber);
    const textContent = await page.getTextContent();

    // Extract text items
    const pageText = textContent.items.map((item: any) => item.str).join(" ");
    extractedText += pageText + "\n";
  }

  return extractedText;
}

async function generateFiles(resumeText: string) {
  return { htmlFile: "htmlFile", cssFile: "cssFile", jsFile: "jsFile" };
}
