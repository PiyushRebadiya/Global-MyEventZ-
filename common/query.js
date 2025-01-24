const createUserTable = `(
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    Role NVARCHAR(50),
    Permission NVARCHAR(MAX),
    Logo NVARCHAR(MAX),
    Category NVARCHAR(100),
    BussinessName NVARCHAR(100),
    Address NVARCHAR(MAX),
    RegisterMobile NVARCHAR(10),
    Mobile1 NVARCHAR(10),
    Mobile2 NVARCHAR(10),
    Email NVARCHAR(100),
    Status BIT,
    WebSite NVARCHAR(100),
    DownloadLimit INT,
    SocialLink NVARCHAR(150),
    WebsiteURL NVARCHAR(150),
    InstagramURL NVARCHAR(150),
    FacebookURL NVARCHAR(150),
    YoutubeURL NVARCHAR(150),
    Deleted BIT DEFAULT(0),
    MasterAccount BIT,
    MasterUserId INT,
    NotificationToken NVARCHAR(500),
    ReferralCode NVARCHAR(10),
    UserCode NVARCHAR(10),
    WalletAmount INT DEFAULT(0),
    DeviceType NVARCHAR(25) CHECK(DeviceType IN('Web', 'Android', 'IOS')),
    GSTNo NVARCHAR(250), 
    GSTBusinessName NVARCHAR(100),
    ProfileUpdateLimit INT DEFAULT(10),
    FrameSelection nvarchar(2000),
    LinkedInURL NVARCHAR(150),
    TwitterURL NVARCHAR(150),
    ImageUploadPassword NVARCHAR(100),
    CompanyId INT FOREIGN KEY REFERENCES tbl_company_mst(CompanyId),
    ExtraLogo2 NVARCHAR(500),
    ExtraLogo3 NVARCHAR(500),
    Code NVARCHAR(10),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createCarouselTable = `(
    CarouselId INT IDENTITY(1,1) PRIMARY KEY,
    Image NVARCHAR(500),
	Status BIT,
    OrderId INT,
    LinkId INT
)`

const createFrameTable = `(
    FrameId INT IDENTITY(1,1) PRIMARY KEY,
    Image NVARCHAR(500),
	Status BIT,
    OrderId INT,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createImageCategoryTable = `(
    ImageCategoryId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100),
    Status BIT,
    OrderId INT,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createImageSubCategoryTable = `(
    ImageSubCategoryId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100),
    Status BIT,
    ImageCategoryId INT FOREIGN KEY REFERENCES tbl_image_category(ImageCategoryId),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createImageLanguageTable = `(
    ImageLanguageId INT IDENTITY(1,1) PRIMARY KEY,
    Title int,
    Status BIT,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createUserCategoryTable = `(
    UserCategoryId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100),
    Status BIT,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createMainImageTable = `(
    MainImageId INT IDENTITY(1,1) PRIMARY KEY,
    Image NVARCHAR(500),
    StoryImage NVARCHAR(500),
    Thumbnail NVARCHAR(500),
    ImageCategoryId INT FOREIGN KEY REFERENCES tbl_image_category(ImageCategoryId),
    ImageSubCategoryId INT FOREIGN KEY REFERENCES tbl_image_subcategory(ImageSubCategoryId),
    StartEventDate DATETIME,
    EndEventDate DATETIME,
    Status BIT,
    ImageLanguageId INT FOREIGN KEY REFERENCES tbl_image_language(ImageLanguageId),
    OrderId INT,
    Premium BIT,
    EveryYearShow BIT,
    Tranding BIT,
    ViewCalendar BIT,
    UserId INT,
    ImagePermission BIT DEFAULT(0),
    ImageSize NVARCHAR(100) CHECK(ImageSize IN('Square', 'Story')) default 'Square' NOT NULL,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createFeedbackTable = `(
    FeedbackId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100),
    Email NVARCHAR(100),
    Message NVARCHAR(500),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createPlanDetailsTable = `(
    PlanDetailsId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100),
    Status BIT,
    Free BIT,
    Premium BIT,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createPlanPricingTable = `(
    PlanPricingId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100),
    OriginalPrice INT,
    DiscountedPrice INT,
    Percentage INT,
    TotalDays INT,
    GSTTaxType NVARCHAR(100) CHECK(GSTTaxType IN('Inclusive', 'Exclusive')) default 'Inclusive' NOT null,
    SecretKeyIds NVARCHAR(800),
    SubcriptionTitleIds NVARCHAR(800),
    Image NVARCHAR(500),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createProfileRequestTable = `(
    ProfileRequestId INT IDENTITY(1,1) PRIMARY KEY,
    RequestType NVARCHAR(100) CHECK(RequestType IN('Pending', 'Approved', 'Rejected')),
    UserId INT,
    Logo NVARCHAR(500),
    Category NVARCHAR(100),
    BusinessName NVARCHAR(100),
    Address NVARCHAR(500),
    RegisterMobile NVARCHAR(10),
    Mobile1 NVARCHAR(10),
    Mobile2 NVARCHAR(10),
    Email NVARCHAR(100),
    WebSite NVARCHAR(100),
    SocialLink NVARCHAR(150),
    WebsiteURL NVARCHAR(150),
    InstagramURL NVARCHAR(150),
    FacebookURL NVARCHAR(150),
    YoutubeURL NVARCHAR(150),
    CGUID NVARCHAR(100),
    Role NVARCHAR(50),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createSentMessageToAdminTable = `(
    MessageId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT,
    Image NVARCHAR(500),
    Name NVARCHAR(100),
    Message NVARCHAR(500),
    CGUID NVARCHAR(100),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createSubcriptionTable = `(
    SubscriptionId INT IDENTITY(1,1) PRIMARY KEY,
    Status BIT,
    PlanStatus NVARCHAR(100) CHECK(PlanStatus IN('Pending', 'Active', 'Expired')),
    Type NVARCHAR(100),
    OriginalPrice DECIMAL(10,2),
    DiscountedPrice DECIMAL(10,2),
    TotalDays INT,
    StartDate DATETIME,
    EndDate DATETIME,
    CGST DECIMAL(10,2),
    SGST DECIMAL(10,2),
    UserId INT,
    TotalPrice DECIMAL(10,2),
    GrandTotalPrice DECIMAL(10,2),
    Discount DECIMAL(10,2),
    GSTName NVARCHAR(150),
    GSTNumber NVARCHAR(150),
    PaymentId NVARCHAR(150),
    OrderId NVARCHAR(150),
    Signature NVARCHAR(150),
    Remark NVARCHAR(150),
    AmountInWord NVARCHAR(500),
    InvoiceNo NVARCHAR(100),
    InvoiceDate DATETIME,
    TrialPlan BIT,
    CouponId INT FOREIGN KEY REFERENCES tbl_coupon_mst(CouponId),
    IsPayed BIT DEFAULT 0 NOT NULL,
    GSTTaxType NVARCHAR(100) CHECK(GSTTaxType IN('Inclusive', 'Exclusive')) default 'Inclusive' NOT null,
    SecretKeyIds NVARCHAR(800),
    SubcriptionTitleIds NVARCHAR(800),
    CompanyId INT,
    DeviceType NVARCHAR(100) CHECK(DeviceType IN('Web', 'Android', 'IOS')),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createTestingTable = `(
    TestingId INT IDENTITY(1,1) PRIMARY KEY,
    EventDate DATETIME,
)`

const createOfferTable = `(
    OfferId INT IDENTITY(1,1) PRIMARY KEY,
    Status BIT,
    Image NVARCHAR(500),
    Remark NVARCHAR(250),
    StartEventDate DATETIME,
    EndEventDate DATETIME,
    LinkType NVARCHAR(100) CHECK(LinkType IN('Web', 'App')),
    Link NVARCHAR(500),
    AlwaysShow BIT,
    OfferStatus NVARCHAR(100) CHECK(OfferStatus IN('Pending', 'Active', 'Expired')),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createRazorpayCredentialsTable = `(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    KeyId NVARCHAR(100),
    SecretKey NVARCHAR(100),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createWhatsNewFeatureTable = `(
    WhatsNewFeatureId INT IDENTITY(1,1) PRIMARY KEY,
    Release NVARCHAR(50),
    Description NVARCHAR(500),
    WType NVARCHAR(50),
    ReleaseDate DATETIME,
    Status BIT,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createCompanyBankDetailsTable = `(
    BankName NVARCHAR(50),
    AccountHolderName NVARCHAR(50),
    AccountNumber NVARCHAR(50),
    IFSCCode NVARCHAR(50),
    HSNCode NVARCHAR(50),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createBusinessCategoryTable = `(
    BusinessCategoryId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100),
    Status BIT,
    OrderId INT,
    Image NVARCHAR(500),
    Thumbnail NVARCHAR(500),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createBusinessSubCategoryTable = `(
    BusinessSubCategoryId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100),
    Image NVARCHAR(500),
    Thumbnail NVARCHAR(500),
    OrderId INT,
    Status BIT,
    BusinessCategoryId INT FOREIGN KEY REFERENCES tbl_business_category(BusinessCategoryId),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createBusinessMainImageTable = `(
    BusinessMainImageId INT IDENTITY(1,1) PRIMARY KEY,
    BusinessCategoryId INT FOREIGN KEY REFERENCES tbl_business_category(BusinessCategoryId),
    BusinessSubCategoryId INT FOREIGN KEY REFERENCES tbl_business_sub_category(BusinessSubCategoryId),
    Image NVARCHAR(500),
    Thumbnail NVARCHAR(500),
    ImageLanguageId INT FOREIGN KEY REFERENCES tbl_image_language(ImageLanguageId),
    OrderId INT,
    Premium BIT,
    Status BIT,
    UserId INT,
    ImageSize NVARCHAR(100) CHECK(ImageSize IN('Square', 'Story')) default 'Square' NOT NULL,
    ImagePermission BIT DEFAULT(0),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createUserProfileTable = `(
    UserProfileId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT UNIQUE,
    Name NVARCHAR(100) NOT NULL,
    DOB DATE,
    Gender NVARCHAR(100) CHECK(Gender IN('Male', 'Female', 'Others')),
    Designation NVARCHAR(100),
    Mobile NVARCHAR(10),
    Email NVARCHAR(100),
    Image NVARCHAR(500),
    State NVARCHAR(100),
    City NVARCHAR(100),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
)`

const createMainImageTotalDownloadTable = `(
    MainImageTotalDownloadId INT IDENTITY(1,1) PRIMARY KEY,
    MainImageId INT,
    UserId INT,
    ImageCategoryId INT,
    ImageSubCategoryId INT,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createBusinessImageTotalDownloadTable = `(
    BusinessImageTotalDownloadId INT IDENTITY(1,1) PRIMARY KEY,
    BusinessMainImageId INT,
    BusinessSubCategoryId INT,
    BusinessCategoryId INT,
    UserId INT,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createNotificationTable = `(
    NotificationId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) COLLATE Latin1_General_CI_AI NOT NULL,
    Description NVARCHAR(500) COLLATE Latin1_General_CI_AI NOT NULL,
    Image NVARCHAR(500),
    StartDate DATETIME,
    EndDate DATETIME,
    NotificationStatus NVARCHAR(100) CHECK(NotificationStatus IN('Active', 'Pending', 'Expired')),
    Status BIT,
    Link NVARCHAR(200),
    LinkType NVARCHAR(25),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
)`

const createNotificationUserTable = `(
    NotificationUserId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT,
    NotificationId INT,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
)`

const createBusinessCategoryImageTable = `(
    BusinessCategoryImageId INT IDENTITY(1,1) PRIMARY KEY,
    Image NVARCHAR(500),
    Status BIT DEFAULT 1,
    BusinessCategoryId INT,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createFAQCategoryTable = `(
    FAQCategoryId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(150) NOT NULL,
    Image NVARCHAR(500) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    OrderId INT,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
)`

const creareFAQQuestionTable = `(
    FAQQuestionId INT IDENTITY(1,1) PRIMARY KEY,
    FAQCategoryId INT FOREIGN KEY REFERENCES tbl_faq_category(FAQCategoryId) NOT NULL,
    Question NVARCHAR(1000) NOT NULL,
    Answer NVARCHAR(1000) NOT NULL,
    Links NVARCHAR(1000),
    Status BIT NOT NULL DEFAULT 1,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
)`

const createRequestPerSegmentTable = `(
    SegmentId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT,
    Title NVARCHAR(100),
    Description NVARCHAR(500),
    Image NVARCHAR(500),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
    )`

const createOurProductTable = `(
    OurProductId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200),
    Description NVARCHAR(800),
    Image NVARCHAR(500),
    Status BIT DEFAULT(1),
    OrderId INT,
    AppLink NVARCHAR(250),
    WebLink NVARCHAR(250),
    YoutubeLink NVARCHAR(250),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
    )`

const createBackGroundNotificationTable = `(
    BackGroundNotificationId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(250) COLLATE Latin1_General_CI_AI NOT NULL,
    Description NVARCHAR(800) COLLATE Latin1_General_CI_AI NOT NULL,
    LinkType NVARCHAR(50) CHECK(LinkType IN('App', 'Web')) NOT NULL,
    Link NVARCHAR(250) NOT NULL,
    Image NVARCHAR(500),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
    )`

const createWhatsAppMsgTable = `(
    WhatsAppMsgId INT IDENTITY(1,1) PRIMARY KEY,
    Message NVARCHAR(1000) NOT NULL,
    Mobile NVARCHAR(10) NOT NULL,
    WhatsApp BIT DEFAULT(0),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
    )`

const createMessageLogTable = `(
    MessageLogId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT,
    Message NVARCHAR(1000) NOT NULL,
    MessageStatus NVARCHAR(25) CHECK(MessageStatus IN('Sent', 'Failed')),
    MessageType NVARCHAR(25) CHECK(MessageType IN('Whatsapp', 'Email')),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
    )`

const createRefferalRewardTable = `(
    RefferalRewardId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT,
    RefferalCode NVARCHAR(10),
    RefferalUserId INT,
    RewardPoint INT,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
    )`

const createCouponTable = `(
        CouponId INT IDENTITY(1,1) PRIMARY KEY,
        CouponCode NVARCHAR(50) UNIQUE NOT NULL,
        Discount INT NOT NULL CHECK(Discount > 0 AND Discount < 100),
        Remark NVARCHAR(250),
        StartDate DATETIME,
        EndDate DATETIME,
        AlwaysShow BIT DEFAULT(0),
        CouponStatus NVARCHAR(25) CHECK(CouponStatus IN('Active', 'Pending', 'Expired')),
        Status BIT NOT NULL DEFAULT(1),
        PlanPricingId INT,
        CompanyId NVARCHAR(100),
        IPAddress NVARCHAR(50),
        ServerName NVARCHAR(50),
        EntryTime DATETIME DEFAULT GETDATE()
        )`


const createUserWalletLogsTable = `(
            UserWalletLogsId INT IDENTITY(1,1) PRIMARY KEY,
            UserId INT NOT NULL,
            Amount INT CHECK(Amount > 0),
            TransactionType NVARCHAR(25) CHECK(TransactionType IN('Credit', 'Debit')) NOT NULL,
            Remark NVARCHAR(250),
            IPAddress NVARCHAR(50),
            ServerName NVARCHAR(50),
            EntryTime DATETIME DEFAULT GETDATE()
            )`
            
const createRewardPointTable = `(
    RewardPointId INT IDENTITY(1,1) PRIMARY KEY,
    OldUserReward INT NOT NULL DEFAULT(0),
    NewUserReward INT NOT NULL DEFAULT(0),
    SubscriptionReward INT NOT NULL CHECK(SubscriptionReward < 100) DEFAULT(0),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
)`

// const createPaymentLogTable = `(
//     PaymentLogId INT IDENTITY(1,1) PRIMARY KEY,
//     UserId INT,
//     PaymentId NVARCHAR(100),
//     PaymentStatus NVARCHAR(25) CHECK(PaymentStatus IN('Success', 'Failed', 'Pending')),
//     Amount INT NOT NULL CHECK(Amount > 0),
//     SelectedPlan NVARCHAR(25) ,
//     EntryTime DATETIME DEFAULT GETDATE(),
//     IPAddress NVARCHAR(50),
//     ServerName NVARCHAR(50)
// )`

const createTemplateMaster = `(
    TemplateId INT IDENTITY(1,1) PRIMARY KEY,
    TemplateName NVARCHAR(100) NOT NULL,
    TemplateDescription NVARCHAR(1000) NOT NULL,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
)`

const createFrameCategoryTable = `(
    FrameCategoryId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
)`

const createFrameFieldTable = `(
    FrameFieldId INT IDENTITY(1,1) PRIMARY KEY,
    FieldName NVARCHAR(100) NOT NULL,
    Image NVARCHAR(500),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE())`

const createLatestFrameTable = `(
    FrameId INT IDENTITY(1,1) PRIMARY KEY,
    FrameCategoryId INT FOREIGN KEY REFERENCES tbl_frame_category(FrameCategoryId) NOT NULL,
    Image NVARCHAR(500),
    FrameName NVARCHAR(100),
    Status BIT NOT NULL DEFAULT 1,
    Thumbnail NVARCHAR(500),
    Premium BIT NOT NULL DEFAULT 1,
    OrderId INT,
    FrameSize NVARCHAR(100) CHECK(FrameSize IN('Square', 'Story')) default 'Square' NOT NULL,
    ParentFrameId INT,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE())`

const createSetFrameFieldPositionTable = `(
    SetFrameFieldPositionId INT IDENTITY(1,1) PRIMARY KEY,
    FrameFieldId INT FOREIGN KEY REFERENCES tbl_frame_field(FrameFieldId) NOT NULL,
    FrameId INT FOREIGN KEY REFERENCES tbl_latest_frame(FrameId) NOT NULL,
    MT FLOAT NOT NULL DEFAULT(0),
    ML FLOAT NOT NULL DEFAULT(0),
    MR FLOAT NOT NULL DEFAULT(0),
    MB FLOAT NOT NULL DEFAULT(0),
    Height FLOAT NOT NULL DEFAULT(0),
    Width FLOAT NOT NULL DEFAULT(0),
    Color NVARCHAR(100) DEFAULT '#FFF',
    CSSProperties NVARCHAR(1000),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE())`

const createAnimationImageTable = `(
    AnimationImageId INT IDENTITY(1,1) PRIMARY KEY,
    Image NVARCHAR(500),
    Status BIT NOT NULL DEFAULT 0,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE())`

const createVideoMaster = `(
    VideoId INT IDENTITY(1,1) PRIMARY KEY,
    Video NVARCHAR(100) NOT NULL,
    Thumbnail NVARCHAR(500) NOT NULL,
    ImageCategoryId INT FOREIGN KEY REFERENCES tbl_image_category(ImageCategoryId),
    ImageSubCategoryId INT FOREIGN KEY REFERENCES tbl_image_subcategory(ImageSubCategoryId),
    StartEventDate DATETIME,
    EndEventDate DATETIME,
    Status BIT NOT NULL DEFAULT 1,
    ImageLanguageId INT FOREIGN KEY REFERENCES tbl_image_language(ImageLanguageId),
    OrderId INT,
    Premium BIT,
    VideoSize NVARCHAR(100) CHECK(VideoSize IN('Square', 'Story')) default 'Square' NOT NULL,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`  

const createBusinessVideoMaster = `(
    BusinessVideoId INT IDENTITY(1,1) PRIMARY KEY,
    Video NVARCHAR(250) NOT NULL,
    Thumbnail NVARCHAR(500) NOT NULL,
    BusinessCategoryId INT FOREIGN KEY REFERENCES tbl_business_category(BusinessCategoryId),
    BusinessSubCategoryId INT FOREIGN KEY REFERENCES tbl_business_sub_category(BusinessSubCategoryId),
    StartEventDate DATETIME,
    EndEventDate DATETIME,
    Status BIT NOT NULL DEFAULT 1,
    ImageLanguageId INT FOREIGN KEY REFERENCES tbl_image_language(ImageLanguageId),
    OrderId INT,
    Premium BIT,
    VideoSize NVARCHAR(100) CHECK(VideoSize IN('Square', 'Story')) default 'Square' NOT NULL,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`  

const createSentBackgroundNotificationTable = `(
    SentBackgroundNotificationId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(500),
    Description NVARCHAR(500),
    Image NVARCHAR(500),
    Link NVARCHAR(500),
    SentTime DATETIME,
    SentStatus BIT NOT NULL DEFAULT 0,
    BellNotification BIT NOT NULL DEFAULT 0,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createUserDetailsTable = `(
    UserDetailsId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT UNIQUE NOT NULL,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
)`

const createCustomizeImageCategoryTable = `(
    CustomizeImageCategoryId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    Image NVARCHAR(500),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
)`

const createCustomizeImageSubCategoryTable = `(
    CustomizeImageSubCategoryId INT IDENTITY(1,1) PRIMARY KEY,
    CustomizeImageCategoryId INT FOREIGN KEY REFERENCES tbl_customize_image_category(CustomizeImageCategoryId) NOT NULL,
    Title NVARCHAR(100) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    Image NVARCHAR(500),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
)`

const createCustomizeImageTable = `(
    CustomizeImageId INT IDENTITY(1,1) PRIMARY KEY,
    CustomizeImageCategoryId INT FOREIGN KEY REFERENCES tbl_customize_image_category(CustomizeImageCategoryId) NOT NULL,
    CustomizeImageSubCategoryId INT FOREIGN KEY REFERENCES tbl_customize_image_subcategory(CustomizeImageSubCategoryId) NOT NULL,
    Image NVARCHAR(500),
    ImageThumbnail NVARCHAR(500),
    UploadImage1 NVARCHAR(500),
    CSSProperties1 NVARCHAR(1000),
    Status BIT NOT NULL DEFAULT 1,
    Premium BIT NOT NULL DEFAULT 1,
    OrderId INT,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE())`

const createSetCustomizeImagePositionTable = `(
    SetCustomizeImagePositionId INT IDENTITY(1,1) PRIMARY KEY,
    CustomizeImageId INT FOREIGN KEY REFERENCES tbl_customize_image(CustomizeImageId) NOT NULL,
    FrameFieldId INT FOREIGN KEY REFERENCES tbl_frame_field(FrameFieldId) NOT NULL,
    MT FLOAT NOT NULL DEFAULT(0),
    ML FLOAT NOT NULL DEFAULT(0),
    MR FLOAT NOT NULL DEFAULT(0),
    MB FLOAT NOT NULL DEFAULT(0),
    Height FLOAT NOT NULL DEFAULT(0),
    Width FLOAT NOT NULL DEFAULT(0),
    Color NVARCHAR(100) DEFAULT '#FFF',
    CSSProperties NVARCHAR(1000),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE())` 

const createYoutubeVideoURLTable = `(
    YoutubeVideoURLId INT IDENTITY(1,1) PRIMARY KEY,
    VideoURL NVARCHAR(500) NOT NULL,
    Title NVARCHAR(200),
    Status BIT NOT NULL DEFAULT 1,
    OrderId INT,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
)`

const createCustomizeFrameUserInfoTable = `(
    CustomizeFrameUserInfoId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL UNIQUE,
    Tag1 NVARCHAR(150),
    Tag2 NVARCHAR(150),
    Tag3 NVARCHAR(150),
    VideoLink NVARCHAR(500),
    OurProductOrServicesTitle NVARCHAR(100),
    OurProductOrServicesValues NVARCHAR(1000),
    Position NVARCHAR(50),
    Experience NVARCHAR(50),
    Skills NVARCHAR(250),
    Skill1 NVARCHAR(50),
    Skill2 NVARCHAR(50),
    Skill3 NVARCHAR(50),
    Skill4 NVARCHAR(50),
    ButtonTitle NVARCHAR(50),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
)`

// UserId INT FOREIGN KEY REFERENCES tbl_users(UserId) NOT NULL, 
const createProfileUpdateLogTabele = `(
    ProfileUpdateLogId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT,
    Role NVARCHAR(50),
    Logo NVARCHAR(500),
    Category NVARCHAR(100),
    BussinessName NVARCHAR(100),
    Address NVARCHAR(500),
    RegisterMobile NVARCHAR(10),
    Mobile1 NVARCHAR(10),
    Mobile2 NVARCHAR(10),
    Email NVARCHAR(100),
    Status BIT,
    WebSite NVARCHAR(100),
    SocialLink NVARCHAR(150),
    WebsiteURL NVARCHAR(150),
    InstagramURL NVARCHAR(150),
    FacebookURL NVARCHAR(150),
    YoutubeURL NVARCHAR(150),
    ReferralCode NVARCHAR(10),
    UserCode NVARCHAR(10),
    WalletAmount INT DEFAULT(0),
    GSTNo NVARCHAR(250), 
    GSTBusinessName NVARCHAR(100),
    ExtraLogo2 NVARCHAR(500),
    ExtraLogo3 NVARCHAR(500),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME DEFAULT GETDATE()
)`

const createPermissionMenuTable = `(
    MenuId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    AliasString NVARCHAR(100) NOT NULL,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createPermissionSubMenuTable = `(
    SubMenuId INT IDENTITY(1,1) PRIMARY KEY,
    MenuId INT FOREIGN KEY REFERENCES tbl_permission_menu(MenuId) NOT NULL,
    Title NVARCHAR(100) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    AliasString NVARCHAR(100) NOT NULL,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`

const createAsignPermissionTable = `(
    AssignPermissionId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT FOREIGN KEY REFERENCES tbl_users(UserId) NOT NULL,
    SubMenuId INT FOREIGN KEY REFERENCES tbl_permission_sub_menu(SubMenuId) NOT NULL,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
)`
    
const createUploadImagePermissionOfUserTable = `(
    UploadImagePermissionOfUserId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT FOREIGN KEY REFERENCES tbl_users(UserId) NOT NULL,
    ImageType NVARCHAR(100) NOT NULL CHECK(ImageType IN ('Main Image', 'Business Main Image')),
    CategoryId INT NOT NULL,
    SubCategoryId INT NOT NULL,
    UploadLimit INT NOT NULL DEFAULT(1),
    UploadCount INT NOT NULL DEFAULT(1),
    Status BIT NOT NULL DEFAULT 1,
    ImageSize NVARCHAR(100) CHECK(ImageSize IN('Square', 'Story')) default 'Square' NOT NULL,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
    )`

const createStickerCategoryTable = `(
    StickerCategoryId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
    )`

const createStickerTable = `(
    StickerId INT IDENTITY(1,1) PRIMARY KEY,
    StickerCategoryId INT FOREIGN KEY REFERENCES tbl_sticker_category(StickerCategoryId) NOT NULL,
    Image NVARCHAR(500) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
    )`

const createGraphicCategoryTable = `(
    GraphicCategoryId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
    )`

const createGraphicTable = `(
    GraphicId INT IDENTITY(1,1) PRIMARY KEY,
    GraphicCategoryId INT FOREIGN KEY REFERENCES tbl_graphic_category(GraphicCategoryId) NOT NULL,
    Image NVARCHAR(500) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
    )`

const createPostEffectTable = `(
    PostEffectId INT IDENTITY(1,1) PRIMARY KEY,
    Image NVARCHAR(500) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
    )`

const createPostBackgroundCategoryTable = `(
    PostBackgroundCategoryId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
    )`
    
const createPostBackgroundTable = `(
    PostBackgroundId INT IDENTITY(1,1) PRIMARY KEY,
    PostBackgroundCategoryId INT FOREIGN KEY REFERENCES tbl_post_background_category(PostBackgroundCategoryId) NOT NULL,
    Image NVARCHAR(500) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
    )`

const createCompanyMasterTable = `(
    CompanyId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    OrderId INT,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
    )`

const createSetAppNavigationRouteTable = `(
    SetAppNavigationRouteId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(250) NOT NULL,
    Path NVARCHAR(500) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
    )`

const createSubcriptionSecretKeyTable = `(
    SubcriptionSecretKeyId INT IDENTITY(1,1) PRIMARY KEY,
    SecretKey NVARCHAR(500) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
    )`

const createSubcriptionTitleTable = `(
    SubcriptionTitleId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(250) NOT NULL,
    SecretKeyId INT FOREIGN KEY REFERENCES tbl_subcription_secret_key(SubcriptionSecretKeyId) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
    )`

const createSubcriptionSubTitleTable = `(
    SubcriptionSubTitleId INT IDENTITY(1,1) PRIMARY KEY,
    SubcriptionTitleId INT FOREIGN KEY REFERENCES tbl_subcription_title(SubcriptionTitleId) NOT NULL,
    Title NVARCHAR(250) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
    )`

const createMusicCategoryTable = `(
    MusicCategoryId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100) NOT NULL UNIQUE,
    Status BIT NOT NULL DEFAULT 1,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
    )`

const createMusicTable = `(
    MusicId INT IDENTITY(1,1) PRIMARY KEY,
    MusicCategoryId INT FOREIGN KEY REFERENCES tbl_music_category(MusicCategoryId) NOT NULL,
    MusicFile NVARCHAR(800) NOT NULL,
    Title NVARCHAR(400) NOT NULL UNIQUE,
    Status BIT NOT NULL DEFAULT 1,
    Duration INT,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
    )`

const createUSerCustomizeFrameTable = `(
    UserCustomizeFrameId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT FOREIGN KEY REFERENCES tbl_users(UserId) NOT NULL,
    FrameId INT FOREIGN KEY REFERENCES tbl_latest_frame(FrameId) NOT NULL,
    FrameFieldData NVARCHAR(4000),
    Status BIT NOT NULL DEFAULT 1,
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
    )`

const createSaveUserCustomizeFrameTable = `(
    SaveUserCustomizeFrameId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT FOREIGN KEY REFERENCES tbl_users(UserId) NOT NULL,
    FrameId INT FOREIGN KEY REFERENCES tbl_latest_frame(FrameId) NOT NULL,
    Data NVARCHAR(MAX),
    IPAddress NVARCHAR(50),
    ServerName NVARCHAR(50),
    EntryTime DATETIME
    )`

module.exports = {
    createUserTable,
    createCarouselTable,
    createFrameTable,
    createUserCategoryTable,
    createImageCategoryTable,
    createImageSubCategoryTable,
    createImageLanguageTable,
    createMainImageTable,
    createFeedbackTable,
    createPlanDetailsTable,
    createPlanPricingTable,
    createProfileRequestTable,
    createSentMessageToAdminTable,
    createSubcriptionTable,
    createTestingTable,
    createOfferTable,
    createRazorpayCredentialsTable,
    createWhatsNewFeatureTable,
    createCompanyBankDetailsTable,
    createBusinessCategoryTable,
    createBusinessSubCategoryTable,
    createBusinessMainImageTable,
    createUserProfileTable,
    createMainImageTotalDownloadTable,
    createBusinessImageTotalDownloadTable,
    createNotificationTable,
    createNotificationUserTable,
    createBusinessCategoryImageTable,
    createFAQCategoryTable,
    creareFAQQuestionTable,
    createRequestPerSegmentTable,
    createOurProductTable,
    createBackGroundNotificationTable,
    createWhatsAppMsgTable,
    createMessageLogTable,
    createRefferalRewardTable,
    createCouponTable,
    createUserWalletLogsTable,
    createRewardPointTable,
    createTemplateMaster,
    createFrameCategoryTable,
    createFrameFieldTable,
    createLatestFrameTable,
    createSetFrameFieldPositionTable,
    createAnimationImageTable,
    createVideoMaster,
    createSentBackgroundNotificationTable,
    createUserDetailsTable,
    createCustomizeImageCategoryTable,
    createCustomizeImageSubCategoryTable,
    createCustomizeImageTable,
    createSetCustomizeImagePositionTable,
    createYoutubeVideoURLTable,
    createCustomizeFrameUserInfoTable,
    createProfileUpdateLogTabele,
    createPermissionMenuTable,
    createPermissionSubMenuTable,
    createAsignPermissionTable,
    createUploadImagePermissionOfUserTable,
    createStickerCategoryTable,
    createStickerTable,
    createGraphicTable,
    createPostEffectTable,
    createGraphicCategoryTable,
    createPostBackgroundCategoryTable,
    createPostBackgroundTable,
    createCompanyMasterTable,
    createSetAppNavigationRouteTable,
    createSubcriptionSecretKeyTable,
    createSubcriptionTitleTable,
    createSubcriptionSubTitleTable,
    createBusinessVideoMaster,
    createMusicCategoryTable,
    createMusicTable,
    createUSerCustomizeFrameTable,
    createSaveUserCustomizeFrameTable
}