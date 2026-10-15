const ROLE_PERMISSIONS = {
  superadmin: [
    'manageStudents',
    'manageAdmins',
    'manageSettings',
    'approvePersonalData',
    'approveSelection',
    'approveContract',
    'approvePayment',
    'approveDocsTransfer',
    'approveOrder',
    'approveVisa',
    'viewReports',
    'manageContent'
  ],
  block1_admin: [
    'approvePersonalData',
    'viewStudents',
    'manageDocuments',
    'manageStudentProfile'
  ],
  block2_admin: [
    'approveSelection',
    'approvePayment',
    'approveContract',
    'approveDocsTransfer',
    'approveOrder',
    'viewReports',
    'viewStudents'
  ],
  block4_admin: [
    'approveVisa',
    'viewReports',
    'viewStudents'
  ]
};

function hasPermission(role, permission) {
  const normalizedRole = role || 'block1_admin';
  return Boolean(ROLE_PERMISSIONS[normalizedRole]?.includes(permission));
}

function canManageStudent(managerRole, targetStudentRole) {
  if (!managerRole || !targetStudentRole) return false;

  if (managerRole === 'superadmin') return true;
  if (managerRole === 'block1_admin' && targetStudentRole === 'student') return true;
  if (managerRole === 'block2_admin' && targetStudentRole === 'student') return true;
  if (managerRole === 'block4_admin' && targetStudentRole === 'student') return true;

  return false;
}

module.exports = {
  ROLE_PERMISSIONS,
  hasPermission,
  canManageStudent
};
