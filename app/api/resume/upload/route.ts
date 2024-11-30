import { NextRequest, NextResponse } from "next/server";
import { firestore } from "@/server/firebase/firebaseAdmin";
import { getUser } from "@/server/lib/auth";
import { Project } from "@/types/project";
import "@ungap/with-resolvers";
import { getDocument } from "pdfjs-dist";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();


export async function POST(req: NextRequest): Promise<NextResponse> {
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
    console.log("Generating Files...")
    const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 6000,
        temperature: 0,
        system: `Using the information from my resume below, please create an aesthetic and modern personal website. The website should effectively showcase my skills, experience, education, and any projects or achievements mentioned in the resume.

                Requirements:

                Design Style: Dark Mode, clean, minimalist, and user-friendly with an emphasis on readability.
                Responsiveness: The website should be fully responsive and function well on both desktop and mobile devices.
                Technology Stack:
                HTML5: Use semantic HTML5 elements for structure.
                CSS3: Implement styles using modern CSS practices. Feel free to use CSS Grid or Flexbox for layout.
                JavaScript: Include any interactive elements that enhance user experience.
                Files to Provide:
                index.html — The main HTML file containing the website structure.
                styles.css — The CSS file with all the styles applied to the HTML.
                script.js — A JavaScript file for interactive components.

                IMPORTANT:
                1. There should also be a beautiful hero section of the webpage, which takes up the full screen. DO NOT USE PLACEHOLDER IMAGES. 
                2. DO NOT make this webpage look like a resume. it should look like a artistic portfolio. Add icons and emojis. 
                3. Use a gridlike structure, so it doesnt look like a boring text document.
                4. Make sure to include ALL of the information from the resume. DO NOT leave out anything from the resume, unless it is inappropriate.

                VERY IMPORTANT:
                1. Animate the background of the hero section that react to the user's mouse movements. It should be subtle but aesthetic. MAKE IT 3D.
                2. Be aware of geometric contraints, and make sure all content is contained and fit within the screen and doesnt overflow.
                3. Since we are using a gridlike structure, make sure the items displayed take up the entire width of the screen so there is no leftover white space.
                4. Buttons in the navbar MUST make the website scroll to the correct section of the page.

                EXTREMELY IMPORTANT:
                - Respond **only** with a valid JSON object.
                - Do not include any additional text or code formatting.
                - Ensure all strings are properly escaped.

                The JSON object should have the following structure:

                {
                    "htmlFile": "<full html file as a string>",
                    "cssFile": "<full css file as a string>",
                    "jsFile": "<full js file as a string>"
                }
                `,
        messages: [
            {
            "role": "user",
            "content": [
                {
                "type": "text",
                "text": "My resume: " + resumeText,
                }
            ]
            }
        ]
        });
        console.log("Claude's response:", msg);

        // Extract the text content from the response
        let responseText;
        const response = msg.content[0];
    
        if (response.type === 'text') {
            responseText = response.text;
        } else {
            throw new Error('Unexpected response type from Claude');
        }
    
        console.log("Response Text:", responseText);
    
        // Attempt to parse the responseText as JSON
        try {
            // Since Claude should now return valid JSON, parse it directly
            const projectFile = JSON.parse(responseText);
    
            return {
                htmlFile: projectFile.htmlFile,
                cssFile: projectFile.cssFile,
                jsFile: projectFile.jsFile
            };
        } catch (error) {
            console.error('Failed to parse response:', error);
            throw new Error('Failed to parse response from Claude');
        }
    }

