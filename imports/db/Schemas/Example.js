import { Meteor } from "meteor/meteor";
import { SimpleSchema } from "meteor/aldeed:simple-schema";

const ExpertWorkExperienceSchema = new SimpleSchema({
  _id: { type: String, optional: true },
  institution: { type: String, optional: true },
  startYear: { type: Date, optional: true },
  endYear: { type: Date, optional: true },
  description: { type: String, optional: true },
});

const ExpertCertificateSchema = new SimpleSchema({
  _id: { type: String, optional: true },
  name: { type: String, optional: true },
  document: { type: Object, optional: true }, // Burada sertifikanın upload edilmesi gerekiyor => Media object buraya konulacak, zorunlu değil
  dateOfCertificate: { type: Date, optional: true },
  description: { type: String, optional: true },
});

const ExpertEducationSchema = new SimpleSchema({
  _id: { type: String, optional: true },
  university: { type: String, optional: true },
  diploma: { type: Object, optional: true }, // Burada diplomanın upload edilmesi gerekiyor => Media object buraya konulacak
  startDate: { type: Date, optional: true },
  endDate: { type: Date, optional: true },
});

const ExpertBankInfoSchema = new SimpleSchema({
  dealerShipType: { type: String, optional: true },
  dealerShipName: { type: String, optional: true },
  dealerShipGsmNumber: { type: String, optional: true },
  dealerShipTaxOffice: { type: String, optional: true },
  dealerShipTaxNo: { type: String, optional: true },
  dealerShipLegalTitle: { type: String, optional: true },
  dealerShipContactName: { type: String, optional: true },
  dealerShipContactSurName: { type: String, optional: true },
  dealerShipEmail: { type: String, optional: true },
  dealerShipAddress: { type: String, optional: true },
  dealerShipIban: { type: String, optional: true },
  merchantID: { type: String, optional: true },
  paymentRate: { type: Number, decimal: true, optional: true }, // Ödemeden ne kadar pay verileceği burada yazılır
});

const ExpertServiceSchema = new SimpleSchema({
  _id: { type: String },
  name: { type: String, optional: true },
  description: { type: String, optional: true },
  price: { type: Number, optional: true },
  duration: { type: Number, optional: true },
  status: { type: Boolean, optional: true },
});

const Expertise = new SimpleSchema({
  _id: { type: String, optional: true },
  name: { type: String },
  expertiseId: { type: String },
});

const ExpertSchema = new SimpleSchema({
  title: { type: String, optional: true }, // "doktor" ahmet
  workPlace: { type: String, optional: true }, // kurum adi
  aboutme: { type: String, optional: true }, // hakkinda
  defaultSessionDuration: { type: Number, optional: true }, // ders uzunlugu
  defaultSessionGap: { type: Number, optional: true }, // mola uzunlugu
  defaultPrice: { type: Number, optional: true },
  status: { type: String, optional: true }, // expertise durumu - pending - reject - fulfilled

  expertise: { type: [Expertise], optional: true }, // expertise - id - name
  services: {
    type: [ExpertServiceSchema],
    optional: true,
  },
  bankInfo: {
    type: ExpertBankInfoSchema,
    optional: true,
  },
  // ---------------------------------------------

  educations: {
    type: [ExpertEducationSchema],
    optional: true,
  },
  certificates: {
    type: [ExpertCertificateSchema],
    optional: true,
  },
  workExperiences: {
    type: [ExpertWorkExperienceSchema],
    optional: true,
  },
});

const UsersSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
  },
  brothers: {
    type: [String],
    optional: true,
  },
  emails: {
    type: [Object],
  },
  "emails.$.address": {
    type: String,
    //regEx: SimpleSchema.RegEx.Email,
    label: "E-Posta",
  },
  "emails.$.verified": {
    type: Boolean,
  },
  "emails.$.type": {
    type: String,
    optional: true,
  },
  createdAt: {
    type: Date,
  },
  profile: {
    // public and modifiable
    type: Object,
  },
  "profile.expertInfo": {
    type: ExpertSchema,
    optional: true,
  },
  "profile.approvedPersonalDataProcessingAgreement": {
    type: Object,
    optional: true,
  },
  "profile.approvedPersonalDataProcessingAgreement.approved": {
    type: Boolean,
    optional: true,
  },
  "profile.approvedPersonalDataProcessingAgreement.createdAt": {
    type: Date,
    optional: true,
  },
  "profile.approvedMembershipAgreement": {
    type: Object,
    optional: true,
  },
  "profile.approvedMembershipAgreement.approved": {
    type: Boolean,
    optional: true,
  },
  "profile.approvedMembershipAgreement.createdAt": {
    type: Date,
    optional: true,
  },
  "profile.verificationRemainingTime": {
    type: Number,
    label: "E-mail doğrulaması için kalan süre.",
    defaultValue: 14,
  },
  "profile.birthday": {
    type: Date,
    label: "Doğum Tarihi",
    optional: true,
  },
  "profile.jobStartDate": {
    type: Date,
    label: "Doğum Tarihi",
    optional: true,
  },
  "profile.gender": {
    type: String,
    label: "Cinsiyet",
    optional: true,
  },
  "profile.edu.interruptedClassroom": {
    type: [Object],
    label: "Terk edilen sınıf",
    blackbox: true,
    optional: true,
  },
  "profile.edu.school": {
    type: Object,
    label: "Okul bilgisi",
    optional: true,
  },
  "profile.edu.schoolType": {
    type: Object,
    label: "Okul türü",
    optional: true,
    blackbox: true,
  },
  "profile.edu.schoolNumber": {
    type: String,
    label: "Okul no",
    optional: true,
  },
  "profile.edu.school._id": {
    type: String,
    optional: true,
  },
  "profile.edu.school.name": {
    type: String,
    optional: true,
  },
  "profile.edu.school.districtId": {
    type: String,
    optional: true,
  },
  "profile.edu.major": {
    type: String,
    label: "Bölüm",
    optional: true,
  },
  "profile.email": {
    type: String,
    //regEx: SimpleSchema.RegEx.Email
  },
  "profile.emailvalidataion": {
    type: Boolean,
    optional: true,
  },
  "profile.name": {
    type: String,
    min: 1,
    max: 45,
    label: "Ad",
    optional: true,
  },
  "profile.surname": {
    type: String,
    min: 1,
    max: 45,
    label: "Soyad",
    optional: true,
  },
  "profile.namesurname": {
    type: String,
    min: 1,
    max: 45,
    label: "Ad Soyad",
    optional: true,
  },
  "profile.tenantId": {
    type: String,
    label: "Site ID'si",
    optional: true,
  },
  "profile.avatar": {
    type: Object,
    label: "Avatar",
    blackbox: true,
  },
  "profile.address": {
    type: String,
    label: "Adres",
    optional: true,
  },
  "profile.phones": {
    type: [Object],
    label: "Telefonlar",
    optional: true,
    blackbox: true,
  },
  "profile.tcNo": {
    type: String,
    label: "TC No",
    optional: true,
  },
  "profile.credit": {
    type: Number,
    decimal: true,
    label: "Kredi",
    optional: true,
  },
  "profile.creditType": {
    type: Number,
    decimal: false,
    label: "Kredi Tipi",
    optional: true,
  },
  "profile.mId": {
    type: String,
    label: "Mysql ID",
    optional: true,
  },
  "profile.status": {
    type: Boolean,
    label: "Durum",
    optional: true,
  },
  "profile.description": {
    type: String,
    label: "Açıklama",
    optional: true,
  },
  "profile.myClassroomId": {
    type: String,
    label: "Eğitmenin sorumlu olduğu sınıf",
    optional: true,
  },
  "profile.selectedTenants": {
    type: [String],
    label: "Görüntülenebilecek tenantlar",
    optional: true,
  },
  "profile.educationList": {
    type: [String],
    label: "Aldığı kurslar",
    optional: true,
  },
  roles: {
    type: [String],
    optional: true,
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  status: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  "status.lastLogin": {
    type: [Object],
    optional: true,
    blackbox: true,
  },
  "status.online": {
    type: String,
    optional: true,
    blackbox: true,
  },
  salesman: {
    type: Object,
    label: "Eğitim Danışmanı",
    optional: true,
    blackbox: true,
  },
  activations: {
    type: [Object],
    label: "Aktivasyon ID'leri",
    optional: true,
    blackbox: true,
  },
  refundedActivation: {
    type: [Object],
    label: "Aktivasyon iadeleri",
    optional: true,
    blackbox: true,
  },
  activationLength: {
    type: Number,
    label: "Aktivasyon uzunluğu",
    optional: true,
    blackbox: true,
  },
  ownedReferenceCodes: {
    type: [String],
    label: "Referans Kod",
    optional: true,
  },
  type: {
    type: String,
    optional: true,
  },
  "profile.city": {
    type: Object,
    label: "Şehir",
    optional: true,
  },
  "profile.city._id": {
    type: String,
    optional: true,
  },
  "profile.city.name": {
    type: String,
    optional: true,
  },
  "profile.title": {
    type: Object,
    label: "Ünvan",
    optional: true,
  },
  "profile.title._id": {
    type: String,
    optional: true,
  },
  "profile.title.name": {
    type: String,
    optional: true,
  },
  "profile.department": {
    type: Object,
    label: "Birim",
    optional: true,
  },
  "profile.department._id": {
    type: String,
    optional: true,
  },
  "profile.department.name": {
    type: String,
    optional: true,
  },
  "profile.curriculums": {
    type: [String],
    optional: true,
  },
  frozen: {
    type: Object,
    label: "Hesap Dondurma İşlemi",
    blackbox: true,
  },
  refundedStatus: {
    type: Boolean,
    label: "Hesap İade İşlemi",
    blackbox: true,
    optional: true,
  },
  referanceCode: {
    type: String,
    label: "Referans Kodu",
    optional: true,
  },
  point: {
    type: Object,
  },
  "point.xp": {
    type: Number,
    label: "Deneyim Puanı",
    optional: true,
  },
  "point.ap": {
    type: Number,
    label: "Başarı Puanı",
    optional: true,
  },
  "point.hp": {
    type: Number,
    label: "Hayat Puanı",
    optional: true,
  },
  tags: {
    type: [Object],
    label: "Etiketler",
    optional: true,
    blackbox: true,
  },
  groupId: {
    type: String,
    label: "Grup Id",
    optional: true,
  },
  groups: {
    type: [String],
    label: "Gruplar",
    optional: true,
  },
  enteredLessonsRate: {
    type: Number,
    label: "Derse katılım oranı",
    optional: true,
  },
  enteredLessonsCount: {
    type: Object,
  },
  "enteredLessonsCount.semester": {
    type: Number,
    label: "Bir dönem boyunca girdiği ders sayısı",
    defaultValue: 0,
  },
  "enteredLessonsCount.allTimes": {
    type: Number,
    label: "Toplam girdiği ders sayısı",
    defaultValue: 0,
  },
  enteredArchivesCount: {
    type: Object,
  },
  "enteredArchivesCount.semester": {
    type: Number,
    label: "Bir dönem boyunca girdiği arşiv ders sayısı",
    defaultValue: 0,
  },
  "enteredArchivesCount.allTimes": {
    type: Number,
    label: "Toplam girdiği arşiv ders sayısı",
    defaultValue: 0,
  },
  limit: {
    type: Object,
  },
  "limit.live": {
    type: Number,
    label: "Girebileceği canlı ders sayısı",
    defaultValue: 5000,
  },
  "limit.archive": {
    type: Number,
    label: "Girebileceği arşiv ders sayısı",
    defaultValue: 10000,
  },
  "limit.p2p": {
    type: Number,
    label: "Girebileceği birebir ders sayısı",
    defaultValue: 0,
  },
  "limit.etudeRequest": {
    type: Number,
    label: "Etüt talep limiti",
    defaultValue: 10,
  },
  "limit.claimProposalComplaint": {
    type: Number,
    label: "İstek öneri şikayet gönderim limiti",
    defaultValue: 1,
  },
  enteredLessons: {
    type: [String],
    optional: true,
  },
  liveLessonTimeRange: {
    type: String,
    optional: true,
    blackbox: true,
  },

  todosCount: {
    type: Number,
    label: "Günlük yapılacak sayısı",
    defaultValue: 0,
  },
  notificationsCount: {
    type: Number,
    label: "Bildirim sayısı",
    defaultValue: 0,
  },
  referenceArticle: {
    type: String,
    label: "Referanslar",
    optional: true,
  },
  salesInformation: {
    type: String,
    label: "Satış Bilgisi",
    optional: true,
  },
  writtenLastNoteTime: {
    type: Date,
    label: "Bu kullanıcı için alınan son not zamanı",
    optional: true,
  },
  surveys: {
    type: [Object],
    optional: true,
    blackbox: true,
  },
  loc: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  contractNumber: {
    type: String,
    optional: true,
    label: "Öğrenci Sözleşme Numarası",
  },
  liveMessage: {
    type: Boolean,
    label: "Canlı yayında mesaj atabilme",
    defaultValue: true,
  },
  seeingEtudePanel: {
    type: Boolean,
    label: "Etüd talep paneli görüntüleme",
    defaultValue: true,
  },
  seeingWorkshopPanel: {
    type: Boolean,
    label: "Yeteneklerin keşfi paneli görüntüleme",
    defaultValue: true,
  },
  seeingHomeworkPanel: {
    type: Boolean,
    label: "Ödev paneli görüntüleme",
    defaultValue: true,
  },
  seeingSupportPanel: {
    type: Boolean,
    label: "Canlı destek talep paneli görüntüleme",
    defaultValue: true,
  },
  limitations: {
    type: Object,
    label: "Kullanıcı kısıtlamaları",
    optional: true,
    blackbox: true,
  },
  sendExamResultSms: {
    type: Boolean,
    label: "Sınav sonuçlarını sms ile gönder",
    defaultValue: false,
  },
  sendAbsenceSms: {
    type: Boolean,
    label: "Devamsızlığını sms ile gönderme",
    defaultValue: false,
  },
  supportStatus: {
    type: String,
    label: "Destek talebi karşılama durumu",
    defaultValue: "close",
  },
  mentor: {
    type: Object,
    label: "Kullanıcı rehberi",
    blackbox: true,
    optional: true,
  },
  updatedClassroom: {
    type: Boolean,
    label: "Sınıf güncellemesi",
    optional: true,
    defaultValue: false,
  },
  appointedSalesmans: {
    type: [String],
    label: "Atanan eğitim danışmanları",
    optional: true,
  },
  colour: {
    type: String,
    optional: true,
  },
  backup: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  seeingTrainingVideoPanel: {
    type: Boolean,
    label: "Eğitim videoları panelini görüntüleme",
    defaultValue: true,
  },
  seeingLiveLessonPanel: {
    type: Boolean,
    label: "Canlı yayın panelini görüntüleme",
    defaultValue: true,
  },
  seeingP2pPanel: {
    type: Boolean,
    label: "Birebir ders panelini görüntüleme",
    defaultValue: true,
  },
  seeingExamsPanel: {
    type: Boolean,
    label: "Sınavlar panelini görüntüleme",
    defaultValue: true,
  },
  children: {
    type: Object,
    label: "Veli hesapları için çocuğun bilgileri",
    blackbox: true,
    optional: true,
  },
  deleted: {
    type: Boolean,
    optional: true,
  },
  suspiciousActivity: {
    type: Object,
    label: "Şüpheli işlemler",
    blackbox: true,
    optional: true,
  },
  deletedAt: {
    type: Date,
    optional: true,
  },
  lastRefundAt: {
    type: Date,
    optional: true,
  },
  lastDivisionUpdateAt: {
    type: Date,
    optional: true,
  },
});

Meteor.users.attachSchema(UsersSchema);
