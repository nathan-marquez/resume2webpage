import { NextApiRequest, NextApiResponse } from "next";
// import { verify } from "firebase-admin/auth"; // Ensure you have firebase-admin set up

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("called");
  console.error("called");
  if (req.method === "POST") {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from the header

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const decodedToken = { uid: "test" }; //await verify(token); // Verify the token
      const resumeFile = req.body.resume; // Access the uploaded file

      // Mock upload process (replace with actual upload logic to Firebase)
      console.log("Resume uploaded for user:", decodedToken.uid);

      return res.status(200).json({ message: "Resume uploaded successfully" });
    } catch (error) {
      return res.status(403).json({ error: "Invalid token" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
