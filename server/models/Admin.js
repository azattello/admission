const { Schema, model } = require("mongoose");

const permissionsList = [
  "manageStudents",
  "manageAdmins",
  "manageSettings",
  "manageContent",
  "viewReports",
  "approvePersonalData",
  "approveSelection",
  "approveContract",
  "approvePayment",
  "approveDocsTransfer",
  "approveOrder",
  "approveVisa",
  "viewStudents",
  "manageDocuments",
  "manageStudentProfile"
];

const AdminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: false },
  surname: { type: String, required: false },
  password: { type: String, required: true },
  phone: { type: String, required: false },
  role: {
    type: String,
    enum: ["superadmin", "block1_admin", "block2_admin", "block4_admin"],
    default: "block1_admin"
  },
  permissions: {
    type: [String],
    enum: permissionsList,
    default: function () {
      if (this.role === "superadmin") return permissionsList;
      if (this.role === "block1_admin") return ["approvePersonalData", "viewStudents", "manageDocuments", "manageStudentProfile"];
      if (this.role === "block2_admin") return ["approveSelection", "approvePayment", "approveContract", "approveDocsTransfer", "approveOrder", "viewStudents"];
      if (this.role === "block4_admin") return ["approveVisa", "viewStudents", "viewReports"];
      return [];
    }
  },
  profilePhoto: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Admin", AdminSchema);
