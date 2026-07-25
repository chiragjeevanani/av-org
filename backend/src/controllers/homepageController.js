import HomepageSection from '../models/HomepageSection.js';

export const getHomepageSections = async (req, res) => {
  try {
    const sections = await HomepageSection.find({ isVisible: true }).sort({ order: 1 });
    return res.status(200).json({ success: true, sections });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHomepageSection = async (req, res) => {
  try {
    const { sectionKey } = req.params;
    const section = await HomepageSection.findOneAndUpdate(
      { sectionKey },
      req.body,
      { new: true, upsert: true }
    );
    return res.status(200).json({ success: true, message: 'Section updated', section });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
