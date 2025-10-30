import Experience from "../models/Experience.js";
// CREATE Experience
export const createExperience = async (req, res) => {
    try {
        console.log("📩 Incoming experience:", req.body);
        const { title, location, description, imageUrl, price, slots } = req.body;
        if (!title || !location || !description || !imageUrl || !price) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const exp = new Experience({
            title,
            location,
            description,
            imageUrl,
            price,
            slots: slots || [],
        });
        const saved = await exp.save();
        console.log("✅ Experience saved:", saved._id);
        res.status(201).json(saved);
    }
    catch (err) {
        console.error("❌ Error while saving experience:", err.message);
        res.status(500).json({ error: "Failed to add experience", details: err.message });
    }
};
// GET all experiences
export const getExperiences = async (req, res) => {
    try {
        const { q } = req.query;
        let filter = {};
        if (q) {
            filter = {
                $or: [
                    { title: { $regex: q, $options: "i" } },
                    { location: { $regex: q, $options: "i" } },
                ],
            };
        }
        const experiences = await Experience.find(filter);
        res.status(200).json(experiences);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching experiences", error });
    }
};
// GET single experience by ID
export const getExperienceById = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience)
            return res.status(404).json({ message: "Experience not found" });
        res.status(200).json(experience);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching experience", error });
    }
};
//# sourceMappingURL=experienceController.js.map