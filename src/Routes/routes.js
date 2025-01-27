const router = require("express").Router();
const userListController= require('../controllers/Users');
const OrganizationMasterController = require('../controllers/OrganizationMaster');

// const auth = require("../middleware/auth")

// const { mediaUpload, carouselUpload, frameUpload, mainImageUpload, offerUpload, businessSubCategoryUpload, businessMainImageUpload, userProfileUpload, NotificationUpload, BusinessCategoryImageUpload, FAQCategoryImageUpload, RequestPerSegmentUpload, OurProductUpload, BackgroundNotificationUpload, FrameUpload, videoUpload, AnimationImageUpload, customizeImageUpload, CustomizeFrameUserInfoUpload, CustomizeImageCategoryUpload, GraphicUpload, StickerUpload, PostEffectUpload, PostBackgroundUpload, BGRemovalUpload, FrameFieldUpload, BusinessCategoryUpload, BusinessVideoMasterUpload, PlanPricingUpload, MusicUpload, CustomizeImageSubCategoryStorageUpload } = require("../upload/index");

// router.get("/user/list", userListController.getUsersList)
// router.post("/user/add", userListController.addUserList)
// router.post("/user/version", userListController.versionUpdate)

router.get('/fetchOrginizations', OrganizationMasterController.fetchOrginizations);
router.post('/OrganizationMaster', OrganizationMasterController.CreateOrganozation);
router.delete('/DeleteOrganizationMaster', OrganizationMasterController.removeOrganisation);

module.exports = router;