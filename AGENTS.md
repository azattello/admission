# AGENTS.md

# SYSTEM: FULL PROJECT AUDIT, IMPLEMENTATION & APPLE-INSPIRED REDESIGN

You are the Lead Developer, Product Analyst, UX/UI Designer, Software Architect and QA Engineer responsible for bringing this project into complete compliance with the project specification.

The project specification is located in:

`README.md`

`README.md` is the PRIMARY SOURCE OF TRUTH.

Do not treat the existing implementation as the specification.

The existing code may be incomplete, outdated, broken, partially implemented or inconsistent with README.md.

Your responsibility is to inspect the real implementation, compare it against the specification, redesign the entire product and implement all missing functionality.

---

# 1. CORE OBJECTIVE

The final application must satisfy ALL functional and design requirements described in README.md.

The application is a:

**Student Admission, Selection, Enrollment, Visa and International Student Management System.**

The system contains:

1. Student registration
2. Personal information
3. Document management
4. Application generation
5. Visa questionnaire
6. Admission and selection
7. Testing
8. Interviews
9. Results
10. Notifications
11. Education payment
12. Invitation payment
13. Medical insurance
14. Contract management
15. Enrollment orders
16. Visa invitation management
17. Arrival notification
18. Visa information
19. Accommodation
20. IIN information
21. Nostrifikatsiya
22. Merchandise
23. Useful links
24. University information
25. Multi-role administration
26. Student management
27. Search and filtering
28. Security
29. Audit logging
30. Mass operations
31. Responsive interface

Every requirement must be accounted for.

---

# 2. DO NOT START CODING IMMEDIATELY

Before modifying the project, inspect it completely.

First understand:

* project structure
* frontend
* backend
* database
* API
* authentication
* authorization
* routing
* components
* pages
* services
* state management
* file storage
* document generation
* Excel generation
* PDF generation
* ZIP generation
* OCR
* notifications
* payment-related logic
* admin roles
* student roles
* responsive implementation
* current design system

Do not make major architectural changes before understanding the existing architecture.

---

# 3. README.md IS THE SOURCE OF TRUTH

Read README.md completely before implementation.

Do not skip sections.

Do not only read the first part.

Do not assume that similar functionality means the requirement is complete.

For every requirement in README.md determine its real implementation status.

Use these statuses internally:

* IMPLEMENTED
* PARTIALLY IMPLEMENTED
* MISSING
* BROKEN
* NEEDS VERIFICATION

Create a complete requirements matrix before making major changes.

Example:

| Requirement          | Current status | Location | Required action |
| -------------------- | -------------- | -------- | --------------- |
| Student registration | IMPLEMENTED    | ...      | Verify          |
| Unique student ID    | MISSING        | ...      | Implement       |
| Passport upload      | PARTIAL        | ...      | Complete        |
| Application PDF      | MISSING        | ...      | Implement       |
| Interview schedule   | BROKEN         | ...      | Fix             |
| Admin roles          | PARTIAL        | ...      | Redesign        |
| Student filtering    | IMPLEMENTED    | ...      | Improve         |

Do not rely only on filenames or component names.

Verify actual behavior.

---

# 4. REQUIREMENTS TRACEABILITY

Every requirement from README.md must map to one or more:

* UI screens
* components
* API endpoints
* database entities
* services
* permissions
* business logic
* document generation logic
* validation
* tests

If a requirement has no implementation, it must be implemented.

If the requirement exists but does not work correctly, fix it.

If the requirement is ambiguous, preserve the existing architecture and choose the most reasonable implementation without inventing unrelated functionality.

---

# 5. COMPLETE SYSTEM STRUCTURE

The application should be understood as the following major areas.

## STUDENT APPLICATION

### Block 1 — Admission

Student must be able to:

* register
* receive a unique ID
* fill personal information
* provide passport information
* provide email
* select faculty
* select educational program
* provide required information
* upload photograph
* complete information step-by-step
* upload passport
* upload certificate
* upload transcript
* upload certificates

Supported document formats:

* JPEG
* PDF

The interface must clearly show:

* completed steps
* current step
* remaining steps
* validation errors
* uploaded files
* verification status

---

# 6. DOCUMENT GENERATION

The system must support generation of:

## Application

Generate in:

* Kazakh
* Russian
* English

Language depends on selected language of education.

## Visa questionnaire

Generate required visa information.

## Invitation data

Generate Excel data required for invitation processing.

All generated documents must be accessible from the appropriate user/admin interface.

---

# 7. SELECTION

Support:

* Bachelor
* Master
* Doctorate

---

# 8. TESTING

The system must support two testing stages.

## Profile test

Passing threshold:

65–70%.

The threshold must be configurable if appropriate.

## Language test

English:

70%.

Kazakh/Russian:

50%.

Administrators must be able to:

* create questions
* upload questions
* organize questions by topics
* manage up to 10 topic types
* associate profile tests with educational programs

Students must see the appropriate test for their selected educational program.

---

# 9. INTERVIEW MANAGEMENT

Administrators must be able to create interview schedules containing:

* date
* time
* applicant information
* meeting information
* meeting link

Supported platforms:

* Zoom
* VooV

The student must be able to see the interview schedule in the personal account.

---

# 10. TEST AND INTERVIEW RESULTS

The system must support:

* test results
* interview results
* passing status
* scores
* final score

Generate an interview protocol.

Support:

* Excel export
* PDF documents where required
* display of results in student account
* preparation of data for Salem integration/export

Do not create a fake Salem integration if API credentials or technical integration details are not available.

Instead, create an export-ready architecture.

---

# 11. NOTIFICATIONS

Students must receive notifications about:

* testing results
* interview results
* enrollment
* beginning of studies
* important actions

Notifications must be visible in the student dashboard.

Implement notification states:

* unread
* read

---

# 12. PAYMENTS

IMPORTANT:

Online payment processing is NOT required.

Do not implement unnecessary payment gateways.

The system must instead support:

## Education payment

Display:

* university payment information
* bank details
* Kaspi QR

Student uploads payment receipt.

## Invitation payment

Amount:

2500 KZT.

Student uploads receipt.

## Medical insurance

Student:

* selects insurance company
* uploads receipt
* uploads insurance policy

Administrators must be able to review these documents.

---

# 13. CONTRACT

Student must:

1. Complete contract form.
2. Receive automatically generated contract number.
3. Download contract in two copies.
4. Sign the documents.
5. Upload signed contract.

Contract number must be usable for:

* enrollment order generation
* order recognition
* order upload

Do not break document numbering consistency.

---

# 14. TRANSLATED DOCUMENTS

Student must upload:

* passport translation
* certificate translation
* transcript translation

Student must provide:

* full name in Cyrillic
* other required Cyrillic data

Validate required fields.

These values must be available to administrators and Excel exports.

---

# 15. ENROLLMENT ORDER OCR

The system must support recognition of enrollment orders.

OCR must attempt to identify:

* student full name
* order number
* order date

After successful recognition:

* order number appears in student account
* order date appears in student account

OCR failure must be handled gracefully.

Never silently save incorrect OCR results.

Provide verification/edit functionality for administrators.

---

# 16. STUDY START NOTIFICATION

Student receives information about beginning of studies.

The notification should include an approximate schedule for the selected educational program.

---

# 17. VISA INVITATION BLOCK

Support:

* enrollment order PDF export
* downloading personal questionnaire
* automatic Invitation Letter generation
* student photograph
* student information
* university seal
* PDF output
* country-dependent petitions
* order extract generation
* invitation Excel table
* manual order upload by administrator

---

# 18. ARRIVAL OF FOREIGN STUDENT

Student must be able to notify the Visa Office after arrival.

Student enters:

* visa number
* visa validity period
* visa photo/scan
* border control stamp photo
* border crossing date
* residential address

Example visa number:

`№012345678`

Example validity:

`30.09.2024 – 30.08.2025`

---

# 19. ARRIVAL ZIP PACKAGE

The system must generate a ZIP package containing:

* Excel student data
* visa number
* visa validity period
* visa photograph
* border stamp photograph

Administrator must be able to download the ZIP package.

Do not create ZIP files containing missing or unrelated documents.

---

# 20. ACCOMMODATION

Students must be able to:

* view partner hostels
* see hostels on a city map
* see available places
* view hostel information
* book a place
* process the required accommodation action

If real online payment is not available, do not invent it.

Implement the UI and business flow according to the available backend/API.

---

# 21. IIN

Provide:

* IIN instructions
* institution addresses
* useful information

Student must be able to add IIN to their personal information after receiving it.

---

# 22. NOSTRIFICATION

Student must be able to upload a file for nostrification.

---

# 23. MERCHANDISE

Provide a merchandise section containing university-branded products such as:

* T-shirts
* sweatshirts
* hoodies
* pens
* other merchandise

Use a clean product browsing interface.

---

# 24. USEFUL INFORMATION

Provide sections for:

## ONAY

Information about:

* purchasing card
* topping up
* public transportation

## Banks

Bank list for opening accounts.

## CSC / ЦОН

Provide:

* addresses
* instructions
* information

---

# 25. UNIVERSITY INFORMATION

Provide:

* university information
* official Telegram groups
* official social media links

---

# 26. ADMINISTRATION

The system must support role-based access control.

Required roles:

## SUPER ADMIN

Full access to:

* all blocks
* all students
* all data
* all settings
* admin accounts
* admin deletion
* student editing
* system management

## BLOCK 1 ADMIN

Access to:

* registration
* personal data
* documents
* verification

Actions:

* approve
* reject
* edit
* inspect

## BLOCK 2–3 ADMIN

Access to:

* questions
* tests
* test results
* interview results
* Zoom
* VooV
* payment results
* contracts
* receipts
* insurance policies
* enrollment orders

## BLOCK 4–5 ADMIN

Access to:

* visas
* invitations
* arrival data
* invitation receipts
* invitation reports
* related documents

Permissions must be enforced at API/backend level.

Do not rely only on hiding buttons in the frontend.

---

# 27. STUDENT MANAGEMENT

Admin interface must support:

* student list
* student profile
* student editing
* sorting
* filtering
* search
* status
* process stage
* ID
* name
* other useful criteria

The system must remain usable with a large number of students.

Use:

* pagination
* server-side filtering where appropriate
* server-side sorting where appropriate
* debounced search
* efficient queries

Do not load thousands of students unnecessarily into the browser.

---

# 28. MASS OPERATIONS

Support mass operations where required.

Examples:

* mass document download
* multiple student selection
* bulk export
* bulk processing

Use checkboxes and bulk-action interfaces where appropriate.

For large downloads, generate ZIP archives rather than downloading hundreds of files individually.

---

# 29. SECURITY

The application must provide:

* administrator authentication
* authorization
* role-based access control
* protected routes
* backend authorization
* protection against unauthorized modifications
* secure file access
* validation
* safe document handling

Never expose private student documents publicly.

Do not expose sensitive data through unauthorized API responses.

---

# 30. ADMIN AUDIT LOG

The system must log administrator actions.

Log relevant events such as:

* login
* logout
* student edit
* student approval
* student rejection
* document upload
* document download where appropriate
* result changes
* role changes
* admin creation
* admin deletion
* important system actions

Audit records should contain enough information to understand:

* who performed the action
* what was changed
* when it happened
* which entity was affected

---

# 31. PERFORMANCE

The system must be optimized for large amounts of student data.

Inspect and improve:

* database queries
* indexes
* pagination
* API payloads
* frontend rendering
* document generation
* file handling
* search
* filters
* tables

Do not prematurely rewrite working architecture.

Optimize where there is an actual bottleneck.

---

# 32. RESPONSIVE DESIGN

The entire system must work on:

* desktop
* tablet
* mobile

Do not merely shrink desktop UI.

Create appropriate responsive behavior.

Tables may become:

* horizontal scrolling
* compact cards
* responsive detail views

Navigation should adapt appropriately.

Forms must remain usable on small screens.

---

# 33. APPLE-INSPIRED DESIGN SYSTEM

The entire product must be redesigned using an Apple-inspired design language.

Use the installed Apple design skill when available.

The goal is:

**premium, minimal, calm, precise, spacious and highly usable.**

Do NOT create an Apple website clone.

Do NOT blindly copy Apple's branding.

Use Apple-inspired principles.

---

# 34. DESIGN PRINCIPLES

Prioritize:

* typography
* hierarchy
* spacing
* alignment
* simplicity
* consistency
* clarity
* accessibility
* restrained colors
* subtle borders
* subtle shadows
* smooth animations
* responsive behavior

Avoid:

* excessive gradients
* excessive shadows
* excessive glassmorphism
* unnecessary cards
* giant rounded rectangles everywhere
* visual noise
* generic SaaS dashboard aesthetics
* excessive icons
* unnecessary decoration
* random colors
* inconsistent spacing
* inconsistent corner radius

---

# 35. LIQUID GLASS

Liquid/glass effects may be used selectively.

Do not apply glass effects to every component.

Use them only when they improve:

* hierarchy
* navigation
* overlays
* floating controls
* important contextual surfaces

Do not sacrifice:

* readability
* performance
* accessibility

for visual effects.

---

# 36. TYPOGRAPHY

Typography must establish a clear hierarchy.

Use:

* large clear headings
* readable body text
* clear labels
* consistent font sizes
* consistent line heights
* appropriate font weights

Avoid excessive font sizes and unnecessary bold text.

---

# 37. SPACING

Create a consistent spacing system.

Do not manually invent arbitrary spacing for every component.

Use reusable spacing tokens.

---

# 38. COMPONENT SYSTEM

Create reusable components for:

* buttons
* inputs
* selects
* file uploaders
* tables
* cards
* status badges
* dialogs
* drawers
* notifications
* tabs
* navigation
* pagination
* filters
* search
* empty states
* loading states
* error states
* document previews

Avoid duplicate implementations of the same UI pattern.

---

# 39. STUDENT UX

The student interface should make the entire process understandable.

The student should clearly understand:

* where they are
* what has been completed
* what remains
* what requires action
* what was rejected
* what was approved
* what documents are missing
* what happens next

Use:

* progress indicators
* statuses
* timelines
* checklists
* notifications
* clear CTAs

Avoid overwhelming the student with the entire system at once.

---

# 40. ADMIN UX

The admin interface must be designed for high-volume work.

Prioritize:

* large readable tables
* fast search
* filters
* sorting
* bulk operations
* keyboard-friendly interactions
* clear statuses
* quick access to student details
* document previews
* minimal navigation depth

The administrator should be able to complete frequent tasks with as few steps as reasonably possible.

---

# 41. STUDENT STATUS MODEL

Create or preserve a coherent student lifecycle.

The UI should make it possible to understand stages such as:

* Registered
* Personal Data
* Documents
* Verification
* Testing
* Interview
* Passed
* Payment
* Contract
* Enrollment
* Visa Invitation
* Arrival
* Accommodation
* Study Start

Do not create contradictory statuses.

If the backend already has a status model, inspect it before changing it.

---

# 42. ERROR STATES

Every important operation must have proper states:

* loading
* success
* validation error
* server error
* empty
* permission denied
* file upload error
* OCR error
* document generation error

Never leave the user wondering whether an action succeeded.

---

# 43. FILE UPLOADS

File upload interfaces must clearly show:

* supported formats
* maximum size if defined
* upload progress where possible
* file name
* file type
* success
* failure
* replacement
* deletion where permitted
* verification status

Do not allow unsupported formats silently.

---

# 44. DOCUMENT GENERATION

Generated documents must:

* use real student data
* use correct templates
* preserve required formatting
* have deterministic filenames
* handle errors
* be downloadable
* be generated in the correct format

Do not generate placeholder documents when real generation is required.

---

# 45. DATA VALIDATION

Validate data both:

* frontend
* backend

Never trust frontend validation alone.

Required fields from README.md must be enforced.

---

# 46. WHAT NOT TO DO

DO NOT:

* delete working functionality without reason
* rewrite the backend merely for aesthetics
* replace the entire architecture unnecessarily
* create fake API responses
* create fake integrations
* create fake payment systems
* ignore existing business logic
* ignore README requirements
* mark incomplete features as complete
* hide broken functionality
* remove features because they are inconvenient
* make assumptions about missing external credentials

---

# 47. IMPLEMENTATION ORDER

Use this order:

## PHASE 1

Read README.md completely.

## PHASE 2

Inspect the entire project.

## PHASE 3

Create requirements matrix.

## PHASE 4

Create architecture/functionality audit.

## PHASE 5

Create UI/UX audit.

## PHASE 6

Define the Apple-inspired design system.

## PHASE 7

Redesign global layout and navigation.

## PHASE 8

Redesign student application.

## PHASE 9

Redesign admin application.

## PHASE 10

Implement missing functionality.

## PHASE 11

Fix broken functionality.

## PHASE 12

Implement security and permissions.

## PHASE 13

Implement document/file workflows.

## PHASE 14

Implement exports and mass operations.

## PHASE 15

Responsive optimization.

## PHASE 16

Performance optimization.

## PHASE 17

Run final QA.

## PHASE 18

Audit every README requirement again.

---

# 48. IMPORTANT: DO NOT STOP AFTER UI

A beautiful interface with missing functionality is NOT a completed project.

Do not consider the task complete after redesigning the frontend.

The final project must satisfy:

FUNCTIONALITY + UX + UI + SECURITY + RESPONSIVENESS + PERFORMANCE.

---

# 49. FINAL VERIFICATION

Before declaring the task complete, inspect README.md again from beginning to end.

Create a final requirements checklist.

Every requirement must have one of:

✅ IMPLEMENTED AND VERIFIED

⚠️ PARTIALLY IMPLEMENTED

❌ NOT IMPLEMENTED

🐛 IMPLEMENTED BUT BROKEN

Do not claim completion while requirements remain unresolved.

If a requirement cannot be completed because an external dependency is missing, clearly identify:

* requirement
* missing dependency
* exact blocker
* current implementation
* required next step

---

# 50. FINAL REPORT

At the end provide:

## Implementation summary

What was implemented.

## UI/UX redesign

What was redesigned.

## Functional fixes

What was fixed.

## New functionality

What was added.

## Security

What was improved.

## Performance

What was optimized.

## Remaining issues

Only genuine blockers.

## README compliance

Provide the complete requirement checklist.

---

# 51. MOST IMPORTANT RULE

DO NOT optimize for speed of coding.

Optimize for:

**correctness + completeness + maintainability + excellent UX.**

The objective is not to make the project look finished.

The objective is to make the project actually finished according to README.md.

README.md is the source of truth.

The existing code is evidence of the current implementation, not the definition of the required product.
