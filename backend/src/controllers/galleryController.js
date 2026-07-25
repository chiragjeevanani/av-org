import Gallery from '../models/Gallery.js';

export const getGalleryItems = async (req, res) => {
  try {
    const { category, type } = req.query;
    let query = { isActive: true };
    if (category && category !== 'All') query.category = category;
    if (type) query.type = type;

    const items = await Gallery.find(query).sort({ order: 1, createdAt: -1 });
    return res.status(200).json({ success: true, count: items.length, items });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.create(req.body);
    return res.status(201).json({ success: true, message: 'Gallery item created', item });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    return res.status(200).json({ success: true, message: 'Gallery item updated', item });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    return res.status(200).json({ success: true, message: 'Gallery item deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
