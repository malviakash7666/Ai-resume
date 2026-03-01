import db from "../database/models/index.js";

const { Profile } = db;

// 🔹 Create or Update Profile (Upsert)
export const upsertProfile = async (req, res) => {
  try {
    const userId = req.user.id; // auth middleware se aayega

    // Profile pehle se exist karta hai ya nahi check karo
    let profile = await Profile.findOne({ where: { userId } });

    if (profile) {
      // Update existing profile
      await profile.update({
        phone: req.body.phone,
        githubUrl: req.body.githubUrl,
        linkedinUrl: req.body.linkedinUrl,
        skills: req.body.skills,
        education: req.body.education,
        experience: req.body.experience,
        bio: req.body.bio,
        // profileImage abhi skip kar rahe
      });

      return res.status(200).json({
        message: "Profile updated successfully",
        profile,
      });
    }

    // Create new profile
    profile = await Profile.create({
      userId,
      phone: req.body.phone,
      githubUrl: req.body.githubUrl,
      linkedinUrl: req.body.linkedinUrl,
      skills: req.body.skills,
      education: req.body.education,
      experience: req.body.experience,
      bio: req.body.bio,
      // profileImage abhi skip
    });

    return res.status(201).json({
      message: "Profile created successfully",
      profile,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Get Profile for logged-in user
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await Profile.findOne({ where: { userId } });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};