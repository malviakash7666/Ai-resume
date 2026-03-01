// controllers/resume.controller.js
import db from "../database/models/index.js";
const { Profile, Resume } = db;

export const analyzeResume = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check uploaded resume
    const resume = await Resume.findOne({ where: { userId } });
    let content = resume?.parsedText;

    // Fallback to profile
    if (!content) {
      const profile = await Profile.findOne({ where: { userId } });
      if (!profile) return res.status(404).json({ message: "No data for analysis" });

      content = `
        Skills: ${profile.skills || ""}
        Education: ${profile.education || ""}
        Experience: ${profile.experience || ""}
        Bio: ${profile.bio || ""}
        Github: ${profile.githubUrl || ""}
        LinkedIn: ${profile.linkedinUrl || ""}
      `;
    }

    // AI analysis logic (placeholder)
    const suggestions = [];
    if (!content.includes("Skills")) suggestions.push("Add skills");
    if (!content.includes("Experience")) suggestions.push("Add experience");

    const score = 80; // placeholder

    res.status(200).json({ score, suggestions, contentSource: resume ? "uploadedResume" : "profile" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};