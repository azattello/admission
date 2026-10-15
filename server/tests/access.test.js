const test = require('node:test');
const assert = require('node:assert/strict');

const { hasPermission, canManageStudent } = require('../utils/roleAccess');

test('superadmin has full access to student data', () => {
  assert.equal(hasPermission('superadmin', 'manageStudents'), true);
  assert.equal(hasPermission('superadmin', 'approvePersonalData'), true);
});

test('block1 admin can review personal data and documents', () => {
  assert.equal(hasPermission('block1_admin', 'approvePersonalData'), true);
  assert.equal(hasPermission('block1_admin', 'approveSelection'), false);
});

test('block2 admin can review selection and payment but not personal data', () => {
  assert.equal(hasPermission('block2_admin', 'approveSelection'), true);
  assert.equal(hasPermission('block2_admin', 'approvePersonalData'), false);
});

test('student data access is restricted by role', () => {
  assert.equal(canManageStudent('superadmin', 'block1_admin'), true);
  assert.equal(canManageStudent('block1_admin', 'block2_admin'), false);
});
