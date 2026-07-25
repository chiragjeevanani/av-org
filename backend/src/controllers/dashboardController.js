import Inquiry from '../models/Inquiry.js';
import Project from '../models/Project.js';
import Gallery from '../models/Gallery.js';
import Media from '../models/Media.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalGalleryImages = await Gallery.countDocuments({ type: 'image' });
    const totalYoutubeVideos = await Gallery.countDocuments({ type: 'youtube' });
    const totalInquiries = await Inquiry.countDocuments();
    const pendingInquiries = await Inquiry.countDocuments({ status: 'pending' });
    const totalMediaFiles = await Media.countDocuments();

    const recentInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(5);

    return res.status(200).json({
      success: true,
      stats: {
        totalProjects,
        totalGalleryImages,
        totalYoutubeVideos,
        totalInquiries,
        pendingInquiries,
        totalMediaFiles,
        websiteStatus: 'Online / Active',
        lastUpdated: new Date()
      },
      recentInquiries
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
