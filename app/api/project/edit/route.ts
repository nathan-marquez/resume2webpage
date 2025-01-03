import { NextRequest, NextResponse } from "next/server";
import { firestore } from "@/server/firebase/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { getUser } from "@/server/lib/auth";
import { Project } from "@/types/project";
import Anthropic from "@anthropic-ai/sdk";
const anthropic = new Anthropic();

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const user = await getUser(req);

  if (!user) {
    return NextResponse.json(
      { error: "Authorization token missing or unauthorized" },
      { status: 401 }
    );
  }

  try {
    // 1. Get the user project from Firestore
    const projectDocRef = firestore.collection("project").doc(user.uid);
    const projectDoc = await projectDocRef.get();

    if (!projectDoc.exists) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Assert that the project is not being edited, uploading, or deleting and that the edit count is greater than 0
    const project = projectDoc.data() as Project;
    if (project.editingFlag || project.uploadingFlag || project.deletingFlag) {
      return NextResponse.json(
        { error: "Project is being edited, uploading, or deleting" },
        { status: 400 }
      );
    }

    if (project.editCount <= 0) {
      return NextResponse.json({ error: "Edit count is 0" }, { status: 400 });
    }

    // 2. Set the updating flag and attempt to generate the files
    await projectDocRef.update({
      editingFlag: true,
    });
    try {
      // 3. Get the edit string prompt from the request body
      const formData = await req.formData();
      const editText = formData.get("editText") as string;

      // 4. Call LLM with the edit string prompt and the current files
      const { htmlFile, cssFile, jsFile } = project;
      if (!(htmlFile && cssFile && jsFile)) {
        return NextResponse.json(
          { error: "Project files are missing" },
          { status: 400 }
        );
      }
      const { updatedHtmlFile, updatedCssFile, updatedJsFile } =
        await generateFiles(editText, htmlFile, cssFile, jsFile);

      let newProject = project;

      newProject.htmlFile = updatedHtmlFile;
      newProject.cssFile = updatedCssFile;
      newProject.jsFile = updatedJsFile;
      newProject.editCount = newProject.editCount - 1;

      // 5. Update the project with the new data
      await projectDocRef.update({
        htmlFile: updatedHtmlFile,
        cssFile: updatedCssFile,
        jsFile: updatedJsFile,
        editingFlag: false,
        editCount: FieldValue.increment(-1), // Decrement edit count
      });

      // 6. Return the updated project data
      return NextResponse.json(newProject, { status: 200 });
    } catch (error) {
      await projectDocRef.update({
        editingFlag: false,
      });
      return NextResponse.json(
        { error: "Internal server error during file editing: " + error },
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

async function generateFiles(
  editText: string,
  htmlFile: string,
  cssFile: string,
  jsFile: string
): Promise<{
  updatedHtmlFile: string;
  updatedCssFile: string;
  updatedJsFile: string;
}> {
  console.log("Editing Files...");
  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 6000,
    temperature: 0,
    system: `You are being provided a portfolio website built from 3 files: HTML, CSS, and JavaScript. You will also be provided with an edit request to make to the website.

EXTREMELY IMPORTANT:
- Respond **only** with a valid JSON object.
- Do not include any additional text or code formatting.
- Ensure all strings are properly escaped.

The JSON object should have the following structure:

{
  "htmlChanges": [
    {"find": "<string to find>", "replace": "<string to replace with>"},
    ...
  ],
  "cssChanges": [
    {"find": "<string to find>", "replace": "<string to replace with>"},
    ...
  ],
  "jsChanges": [
    {"find": "<string to find>", "replace": "<string to replace with>"},
    ...
  ]
}

Note:
- We have no notion of line numbers; your 'find' strings should be unique enough to avoid accidental replacements.
- Do not include any other text in your response.
`,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text:
              "HTML File: " +
              htmlFile +
              "\n" +
              "CSS File: " +
              cssFile +
              "\n" +
              "JS File: " +
              jsFile +
              "\n" +
              "Edit Text: " +
              editText,
          },
        ],
      },
    ],
  });
  console.log("Claude's response:", msg);

  // Extract the text content from the response
  let responseText;
  const response = msg.content[0];

  if (response.type === "text") {
    responseText = response.text;
  } else {
    throw new Error("Unexpected response type from Claude");
  }

  console.log("Response Text:", responseText);

  // Attempt to parse the responseText as JSON
  try {
    const changes = JSON.parse(responseText);

    let updatedHtmlFile = htmlFile;
    let updatedCssFile = cssFile;
    let updatedJsFile = jsFile;

    // Apply HTML changes
    if (changes.htmlChanges && Array.isArray(changes.htmlChanges)) {
      for (const change of changes.htmlChanges) {
        const { find, replace } = change;
        if (updatedHtmlFile.includes(find)) {
          updatedHtmlFile = updatedHtmlFile.replace(find, replace);
        } else {
          console.warn(`String to find not found in HTML file: ${find}`);
        }
      }
    }

    // Apply CSS changes
    if (changes.cssChanges && Array.isArray(changes.cssChanges)) {
      for (const change of changes.cssChanges) {
        const { find, replace } = change;
        if (updatedCssFile.includes(find)) {
          updatedCssFile = updatedCssFile.replace(find, replace);
        } else {
          console.warn(`String to find not found in CSS file: ${find}`);
        }
      }
    }

    // Apply JS changes
    if (changes.jsChanges && Array.isArray(changes.jsChanges)) {
      for (const change of changes.jsChanges) {
        const { find, replace } = change;
        if (updatedJsFile.includes(find)) {
          updatedJsFile = updatedJsFile.replace(find, replace);
        } else {
          console.warn(`String to find not found in JS file: ${find}`);
        }
      }
    }

    return {
      updatedHtmlFile,
      updatedCssFile,
      updatedJsFile,
    };
  } catch (error) {
    console.error("Failed to parse response:", error);
    throw new Error("Failed to parse response from Claude");
  }
}
