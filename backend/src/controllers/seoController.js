import Seo from '../models/Seo.js';

export const getSeoByPage = async (req, res) => {
  try {
    const { page } = req.params;
    let seo = await Seo.findOne({ page: page.toLowerCase() });
    if (!seo) {
      seo = { page, title: 'AV Group Organization', description: 'Leading Sustainable Infrastructure & Clean Energy Solutions' };
    }
    return res.status(200).json({ success: true, seo });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSeo = async (req, res) => {
  try {
    const { page } = req.params;
    const seo = await Seo.findOneAndUpdate(
      { page: page.toLowerCase() },
      req.body,
      { new: true, upsert: true }
    );
    return res.status(200).json({ success: true, message: 'SEO updated', seo });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
