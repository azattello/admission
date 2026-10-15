const { Schema, model } = require("mongoose");

const FileSchema = new Schema({
  url: { type: String, required: false },
  fileName: { type: String },
});

const DocumentSchema = new Schema({
  files: [FileSchema],
  status: {
    type: String,
    enum: ["notUploaded", "pending", "verified", "rejected"],
    default: "notUploaded",
  },
  reviewedBy: { type: String, default: null },
  reviewedAt: { type: Date, default: null },
  comment: { type: String, default: "" },
});

const StageSchema = new Schema({
  registration: { type: String, enum: ["notStarted", "pending", "completed", "rejected"], default: "notStarted" },
  personal: { type: String, enum: ["notStarted", "pending", "completed", "rejected"], default: "notStarted" },
  documents: { type: String, enum: ["notStarted", "pending", "completed", "rejected"], default: "notStarted" },
  selection: { type: String, enum: ["notStarted", "pending", "completed", "rejected"], default: "notStarted" },
  agreement: { type: String, enum: ["notStarted", "pending", "completed", "rejected"], default: "notStarted" },
  payment: { type: String, enum: ["notStarted", "pending", "completed", "rejected"], default: "notStarted" },
  actionCheck: { type: String, enum: ["notStarted", "pending", "completed", "rejected"], default: "notStarted" },
  prikaz: { type: String, enum: ["notStarted", "pending", "completed", "rejected"], default: "notStarted" },
  visaInvitation: { type: String, enum: ["notStarted", "pending", "completed", "rejected"], default: "notStarted" },
  arrivalNotification: { type: String, enum: ["notStarted", "pending", "completed", "rejected"], default: "notStarted" },
});

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    studentId: { type: String, unique: true, sparse: true },
    role: {
        type: String,
        enum: ['student', 'abiturient', 'bachelor', 'master', 'phd'],
        default: "student",
        required: true
    },
    status: {
      type: String,
      enum: ['registered', 'personal_data', 'documents', 'verification', 'selection', 'interview', 'passed', 'payment', 'contract', 'enrollment', 'visa_invitation', 'arrival', 'accommodation', 'study_start'],
      default: 'registered'
    },
    admissionStage: {
      type: String,
      enum: ['registration', 'personal', 'documents', 'selection', 'agreement', 'payment', 'visa', 'arrival'],
      default: 'registration'
    },
    profilePhoto: { type: String },
    createdAt: { type: Date, default: Date.now },
    isVerifiedEmail: { type: Boolean, default: false },
    passportData: {
        gender: { type: String },
        birthDate: { type: Date },
        surname: { type: String },
        name: { type: String },
        patronymic: { type: String },
        passportNumber: { type: String },
        passportIssueDate: { type: Date },
        passportExpiryDate: { type: Date },
        issuedBy: { type: String },
        countryOfIssue: { type: String },
        citizenship: { type: String },
        nationality: { type: String },
        iin: { type: String },
        address: {
            city: { type: String },
            street: { type: String },
            houseNumber: { type: String }
        },
        phoneNumber: { type: String },
    },
    academicInfo: {
        degree: { type: String, enum: ['Бакалавриат', 'Магистратура', 'Докторантура'] },
        faculty: { type: String },
        specialty: { type: String },
        language: { type: String, enum: ['Русский', 'Английский', 'Kazakh', 'English'] }
    },
    passportStatus: {
        type: String,
        enum: ["notFilled", "pending", "verified", "rejected"],
        default: "notFilled"
    },

    documents: {
      passport: DocumentSchema,
      diploma: DocumentSchema,
      transcript: DocumentSchema,
      certificates: DocumentSchema,
      photo3x4: DocumentSchema
    },
    currentCourse: { type: String, enum: ["1", "2", "3", "4", "5", "6"], required: false },
    stages: { type: StageSchema, default: () => ({}) }
});

UserSchema.pre('save', function (next) {
  if (!this.studentId) {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    this.studentId = `ST-${randomNumber}`;
  }
  next();
});

module.exports = model('User', UserSchema);
