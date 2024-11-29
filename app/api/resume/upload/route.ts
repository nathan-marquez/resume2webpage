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
    const formData = await req.formData();
    const file = formData.get("resume") as File;
    const resumeText = await pdfParser(file);

    // 2. Get the user project in firestore
    const projectDocRef = firestore.collection("project").doc(user.uid);
    const projectDoc = await projectDocRef.get();

    // 3. Assert that the project is not being edited, uploading, or deleting and that the edit count is greater than 0
    let project: Project;
    if (projectDoc.exists) {
      project = projectDoc.data() as Project;
    } else {
      const projectData = {
        editCount: 5,
        uploadingFlag: false,
        deletedFlag: false,
        editingFlag: false,
      };
      await projectDocRef.set(projectData);
      project = (await projectDocRef.get()).data() as Project;
    }

    if (project.editingFlag || project.uploadingFlag || project.deletingFlag) {
      return NextResponse.json(
        { error: "Project is being edited, uploading, or deleting" },
        { status: 400 }
      );
    }

    if (project.editCount <= 0) {
      return NextResponse.json({ error: "Edit count is 0" }, { status: 400 });
    }

    // 4. Set the project to uploadingFlag and attempt to generate the files
    await projectDocRef.set({ uploadingFlag: true });
    try {
      // 5. Call openai to generate the htmlFile, cssFile, and jsFile
      const { htmlFile, cssFile, jsFile } = await generateFiles(resumeText);

      // 6. Update the local project with the generated files
      project.htmlFile = htmlFile;
      project.cssFile = cssFile;
      project.jsFile = jsFile;

      await projectDocRef.update({
        htmlFile,
        cssFile,
        jsFile,
        uploadingFlag: false,
      });
      // 7. Return success with the project
      return NextResponse.json(project, { status: 200 });
    } catch (error) {
      // If there is an error, update the project to not be uploading
      await projectDocRef.update({
        uploadingFlag: false,
      });
      return NextResponse.json(
        { error: "Internal server error during file generation: " + error },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error: " + error },
      { status: 500 }
    );
  }
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
