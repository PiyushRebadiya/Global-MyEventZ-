const router = require("express").Router();
const userListController= require('../controllers/Users');

// const auth = require("../middleware/auth")

// const { mediaUpload, carouselUpload, frameUpload, mainImageUpload, offerUpload, businessSubCategoryUpload, businessMainImageUpload, userProfileUpload, NotificationUpload, BusinessCategoryImageUpload, FAQCategoryImageUpload, RequestPerSegmentUpload, OurProductUpload, BackgroundNotificationUpload, FrameUpload, videoUpload, AnimationImageUpload, customizeImageUpload, CustomizeFrameUserInfoUpload, CustomizeImageCategoryUpload, GraphicUpload, StickerUpload, PostEffectUpload, PostBackgroundUpload, BGRemovalUpload, FrameFieldUpload, BusinessCategoryUpload, BusinessVideoMasterUpload, PlanPricingUpload, MusicUpload, CustomizeImageSubCategoryStorageUpload } = require("../upload/index");

router.get("/user/list", userListController.getUsersList)
router.post("/user/add", userListController.addUserList)
router.post("/user/version", userListController.versionUpdate)

module.exports = router;