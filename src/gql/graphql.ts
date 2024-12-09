/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any };
  /** The `Long` scalar type represents 52-bit integers */
  Long: { input: any; output: any };
};

/** LLS Academy */
export type Academy = {
  __typename?: "Academy";
  id?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  schools?: Maybe<Array<Maybe<School>>>;
};

/** LLS Academy */
export type AcademySchoolsArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
};

/** LLS AccountType */
export type AccountType = {
  __typename?: "AccountType";
  code?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  uai?: Maybe<Scalars["String"]["output"]>;
};

export type Admin = {
  __typename?: "Admin";
  connectors?: Maybe<SearchConnector>;
  licenses?: Maybe<SearchLicense>;
  opportunities?: Maybe<SearchOpportunityType>;
  salesStats?: Maybe<Array<Maybe<AggregateType>>>;
  users?: Maybe<SearchUser>;
};

export type AdminConnectorsArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

export type AdminLicensesArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  schoolIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

export type AdminOpportunitiesArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  createdAfter?: InputMaybe<Scalars["String"]["input"]>;
  createdBefore?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  isMetaAccount?: InputMaybe<Scalars["Boolean"]["input"]>;
  stageNames?: InputMaybe<Array<InputMaybe<StageNames>>>;
};

export type AdminSalesStatsArgs = {
  filters?: InputMaybe<Array<InputMaybe<FilterType>>>;
  groupBy?: InputMaybe<Scalars["String"]["input"]>;
};

export type AdminUsersArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  booksContributedToIds?: InputMaybe<
    Array<InputMaybe<Scalars["Int"]["input"]>>
  >;
  booksContributedToUris?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  emails?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  isAuthor?: InputMaybe<Scalars["Boolean"]["input"]>;
  isCoAuthor?: InputMaybe<Scalars["Boolean"]["input"]>;
  isConfirmed?: InputMaybe<Scalars["Boolean"]["input"]>;
  isContributor?: InputMaybe<Scalars["Boolean"]["input"]>;
  isDirector?: InputMaybe<Scalars["Boolean"]["input"]>;
  isPremium?: InputMaybe<Scalars["Boolean"]["input"]>;
  isSuperCoAuthor?: InputMaybe<Scalars["Boolean"]["input"]>;
  levelIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  profiles?: InputMaybe<Array<InputMaybe<UserProfile>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  schoolIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  subjectIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  usernames?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type AdminMutation = {
  __typename?: "AdminMutation";
  /** Create a book and return it */
  createBook?: Maybe<Book>;
  /** Create a chapter and return it */
  createChapter?: Maybe<Chapter>;
  /** Create a connector and return it */
  createConnector?: Maybe<Connector>;
  /** Create a docTemplate and return it */
  createDocTemplate?: Maybe<DocTemplate>;
  /** Create a document and return it */
  createDocument?: Maybe<DocumentMd>;
  /** Create a labeling job for a given book */
  createLabelingJob?: Maybe<Book>;
  /** Create an license and return it */
  createLicense?: Maybe<License>;
  /** Create method and return it */
  createMethod?: Maybe<Method>;
  /** Create a mini url and return it */
  createMiniUrl?: Maybe<MiniUrl>;
  /** Create news and return it */
  createNews?: Maybe<News>;
  /** Create a notion and return it */
  createNotion?: Maybe<Notion>;
  /** Create an original page and return it */
  createPage?: Maybe<Page>;
  /** Create promotional insert and return it */
  createPromotionalInsert?: Maybe<PromotionalInsert>;
  /** Add a resource for the given chapter */
  createResource?: Maybe<ResourceType>;
  /** Create a school and return it */
  createSchool?: Maybe<School>;
  /** Add a tool */
  createTool?: Maybe<ToolType>;
  /** Create a user from admin and return it */
  createUser?: Maybe<User>;
  /** Create a word and return it */
  createWord?: Maybe<Word>;
  /** Delete a book and return it */
  deleteBook?: Maybe<Book>;
  /** Delete a chapter and return it */
  deleteChapter?: Maybe<Chapter>;
  /** Delete a docTemplate and return it */
  deleteDocTemplate?: Maybe<DocTemplate>;
  /** Delete license and return its Id */
  deleteLicense?: Maybe<License>;
  /** Delete method and return its Id */
  deleteMethod?: Maybe<Method>;
  /** Delete a mini url and return it */
  deleteMiniUrl?: Maybe<MiniUrl>;
  /** Delete some news and return it */
  deleteNews?: Maybe<News>;
  /** Delete a notion and return it */
  deleteNotion?: Maybe<Notion>;
  /** Delete an original page and return it */
  deletePage?: Maybe<Page>;
  /** Delete some promotional insert and return it */
  deletePromotionalInsert?: Maybe<PromotionalInsert>;
  /** Delete a resource */
  deleteResource?: Maybe<ResourceType>;
  /** Delete a tool */
  deleteTool?: Maybe<ToolType>;
  /** Delete a user and return it */
  deleteUser?: Maybe<User>;
  /** Delete a word and return it */
  deleteWord?: Maybe<Word>;
  /** Convert sagemaker annotation to XML page */
  generatePage?: Maybe<Page>;
  /** Generate images from pdf book */
  splitBookPdf?: Maybe<Book>;
  /** Update a book and return it */
  updateBook?: Maybe<Book>;
  /** Update a chapter and return it */
  updateChapter?: Maybe<Chapter>;
  /** Update a connector and return it */
  updateConnector?: Maybe<Connector>;
  /** Update a docTemplate and return it */
  updateDocTemplate?: Maybe<DocTemplate>;
  /** Edit license and return its Id */
  updateLicense?: Maybe<License>;
  /** Edit method and return its Id */
  updateMethod?: Maybe<Method>;
  /** Update a mini url and return it */
  updateMiniUrl?: Maybe<MiniUrl>;
  /** Update some news and return it */
  updateNews?: Maybe<News>;
  /** Update a notion and return it */
  updateNotion?: Maybe<Notion>;
  /** Update an original page and return it */
  updatePage?: Maybe<Page>;
  /** Update some promotional insert and return it */
  updatePromotionalInsert?: Maybe<PromotionalInsert>;
  /** Update a resource */
  updateResource?: Maybe<ResourceType>;
  /** Update a school and return it */
  updateSchool?: Maybe<School>;
  /** Update a tool */
  updateTool?: Maybe<ToolType>;
  /** Update a user from admin and return it */
  updateUser?: Maybe<User>;
  /** Update a word and return it */
  updateWord?: Maybe<Word>;
};

export type AdminMutationCreateBookArgs = {
  book?: InputMaybe<BookInput>;
};

export type AdminMutationCreateChapterArgs = {
  chapter?: InputMaybe<ChapterInput>;
};

export type AdminMutationCreateConnectorArgs = {
  connector?: InputMaybe<ConnectorInput>;
};

export type AdminMutationCreateDocTemplateArgs = {
  docTemplate?: InputMaybe<DocTemplateInput>;
};

export type AdminMutationCreateDocumentArgs = {
  document?: InputMaybe<DocumentInput>;
};

export type AdminMutationCreateLabelingJobArgs = {
  book?: InputMaybe<BookInput>;
};

export type AdminMutationCreateLicenseArgs = {
  license?: InputMaybe<LicenseInput>;
};

export type AdminMutationCreateMethodArgs = {
  method?: InputMaybe<MethodInput>;
};

export type AdminMutationCreateMiniUrlArgs = {
  miniUrl?: InputMaybe<MiniUrlInput>;
};

export type AdminMutationCreateNewsArgs = {
  news?: InputMaybe<NewsInput>;
};

export type AdminMutationCreateNotionArgs = {
  notion?: InputMaybe<NotionInput>;
};

export type AdminMutationCreatePageArgs = {
  page?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type AdminMutationCreatePromotionalInsertArgs = {
  promotionalInsert?: InputMaybe<PromotionalInsertInput>;
};

export type AdminMutationCreateResourceArgs = {
  chapterId?: InputMaybe<Scalars["Int"]["input"]>;
  resource?: InputMaybe<ResourceInputType>;
};

export type AdminMutationCreateSchoolArgs = {
  school?: InputMaybe<SchoolInput>;
};

export type AdminMutationCreateToolArgs = {
  tool?: InputMaybe<ToolInputType>;
};

export type AdminMutationCreateUserArgs = {
  profiles?: InputMaybe<Array<InputMaybe<UserProfile>>>;
  user: UserInput;
};

export type AdminMutationCreateWordArgs = {
  word?: InputMaybe<WordInput>;
};

export type AdminMutationDeleteBookArgs = {
  book?: InputMaybe<BookInput>;
};

export type AdminMutationDeleteChapterArgs = {
  chapter?: InputMaybe<ChapterInput>;
};

export type AdminMutationDeleteDocTemplateArgs = {
  docTemplate?: InputMaybe<DocTemplateInput>;
};

export type AdminMutationDeleteLicenseArgs = {
  licenseId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type AdminMutationDeleteMethodArgs = {
  methodId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type AdminMutationDeleteMiniUrlArgs = {
  miniUrl?: InputMaybe<MiniUrlInput>;
};

export type AdminMutationDeleteNewsArgs = {
  news?: InputMaybe<NewsInput>;
};

export type AdminMutationDeleteNotionArgs = {
  notion?: InputMaybe<NotionInput>;
};

export type AdminMutationDeletePageArgs = {
  page?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type AdminMutationDeletePromotionalInsertArgs = {
  promotionalInsert?: InputMaybe<PromotionalInsertInput>;
};

export type AdminMutationDeleteResourceArgs = {
  resource?: InputMaybe<ResourceInputType>;
};

export type AdminMutationDeleteToolArgs = {
  tool?: InputMaybe<ToolInputType>;
};

export type AdminMutationDeleteUserArgs = {
  userId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type AdminMutationDeleteWordArgs = {
  word?: InputMaybe<WordInput>;
};

export type AdminMutationGeneratePageArgs = {
  pageId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type AdminMutationSplitBookPdfArgs = {
  book?: InputMaybe<BookInput>;
};

export type AdminMutationUpdateBookArgs = {
  book?: InputMaybe<BookInput>;
};

export type AdminMutationUpdateChapterArgs = {
  chapter?: InputMaybe<ChapterInput>;
};

export type AdminMutationUpdateConnectorArgs = {
  connector?: InputMaybe<ConnectorInput>;
};

export type AdminMutationUpdateDocTemplateArgs = {
  docTemplate?: InputMaybe<DocTemplateInput>;
};

export type AdminMutationUpdateLicenseArgs = {
  license?: InputMaybe<LicenseInput>;
};

export type AdminMutationUpdateMethodArgs = {
  method?: InputMaybe<MethodInput>;
};

export type AdminMutationUpdateMiniUrlArgs = {
  miniUrl?: InputMaybe<MiniUrlInput>;
};

export type AdminMutationUpdateNewsArgs = {
  news?: InputMaybe<NewsInput>;
};

export type AdminMutationUpdateNotionArgs = {
  notion?: InputMaybe<NotionInput>;
};

export type AdminMutationUpdatePageArgs = {
  page?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type AdminMutationUpdatePromotionalInsertArgs = {
  promotionalInsert?: InputMaybe<PromotionalInsertInput>;
};

export type AdminMutationUpdateResourceArgs = {
  resource?: InputMaybe<ResourceInputType>;
};

export type AdminMutationUpdateSchoolArgs = {
  school?: InputMaybe<SchoolInput>;
};

export type AdminMutationUpdateToolArgs = {
  tool?: InputMaybe<ToolInputType>;
};

export type AdminMutationUpdateUserArgs = {
  user?: InputMaybe<UserInput>;
};

export type AdminMutationUpdateWordArgs = {
  word?: InputMaybe<WordInput>;
};

/** LLS Aggregate */
export type AggregateType = {
  __typename?: "AggregateType";
  countBy?: Maybe<Scalars["Int"]["output"]>;
  groupValue?: Maybe<Scalars["String"]["output"]>;
  map?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  meanBy?: Maybe<Scalars["Float"]["output"]>;
  nodes?: Maybe<Array<Maybe<SalesStats>>>;
  sumBy?: Maybe<Scalars["Float"]["output"]>;
};

/** LLS Aggregate */
export type AggregateTypeCountByArgs = {
  fieldName?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Aggregate */
export type AggregateTypeMapArgs = {
  fieldName?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Aggregate */
export type AggregateTypeMeanByArgs = {
  fieldName?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Aggregate */
export type AggregateTypeSumByArgs = {
  fieldName?: InputMaybe<Scalars["String"]["input"]>;
};

/** MS-analytics log creation confirmation */
export type Analytics = {
  __typename?: "Analytics";
  status?: Maybe<Scalars["Boolean"]["output"]>;
};

export enum AnalyticsEvents {
  AccountActivated = "account_activated",
  AccountCreated = "account_created",
  AccountVerified = "account_verified",
  ActivationFailed = "activation_failed",
  AppActivated = "app_activated",
  AppBackgrounded = "app_backgrounded",
  AppCrashed = "app_crashed",
  AppInstalled = "app_installed",
  AppOpened = "app_opened",
  AppReinitialised = "app_reinitialised",
  AppUninstalled = "app_uninstalled",
  AppUpdated = "app_updated",
  AppreciationAdded = "appreciation_added",
  AppreciationEdited = "appreciation_edited",
  BookDownloadFailed = "book_download_failed",
  BookDownloadStarted = "book_download_started",
  BookDownloadSucceed = "book_download_succeed",
  BookUpdated = "book_updated",
  ContentViewChanged = "content_view_changed",
  CorrectionEdited = "correction_edited",
  CorrectionSend = "correction_send",
  CorrectionStarted = "correction_started",
  CustomPageCreated = "custom_page_created",
  CustomPageDeleted = "custom_page_deleted",
  CustomPageRenamed = "custom_page_renamed",
  CustomPageSaved = "custom_page_saved",
  DocumentChoiceStarted = "document_choice_started",
  DocumentInserted = "document_inserted",
  EntConnectionStarted = "ent_connection_started",
  ExercisesStarted = "exercises_started",
  FakeProfileChanged = "fake_profile_changed",
  FilterUsed = "filter_used",
  FormSubmitted = "form_submitted",
  GroupCreated = "group_created",
  GroupDeleted = "group_deleted",
  GroupDuplicated = "group_duplicated",
  GroupRenamed = "group_renamed",
  InvitationMethodUsed = "invitation_method_used",
  LeadQualified = "lead_qualified",
  LinkClicked = "link_clicked",
  LlsApplicationActivationLicense = "lls_application_activation_license",
  LlsApplicationActivationToken = "lls_application_activation_token",
  LlsApplicationActivationUser = "lls_application_activation_user",
  LlsApplicationDownloadError = "lls_application_download_error",
  LlsApplicationDownloadSuccess = "lls_application_download_success",
  LlsApplicationDownloadUpdateSuccess = "lls_application_download_update_success",
  LlsApplicationLaunch = "lls_application_launch",
  LlsMiniUrl = "lls_mini_url",
  LlsPageAddCorrection = "lls_page_add_correction",
  LlsPageCustomCreated = "lls_page_custom_created",
  LlsPageShared = "lls_page_shared",
  LlsPageSharedCorrection = "lls_page_shared_correction",
  LlsPageView = "lls_page_view",
  LlsWebConnectionAccount = "lls_web_connection_account",
  LlsWebConnectionSso = "lls_web_connection_sso",
  LoginStarted = "login_started",
  MediaStarted = "media_started",
  MiniurlOpened = "miniurl_opened",
  OnboardingAborted = "onboarding_aborted",
  OnboardingDelayed = "onboarding_delayed",
  OnboardingFinished = "onboarding_finished",
  OnboardingStarted = "onboarding_started",
  PageChoiceStarted = "page_choice_started",
  PageExportStarted = "page_export_started",
  PageExported = "page_exported",
  PageShareStarted = "page_share_started",
  PageShared = "page_shared",
  PageViewed = "page_viewed",
  PremiumDiscovered = "premium_discovered",
  PremiumDiscoveryEnded = "premium_discovery_ended",
  PremiumDiscoveryStarted = "premium_discovery_started",
  ProfileUpdated = "profile_updated",
  ReportSent = "report_sent",
  ReportStarted = "report_started",
  ScreenViewed = "screen_viewed",
  SessionFinished = "session_finished",
  SessionStarted = "session_started",
  StudentAnswerCreated = "student_answer_created",
  StudentAnswerSaved = "student_answer_saved",
  StudentAnswerViewed = "student_answer_viewed",
  TaskInserted = "task_inserted",
  ToolboxUsed = "toolbox_used",
  TourExplored = "tour_explored",
  TourFinished = "tour_finished",
  TrialFinished = "trial_finished",
  TrialStarted = "trial_started",
  TtsStarted = "tts_started",
  UnlockClassicFailed = "unlock_classic_failed",
  UnlockClassicSucceeded = "unlock_classic_succeeded",
  UserLoggedIn = "user_logged_in",
  UserLoggedOut = "user_logged_out",
}

/** LLS App */
export type App = {
  __typename?: "App";
  book?: Maybe<Book>;
  createdAt?: Maybe<Scalars["String"]["output"]>;
  fcmToken?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS App Input */
export type AppInput = {
  bookId?: InputMaybe<Scalars["Int"]["input"]>;
  deviceToken?: InputMaybe<Scalars["String"]["input"]>;
  fcmToken?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
};

/** LLS Auth */
export type Auth = {
  __typename?: "Auth";
  token?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<User>;
};

/** LLS Book */
export type Book = {
  __typename?: "Book";
  acId?: Maybe<Scalars["Int"]["output"]>;
  annotationJobTitle?: Maybe<Scalars["String"]["output"]>;
  ark?: Maybe<Scalars["String"]["output"]>;
  arkFamily?: Maybe<Scalars["String"]["output"]>;
  chapters?: Maybe<Array<Maybe<Chapter>>>;
  classicColor?: Maybe<Scalars["String"]["output"]>;
  collection?: Maybe<Collection>;
  contributors?: Maybe<Scalars["String"]["output"]>;
  cover?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["String"]["output"]>;
  creditGsheetId?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  displayTitle?: Maybe<Scalars["String"]["output"]>;
  downloadResource?: Maybe<Scalars["String"]["output"]>;
  eanPrint?: Maybe<Scalars["String"]["output"]>;
  educationalGuides?: Maybe<Array<Maybe<Book>>>;
  epub?: Maybe<Scalars["String"]["output"]>;
  filters?: Maybe<Array<Maybe<Filter>>>;
  firstTeaserPage?: Maybe<Page>;
  firstValidPage?: Maybe<Page>;
  hasApplication?: Maybe<Scalars["Boolean"]["output"]>;
  hasNewDesign?: Maybe<Scalars["Boolean"]["output"]>;
  hasNoTeacherBook?: Maybe<Scalars["Boolean"]["output"]>;
  hasProduct?: Maybe<Scalars["Boolean"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  isClassic?: Maybe<Scalars["Boolean"]["output"]>;
  isClassicTextDark?: Maybe<Scalars["Boolean"]["output"]>;
  isEducationalGuide?: Maybe<Scalars["Boolean"]["output"]>;
  isNew?: Maybe<Scalars["Boolean"]["output"]>;
  isPrimary?: Maybe<Scalars["Boolean"]["output"]>;
  isRenewed?: Maybe<Scalars["Boolean"]["output"]>;
  isWorkbook?: Maybe<Scalars["Boolean"]["output"]>;
  isWorkplan?: Maybe<Scalars["Boolean"]["output"]>;
  lang?: Maybe<Scalars["String"]["output"]>;
  levels?: Maybe<Array<Maybe<Level>>>;
  mdContent?: Maybe<Scalars["Boolean"]["output"]>;
  nbContributors?: Maybe<Scalars["Int"]["output"]>;
  news?: Maybe<Array<Maybe<News>>>;
  notice?: Maybe<Scalars["String"]["output"]>;
  oldBook?: Maybe<Book>;
  parent?: Maybe<Book>;
  parts?: Maybe<Array<Maybe<Book>>>;
  pdf?: Maybe<Scalars["String"]["output"]>;
  prefix?: Maybe<Scalars["String"]["output"]>;
  premiumResources?: Maybe<Array<Maybe<PremiumResourceType>>>;
  price?: Maybe<Scalars["Int"]["output"]>;
  priceSubscription?: Maybe<Scalars["Int"]["output"]>;
  printOffset?: Maybe<Scalars["Int"]["output"]>;
  promotionalInsert?: Maybe<PromotionalInsert>;
  publicationDate?: Maybe<Scalars["String"]["output"]>;
  publisher?: Maybe<Scalars["String"]["output"]>;
  releaseVersion?: Maybe<Scalars["Int"]["output"]>;
  renderer?: Maybe<Scalars["String"]["output"]>;
  renewalLabel?: Maybe<Scalars["String"]["output"]>;
  resourcesMenu?: Maybe<Scalars["JSON"]["output"]>;
  revisionPages?: Maybe<Array<Maybe<Page>>>;
  size?: Maybe<Scalars["Long"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
  subjects?: Maybe<Array<Maybe<Subject>>>;
  summary?: Maybe<Summary>;
  teacherBook?: Maybe<Scalars["String"]["output"]>;
  teaser?: Maybe<Scalars["Boolean"]["output"]>;
  textbooks?: Maybe<Array<Maybe<Book>>>;
  title?: Maybe<Scalars["String"]["output"]>;
  tools?: Maybe<Array<Maybe<BookToolType>>>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
  uri?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
  urlLite?: Maybe<Scalars["String"]["output"]>;
  valid?: Maybe<Scalars["Boolean"]["output"]>;
  workbooks?: Maybe<Array<Maybe<Book>>>;
  workplanStudentsStats?: Maybe<Array<Maybe<WorkplanStudentsStats>>>;
  workplans?: Maybe<Array<Maybe<Book>>>;
  year?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Book */
export type BookNewsArgs = {
  endsAfter?: InputMaybe<Scalars["String"]["input"]>;
  startsBefore?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Book */
export type BookPromotionalInsertArgs = {
  levels?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  subjects?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS Book */
export type BookInput = {
  acId?: InputMaybe<Scalars["Int"]["input"]>;
  annotationJobTitle?: InputMaybe<Scalars["String"]["input"]>;
  ark?: InputMaybe<Scalars["String"]["input"]>;
  arkFamily?: InputMaybe<Scalars["String"]["input"]>;
  classicColor?: InputMaybe<Scalars["String"]["input"]>;
  collection?: InputMaybe<Scalars["Int"]["input"]>;
  contributors?: InputMaybe<Scalars["String"]["input"]>;
  cover?: InputMaybe<Scalars["String"]["input"]>;
  creditGsheetId?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  displayTitle?: InputMaybe<Scalars["String"]["input"]>;
  downloadResource?: InputMaybe<Scalars["String"]["input"]>;
  eanPrint?: InputMaybe<Scalars["String"]["input"]>;
  educationalGuides?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  epub?: InputMaybe<Scalars["String"]["input"]>;
  filters?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  hasApplication?: InputMaybe<Scalars["Boolean"]["input"]>;
  hasNewDesign?: InputMaybe<Scalars["Boolean"]["input"]>;
  hasNoTeacherBook?: InputMaybe<Scalars["Boolean"]["input"]>;
  hasProduct?: InputMaybe<Scalars["Boolean"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  isClassic?: InputMaybe<Scalars["Boolean"]["input"]>;
  isClassicTextDark?: InputMaybe<Scalars["Boolean"]["input"]>;
  isEducationalGuide?: InputMaybe<Scalars["Boolean"]["input"]>;
  isPrimary?: InputMaybe<Scalars["Boolean"]["input"]>;
  isRenewed?: InputMaybe<Scalars["Boolean"]["input"]>;
  isWorkbook?: InputMaybe<Scalars["Boolean"]["input"]>;
  isWorkplan?: InputMaybe<Scalars["Boolean"]["input"]>;
  lang?: InputMaybe<Scalars["String"]["input"]>;
  levels?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  mdContent?: InputMaybe<Scalars["Boolean"]["input"]>;
  nbContributors?: InputMaybe<Scalars["Int"]["input"]>;
  notice?: InputMaybe<Scalars["String"]["input"]>;
  pdf?: InputMaybe<Scalars["String"]["input"]>;
  prefix?: InputMaybe<Scalars["String"]["input"]>;
  price?: InputMaybe<Scalars["Int"]["input"]>;
  priceSubscription?: InputMaybe<Scalars["Int"]["input"]>;
  printOffset?: InputMaybe<Scalars["Int"]["input"]>;
  publicationDate?: InputMaybe<Scalars["String"]["input"]>;
  publisher?: InputMaybe<Scalars["String"]["input"]>;
  releaseVersion?: InputMaybe<Scalars["Int"]["input"]>;
  renderer?: InputMaybe<Scalars["String"]["input"]>;
  renewalLabel?: InputMaybe<Scalars["String"]["input"]>;
  resourcesMenu?: InputMaybe<Scalars["JSON"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  subjects?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  summary?: InputMaybe<SummaryInput>;
  teaser?: InputMaybe<Scalars["Boolean"]["input"]>;
  textbooks?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  tools?: InputMaybe<Array<InputMaybe<BookToolInputType>>>;
  uri?: InputMaybe<Scalars["String"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
  valid?: InputMaybe<Scalars["Boolean"]["input"]>;
  workbooks?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  workplans?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  year?: InputMaybe<Scalars["Int"]["input"]>;
};

/** LLS ToolInputType */
export type BookToolInputType = {
  books?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  color?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  isPremium?: InputMaybe<Scalars["Boolean"]["input"]>;
  locked?: InputMaybe<Scalars["Boolean"]["input"]>;
  order?: InputMaybe<Scalars["Int"]["input"]>;
  picture?: InputMaybe<Scalars["String"]["input"]>;
  profiles?: InputMaybe<Array<InputMaybe<ToolProfiles>>>;
  roles?: InputMaybe<Array<InputMaybe<ToolRoles>>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
  wording?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS BookToolType */
export type BookToolType = {
  __typename?: "BookToolType";
  books?: Maybe<Array<Maybe<Book>>>;
  color?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  isPremium?: Maybe<Scalars["Boolean"]["output"]>;
  locked?: Maybe<Scalars["Boolean"]["output"]>;
  order?: Maybe<Scalars["Int"]["output"]>;
  picture?: Maybe<Scalars["String"]["output"]>;
  profiles?: Maybe<Array<Maybe<ToolProfiles>>>;
  roles?: Maybe<Array<Maybe<ToolRoles>>>;
  title?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
  wording?: Maybe<Scalars["String"]["output"]>;
};

/** LLS BookmarkInputType */
export type BookmarkInputType = {
  docId?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  pageId?: InputMaybe<Scalars["Int"]["input"]>;
};

/** LLS BookmarkType */
export type BookmarkType = {
  __typename?: "BookmarkType";
  docId?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  page?: Maybe<Page>;
  pageId?: Maybe<Scalars["Int"]["output"]>;
  user?: Maybe<User>;
};

/** LLS Category */
export type Category = {
  __typename?: "Category";
  color?: Maybe<CategoryColor>;
  createdAt?: Maybe<Scalars["String"]["output"]>;
  favorites?: Maybe<Array<Maybe<Favorite>>>;
  id?: Maybe<Scalars["Int"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
};

/** LLS CategoryColor */
export type CategoryColor = {
  __typename?: "CategoryColor";
  background?: Maybe<Scalars["String"]["output"]>;
  font?: Maybe<Scalars["String"]["output"]>;
};

/** LLS CategoryInput */
export type CategoryInput = {
  favorites?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Chapter */
export type Chapter = {
  __typename?: "Chapter";
  audios?: Maybe<Scalars["String"]["output"]>;
  book?: Maybe<Book>;
  colorTheme?: Maybe<Scalars["String"]["output"]>;
  difficulty?: Maybe<Scalars["Int"]["output"]>;
  downloadResource?: Maybe<Scalars["String"]["output"]>;
  hasNewDesign?: Maybe<Scalars["Boolean"]["output"]>;
  hasNoTeacherBook?: Maybe<Scalars["Boolean"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  isVisible?: Maybe<Scalars["Boolean"]["output"]>;
  numShow?: Maybe<Scalars["String"]["output"]>;
  number?: Maybe<Scalars["Int"]["output"]>;
  oldBook?: Maybe<Book>;
  oldChapter?: Maybe<Chapter>;
  pages?: Maybe<Array<Maybe<Page>>>;
  related?: Maybe<Scalars["Int"]["output"]>;
  releaseVersion?: Maybe<Scalars["Int"]["output"]>;
  resources?: Maybe<Array<Maybe<ResourceType>>>;
  size?: Maybe<Scalars["Int"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
  teacherBook?: Maybe<Scalars["String"]["output"]>;
  teacherBookDate?: Maybe<Scalars["String"]["output"]>;
  teacherDoc?: Maybe<Scalars["String"]["output"]>;
  teaser?: Maybe<Scalars["Boolean"]["output"]>;
  theme?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
  urlLite?: Maybe<Scalars["String"]["output"]>;
  valid?: Maybe<Scalars["Boolean"]["output"]>;
  valign?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Chapter */
export type ChapterInput = {
  audios?: InputMaybe<Scalars["String"]["input"]>;
  book?: InputMaybe<Scalars["Int"]["input"]>;
  colorTheme?: InputMaybe<Scalars["String"]["input"]>;
  difficulty?: InputMaybe<Scalars["Int"]["input"]>;
  downloadResource?: InputMaybe<Scalars["String"]["input"]>;
  hasNewDesign?: InputMaybe<Scalars["Boolean"]["input"]>;
  hasNoTeacherBook?: InputMaybe<Scalars["Boolean"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  isVisible?: InputMaybe<Scalars["Boolean"]["input"]>;
  numShow?: InputMaybe<Scalars["String"]["input"]>;
  number?: InputMaybe<Scalars["Int"]["input"]>;
  related?: InputMaybe<Scalars["Int"]["input"]>;
  releaseVersion?: InputMaybe<Scalars["Int"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  teacherBook?: InputMaybe<Scalars["String"]["input"]>;
  teacherBookDate?: InputMaybe<Scalars["String"]["input"]>;
  teacherDoc?: InputMaybe<Scalars["String"]["input"]>;
  teaser?: InputMaybe<Scalars["Boolean"]["input"]>;
  theme?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
  valid?: InputMaybe<Scalars["Boolean"]["input"]>;
  valign?: InputMaybe<Scalars["String"]["input"]>;
};

export type Circonscription = {
  __typename?: "Circonscription";
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Collection */
export type Collection = {
  __typename?: "Collection";
  books?: Maybe<Array<Maybe<Book>>>;
  id?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  publisher?: Maybe<Scalars["String"]["output"]>;
  year?: Maybe<Scalars["Int"]["output"]>;
};

export type CommercialMutation = {
  __typename?: "CommercialMutation";
  /** Create a payment checkout url and return it */
  createPaymentUrl?: Maybe<PaymentUrl>;
};

export type CommercialMutationCreatePaymentUrlArgs = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  products?: InputMaybe<Scalars["JSON"]["input"]>;
};

/** LLS Community Project */
export type CommunityProject = {
  __typename?: "CommunityProject";
  description?: Maybe<Scalars["String"]["output"]>;
  displayName?: Maybe<Scalars["String"]["output"]>;
  endingDate?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  image?: Maybe<Scalars["String"]["output"]>;
  isFeatured?: Maybe<Scalars["Boolean"]["output"]>;
  isPublished?: Maybe<Scalars["Boolean"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  numberOfParticipants?: Maybe<Scalars["Int"]["output"]>;
  presenceMode?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  presenceModes?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  projectStatus?: Maybe<Scalars["String"]["output"]>;
  projectTypes?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  requirements?: Maybe<Scalars["String"]["output"]>;
  schoolTypes?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  slug?: Maybe<Scalars["String"]["output"]>;
  specificForm?: Maybe<Scalars["String"]["output"]>;
  startingDate?: Maybe<Scalars["String"]["output"]>;
  subjects?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

/** LLS Connector */
export type Connector = {
  __typename?: "Connector";
  basicAuthPassword?: Maybe<Scalars["String"]["output"]>;
  basicAuthUsername?: Maybe<Scalars["String"]["output"]>;
  certificate?: Maybe<Scalars["String"]["output"]>;
  company?: Maybe<Scalars["String"]["output"]>;
  entIdPath?: Maybe<Scalars["String"]["output"]>;
  firstnamePath?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  isAfterclasse?: Maybe<Scalars["Boolean"]["output"]>;
  lastnamePath?: Maybe<Scalars["String"]["output"]>;
  levelPath?: Maybe<Scalars["String"]["output"]>;
  loginUrl?: Maybe<Scalars["String"]["output"]>;
  logoutUrl?: Maybe<Scalars["String"]["output"]>;
  method?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  privateKey?: Maybe<Scalars["String"]["output"]>;
  profilPath?: Maybe<Scalars["String"]["output"]>;
  publicKey?: Maybe<Scalars["String"]["output"]>;
  rne?: Maybe<Scalars["String"]["output"]>;
  rnePath?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
  validateUrl?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Connector */
export type ConnectorInput = {
  basicAuthPassword?: InputMaybe<Scalars["String"]["input"]>;
  basicAuthUsername?: InputMaybe<Scalars["String"]["input"]>;
  certificate?: InputMaybe<Scalars["String"]["input"]>;
  company?: InputMaybe<Scalars["String"]["input"]>;
  entIdPath?: InputMaybe<Scalars["String"]["input"]>;
  firstnamePath?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  isAfterclasse?: InputMaybe<Scalars["Boolean"]["input"]>;
  lastnamePath?: InputMaybe<Scalars["String"]["input"]>;
  levelPath?: InputMaybe<Scalars["String"]["input"]>;
  loginUrl?: InputMaybe<Scalars["String"]["input"]>;
  logoutUrl?: InputMaybe<Scalars["String"]["input"]>;
  method?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  privateKey?: InputMaybe<Scalars["String"]["input"]>;
  profilPath?: InputMaybe<Scalars["String"]["input"]>;
  publicKey?: InputMaybe<Scalars["String"]["input"]>;
  rne?: InputMaybe<Scalars["String"]["input"]>;
  rnePath?: InputMaybe<Scalars["String"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
  validateUrl?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Contact */
export type Contact = {
  __typename?: "Contact";
  calendarUrl?: Maybe<Scalars["String"]["output"]>;
  departments?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  email?: Maybe<Scalars["String"]["output"]>;
  firstname?: Maybe<Scalars["String"]["output"]>;
  gender?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  lastname?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Contract */
export type Contract = {
  __typename?: "Contract";
  id?: Maybe<Scalars["String"]["output"]>;
  members?: Maybe<Array<Maybe<ContractMember>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Contract Member */
export type ContractMember = {
  __typename?: "ContractMember";
  email?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Create Quiz Input */
export type CreateQuizInput = {
  chapter?: InputMaybe<Scalars["Int"]["input"]>;
  content?: InputMaybe<Scalars["JSON"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<Scalars["Int"]["input"]>;
  owner?: InputMaybe<Scalars["Int"]["input"]>;
  parent?: InputMaybe<Scalars["Int"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Device */
export type Device = {
  __typename?: "Device";
  apps?: Maybe<Array<Maybe<App>>>;
  auth?: Maybe<Auth>;
  createdAt?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  license?: Maybe<License>;
  licenses?: Maybe<Array<Maybe<License>>>;
  model?: Maybe<Scalars["String"]["output"]>;
  os?: Maybe<Scalars["String"]["output"]>;
  osVersion?: Maybe<Scalars["String"]["output"]>;
  screenHeight?: Maybe<Scalars["Int"]["output"]>;
  screenWidth?: Maybe<Scalars["Int"]["output"]>;
  token?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
  users?: Maybe<Array<Maybe<User>>>;
  uudId?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Device */
export type DeviceInputType = {
  id?: InputMaybe<Scalars["Int"]["input"]>;
  model?: InputMaybe<Scalars["String"]["input"]>;
  os?: InputMaybe<Scalars["String"]["input"]>;
  osVersion?: InputMaybe<Scalars["String"]["input"]>;
  screenHeight?: InputMaybe<Scalars["Int"]["input"]>;
  screenWidth?: InputMaybe<Scalars["Int"]["input"]>;
  token?: InputMaybe<Scalars["String"]["input"]>;
  uudId?: InputMaybe<Scalars["String"]["input"]>;
};

export type DeviceViewerMutation = {
  __typename?: "DeviceViewerMutation";
  /** Activate a device and return it */
  activateDevice?: Maybe<Device>;
  /** Create a device and return it */
  createDevice?: Maybe<Device>;
  /** Delete a device and return it */
  deleteDevice?: Maybe<Device>;
  /** Logout user from a device and return it */
  logoutUserFromDevice?: Maybe<Device>;
  /** Reset a device and return it */
  resetDevice?: Maybe<Device>;
  /** Update application */
  updateApplication?: Maybe<App>;
  /** Update a device and return it */
  updateDevice?: Maybe<Device>;
};

export type DeviceViewerMutationActivateDeviceArgs = {
  code?: InputMaybe<Scalars["String"]["input"]>;
  device?: InputMaybe<Scalars["Int"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  token?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type DeviceViewerMutationCreateDeviceArgs = {
  device?: InputMaybe<DeviceInputType>;
};

export type DeviceViewerMutationDeleteDeviceArgs = {
  device?: InputMaybe<DeviceInputType>;
};

export type DeviceViewerMutationLogoutUserFromDeviceArgs = {
  deviceToken?: InputMaybe<Scalars["String"]["input"]>;
};

export type DeviceViewerMutationResetDeviceArgs = {
  deviceToken?: InputMaybe<Scalars["String"]["input"]>;
};

export type DeviceViewerMutationUpdateApplicationArgs = {
  application?: InputMaybe<AppInput>;
};

export type DeviceViewerMutationUpdateDeviceArgs = {
  device?: InputMaybe<DeviceInputType>;
};

/** LLS DocTemplate */
export type DocTemplate = {
  __typename?: "DocTemplate";
  book?: Maybe<Book>;
  content?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
};

/** LLS DocTemplate */
export type DocTemplateInput = {
  book?: InputMaybe<Scalars["Int"]["input"]>;
  content?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Primary Document Input */
export type DocumentInput = {
  audios?: InputMaybe<Scalars["JSON"]["input"]>;
  contentMd?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  images?: InputMaybe<Scalars["JSON"]["input"]>;
  isIndexable?: InputMaybe<Scalars["Boolean"]["input"]>;
  masks?: InputMaybe<Scalars["JSON"]["input"]>;
  metadata?: InputMaybe<Scalars["JSON"]["input"]>;
  renewalUpdatedAt?: InputMaybe<Scalars["String"]["input"]>;
  rives?: InputMaybe<Scalars["JSON"]["input"]>;
  rotation?: InputMaybe<Scalars["Int"]["input"]>;
  score?: InputMaybe<Scalars["Float"]["input"]>;
  subZones?: InputMaybe<Scalars["JSON"]["input"]>;
  uuid?: InputMaybe<Scalars["String"]["input"]>;
  videos?: InputMaybe<Scalars["JSON"]["input"]>;
};

/** LLS DocumentMd */
export type DocumentMd = {
  __typename?: "DocumentMd";
  annotations?: Maybe<Scalars["JSON"]["output"]>;
  answers?: Maybe<Scalars["JSON"]["output"]>;
  appreciations?: Maybe<Scalars["JSON"]["output"]>;
  audios?: Maybe<Scalars["JSON"]["output"]>;
  children?: Maybe<Array<Maybe<DocumentMd>>>;
  content?: Maybe<Scalars["String"]["output"]>;
  contentMd?: Maybe<Scalars["String"]["output"]>;
  correctionPicture?: Maybe<Scalars["String"]["output"]>;
  corrections?: Maybe<Scalars["JSON"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  images?: Maybe<Scalars["JSON"]["output"]>;
  isAiGenerated?: Maybe<Scalars["Boolean"]["output"]>;
  isIndexable?: Maybe<Scalars["Boolean"]["output"]>;
  isLearningAssessment?: Maybe<Scalars["Boolean"]["output"]>;
  isPartOfSession?: Maybe<Scalars["Boolean"]["output"]>;
  isPrimary?: Maybe<Scalars["Boolean"]["output"]>;
  isWorkplan?: Maybe<Scalars["Boolean"]["output"]>;
  layouts?: Maybe<Scalars["JSON"]["output"]>;
  masks?: Maybe<Scalars["JSON"]["output"]>;
  metadata?: Maybe<Scalars["JSON"]["output"]>;
  page?: Maybe<Page>;
  pearltreesContentMd?: Maybe<Scalars["String"]["output"]>;
  picWords?: Maybe<Array<Maybe<PicWord>>>;
  picture?: Maybe<Scalars["String"]["output"]>;
  premium?: Maybe<Scalars["Boolean"]["output"]>;
  renewalAddedAt?: Maybe<Scalars["String"]["output"]>;
  renewalUpdatedAt?: Maybe<Scalars["String"]["output"]>;
  responses?: Maybe<Scalars["JSON"]["output"]>;
  rightAnswers?: Maybe<Scalars["JSON"]["output"]>;
  rightResponses?: Maybe<Scalars["JSON"]["output"]>;
  rives?: Maybe<Scalars["JSON"]["output"]>;
  rotation?: Maybe<Scalars["Int"]["output"]>;
  score?: Maybe<Scalars["Float"]["output"]>;
  subZones?: Maybe<Scalars["JSON"]["output"]>;
  uuid?: Maybe<Scalars["String"]["output"]>;
  videos?: Maybe<Scalars["JSON"]["output"]>;
};

/** LLS DocumentMd */
export type DocumentMdContentMdArgs = {
  keepRenewalTags?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** PartType ChapterType or PageType */
export type ElementUnionType = Chapter | Page | SummaryPart;

/** LLS Estimate */
export type Estimate = {
  __typename?: "Estimate";
  createdAt?: Maybe<Scalars["String"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  functions?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  gender?: Maybe<Scalars["String"]["output"]>;
  hasPaper?: Maybe<Scalars["Boolean"]["output"]>;
  howDidYouKnowUs?: Maybe<HowDidYouKnowUs>;
  id?: Maybe<Scalars["String"]["output"]>;
  lastname?: Maybe<Scalars["String"]["output"]>;
  nbPaper?: Maybe<Scalars["Int"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  products?: Maybe<Array<Maybe<ProductEstimate>>>;
  school?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<User>;
};

/** LLS Estimate */
export type EstimateInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  functions?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  gender?: InputMaybe<Scalars["String"]["input"]>;
  hasPaper?: InputMaybe<Scalars["Boolean"]["input"]>;
  howDidYouKnowUs?: InputMaybe<HowDidYouKnowUs>;
  lastname?: InputMaybe<Scalars["String"]["input"]>;
  nbPaper?: InputMaybe<Scalars["Int"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  products?: InputMaybe<Array<InputMaybe<ProEstimateInput>>>;
  school?: InputMaybe<Scalars["String"]["input"]>;
  user?: InputMaybe<Scalars["Int"]["input"]>;
};

/** LLS Favorite */
export type Favorite = {
  __typename?: "Favorite";
  categories?: Maybe<Array<Maybe<Category>>>;
  createdAt?: Maybe<Scalars["String"]["output"]>;
  document?: Maybe<DocumentMd>;
  id?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS FavoriteInput */
export type FavoriteInput = {
  categories?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  docUuid?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  pageId?: InputMaybe<Scalars["Int"]["input"]>;
};

/** LLS Book filter */
export type Filter = {
  __typename?: "Filter";
  displayConditions?: Maybe<FilterDisplayConditions>;
  match?: Maybe<FilterMatch>;
  title?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<FilterGroup>;
};

export type FilterDisplayConditions = {
  __typename?: "FilterDisplayConditions";
  isPremium?: Maybe<Scalars["Boolean"]["output"]>;
  isTeacher?: Maybe<Scalars["Boolean"]["output"]>;
};

export type FilterDisplayConditionsInput = {
  isPremium?: InputMaybe<Scalars["Boolean"]["input"]>;
  isTeacher?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum FilterGroup {
  Custom = "CUSTOM",
  Perso = "PERSO",
  Premium = "PREMIUM",
}

/** LLS Filter Input */
export type FilterInput = {
  displayConditions?: InputMaybe<FilterDisplayConditionsInput>;
  match?: InputMaybe<FilterMatchInput>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<FilterGroup>;
};

export type FilterMatch = {
  __typename?: "FilterMatch";
  isOriginal?: Maybe<Scalars["Boolean"]["output"]>;
  premium?: Maybe<Scalars["Boolean"]["output"]>;
  thematicNames?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type FilterMatchInput = {
  isOriginal?: InputMaybe<Scalars["Boolean"]["input"]>;
  premium?: InputMaybe<Scalars["Boolean"]["input"]>;
  thematicNames?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** LLS Filter */
export type FilterType = {
  fieldName?: InputMaybe<Scalars["String"]["input"]>;
  fieldValue?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Follow */
export type Follow = {
  __typename?: "Follow";
  room?: Maybe<Scalars["JSON"]["output"]>;
};

/** LLS Follow */
export type FollowRoomArgs = {
  roomId?: InputMaybe<Scalars["String"]["input"]>;
};

/** Mutations for follow mode */
export type FollowMutationType = {
  __typename?: "FollowMutationType";
  /** Create Room Mutation */
  createRoom?: Maybe<Scalars["JSON"]["output"]>;
  /** On Connect Mutation */
  onConnect?: Maybe<Scalars["String"]["output"]>;
  /** Save Teacher Data Mutation */
  updateRoomData?: Maybe<Scalars["String"]["output"]>;
};

/** Mutations for follow mode */
export type FollowMutationTypeOnConnectArgs = {
  roomId?: InputMaybe<Scalars["String"]["input"]>;
  student?: InputMaybe<Scalars["JSON"]["input"]>;
};

/** Mutations for follow mode */
export type FollowMutationTypeUpdateRoomDataArgs = {
  roomId?: InputMaybe<Scalars["String"]["input"]>;
  teacherData?: InputMaybe<Scalars["JSON"]["input"]>;
};

/** LLS gar division */
export type GarDivision = {
  __typename?: "GarDivision";
  code?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  school?: Maybe<School>;
  students?: Maybe<Array<Maybe<PremiumUser>>>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Group */
export type Group = {
  __typename?: "Group";
  answeredExercises?: Maybe<Array<Maybe<DocumentMd>>>;
  code?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  isEnt?: Maybe<Scalars["Boolean"]["output"]>;
  levels?: Maybe<Array<Maybe<Level>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  owner?: Maybe<PremiumUser>;
  sharedCorrections?: Maybe<Array<Maybe<SharedCorrection>>>;
  sharedPages?: Maybe<Array<Maybe<Page>>>;
  students?: Maybe<Array<Maybe<PremiumUser>>>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Group */
export type GroupAnsweredExercisesArgs = {
  parentIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS Group */
export type GroupSharedPagesArgs = {
  sharedAfter?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Group Correction Documents */
export type GroupCorrectionDocumentsInput = {
  correctedUuids?: InputMaybe<Scalars["JSON"]["input"]>;
  pageId?: InputMaybe<Scalars["Int"]["input"]>;
  uuids?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** LLS Group Correction StudentPage */
export type GroupCorrectionStudentPageInput = {
  pageId?: InputMaybe<Scalars["Int"]["input"]>;
  userId?: InputMaybe<Scalars["Int"]["input"]>;
};

/** LLS GroupInput */
export type GroupInput = {
  code?: InputMaybe<Scalars["String"]["input"]>;
  garDivisionId?: InputMaybe<Scalars["Int"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  isEnt?: InputMaybe<Scalars["Boolean"]["input"]>;
  levels?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  owner?: InputMaybe<Scalars["Int"]["input"]>;
  students?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

export enum HowDidYouKnowUs {
  Email = "email",
  Mail = "mail",
  Other = "other",
  Phone = "phone",
  SchoolFair = "schoolFair",
  SocialNetwork = "socialNetwork",
  Talk = "talk",
}

/** LLS Level */
export type Level = {
  __typename?: "Level";
  code?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  isElementarySchool?: Maybe<Scalars["Boolean"]["output"]>;
  isGenHighSchool?: Maybe<Scalars["Boolean"]["output"]>;
  isHighSchool?: Maybe<Scalars["Boolean"]["output"]>;
  isMiddleSchool?: Maybe<Scalars["Boolean"]["output"]>;
  isPreSchool?: Maybe<Scalars["Boolean"]["output"]>;
  isProHighSchool?: Maybe<Scalars["Boolean"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  order?: Maybe<Scalars["Int"]["output"]>;
  scolomCategory?: Maybe<Scalars["String"]["output"]>;
  scolomLevel?: Maybe<Scalars["String"]["output"]>;
  scolomSchoolType?: Maybe<Scalars["String"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Lexical Flower */
export type LexicalFlower = {
  __typename?: "LexicalFlower";
  createdAt?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  settings?: Maybe<Scalars["JSON"]["output"]>;
  shapes?: Maybe<Array<Maybe<Scalars["JSON"]["output"]>>>;
  title?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Lexical Flower Input */
export type LexicalFlowerInput = {
  id?: InputMaybe<Scalars["Int"]["input"]>;
  settings?: InputMaybe<Scalars["JSON"]["input"]>;
  shapes?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS License */
export type License = {
  __typename?: "License";
  books?: Maybe<Array<Maybe<Book>>>;
  code?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["String"]["output"]>;
  credits?: Maybe<Scalars["Int"]["output"]>;
  creditsLeft?: Maybe<Scalars["Int"]["output"]>;
  devices?: Maybe<Array<Maybe<Device>>>;
  expiredAt?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  isEnabledForLearningAssessment?: Maybe<Scalars["Boolean"]["output"]>;
  reference?: Maybe<Scalars["String"]["output"]>;
  salesforceRef?: Maybe<Scalars["String"]["output"]>;
  school?: Maybe<School>;
  servers?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  status?: Maybe<Scalars["String"]["output"]>;
  subscriptions?: Maybe<Array<Maybe<Subscription>>>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<User>;
  valid?: Maybe<Scalars["Boolean"]["output"]>;
};

/** LLS Input License */
export type LicenseInput = {
  books?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  code?: InputMaybe<Scalars["String"]["input"]>;
  credits?: InputMaybe<Scalars["Int"]["input"]>;
  creditsLeft?: InputMaybe<Scalars["Int"]["input"]>;
  expiredAt?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  isEnabledForLearningAssessment?: InputMaybe<Scalars["Boolean"]["input"]>;
  reference?: InputMaybe<Scalars["String"]["input"]>;
  salesforceRef?: InputMaybe<Scalars["String"]["input"]>;
  school?: InputMaybe<Scalars["Int"]["input"]>;
  servers?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  user?: InputMaybe<Scalars["Int"]["input"]>;
  valid?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** LLS Marketing */
export type Marketing = {
  __typename?: "Marketing";
  analytics?: Maybe<Array<Maybe<Scalars["JSON"]["output"]>>>;
  builderIos?: Maybe<Array<Maybe<Scalars["JSON"]["output"]>>>;
  circonscriptions?: Maybe<Array<Maybe<Circonscription>>>;
  communityProjectById?: Maybe<CommunityProject>;
  communityProjects?: Maybe<Array<Maybe<CommunityProject>>>;
  faq?: Maybe<Array<Maybe<Scalars["JSON"]["output"]>>>;
  getBookUrisFromToken?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  getRandomWord?: Maybe<Words>;
  news?: Maybe<SearchNews>;
  validateWord?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Marketing */
export type MarketingAnalyticsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  qaFlags?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  token?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Marketing */
export type MarketingBuilderIosArgs = {
  modelName?: InputMaybe<Scalars["String"]["input"]>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  urlPath?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Marketing */
export type MarketingCommunityProjectByIdArgs = {
  id?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Marketing */
export type MarketingFaqArgs = {
  faqType?: InputMaybe<FaqType>;
};

/** LLS Marketing */
export type MarketingGetBookUrisFromTokenArgs = {
  classicsToken?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Marketing */
export type MarketingGetRandomWordArgs = {
  bookUri?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Marketing */
export type MarketingNewsArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  endsAfter?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  startsBefore?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Marketing */
export type MarketingValidateWordArgs = {
  bookUri?: InputMaybe<Scalars["String"]["input"]>;
  classicsToken?: InputMaybe<Scalars["String"]["input"]>;
  word?: InputMaybe<Scalars["String"]["input"]>;
};

export type MarketingMutation = {
  __typename?: "MarketingMutation";
  /** Add like to a question in faq */
  addLikeFaq?: Maybe<Scalars["JSON"]["output"]>;
  /** Create a ms-analytics log */
  createAnalytics?: Maybe<Analytics>;
  /** Create a ms-analytics log for mini-url */
  createMiniUrlAnalytics?: Maybe<Analytics>;
};

export type MarketingMutationAddLikeFaqArgs = {
  faqType?: InputMaybe<FaqType>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MarketingMutationCreateAnalyticsArgs = {
  analyticsParams?: InputMaybe<Scalars["JSONObject"]["input"]>;
  bookId?: InputMaybe<Scalars["Int"]["input"]>;
  chapterId?: InputMaybe<Scalars["Int"]["input"]>;
  deviceId?: InputMaybe<Scalars["Int"]["input"]>;
  event?: InputMaybe<AnalyticsEvents>;
  pageId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MarketingMutationCreateMiniUrlAnalyticsArgs = {
  bookId?: InputMaybe<Scalars["Int"]["input"]>;
  miniUrl?: InputMaybe<Scalars["String"]["input"]>;
  miniUrlRedirection?: InputMaybe<Scalars["String"]["input"]>;
  pageId?: InputMaybe<Scalars["Int"]["input"]>;
};

/** LLS Method */
export type Method = {
  __typename?: "Method";
  book?: Maybe<Book>;
  createdAt?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
  uri?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Method */
export type MethodInput = {
  book?: InputMaybe<Scalars["Int"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  uri?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Mini Url */
export type MiniUrl = {
  __typename?: "MiniUrl";
  content?: Maybe<MiniUrlContent>;
  path?: Maybe<Scalars["String"]["output"]>;
  redirect?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Mini Url Content */
export type MiniUrlContent = {
  __typename?: "MiniUrlContent";
  body?: Maybe<Scalars["String"]["output"]>;
  callLink?: Maybe<Scalars["String"]["output"]>;
  callText?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Mini Url Content Input */
export type MiniUrlContentInput = {
  body?: InputMaybe<Scalars["String"]["input"]>;
  callLink?: InputMaybe<Scalars["String"]["input"]>;
  callText?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Mini Url Input */
export type MiniUrlInput = {
  content?: InputMaybe<MiniUrlContentInput>;
  path?: InputMaybe<Scalars["String"]["input"]>;
  redirect?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS ModalityType */
export type ModalityInputType = {
  type?: InputMaybe<ModalityTypeEnum>;
  value?: InputMaybe<Scalars["Int"]["input"]>;
};

/** LLS ModalityType */
export type ModalityType = {
  __typename?: "ModalityType";
  type?: Maybe<ModalityTypeEnum>;
  value?: Maybe<Scalars["Int"]["output"]>;
};

export enum ModalityTypeEnum {
  Where = "where",
  Who = "who",
  Work = "work",
}

export type Mutation = {
  __typename?: "Mutation";
  admin?: Maybe<AdminMutation>;
  commercial?: Maybe<CommercialMutation>;
  deviceViewer?: Maybe<DeviceViewerMutation>;
  follow?: Maybe<FollowMutationType>;
  marketing?: Maybe<MarketingMutation>;
  referent?: Maybe<ReferentMutation>;
  viewer?: Maybe<ViewerMutation>;
};

export type MutationAdminArgs = {
  token?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationCommercialArgs = {
  token?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationDeviceViewerArgs = {
  token?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationFollowArgs = {
  token?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationMarketingArgs = {
  token?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationReferentArgs = {
  token?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationViewerArgs = {
  token?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS News */
export type News = {
  __typename?: "News";
  books?: Maybe<Array<Maybe<Book>>>;
  category?: Maybe<Scalars["String"]["output"]>;
  content?: Maybe<Scalars["String"]["output"]>;
  cover?: Maybe<Scalars["String"]["output"]>;
  displayTitle?: Maybe<Scalars["String"]["output"]>;
  endDate?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  levels?: Maybe<Array<Maybe<Level>>>;
  startDate?: Maybe<Scalars["String"]["output"]>;
  subjects?: Maybe<Array<Maybe<Subject>>>;
  title?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
};

/** LLS News */
export type NewsInput = {
  books?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  category?: InputMaybe<Scalars["String"]["input"]>;
  content?: InputMaybe<Scalars["String"]["input"]>;
  cover?: InputMaybe<Scalars["String"]["input"]>;
  displayTitle?: InputMaybe<Scalars["String"]["input"]>;
  endDate?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  levels?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  startDate?: InputMaybe<Scalars["String"]["input"]>;
  subjects?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  updatedAt?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Notification */
export type Notification = {
  __typename?: "Notification";
  content?: Maybe<NotificationContent>;
  createdAt?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  page?: Maybe<Page>;
  read?: Maybe<Scalars["Boolean"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Notification Content */
export type NotificationContent = {
  __typename?: "NotificationContent";
  appSubtitle?: Maybe<Scalars["String"]["output"]>;
  appUrl?: Maybe<Scalars["String"]["output"]>;
  pageInterval?: Maybe<Scalars["String"]["output"]>;
  subtitle?: Maybe<Scalars["String"]["output"]>;
  thumbnail?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Notification Input */
export type NotificationInput = {
  id?: InputMaybe<Scalars["String"]["input"]>;
  read?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** LLS Notion */
export type Notion = {
  __typename?: "Notion";
  createdAt?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Notion Input */
export type NotionInput = {
  id?: InputMaybe<Scalars["Int"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS OpportunityType */
export type OpportunityType = {
  __typename?: "OpportunityType";
  amountIncludingTaxes?: Maybe<Scalars["Float"]["output"]>;
  billingAccount?: Maybe<AccountType>;
  billingEmail?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  recordType?: Maybe<Scalars["String"]["output"]>;
  stageName?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
  vref?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Page */
export type Page = {
  __typename?: "Page";
  annotations?: Maybe<Scalars["JSON"]["output"]>;
  answers?: Maybe<Scalars["JSON"]["output"]>;
  appreciations?: Maybe<Scalars["JSON"]["output"]>;
  book?: Maybe<Book>;
  chapter?: Maybe<Chapter>;
  children?: Maybe<Array<Maybe<DocumentMd>>>;
  content?: Maybe<Scalars["String"]["output"]>;
  contentMd?: Maybe<Scalars["String"]["output"]>;
  correctionPicture?: Maybe<Scalars["String"]["output"]>;
  corrections?: Maybe<Scalars["JSON"]["output"]>;
  createdAt?: Maybe<Scalars["String"]["output"]>;
  displayTitle?: Maybe<Scalars["String"]["output"]>;
  hasNewDesign?: Maybe<Scalars["Boolean"]["output"]>;
  hasRightResponses?: Maybe<Scalars["Boolean"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  isAiGenerated?: Maybe<Scalars["Boolean"]["output"]>;
  isCorrected?: Maybe<Scalars["Boolean"]["output"]>;
  isCreatedFromScratch?: Maybe<Scalars["Boolean"]["output"]>;
  isExercise?: Maybe<Scalars["Boolean"]["output"]>;
  isLearningAssessment?: Maybe<Scalars["Boolean"]["output"]>;
  isOriginal?: Maybe<Scalars["Boolean"]["output"]>;
  isPartOfSession?: Maybe<Scalars["Boolean"]["output"]>;
  isPrimary?: Maybe<Scalars["Boolean"]["output"]>;
  isWorkplan?: Maybe<Scalars["Boolean"]["output"]>;
  layouts?: Maybe<Scalars["JSON"]["output"]>;
  metadata?: Maybe<Scalars["JSON"]["output"]>;
  nbPages?: Maybe<Scalars["Int"]["output"]>;
  nbRelatedPages?: Maybe<Scalars["Int"]["output"]>;
  nbSessionAnswersByGroups?: Maybe<Scalars["JSON"]["output"]>;
  numericOrder?: Maybe<Scalars["Int"]["output"]>;
  oldBook?: Maybe<Book>;
  oldChapter?: Maybe<Chapter>;
  oldLesson?: Maybe<Page>;
  oldPage?: Maybe<Page>;
  originalPage?: Maybe<Page>;
  page?: Maybe<Scalars["Int"]["output"]>;
  pageType?: Maybe<Scalars["String"]["output"]>;
  parent?: Maybe<Page>;
  pearltreesContentMd?: Maybe<Scalars["String"]["output"]>;
  picture?: Maybe<Scalars["String"]["output"]>;
  premium?: Maybe<Scalars["Boolean"]["output"]>;
  printUrls?: Maybe<Array<Maybe<PrintPage>>>;
  renewalAddedAt?: Maybe<Scalars["String"]["output"]>;
  renewedAt?: Maybe<Scalars["String"]["output"]>;
  responses?: Maybe<Scalars["JSON"]["output"]>;
  rightAnswers?: Maybe<Scalars["JSON"]["output"]>;
  rightResponses?: Maybe<Scalars["JSON"]["output"]>;
  seenAt?: Maybe<Scalars["String"]["output"]>;
  sharedAt?: Maybe<Scalars["String"]["output"]>;
  sharedCorrections?: Maybe<Array<Maybe<SharedCorrection>>>;
  sharedGroups?: Maybe<Array<Maybe<Group>>>;
  sharedTeacher?: Maybe<User>;
  sharedUsers?: Maybe<Array<Maybe<User>>>;
  slug?: Maybe<Scalars["String"]["output"]>;
  teaser?: Maybe<Scalars["Boolean"]["output"]>;
  thematicName?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<User>;
  valid?: Maybe<Scalars["Boolean"]["output"]>;
  workplans?: Maybe<Array<Maybe<WorkplanTaskType>>>;
};

/** LLS Page */
export type PageContentMdArgs = {
  keepRenewalTags?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** LLS Page Appreciation */
export type PageAppreciationInput = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  teacherId?: InputMaybe<Scalars["Int"]["input"]>;
};

/** LLS Search Lesson */
export type PageLesson = {
  __typename?: "PageLesson";
  hits?: Maybe<Array<Maybe<Page>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** Stripe checkout payment url */
export type PaymentUrl = {
  __typename?: "PaymentUrl";
  url?: Maybe<Scalars["String"]["output"]>;
};

/** LLS PicWord */
export type PicWord = {
  __typename?: "PicWord";
  h?: Maybe<Scalars["Float"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
  w?: Maybe<Scalars["Float"]["output"]>;
  word?: Maybe<Word>;
  x?: Maybe<Scalars["Float"]["output"]>;
  y?: Maybe<Scalars["Float"]["output"]>;
};

/** LLS PremiumResourceCategoryType */
export type PremiumResourceCategoryType = {
  __typename?: "PremiumResourceCategoryType";
  comingSoon?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  imgUrl?: Maybe<Scalars["String"]["output"]>;
  order?: Maybe<Scalars["Int"]["output"]>;
  subtitle?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
};

/** LLS PremiumResourceMetaCategoryType */
export type PremiumResourceMetaCategoryType = {
  __typename?: "PremiumResourceMetaCategoryType";
  subtitle?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
};

/** LLS PremiumResourceType */
export type PremiumResourceType = {
  __typename?: "PremiumResourceType";
  book?: Maybe<Book>;
  category?: Maybe<PremiumResourceCategoryType>;
  comingSoon?: Maybe<Scalars["String"]["output"]>;
  downloadBlocked?: Maybe<Scalars["Boolean"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  mediaType?: Maybe<Scalars["String"]["output"]>;
  metaCategory?: Maybe<PremiumResourceMetaCategoryType>;
  order?: Maybe<Scalars["Int"]["output"]>;
  subtitle?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
};

/** LLS PremiumUser */
export type PremiumUser = {
  __typename?: "PremiumUser";
  connectorName?: Maybe<Scalars["String"]["output"]>;
  firstname?: Maybe<Scalars["String"]["output"]>;
  gender?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  isGarUser?: Maybe<Scalars["Boolean"]["output"]>;
  isStudent?: Maybe<Scalars["Boolean"]["output"]>;
  isTeacher?: Maybe<Scalars["Boolean"]["output"]>;
  lastLogin?: Maybe<Scalars["String"]["output"]>;
  lastname?: Maybe<Scalars["String"]["output"]>;
  levels?: Maybe<Array<Maybe<Level>>>;
  schools?: Maybe<Array<Maybe<School>>>;
  subjects?: Maybe<Array<Maybe<Subject>>>;
};

/** LLS Print page */
export type PrintPage = {
  __typename?: "PrintPage";
  blurred?: Maybe<Scalars["Boolean"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
};

/** Product associated to a quantity */
export type ProEstimateInput = {
  discount?: InputMaybe<Scalars["Int"]["input"]>;
  ean?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  quantity?: InputMaybe<Scalars["Int"]["input"]>;
};

/** LLS Product */
export type Product = {
  __typename?: "Product";
  books?: Maybe<Array<Maybe<Book>>>;
  code?: Maybe<Scalars["String"]["output"]>;
  compactName?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  ean?: Maybe<Scalars["String"]["output"]>;
  format?: Maybe<Scalars["String"]["output"]>;
  gradientBottom?: Maybe<Scalars["String"]["output"]>;
  gradientTop?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  isAdoptant?: Maybe<Scalars["Boolean"]["output"]>;
  isSupportPlus?: Maybe<Scalars["Boolean"]["output"]>;
  isWorkbook?: Maybe<Scalars["Boolean"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  pack?: Maybe<Scalars["Boolean"]["output"]>;
  picture?: Maybe<Scalars["String"]["output"]>;
  price?: Maybe<Scalars["Float"]["output"]>;
  productCode?: Maybe<Scalars["String"]["output"]>;
  productType?: Maybe<Scalars["String"]["output"]>;
  support?: Maybe<Scalars["String"]["output"]>;
  urlDistributor?: Maybe<Scalars["String"]["output"]>;
  urlPrint?: Maybe<Scalars["String"]["output"]>;
};

/** Product associated to a quantity */
export type ProductEstimate = {
  __typename?: "ProductEstimate";
  discount?: Maybe<Scalars["Int"]["output"]>;
  ean?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  quantity?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Promotional Insert */
export type PromotionalInsert = {
  __typename?: "PromotionalInsert";
  ctaLabel?: Maybe<Scalars["String"]["output"]>;
  ctaLink?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  levels?: Maybe<Array<Maybe<Level>>>;
  subjects?: Maybe<Array<Maybe<Subject>>>;
  title?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Promotional Insert */
export type PromotionalInsertInput = {
  ctaLabel?: InputMaybe<Scalars["String"]["input"]>;
  ctaLink?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  levels?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  subjects?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export enum Publishers {
  Ac = "AC",
  Canope = "CANOPE",
  Community = "COMMUNITY",
  Esper = "ESPER",
  Lls = "LLS",
}

/** The query root of LLS GraphQL interface. */
export type Query = {
  __typename?: "Query";
  admin?: Maybe<Admin>;
  auth?: Maybe<Auth>;
  follow?: Maybe<Follow>;
  marketing?: Maybe<Marketing>;
  referent?: Maybe<Referent>;
  viewer?: Maybe<Viewer>;
};

/** The query root of LLS GraphQL interface. */
export type QueryAdminArgs = {
  token?: InputMaybe<Scalars["String"]["input"]>;
};

/** The query root of LLS GraphQL interface. */
export type QueryAuthArgs = {
  password?: InputMaybe<Scalars["String"]["input"]>;
  token?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

/** The query root of LLS GraphQL interface. */
export type QueryMarketingArgs = {
  token?: InputMaybe<Scalars["String"]["input"]>;
};

/** The query root of LLS GraphQL interface. */
export type QueryReferentArgs = {
  token?: InputMaybe<Scalars["String"]["input"]>;
};

/** The query root of LLS GraphQL interface. */
export type QueryViewerArgs = {
  token?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Quiz */
export type Quiz = {
  __typename?: "Quiz";
  chapter?: Maybe<Chapter>;
  content?: Maybe<Scalars["JSON"]["output"]>;
  createdAt?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  isFree?: Maybe<Scalars["Boolean"]["output"]>;
  isOriginal?: Maybe<Scalars["Boolean"]["output"]>;
  order?: Maybe<Scalars["Int"]["output"]>;
  original?: Maybe<Quiz>;
  owner?: Maybe<User>;
  parent?: Maybe<Quiz>;
  title?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
};

export type Referent = {
  __typename?: "Referent";
  licenses?: Maybe<SearchLicense>;
  students?: Maybe<SearchUser>;
  teachers?: Maybe<SearchUser>;
  users?: Maybe<SearchUser>;
};

export type ReferentLicensesArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  schoolIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

export type ReferentStudentsArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  schoolIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  subjectIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

export type ReferentTeachersArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  schoolIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  subjectIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

export type ReferentUsersArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  booksContributedToIds?: InputMaybe<
    Array<InputMaybe<Scalars["Int"]["input"]>>
  >;
  booksContributedToUris?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  emails?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  isAuthor?: InputMaybe<Scalars["Boolean"]["input"]>;
  isCoAuthor?: InputMaybe<Scalars["Boolean"]["input"]>;
  isConfirmed?: InputMaybe<Scalars["Boolean"]["input"]>;
  isContributor?: InputMaybe<Scalars["Boolean"]["input"]>;
  isDirector?: InputMaybe<Scalars["Boolean"]["input"]>;
  isPremium?: InputMaybe<Scalars["Boolean"]["input"]>;
  isSuperCoAuthor?: InputMaybe<Scalars["Boolean"]["input"]>;
  levelIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  profiles?: InputMaybe<Array<InputMaybe<UserProfile>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  schoolIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  subjectIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  usernames?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ReferentMutation = {
  __typename?: "ReferentMutation";
  /** Create a user from referent and return it */
  createUser?: Maybe<User>;
  /** Delete a user from referent and return it */
  deleteUser?: Maybe<User>;
  /** Update a user from referent and return it */
  updateUser?: Maybe<User>;
};

export type ReferentMutationCreateUserArgs = {
  profiles?: InputMaybe<Array<InputMaybe<UserProfile>>>;
  user: UserInput;
};

export type ReferentMutationDeleteUserArgs = {
  userId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ReferentMutationUpdateUserArgs = {
  user?: InputMaybe<UserInput>;
};

/** LLS ResourceInputType */
export type ResourceInputType = {
  categories?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  locked?: InputMaybe<Scalars["Boolean"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS ResourceType */
export type ResourceType = {
  __typename?: "ResourceType";
  categories?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  chapter?: Maybe<Chapter>;
  document?: Maybe<DocumentMd>;
  id?: Maybe<Scalars["Int"]["output"]>;
  locked?: Maybe<Scalars["Boolean"]["output"]>;
  page?: Maybe<Page>;
  title?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Sales Stats */
export type SalesStats = {
  __typename?: "SalesStats";
  book?: Maybe<SalesStatsBook>;
  command?: Maybe<SalesStatsCommand>;
  id?: Maybe<Scalars["Long"]["output"]>;
  level?: Maybe<SalesStatsLevel>;
  productItem?: Maybe<SalesStatsProductItem>;
  school?: Maybe<SalesStatsSchool>;
  subject?: Maybe<SalesStatsSubject>;
};

export type SalesStatsBook = {
  __typename?: "SalesStatsBook";
  id?: Maybe<Scalars["Int"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  year?: Maybe<Scalars["Int"]["output"]>;
};

export type SalesStatsCommand = {
  __typename?: "SalesStatsCommand";
  id?: Maybe<Scalars["String"]["output"]>;
  recordType?: Maybe<Scalars["String"]["output"]>;
  rne?: Maybe<Scalars["String"]["output"]>;
  validityPeriods?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
};

export type SalesStatsLevel = {
  __typename?: "SalesStatsLevel";
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type SalesStatsProductItem = {
  __typename?: "SalesStatsProductItem";
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  price?: Maybe<Scalars["Float"]["output"]>;
  priceBook?: Maybe<Scalars["String"]["output"]>;
  quantity?: Maybe<Scalars["Int"]["output"]>;
  totalPrice?: Maybe<Scalars["Float"]["output"]>;
};

export type SalesStatsSchool = {
  __typename?: "SalesStatsSchool";
  academyName?: Maybe<Scalars["String"]["output"]>;
  department?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  nbStudents?: Maybe<Scalars["Int"]["output"]>;
  prefix?: Maybe<Scalars["String"]["output"]>;
  retentionStatus?: Maybe<Scalars["String"]["output"]>;
  rne?: Maybe<Scalars["String"]["output"]>;
};

export type SalesStatsSubject = {
  __typename?: "SalesStatsSubject";
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

/** LLS School */
export type School = {
  __typename?: "School";
  _total?: Maybe<SchoolTotal>;
  academy?: Maybe<Academy>;
  address?: Maybe<Scalars["String"]["output"]>;
  analyticStats?: Maybe<Scalars["JSON"]["output"]>;
  city?: Maybe<Scalars["String"]["output"]>;
  confirmed?: Maybe<Scalars["Boolean"]["output"]>;
  connectors?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  country?: Maybe<Scalars["String"]["output"]>;
  department?: Maybe<Scalars["String"]["output"]>;
  entId?: Maybe<Scalars["String"]["output"]>;
  groups?: Maybe<Array<Maybe<Group>>>;
  id?: Maybe<Scalars["Int"]["output"]>;
  isHighSchool?: Maybe<Scalars["Boolean"]["output"]>;
  isMiddleSchool?: Maybe<Scalars["Boolean"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  prefix?: Maybe<Scalars["String"]["output"]>;
  rne?: Maybe<Scalars["String"]["output"]>;
  salesforceUrl?: Maybe<Scalars["String"]["output"]>;
  schoolTypes?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  stats?: Maybe<SchoolStats>;
  students?: Maybe<Array<Maybe<User>>>;
  teachers?: Maybe<Array<Maybe<User>>>;
  usePronote?: Maybe<Scalars["Boolean"]["output"]>;
  users?: Maybe<Array<Maybe<User>>>;
  validLicenses?: Maybe<Array<Maybe<SchoolValidLicence>>>;
  zipcode?: Maybe<Scalars["String"]["output"]>;
};

/** LLS School */
export type SchoolAnalyticStatsArgs = {
  bookId?: InputMaybe<Scalars["Int"]["input"]>;
};

/** LLS School */
export type SchoolGroupsArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  names?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** LLS School */
export type SchoolInput = {
  academy?: InputMaybe<Scalars["Int"]["input"]>;
  address?: InputMaybe<Scalars["String"]["input"]>;
  city?: InputMaybe<Scalars["String"]["input"]>;
  confirmed?: InputMaybe<Scalars["Boolean"]["input"]>;
  connectors?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  department?: InputMaybe<Scalars["String"]["input"]>;
  entId?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  prefix?: InputMaybe<Scalars["String"]["input"]>;
  rne?: InputMaybe<Scalars["String"]["input"]>;
  schoolTypes?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  usePronote?: InputMaybe<Scalars["Boolean"]["input"]>;
  zipcode?: InputMaybe<Scalars["String"]["input"]>;
};

export type SchoolStats = {
  __typename?: "SchoolStats";
  countDevices?: Maybe<Scalars["Int"]["output"]>;
  countStudents?: Maybe<Scalars["Int"]["output"]>;
  countTeachers?: Maybe<Scalars["Int"]["output"]>;
  credits?: Maybe<Scalars["Int"]["output"]>;
  reference?: Maybe<Scalars["String"]["output"]>;
};

/** LLS School Total */
export type SchoolTotal = {
  __typename?: "SchoolTotal";
  students?: Maybe<Scalars["Int"]["output"]>;
  teachers?: Maybe<Scalars["Int"]["output"]>;
  users?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS SchoolType */
export type SchoolType = {
  __typename?: "SchoolType";
  id?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  optional?: Maybe<Scalars["Boolean"]["output"]>;
  order?: Maybe<Scalars["Int"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
};

/** LLS School Valid Licences */
export type SchoolValidLicence = {
  __typename?: "SchoolValidLicence";
  books?: Maybe<Array<Maybe<Book>>>;
  id?: Maybe<Scalars["Int"]["output"]>;
  isEnabledForLearningAssessment?: Maybe<Scalars["Boolean"]["output"]>;
};

/** LLS Search Acedemy */
export type SearchAcademy = {
  __typename?: "SearchAcademy";
  hits?: Maybe<Array<Maybe<Academy>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search Book */
export type SearchBook = {
  __typename?: "SearchBook";
  hits?: Maybe<Array<Maybe<Book>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS SearchCategory */
export type SearchCategory = {
  __typename?: "SearchCategory";
  hits?: Maybe<Array<Maybe<Category>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search Chapter */
export type SearchChapter = {
  __typename?: "SearchChapter";
  hits?: Maybe<Array<Maybe<Chapter>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search Collection */
export type SearchCollection = {
  __typename?: "SearchCollection";
  hits?: Maybe<Array<Maybe<Collection>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search Connector */
export type SearchConnector = {
  __typename?: "SearchConnector";
  hits?: Maybe<Array<Maybe<Connector>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search Device */
export type SearchDevice = {
  __typename?: "SearchDevice";
  hits?: Maybe<Array<Maybe<Device>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search DocTemplate */
export type SearchDocTemplate = {
  __typename?: "SearchDocTemplate";
  hits?: Maybe<Array<Maybe<DocTemplate>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS DocumentMdType */
export type SearchDocumentMdType = {
  __typename?: "SearchDocumentMdType";
  hits?: Maybe<Array<Maybe<DocumentMd>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search Estimate */
export type SearchEstimate = {
  __typename?: "SearchEstimate";
  hits?: Maybe<Array<Maybe<Estimate>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS SearchFavorite */
export type SearchFavorite = {
  __typename?: "SearchFavorite";
  hits?: Maybe<Array<Maybe<Favorite>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search Lexical Flower */
export type SearchLexicalFlower = {
  __typename?: "SearchLexicalFlower";
  hits?: Maybe<Array<Maybe<LexicalFlower>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search License */
export type SearchLicense = {
  __typename?: "SearchLicense";
  hits?: Maybe<Array<Maybe<License>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search Method */
export type SearchMethod = {
  __typename?: "SearchMethod";
  hits?: Maybe<Array<Maybe<Method>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search News */
export type SearchNews = {
  __typename?: "SearchNews";
  hits?: Maybe<Array<Maybe<News>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search Notion */
export type SearchNotion = {
  __typename?: "SearchNotion";
  hits?: Maybe<Array<Maybe<Notion>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS SearchOpportunityType */
export type SearchOpportunityType = {
  __typename?: "SearchOpportunityType";
  hits?: Maybe<Array<Maybe<OpportunityType>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search Product */
export type SearchProductType = {
  __typename?: "SearchProductType";
  hits?: Maybe<Array<Maybe<Product>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search Promotional Insert */
export type SearchPromotionalInsert = {
  __typename?: "SearchPromotionalInsert";
  hits?: Maybe<Array<Maybe<PromotionalInsert>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search Quiz */
export type SearchQuiz = {
  __typename?: "SearchQuiz";
  hits?: Maybe<Array<Maybe<Quiz>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS SearchResourceType */
export type SearchResourceType = {
  __typename?: "SearchResourceType";
  hits?: Maybe<Array<Maybe<ResourceType>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search School */
export type SearchSchool = {
  __typename?: "SearchSchool";
  hits?: Maybe<Array<Maybe<School>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search SchoolType */
export type SearchSchoolType = {
  __typename?: "SearchSchoolType";
  hits?: Maybe<Array<Maybe<SchoolType>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search Subject */
export type SearchSubject = {
  __typename?: "SearchSubject";
  hits?: Maybe<Array<Maybe<Subject>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS SearchToolType */
export type SearchToolType = {
  __typename?: "SearchToolType";
  hits?: Maybe<Array<Maybe<ToolType>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search User */
export type SearchUser = {
  __typename?: "SearchUser";
  hits?: Maybe<Array<Maybe<User>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search VoltaireProjectItem */
export type SearchVoltaireProjectItem = {
  __typename?: "SearchVoltaireProjectItem";
  hits?: Maybe<Array<Maybe<VoltaireProjectItem>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Search Word */
export type SearchWord = {
  __typename?: "SearchWord";
  hits?: Maybe<Array<Maybe<Word>>>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS SharedCorrection */
export type SharedCorrection = {
  __typename?: "SharedCorrection";
  correctedUuids?: Maybe<Scalars["JSON"]["output"]>;
  pageId?: Maybe<Scalars["Int"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
  userIds?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  uuids?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export enum StageNames {
  Billing = "BILLING",
  Deployment = "DEPLOYMENT",
  Lost = "LOST",
  Won = "WON",
}

export enum StatUnitTypeEnum {
  Day = "day",
  Month = "month",
}

/** LLS Stats */
export type Stats = {
  __typename?: "Stats";
  groups?: Maybe<Scalars["JSON"]["output"]>;
  me?: Maybe<Scalars["JSON"]["output"]>;
  students?: Maybe<Scalars["JSON"]["output"]>;
};

/** LLS Stats */
export type StatsGroupsArgs = {
  createdAfter?: InputMaybe<Scalars["String"]["input"]>;
  dataSource?: InputMaybe<Scalars["String"]["input"]>;
  dimensions?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  fromStartSchoolDate?: InputMaybe<Scalars["Boolean"]["input"]>;
  groupIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  pageIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  statUnit?: InputMaybe<StatUnitTypeEnum>;
  studentIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS Stats */
export type StatsMeArgs = {
  createdAfter?: InputMaybe<Scalars["String"]["input"]>;
  createdBefore?: InputMaybe<Scalars["String"]["input"]>;
  dataSource?: InputMaybe<Scalars["String"]["input"]>;
  dimensions?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  fromStartSchoolDate?: InputMaybe<Scalars["Boolean"]["input"]>;
  pageIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  statUnit?: InputMaybe<StatUnitTypeEnum>;
  studentIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  tokens?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** LLS Stats */
export type StatsStudentsArgs = {
  createdAfter?: InputMaybe<Scalars["String"]["input"]>;
  dataSource?: InputMaybe<Scalars["String"]["input"]>;
  dimensions?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  fromStartSchoolDate?: InputMaybe<Scalars["Boolean"]["input"]>;
  pageIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  statUnit?: InputMaybe<StatUnitTypeEnum>;
  studentIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS Subject */
export type Subject = {
  __typename?: "Subject";
  children?: Maybe<Array<Maybe<Subject>>>;
  code?: Maybe<Scalars["String"]["output"]>;
  color?: Maybe<Scalars["String"]["output"]>;
  darkcolor?: Maybe<Scalars["String"]["output"]>;
  hasBooks?: Maybe<Scalars["Boolean"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  isSubsubject?: Maybe<Scalars["Boolean"]["output"]>;
  lightcolor?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  newsletterUrl?: Maybe<Scalars["String"]["output"]>;
  primaryColor?: Maybe<Scalars["String"]["output"]>;
  schoolTypes?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  scolomUri?: Maybe<Scalars["String"]["output"]>;
  shortname?: Maybe<Scalars["String"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
  slugHighschool?: Maybe<Scalars["String"]["output"]>;
  slugMiddleschool?: Maybe<Scalars["String"]["output"]>;
  tags?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  url?: Maybe<Scalars["String"]["output"]>;
  urlLite?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Subject */
export type SubjectChildrenArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
};

/** LLS GAR Subscription */
export type Subscription = {
  __typename?: "Subscription";
  affectationCategory?: Maybe<Scalars["String"]["output"]>;
  affectationType?: Maybe<Scalars["String"]["output"]>;
  beginDate?: Maybe<Scalars["String"]["output"]>;
  comment?: Maybe<Scalars["String"]["output"]>;
  commercialDistributorId?: Maybe<Scalars["String"]["output"]>;
  endDate?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  licenseNumber?: Maybe<Scalars["String"]["output"]>;
  resourceId?: Maybe<Scalars["String"]["output"]>;
  resourceLabel?: Maybe<Scalars["String"]["output"]>;
  resourceTypeId?: Maybe<Scalars["String"]["output"]>;
  targetAudience?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  uai?: Maybe<Scalars["String"]["output"]>;
};

export type SubscriptionType = {
  __typename?: "SubscriptionType";
  /** Subscriptions for follow mode */
  follow?: Maybe<Scalars["JSON"]["output"]>;
};

export type SubscriptionTypeFollowArgs = {
  roomId?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Book summary */
export type Summary = {
  __typename?: "Summary";
  elements?: Maybe<Array<Maybe<SummaryElement>>>;
};

/** LLS Book summary */
export type SummaryElementsArgs = {
  isVisible?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** LLS Book Summary element interface */
export type SummaryElement = {
  __typename?: "SummaryElement";
  element?: Maybe<ElementUnionType>;
  elements?: Maybe<Array<Maybe<SummaryElement>>>;
  id?: Maybe<Scalars["Int"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<ElementTypes>;
};

/** LLS Book Summary element interface */
export type SummaryElementElementsArgs = {
  isVisible?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** LLS Book Summary element */
export type SummaryElementInput = {
  elements?: InputMaybe<Array<InputMaybe<SummaryElementInput>>>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<ElementTypes>;
};

/** LLS Book summary */
export type SummaryInput = {
  elements?: InputMaybe<Array<InputMaybe<SummaryElementInput>>>;
};

/** LLS Book Summary part */
export type SummaryPart = {
  __typename?: "SummaryPart";
  elements?: Maybe<Array<Maybe<SummaryElement>>>;
  id?: Maybe<Scalars["Int"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<ElementTypes>;
};

/** LLS Test */
export type Test = {
  __typename?: "Test";
  id?: Maybe<Scalars["Int"]["output"]>;
};

/** LLS Tips */
export type Tip = {
  __typename?: "Tip";
  description?: Maybe<Scalars["String"]["output"]>;
  event?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
  users?: Maybe<Array<Maybe<TipsUsers>>>;
  videoUrl?: Maybe<Scalars["String"]["output"]>;
};

/** LLS ToolInputType */
export type ToolInputType = {
  books?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  color?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  isPremium?: InputMaybe<Scalars["Boolean"]["input"]>;
  locked?: InputMaybe<Scalars["Boolean"]["input"]>;
  order?: InputMaybe<Scalars["Int"]["input"]>;
  picture?: InputMaybe<Scalars["String"]["input"]>;
  profiles?: InputMaybe<Array<InputMaybe<ToolProfiles>>>;
  roles?: InputMaybe<Array<InputMaybe<ToolRoles>>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS ToolType */
export type ToolType = {
  __typename?: "ToolType";
  books?: Maybe<Array<Maybe<Book>>>;
  color?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  isPremium?: Maybe<Scalars["Boolean"]["output"]>;
  locked?: Maybe<Scalars["Boolean"]["output"]>;
  order?: Maybe<Scalars["Int"]["output"]>;
  picture?: Maybe<Scalars["String"]["output"]>;
  profiles?: Maybe<Array<Maybe<ToolProfiles>>>;
  roles?: Maybe<Array<Maybe<ToolRoles>>>;
  title?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
};

/** LLS TrialUserInputV2 */
export type TrialUserInputV2 = {
  schoolType?: InputMaybe<Scalars["String"]["input"]>;
  subjects?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS Create Quiz Input */
export type UpdateQuizInput = {
  content?: InputMaybe<Scalars["JSON"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<Scalars["Int"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS User */
export type User = {
  __typename?: "User";
  academicConfirmationToken?: Maybe<Scalars["String"]["output"]>;
  academicEmail?: Maybe<Scalars["String"]["output"]>;
  academicEnabled?: Maybe<Scalars["Boolean"]["output"]>;
  applications?: Maybe<Array<Maybe<App>>>;
  birth?: Maybe<Scalars["String"]["output"]>;
  bookmarks?: Maybe<Array<Maybe<BookmarkType>>>;
  books?: Maybe<Array<Maybe<Book>>>;
  booksContributedTo?: Maybe<Array<Maybe<Book>>>;
  booksV2?: Maybe<Array<Maybe<Book>>>;
  categories?: Maybe<SearchCategory>;
  confirmationToken?: Maybe<Scalars["String"]["output"]>;
  confirmed?: Maybe<Scalars["Boolean"]["output"]>;
  connections?: Maybe<Scalars["Int"]["output"]>;
  connectorName?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  contacts?: Maybe<Array<Maybe<Contact>>>;
  contracts?: Maybe<Array<Maybe<Contract>>>;
  copies?: Maybe<Array<Maybe<Page>>>;
  copyNotifications?: Maybe<Array<Maybe<Notification>>>;
  createdAt?: Maybe<Scalars["String"]["output"]>;
  drawerNotifications?: Maybe<Array<Maybe<Notification>>>;
  email?: Maybe<Scalars["String"]["output"]>;
  emailCanonical?: Maybe<Scalars["String"]["output"]>;
  enabled?: Maybe<Scalars["Boolean"]["output"]>;
  entId?: Maybe<Scalars["String"]["output"]>;
  entIds?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  favorites?: Maybe<SearchFavorite>;
  firebaseToken?: Maybe<Scalars["String"]["output"]>;
  firstname?: Maybe<Scalars["String"]["output"]>;
  fullname?: Maybe<Scalars["String"]["output"]>;
  functions?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  garDivisions?: Maybe<Array<Maybe<GarDivision>>>;
  gender?: Maybe<Scalars["String"]["output"]>;
  groups?: Maybe<Array<Maybe<Group>>>;
  hasContentNewsletter?: Maybe<Scalars["Boolean"]["output"]>;
  hasMarketingNewsletter?: Maybe<Scalars["Boolean"]["output"]>;
  hasPersonalLicense?: Maybe<Scalars["Boolean"]["output"]>;
  hasToUpdateInfos?: Maybe<Scalars["Boolean"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  interests?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  isAdmin?: Maybe<Scalars["Boolean"]["output"]>;
  isAuthor?: Maybe<Scalars["Boolean"]["output"]>;
  isCoAuthor?: Maybe<Scalars["Boolean"]["output"]>;
  isDirector?: Maybe<Scalars["Boolean"]["output"]>;
  isEditorEsper?: Maybe<Scalars["Boolean"]["output"]>;
  isEditorIDF?: Maybe<Scalars["Boolean"]["output"]>;
  isEditorLLS?: Maybe<Scalars["Boolean"]["output"]>;
  isGarUser?: Maybe<Scalars["Boolean"]["output"]>;
  isPremium?: Maybe<Scalars["Boolean"]["output"]>;
  isReferent?: Maybe<Scalars["Boolean"]["output"]>;
  isReviewer?: Maybe<Scalars["Boolean"]["output"]>;
  isSalesAdmin?: Maybe<Scalars["Boolean"]["output"]>;
  isStudent?: Maybe<Scalars["Boolean"]["output"]>;
  isSuperCoAuthor?: Maybe<Scalars["Boolean"]["output"]>;
  isSupport?: Maybe<Scalars["Boolean"]["output"]>;
  isTeacher?: Maybe<Scalars["Boolean"]["output"]>;
  isTrial?: Maybe<Scalars["Boolean"]["output"]>;
  lastActivitySeenAt?: Maybe<Scalars["String"]["output"]>;
  lastBooksViewed?: Maybe<Array<Maybe<Book>>>;
  lastLogin?: Maybe<Scalars["String"]["output"]>;
  lastPagesViewed?: Maybe<Array<Maybe<Page>>>;
  lastSurvey?: Maybe<Scalars["String"]["output"]>;
  lastname?: Maybe<Scalars["String"]["output"]>;
  levels?: Maybe<Array<Maybe<Level>>>;
  lexicalFlowers?: Maybe<SearchLexicalFlower>;
  lv1?: Maybe<Scalars["String"]["output"]>;
  lv2?: Maybe<Scalars["String"]["output"]>;
  mainNotifications?: Maybe<Array<Maybe<Notification>>>;
  needParentConsent?: Maybe<Scalars["Boolean"]["output"]>;
  onboarding?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  onboardingData?: Maybe<Scalars["JSON"]["output"]>;
  outLicensedBookVisitInfo?: Maybe<Scalars["JSON"]["output"]>;
  pages?: Maybe<Array<Maybe<Page>>>;
  passwordRequestedAt?: Maybe<Scalars["String"]["output"]>;
  passwordUpdateRequired?: Maybe<Scalars["Boolean"]["output"]>;
  picture?: Maybe<Scalars["String"]["output"]>;
  profileId?: Maybe<Scalars["Int"]["output"]>;
  profiles?: Maybe<Array<Maybe<UserProfile>>>;
  role?: Maybe<Scalars["String"]["output"]>;
  roleCalc?: Maybe<Scalars["String"]["output"]>;
  schoolTypes?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  schools?: Maybe<Array<Maybe<School>>>;
  sharedDocs?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  sharedPages?: Maybe<Array<Maybe<Page>>>;
  shouldKeepCustomPages?: Maybe<Scalars["Boolean"]["output"]>;
  shouldOnboard?: Maybe<Scalars["Boolean"]["output"]>;
  steps?: Maybe<Array<Maybe<Scalars["Boolean"]["output"]>>>;
  students?: Maybe<Array<Maybe<PremiumUser>>>;
  subjects?: Maybe<Array<Maybe<Subject>>>;
  teachers?: Maybe<Array<Maybe<PremiumUser>>>;
  tipOfTheDay?: Maybe<Tip>;
  tour?: Maybe<Scalars["Int"]["output"]>;
  trialStats?: Maybe<Scalars["JSON"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
  usePaper?: Maybe<Scalars["Boolean"]["output"]>;
  username?: Maybe<Scalars["String"]["output"]>;
};

/** LLS User */
export type UserBookmarksArgs = {
  bookIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS User */
export type UserCategoriesArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS User */
export type UserCopiesArgs = {
  parentIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS User */
export type UserCopyNotificationsArgs = {
  parentIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS User */
export type UserDrawerNotificationsArgs = {
  bookIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  read?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** LLS User */
export type UserFavoritesArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  docUuids?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  pageIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS User */
export type UserGroupsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  names?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** LLS User */
export type UserLastBooksViewedArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
};

/** LLS User */
export type UserLastPagesViewedArgs = {
  firstBooksViewed?: InputMaybe<Scalars["Int"]["input"]>;
  hasNewDesign?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** LLS User */
export type UserMainNotificationsArgs = {
  updatedAfter?: InputMaybe<Scalars["String"]["input"]>;
  updatedBefore?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS User */
export type UserPagesArgs = {
  bookIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  hasNewDesign?: InputMaybe<Scalars["Boolean"]["input"]>;
  updatedAfter?: InputMaybe<Scalars["String"]["input"]>;
  updatedBefore?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS User */
export type UserSharedPagesArgs = {
  parentIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS User */
export type UserStudentsArgs = {
  levelIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS User */
export type UserTeachersArgs = {
  subjectIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS User */
export type UserInput = {
  academicEmail?: InputMaybe<Scalars["String"]["input"]>;
  academicEnabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  birth?: InputMaybe<Scalars["String"]["input"]>;
  booksContributedTo?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  confirmationToken?: InputMaybe<Scalars["String"]["input"]>;
  confirmed?: InputMaybe<Scalars["Boolean"]["input"]>;
  connectorName?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  emailParent?: InputMaybe<Scalars["String"]["input"]>;
  enabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  firstname?: InputMaybe<Scalars["String"]["input"]>;
  functions?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  gender?: InputMaybe<Scalars["String"]["input"]>;
  hasContentNewsletter?: InputMaybe<Scalars["Boolean"]["input"]>;
  hasMarketingNewsletter?: InputMaybe<Scalars["Boolean"]["input"]>;
  hasToUpdateInfos?: InputMaybe<Scalars["Boolean"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  interests?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  lastPagesViewed?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  lastSurvey?: InputMaybe<Scalars["String"]["input"]>;
  lastname?: InputMaybe<Scalars["String"]["input"]>;
  levels?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  needParentConsent?: InputMaybe<Scalars["Boolean"]["input"]>;
  onboarding?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  onboardingData?: InputMaybe<Scalars["JSON"]["input"]>;
  outLicensedBookVisitInfo?: InputMaybe<Scalars["JSON"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  passwordUpdateRequired?: InputMaybe<Scalars["Boolean"]["input"]>;
  picture?: InputMaybe<Scalars["String"]["input"]>;
  profiles?: InputMaybe<Array<InputMaybe<UserProfile>>>;
  role?: InputMaybe<Scalars["String"]["input"]>;
  schoolTypes?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  schools?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  sharedDocs?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  shouldKeepCustomPages?: InputMaybe<Scalars["Boolean"]["input"]>;
  steps?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  subjects?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  tour?: InputMaybe<Scalars["Int"]["input"]>;
  usePaper?: InputMaybe<Scalars["Boolean"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export enum UserProfile {
  Admin = "admin",
  Author = "author",
  CoAuthor = "coAuthor",
  Director = "director",
  EditorEsper = "editorEsper",
  EditorLls = "editorLLS",
  Referent = "referent",
  Reviewer = "reviewer",
  SalesAdmin = "salesAdmin",
  Student = "student",
  SuperCoAuthor = "superCoAuthor",
  Support = "support",
  Teacher = "teacher",
}

/** LLS Viewer */
export type Viewer = {
  __typename?: "Viewer";
  academies?: Maybe<SearchAcademy>;
  books?: Maybe<SearchBook>;
  chapters?: Maybe<SearchChapter>;
  checkLicense?: Maybe<License>;
  collections?: Maybe<SearchCollection>;
  devices?: Maybe<SearchDevice>;
  docTemplates?: Maybe<SearchDocTemplate>;
  documents?: Maybe<SearchDocumentMdType>;
  educationalGuides?: Maybe<SearchBook>;
  estimates?: Maybe<SearchEstimate>;
  levels?: Maybe<Array<Maybe<Level>>>;
  licenses?: Maybe<SearchLicense>;
  me?: Maybe<User>;
  methods?: Maybe<SearchMethod>;
  miniUrls?: Maybe<Array<Maybe<MiniUrl>>>;
  notions?: Maybe<SearchNotion>;
  pages?: Maybe<PageLesson>;
  product?: Maybe<SearchProductType>;
  promotionalInserts?: Maybe<SearchPromotionalInsert>;
  quizzes?: Maybe<SearchQuiz>;
  resources?: Maybe<SearchResourceType>;
  schoolTypes?: Maybe<SearchSchoolType>;
  schools?: Maybe<SearchSchool>;
  stats?: Maybe<Stats>;
  students?: Maybe<SearchUser>;
  subjects?: Maybe<SearchSubject>;
  teachers?: Maybe<SearchUser>;
  textbooks?: Maybe<SearchBook>;
  thematics?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  tools?: Maybe<SearchToolType>;
  users?: Maybe<SearchUser>;
  voltaireProjectItems?: Maybe<SearchVoltaireProjectItem>;
  words?: Maybe<SearchWord>;
  workbooks?: Maybe<SearchBook>;
  workplans?: Maybe<SearchBook>;
};

/** LLS Viewer */
export type ViewerAcademiesArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Viewer */
export type ViewerBooksArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  collectionIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  hasNewDesign?: InputMaybe<Scalars["Boolean"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  isClassic?: InputMaybe<Scalars["Boolean"]["input"]>;
  isMainBook?: InputMaybe<Scalars["Boolean"]["input"]>;
  isPrimary?: InputMaybe<Scalars["Boolean"]["input"]>;
  isValid?: InputMaybe<Scalars["Boolean"]["input"]>;
  isWorkbook?: InputMaybe<Scalars["Boolean"]["input"]>;
  isWorkplan?: InputMaybe<Scalars["Boolean"]["input"]>;
  levelIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  prefixes?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  publishers?: InputMaybe<Array<InputMaybe<Publishers>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  slugs?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  subjectIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  uris?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  years?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS Viewer */
export type ViewerChaptersArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  bookIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Viewer */
export type ViewerCheckLicenseArgs = {
  code?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Viewer */
export type ViewerCollectionsArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Viewer */
export type ViewerDevicesArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS Viewer */
export type ViewerDocTemplatesArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  bookIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Viewer */
export type ViewerDocumentsArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  boost?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  levels?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  pageId?: InputMaybe<Scalars["Int"]["input"]>;
  searchMode?: InputMaybe<Scalars["String"]["input"]>;
  subjectIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  text?: InputMaybe<Scalars["String"]["input"]>;
  uuid?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Viewer */
export type ViewerEducationalGuidesArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Viewer */
export type ViewerEstimatesArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Viewer */
export type ViewerLicensesArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  schoolIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS Viewer */
export type ViewerMethodsArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  uris?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** LLS Viewer */
export type ViewerMiniUrlsArgs = {
  path?: InputMaybe<Scalars["String"]["input"]>;
  pattern?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Viewer */
export type ViewerNotionsArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  pageIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  pageSlugs?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Viewer */
export type ViewerPagesArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  bookIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  chapterIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  collectionIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  hasNewDesign?: InputMaybe<Scalars["Boolean"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  isOriginal?: InputMaybe<Scalars["Boolean"]["input"]>;
  isValid?: InputMaybe<Scalars["Boolean"]["input"]>;
  keywords?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  levelIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  oldLessonIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  originalPageIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  pages?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  parentIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  premium?: InputMaybe<Scalars["Boolean"]["input"]>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  questionIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  renewalAddedAts?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  schoolIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  sharedUserIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  slugs?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  subjectIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  tag?: InputMaybe<Scalars["String"]["input"]>;
  thematicNames?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  updatedAfter?: InputMaybe<Scalars["String"]["input"]>;
  updatedBefore?: InputMaybe<Scalars["String"]["input"]>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS Viewer */
export type ViewerProductArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  catalogs?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  isAdoptant?: InputMaybe<Scalars["Boolean"]["input"]>;
  isPack?: InputMaybe<Scalars["Boolean"]["input"]>;
  isSupportPlus?: InputMaybe<Scalars["Boolean"]["input"]>;
  licenseDurations?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Viewer */
export type ViewerPromotionalInsertsArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  levelIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  subjectIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS Viewer */
export type ViewerQuizzesArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  bookIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  chapterIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  isFree?: InputMaybe<Scalars["Boolean"]["input"]>;
  isOriginal?: InputMaybe<Scalars["Boolean"]["input"]>;
  ownerIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Viewer */
export type ViewerResourcesArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  categories?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  chapterIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  subjectIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  urls?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** LLS Viewer */
export type ViewerSchoolTypesArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  includeOptionals?: InputMaybe<Scalars["Boolean"]["input"]>;
  query?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Viewer */
export type ViewerSchoolsArgs = {
  academyIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  after?: InputMaybe<Scalars["Int"]["input"]>;
  departments?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  isConfirmed?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  rnes?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  schoolTypes?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  sortBy?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** LLS Viewer */
export type ViewerStudentsArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  schoolIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  subjectIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS Viewer */
export type ViewerSubjectsArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  isChildSubject?: InputMaybe<Scalars["Boolean"]["input"]>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** LLS Viewer */
export type ViewerTeachersArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  schoolIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  subjectIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS Viewer */
export type ViewerTextbooksArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Viewer */
export type ViewerToolsArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  bookIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

/** LLS Viewer */
export type ViewerUsersArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  booksContributedToIds?: InputMaybe<
    Array<InputMaybe<Scalars["Int"]["input"]>>
  >;
  booksContributedToUris?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  emails?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  isAuthor?: InputMaybe<Scalars["Boolean"]["input"]>;
  isCoAuthor?: InputMaybe<Scalars["Boolean"]["input"]>;
  isConfirmed?: InputMaybe<Scalars["Boolean"]["input"]>;
  isContributor?: InputMaybe<Scalars["Boolean"]["input"]>;
  isDirector?: InputMaybe<Scalars["Boolean"]["input"]>;
  isPremium?: InputMaybe<Scalars["Boolean"]["input"]>;
  isSuperCoAuthor?: InputMaybe<Scalars["Boolean"]["input"]>;
  levelIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  profiles?: InputMaybe<Array<InputMaybe<UserProfile>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
  schoolIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  subjectIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  usernames?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** LLS Viewer */
export type ViewerWordsArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Viewer */
export type ViewerWorkbooksArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Viewer */
export type ViewerWorkplansArgs = {
  after?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  query?: InputMaybe<Scalars["String"]["input"]>;
};

export type ViewerMutation = {
  __typename?: "ViewerMutation";
  /** Update group's corrections for a page by a teacher */
  addCorrectionsToGroup?: Maybe<Group>;
  /** Update student's corrections for a page by a teacher */
  addCorrectionsToStudents?: Maybe<Page>;
  /** Update student's corrections page by a teacher */
  addPageAppreciation?: Maybe<Page>;
  /** add current user to a group */
  addStudentToGroup?: Maybe<Group>;
  /** Add a bookmark for the current user */
  createBookmark?: Maybe<BookmarkType>;
  /** Add a category for the current user */
  createCategory?: Maybe<Category>;
  /** Create a estimate and return it */
  createEstimate?: Maybe<Estimate>;
  /** Create a favorite for the given categories */
  createFavorite?: Maybe<Favorite>;
  /** Add a group for the current user */
  createGroup?: Maybe<Group>;
  /** Create a lexical flower and return it */
  createLexicalFlower?: Maybe<LexicalFlower>;
  /** Create a custom page and return it */
  createPage?: Maybe<Page>;
  /** Create a quiz and return it */
  createQuiz?: Maybe<Quiz>;
  /** Create a test and returns its id */
  createTest?: Maybe<Test>;
  /** Create a user and return it */
  createUser?: Maybe<User>;
  /** LLS Create WorkplanTaskOptions */
  createWorkplanTaskOptions?: Maybe<WorkplanTaskOptionsType>;
  /** Create a workplan test and returns its id */
  createWorkplanTest?: Maybe<WorkplanTest>;
  /** Delete a bookmark for the current user */
  deleteBookmark?: Maybe<BookmarkType>;
  /** Delete a category for the current user */
  deleteCategory?: Maybe<Category>;
  /** Delete a group of the current user */
  deleteGroup?: Maybe<Group>;
  /** Delete a lexical flower and return it */
  deleteLexicalFlower?: Maybe<LexicalFlower>;
  /** Delete a page and return it */
  deletePage?: Maybe<Page>;
  /** Delete a quiz and return it */
  deleteQuiz?: Maybe<Quiz>;
  /** Generate a token for a trial user and return it */
  generateTrialUser?: Maybe<Scalars["String"]["output"]>;
  /** LLS publish a Workplan */
  publishWorkplan?: Maybe<WorkplanTaskOptionsType>;
  /** Share a page to a given group and return it */
  sharePageToGroup?: Maybe<Page>;
  /** Share a page to given users and return it */
  sharePageToUsers?: Maybe<Page>;
  /** Update a category for the current user */
  updateCategory?: Maybe<Category>;
  /** Update a favorite for the given categories */
  updateFavorite?: Maybe<Favorite>;
  /** Update a group of the current user */
  updateGroup?: Maybe<Group>;
  /** Update a lexical flower and return it */
  updateLexicalFlower?: Maybe<LexicalFlower>;
  /** Updates notification and returns it */
  updateNotification?: Maybe<Notification>;
  /** Update a page and return it */
  updatePage?: Maybe<Page>;
  /** Update a quiz and return it */
  updateQuiz?: Maybe<Quiz>;
  /** Update a user and return it */
  updateUser?: Maybe<User>;
  /** Update user last activity seen at and return user */
  updateUserLastActivitySeenAt?: Maybe<User>;
  /** Update user password */
  updateUserPassword?: Maybe<User>;
};

export type ViewerMutationAddCorrectionsToGroupArgs = {
  corrections?: InputMaybe<Array<InputMaybe<GroupCorrectionDocumentsInput>>>;
  groupId?: InputMaybe<Scalars["Int"]["input"]>;
  parentId?: InputMaybe<Scalars["Int"]["input"]>;
  studentPages?: InputMaybe<Array<InputMaybe<GroupCorrectionStudentPageInput>>>;
};

export type ViewerMutationAddCorrectionsToStudentsArgs = {
  corrections?: InputMaybe<Array<InputMaybe<GroupCorrectionDocumentsInput>>>;
  studentIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  studentPages?: InputMaybe<Array<InputMaybe<GroupCorrectionStudentPageInput>>>;
};

export type ViewerMutationAddPageAppreciationArgs = {
  appreciation?: InputMaybe<PageAppreciationInput>;
  pageId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ViewerMutationAddStudentToGroupArgs = {
  code?: InputMaybe<Scalars["String"]["input"]>;
};

export type ViewerMutationCreateBookmarkArgs = {
  bookmark?: InputMaybe<BookmarkInputType>;
};

export type ViewerMutationCreateCategoryArgs = {
  category?: InputMaybe<CategoryInput>;
};

export type ViewerMutationCreateEstimateArgs = {
  catalog?: InputMaybe<Scalars["String"]["input"]>;
  estimate?: InputMaybe<EstimateInput>;
};

export type ViewerMutationCreateFavoriteArgs = {
  favorite?: InputMaybe<FavoriteInput>;
};

export type ViewerMutationCreateGroupArgs = {
  group?: InputMaybe<GroupInput>;
};

export type ViewerMutationCreateLexicalFlowerArgs = {
  lexicalFlower?: InputMaybe<LexicalFlowerInput>;
};

export type ViewerMutationCreatePageArgs = {
  page?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type ViewerMutationCreateQuizArgs = {
  quiz?: InputMaybe<CreateQuizInput>;
};

export type ViewerMutationCreateTestArgs = {
  answeredUuids?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  pageId?: InputMaybe<Scalars["Int"]["input"]>;
  testContext?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type ViewerMutationCreateUserArgs = {
  profiles?: InputMaybe<Array<InputMaybe<UserProfile>>>;
  redirect?: InputMaybe<Scalars["String"]["input"]>;
  user: UserInput;
};

export type ViewerMutationCreateWorkplanTaskOptionsArgs = {
  options?: InputMaybe<Array<InputMaybe<WorkplanTaskOptionsInputType>>>;
  pageId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ViewerMutationCreateWorkplanTestArgs = {
  pageId?: InputMaybe<Scalars["Int"]["input"]>;
  testContext?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type ViewerMutationDeleteBookmarkArgs = {
  bookmark?: InputMaybe<BookmarkInputType>;
};

export type ViewerMutationDeleteCategoryArgs = {
  category?: InputMaybe<CategoryInput>;
};

export type ViewerMutationDeleteGroupArgs = {
  group?: InputMaybe<GroupInput>;
};

export type ViewerMutationDeleteLexicalFlowerArgs = {
  lexicalFlower?: InputMaybe<LexicalFlowerInput>;
};

export type ViewerMutationDeletePageArgs = {
  page?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type ViewerMutationDeleteQuizArgs = {
  quiz?: InputMaybe<UpdateQuizInput>;
};

export type ViewerMutationGenerateTrialUserArgs = {
  user: TrialUserInputV2;
};

export type ViewerMutationPublishWorkplanArgs = {
  options?: InputMaybe<Array<InputMaybe<WorkplanTaskOptionsInputType>>>;
  pageId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ViewerMutationSharePageToGroupArgs = {
  groupId?: InputMaybe<Scalars["Int"]["input"]>;
  pageId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ViewerMutationSharePageToUsersArgs = {
  pageId?: InputMaybe<Scalars["Int"]["input"]>;
  sharedUserIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

export type ViewerMutationUpdateCategoryArgs = {
  category?: InputMaybe<CategoryInput>;
};

export type ViewerMutationUpdateFavoriteArgs = {
  favorite?: InputMaybe<FavoriteInput>;
};

export type ViewerMutationUpdateGroupArgs = {
  group?: InputMaybe<GroupInput>;
};

export type ViewerMutationUpdateLexicalFlowerArgs = {
  lexicalFlower?: InputMaybe<LexicalFlowerInput>;
};

export type ViewerMutationUpdateNotificationArgs = {
  notification?: InputMaybe<NotificationInput>;
};

export type ViewerMutationUpdatePageArgs = {
  page?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type ViewerMutationUpdateQuizArgs = {
  quiz?: InputMaybe<UpdateQuizInput>;
};

export type ViewerMutationUpdateUserArgs = {
  user?: InputMaybe<UserInput>;
};

export type ViewerMutationUpdateUserPasswordArgs = {
  oldPassword?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS Primary VoltaireProjectItem */
export type VoltaireProjectItem = {
  __typename?: "VoltaireProjectItem";
  book?: Maybe<Scalars["Int"]["output"]>;
  category?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  number?: Maybe<Scalars["Int"]["output"]>;
  objectID?: Maybe<Scalars["String"]["output"]>;
  src?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Primary Word */
export type Word = {
  __typename?: "Word";
  createdAt?: Maybe<Scalars["String"]["output"]>;
  definition?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  src?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Primary Word Input */
export type WordInput = {
  definition?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  src?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

/** MS-marketing words for classic access */
export type Words = {
  __typename?: "Words";
  bookUri?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  line?: Maybe<Scalars["Int"]["output"]>;
  number?: Maybe<Scalars["Int"]["output"]>;
  page?: Maybe<Scalars["Int"]["output"]>;
  word?: Maybe<Scalars["String"]["output"]>;
};

/** Workplan Students Stats */
export type WorkplanStudentsStats = {
  __typename?: "WorkplanStudentsStats";
  chapter?: Maybe<Scalars["Int"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  isOriginal?: Maybe<Scalars["Boolean"]["output"]>;
  parent?: Maybe<Scalars["Int"]["output"]>;
  tasks?: Maybe<Array<Maybe<WorkplanTaskStudentsStatsType>>>;
  title?: Maybe<Scalars["String"]["output"]>;
};

/** LLS WorkplanTaskOptionsInput */
export type WorkplanTaskOptionsInputType = {
  createdAt?: InputMaybe<Scalars["String"]["input"]>;
  difficulty?: InputMaybe<Scalars["Int"]["input"]>;
  modalities?: InputMaybe<Array<InputMaybe<ModalityInputType>>>;
  publishedAt?: InputMaybe<Scalars["String"]["input"]>;
  teacherId?: InputMaybe<Scalars["Int"]["input"]>;
  time?: InputMaybe<Scalars["String"]["input"]>;
  updatedAt?: InputMaybe<Scalars["String"]["input"]>;
  uuid?: InputMaybe<Scalars["String"]["input"]>;
};

/** LLS WorkplanTaskOptions */
export type WorkplanTaskOptionsType = {
  __typename?: "WorkplanTaskOptionsType";
  createdAt?: Maybe<Scalars["String"]["output"]>;
  difficulty?: Maybe<Scalars["Int"]["output"]>;
  modalities?: Maybe<Array<Maybe<ModalityType>>>;
  page?: Maybe<Page>;
  publishedAt?: Maybe<Scalars["String"]["output"]>;
  teacher?: Maybe<User>;
  teacherId?: Maybe<Scalars["Int"]["output"]>;
  time?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
  uuid?: Maybe<Scalars["String"]["output"]>;
};

/** Workplan tasks Students Stats */
export type WorkplanTaskStudentsStatsType = {
  __typename?: "WorkplanTaskStudentsStatsType";
  isOptional?: Maybe<Scalars["Boolean"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  uuid?: Maybe<Scalars["String"]["output"]>;
};

/** LLS WorkplanTaskOptions */
export type WorkplanTaskType = {
  __typename?: "WorkplanTaskType";
  createdAt?: Maybe<Scalars["String"]["output"]>;
  options?: Maybe<Array<Maybe<WorkplanTaskOptionsType>>>;
  pageId?: Maybe<Scalars["Int"]["output"]>;
  schoolId?: Maybe<Scalars["Int"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
};

/** LLS Create Worplan Test */
export type WorkplanTest = {
  __typename?: "WorkplanTest";
  id?: Maybe<Scalars["Int"]["output"]>;
};

export enum ElementTypes {
  Chapter = "Chapter",
  Page = "Page",
  Part = "Part",
}

export enum FaqType {
  LectureCp = "LECTURE_CP",
  MathsCp = "MATHS_CP",
}

export enum TipsUsers {
  Student = "student",
  Teacher = "teacher",
}

export enum ToolProfiles {
  Student = "student",
  Teacher = "teacher",
}

export enum ToolRoles {
  RoleNotConnected = "ROLE_NOT_CONNECTED",
  RolePremium = "ROLE_PREMIUM",
  RoleUser = "ROLE_USER",
}

export type GetBooksQueryVariables = Exact<{ [key: string]: never }>;

export type GetBooksQuery = {
  __typename?: "Query";
  viewer: {
    __typename?: "Viewer";
    books: {
      __typename?: "SearchBook";
      hits?: Array<{
        __typename?: "Book";
        id: number;
        displayTitle?: string;
        url?: string;
        valid?: boolean;
        subjects: Array<{
          __typename?: "Subject";
          name: string;
          id?: number;
        }>;
        levels: Array<{
          __typename?: "Level";
          name: string;
          id?: number;
        }>;
      }>;
    };
  };
};

export type GetChaptersQueryVariables = Exact<{
  bookId: Scalars["Int"]["input"];
}>;

export type GetChaptersQuery = {
  __typename?: "Query";
  viewer: {
    __typename?: "Viewer";
    chapters: {
      __typename?: "SearchChapter";
      hits?: Array<{
        __typename?: "Chapter";
        id?: number;
        title?: string;
        url?: string;
        valid?: boolean;
        book?: { __typename?: "Book"; title?: string };
      }>;
    };
  };
};

export type GetPagesQueryVariables = Exact<{
  chapterId?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetPagesQuery = {
  __typename?: "Query";
  viewer: {
    __typename?: "Viewer";
    pages: {
      __typename?: "PageLesson";
      hits?: Array<{
        __typename?: "Page";
        id?: number;
        title?: string;
        picture?: string;
        page?: number;
        valid?: boolean;
        chapter?: { __typename?: "Chapter"; title?: string };
      }>;
    };
  };
};

export const GetBooksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetBooks" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "viewer" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "books" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hits" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "displayTitle" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "url" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "subjects" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "levels" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "valid" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetBooksQuery, GetBooksQueryVariables>;
export const GetChaptersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetChapters" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "bookId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "viewer" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "chapters" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "bookIds" },
                      value: {
                        kind: "ListValue",
                        values: [
                          {
                            kind: "Variable",
                            name: { kind: "Name", value: "bookId" },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hits" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "url" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "valid" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "book" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "title" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetChaptersQuery, GetChaptersQueryVariables>;
export const GetPagesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPages" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "chapterId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "viewer" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pages" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "chapterIds" },
                      value: {
                        kind: "ListValue",
                        values: [
                          {
                            kind: "Variable",
                            name: { kind: "Name", value: "chapterId" },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hits" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "picture" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "page" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "valid" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "chapter" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "title" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPagesQuery, GetPagesQueryVariables>;
