# ChangeLog

This file lists notable changes for each release. It excludes conventional commit prefixes such as
`style:`, `test:`, `docs:`, and `chore:` in order to focus on the most important changes. To view
all changes, see the release notes or click the "View all changes..." link after a release.

A release with no changes listed here means all changes for that release were one of the above
prefixes.

## [v2025.12.21](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.20...v2025.12.21) - _10 December 2025_

### New features

- **backend**: add preliminary audit log support
- **frontend**: enable audit log for ProjectSchema and TemplateSchema

### Improvements

- improve logging by reducing duplicated code
- **backend**: define SchemaModule interface in schema.ts instead of #types
- **backend**: break up registerSchemas into smaller functions for improved readability

### Bug fixes

- use title instead of name prop on FieldPercent
- **frontend**: add missing indices property to schema definition

_[View all changes in v2025.12.21 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.20...v2025.12.21)_

## [v2025.12.20](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.19...v2025.12.20) - _9 December 2025_

_[View all changes in v2025.12.20 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.19...v2025.12.20)_

## [v2025.12.19](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.18...v2025.12.19) - _9 December 2025_

_[View all changes in v2025.12.19 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.18...v2025.12.19)_

## [v2025.12.18](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.17...v2025.12.18) - _9 December 2025_

_[View all changes in v2025.12.18 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.17...v2025.12.18)_

## [v2025.12.17](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.16...v2025.12.17) - _9 December 2025_

### Improvements

- use TypeError instead of Error when type is incorrect
- use replaceAll() instead of replace() since it is faster and safer
- remove call to Error.captureStackTrace()
- use Number.parseInt() instead of parseInt() as it is safer
- use TypeError when throwing error about type
- throw TypeError instead of Errors when type is incorrect
- use Number.isNaN() and Number.parseInt() over global functions as it is safer
- prefer Array.some() over Array.filter.length &gt; 0
- use Array.isArray() instead of `instance of Array` for type checking array
- use app.classList.toggle() for toggling class
- use for...of instead of Array.forEach() when looping through arrays
- use dataset instead of getAttribute() and throw early if root is not set
- use export from instead of re-export
- move fn to highest scope possible
- use .querySelector() instead of .getElementById(), etc., for consistent querying
- prefer destructured variables over direct property access
- use destructured property instead of accessing formState.fieldsValid.value

### Performance improvements

- use Set instead of array for noStackErrors since lookups are faster
- use RegEx.test() instead of String.match() for regex as it is more efficient
- use String.replaceAll() instead of String.replace( ) as it is faster and safer
- use Set instead of array for blacklist as it is more performant
- use String.replaceAll() instead of String.replace() as it is more performant
- use for...of instead of Array.forEach() as it is more performant and has additional benefits
- prefer for...of over Array.forEach()
- use Set instead of Array for requiredMsgs as it is more performant

_[View all changes in v2025.12.17 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.16...v2025.12.17)_

## [v2025.12.16](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.15...v2025.12.16) - _8 December 2025_

### Improvements

- move actual advance from footer to header of table for consistency
- move advances for interest to table header for consistency

### Bug fixes

- remove duplicated "add draw" button

_[View all changes in v2025.12.16 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.15...v2025.12.16)_

## [v2025.12.15](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.14...v2025.12.15) - _5 December 2025_

_[View all changes in v2025.12.15 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.14...v2025.12.15)_

## [v2025.12.14](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.13...v2025.12.14) - _5 December 2025_

_[View all changes in v2025.12.14 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.13...v2025.12.14)_

## [v2025.12.13](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.12...v2025.12.13) - _5 December 2025_

_[View all changes in v2025.12.13 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.12...v2025.12.13)_

## [v2025.12.12](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.11...v2025.12.12) - _5 December 2025_

_[View all changes in v2025.12.12 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.11...v2025.12.12)_

## [v2025.12.11](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.10...v2025.12.11) - _5 December 2025_

_[View all changes in v2025.12.11 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.10...v2025.12.11)_

## [v2025.12.10](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.9...v2025.12.10) - _5 December 2025_

_[View all changes in v2025.12.10 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.9...v2025.12.10)_

## [v2025.12.9](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.8...v2025.12.9) - _5 December 2025_

_[View all changes in v2025.12.9 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.8...v2025.12.9)_

## [v2025.12.8](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.7...v2025.12.8) - _5 December 2025_

_[View all changes in v2025.12.8 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.7...v2025.12.8)_

## [v2025.12.7](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.6...v2025.12.7) - _5 December 2025_

### Improvements

- add current release changelog as tag message and generate CHANGELOG.md before tagging to keep
  "chore: release" commit with correct version tag

_[View all changes in v2025.12.7 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.6...v2025.12.7)_

## [v2025.12.6](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.5...v2025.12.6) - _4 December 2025_

_[View all changes in v2025.12.6 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.5...v2025.12.6)_

## [v2025.12.5](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.4...v2025.12.5) - _4 December 2025_

_[View all changes in v2025.12.5 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.4...v2025.12.5)_

## [v2025.12.4](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.3...v2025.12.4) - _4 December 2025_

_[View all changes in v2025.12.4 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.3...v2025.12.4)_

## [v2025.12.3](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.2...v2025.12.3) - _4 December 2025_

### Improvements

- break up logic into separate files for improved DX and testability

_[View all changes in v2025.12.3 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.2...v2025.12.3)_

## [v2025.12.2](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.1...v2025.12.2) - _3 December 2025_

### Improvements

- break out header from project line items table for easier browsing of code
- break out project line items table footer to separate component for smaller components
- inject formState into child components of ProjectLineItemsTable instead of passing fieldsValid as
  prop

### Bug fixes

- use toThrowError() instead of toThrow() to pass eslint rules
- add guard against headerOffset being null
- improve typing in getRouteHandler()
- allow all characters in template name by default

_[View all changes in v2025.12.2 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.1...v2025.12.2)_

## [v2025.12.1](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.0...v2025.12.1) - _1 December 2025_

### New features

- add support for skipPagination configuration property on Schema to skip wrapping data in
  PaginatedResult

### Bug fixes

- skip wrapping data in PaginationResult when returning mock loan data

### Performance improvements

- prevent loans API endpoint from getting hit every time ProjectList.vue is mounted and only call
  when new project modal is visible

_[View all changes in v2025.12.1 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.12.0...v2025.12.1)_

## [v2025.12.0](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.11.5...v2025.12.0) - _1 December 2025_

### New features

- add schema and route definitions for mock loans
- enable ability to tell frontend to use mock loan API with .env file

### Improvements

- update LoanRepository to pull from ASP.NET API instead of directly from SQL Server
- move formatLoanNum() and format custNum() to config package
- move mock data and related functions to LoanRepository.mocks.ts and fix Loan typing across backend

### Bug fixes

- make loanDate and maturityDate nullable for now, as they will be going away
- ensure strings are quoted properly in vite.config.js
- use correct endpoint for loan service in frontend
- use correct property names when mapping parentLoans
- rename fractionalPercent to fractionalPercentField for consistency
- import formatCustNum() and formatLoanNum() from config/utils instead of #utils
- update custResult to use non-paginated result
- use properties from Loan interface when building parentLoans array
- mock loans API in dev only
- adjust base URL for loan API endpoint based on import.meta.env.VITE_MOCK_LOANS_API
- zero-pad custNum before adding to API URL
- compensate for null return value

_[View all changes in v2025.12.0 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.11.5...v2025.12.0)_

## [v2025.11.5](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.11.4...v2025.11.5) - _28 November 2025_

### Improvements

- move .modal-title to BaseModal.vue for improved encapsulation
- move base layer styles to components layer for simplicity
- improve legibility of onKeyup and onKeydown event handlers
- move all input styles to inputs.css and remove from fields.css for improved organization
- improve organization of buttons.css
- move modal dialog transition styles to BaseModal.vue and convert to Tailwind
- convert transition styles to Tailwind
- default template prop to null instead of empty object for more accurate typing and use template ==
  null instead of loading === true for loading state
- default templates to null, use null templates as loading state, and remove unused loading prop
- improve organization of component styles
- default lineItem to null for more accurate typing, use lineItem == null as loading state, and
  remove unneeded loading state
- use internal computed ref for loading state to improve legibility
- default lineItems to null, use lineItems == null for internal loading state, and remove loading
  prop
- use computed ref for loading state instead of standard ref
- move transition for modal into BaseModal to reduce code duplication and update ModelNewTemplate to
  be consistent with ModalNewProject
- consolidate project header styles into ProjectHeader component

### Bug fixes

- place FooterVersion inside #constructionLoanApp
- update comment for accuracy
- fix missing opening to p element style
- properly type result of custResult.items.map() and improve logic for handling empty custResult /
  custResult.items
- wrap delete modal title in div.modal-title for consistency
- add styles for spin buttons to inputs.css for consistency
- remove unneeded styles from inputs.css since they are now in fields.css
- merge fieldClasses and attrs.class in inputAttrs to prevent fieldClasses from being overwritten by
  value in attrs.class
- add transitions.css to main.css
- remove loading prop from TemplateListItem
- make template prop optional and default to null
- default templates to null for TemplateListTable to function properly
- destructure project from props for use in script setup
- switch position of view button and project ID and improve alignment
- center align custNum to match loanNum
- right-align currency and percent data
- make page-header layout consistent regardless of content
- reset scroll before mounting views
- prevent complaints from TypeScript about importing runWithContext from #utils

### Performance improvements

- use computed refs instead of functions in template for optimal performance
- use computed ref instead of function call in template for optimal performance
- use computed ref instead of function call in template for optimal performance
- use computed ref instead of function call in template for optimal performance
- use destructuring to get fieldsValid state from formState to avoid overhead of computed ref
- use computed ref instead of function call in template to avoid re-rendering overhead

_[View all changes in v2025.11.5 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.11.4...v2025.11.5)_

## [v2025.11.4](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.11.3...v2025.11.4) - _26 November 2025_

### New features

- allow specifying optional relations to include when calling BaseService.find()
- include lineItems relation when calling templateService.fetch()
- add ability to add new draw to project
- add loan repository/controller/routes with mocked data in dev
- add support for setting button text with prop
- set note save button text to "Add note" for clarity on function
- add placeholder on note message input
- add save note functionality
- break out project note view to separate component for improved encapsulation and add loading state
  for project notes
- reset noteContent after save

### Improvements

- update TemplateView to use local refs for isDirty and originalTemplate and remove useDirty
  composable
- import query helper named exports as an object for cleaner imports
- rename TemplateLineItem component to CTemplateLineItem and use TemplateLineItem for type import to
  keep type names consistent
- clean up notes section by removing unnecessary headings

### Bug fixes

- update original after save
- implement sticky thead drop shadow using the same pattern as sticky row header drop shadow
- prevent gap between sticky row header drop shadows in table footer/header
- do not redirect to route with temporary Template ID while saving and only redirect to final route
  after save complete
- default name to empty string instead of null
- use computed ref for isDirty so value is reactive
- use computed ref for isDirty so value is reactive
- use local refs for isDirty / original state instead of useDirty composable
- add padding above/below page header for improved page aesthetics
- improve page layout with min-w-fit to prevent losing page padding when content is wider than
  viewport
- use global page-header class for ProjectList, TemplateList, and TemplateView
- fix alignment of title to be exactly centered and remove unneeded placeholder div after h1
- add refs for pagination
- use .page-header for page header section
- remove unneeded class on TemplateLineItemTable
- prevent glitches with padding when animating in/out component in App.vue
- send parentLoan and custNum to ProjectListItem so it can render the correct number of cells when
  loading
- re-emit update:lineItem event in TemplateLineItemTable
- add onUpdateLineItem to TemplateView and use addTemplateLineItem() and deleteTemplateLineItem()
  instead of generic version
- add missing updateTemplateLineItem() to templateUtils
- add ability to optionally include relations when returning results from BaseRepository.find()
- pass list of relations to include in templateService.findById() and templateService.save() by
  default
- prefix temporary ID with "temp-" to prevent UNIX timestamp from being interpreted as a number
- do not add templateId when adding new line item
- update originalTemplate after save to prevent "unsaved changes" banner from displaying after save
  is complete
- set displayOrder of lineItems based on array index for proper ordering
- add createdAt, updatedAt, and deletedAt fields to TemplateLineItemSchema and set orphanedRowAction
  to "soft-delete"
- default actualAdvance and interestAdvances to 0 if unset
- remove unneeded import
- replace draws array instead of mutating in place so isDirty in ProjectView works as expected
- update new project defaults to match ProjectSchema
- make loanPurpose based on baseInputField instead of nameField
- don't use defaults in modelValue
- fix inconsistencies between displayed field name and actual field being updated in onUpdate
- use updateField() instead of emitting event when updating a field
- attempt to convert val to number if not already in validateInt()
- add column name to thrown error
- add additional fields to new project modal dialog
- default lotAdvance and closingFeesAdvance to 0
- remove null coalescing in modelValue
- remove unneeded casting
- use Project for type of project
- allow Date type for value in onUpdate()
- add dotenv to top-level package.json
- use strings for hooks in schema and translate to actual functions in BaseService to prevent
  bleeding of TypeORM code into frontend
- return all styles from getInjectedStyles()
- use synchronous loading for components so Tailwind generates a single CSS file to be imported into
  shadow root
- use logger.action instead of logger.debug for registry output
- use baseInputField instead of nameField for template name to allow all characters by default
- apply heading defaults to all heading levels
- make min width on TemplateLineItemTable smaller for improved legibility
- prevent template being set to undefined if API error occurs when saving
- return early if app is null
- use --sticky-offset as basis for calculating if vertical scroll has occurred instead of 0 so
  scrolled-vert class is applied at the correct time
- remove top padding from table to remove extra space above table in staging
- adjust min/max width of template list table and center align
- include --sticky-offset when calculating headerOffset value
- default to 0px if --sticky-offset is not set
- make sticky header / sticky table header alignments and scroll effects consistent between dev and
  staging
- remove lineItem IDs before sending data to backend API for saving to prevent mismatch error
- add onOpenDeleteModal() handler instead of using inline for consistency
- prevent stripping id from entity data to fix saving weirdness
- remove merge() and send updatedEntity as-is now that normalizeData isn't stripping id property
- remove left padding from .field-text to fix alignment with save button
- add space between line items table and notes
- prevent uncaught error is res body is empty (HTTP 204, no content)
- re-export exported methods in noteHooks
- allow non-async return value from SchemaBeforeCreateHookFn
- use correct function name for note hook
- use return value from #runBeforeCreateHooks() when validating/normalizing/saving data
- enable 2-way sync for value of noteContent by using v-model instead of :modelValue
- break out logic for retrieving notes into getNotes() and reuse after creating a new note
- make noteService.create() and addNote() async so getNotes() is called after noteService.create()
  has succeeded
- reset noteContent after save
- prevent running field.onEnterKey() if text input is multi-line
- remove loading prop on ProjectNoteItem and display 2 skeleton notes when loading
- apply .field-invalid styles to textarea
- apply base field input styles to textarea
- set min width to reduce elements moving around on page
- prevent creating note with no content and highlight text area with .field-invalid class for visual
  feedback
- reset note field before re-fetching updated notes
- update input value when modelValue is changed externally
- create copy of newNote to send to noteService.create() to prevent potential race condition when
  reverting noteContent.value to empty string
- sort notes descending by createdAt timestamp
- strip PBT\ prefix from username
- use .env.development for env file
- set VITE_API_BASE and VITE_API_DELAY based on env vars
- set NODE_ENV to staging for staging deployment
- align page title to center regardless of the existence of other page-header elements
- remove min-w-fit from #constructionLoanApp so page-header fits in viewport by default
- remove right margin from main and add right padding to .table-container instead to remove double
  right margin
- make template list table width fit content for improved readability
- remove inline centering styles from h1
- remove horizontal motion on transition in/out to prevent odd display issues in staging/prod
- float add button left and settings menu right instead of absolutely positioning page-title
- use template for v-if / v-else instead of divs
- remove unneeded right padding on table
- remove flex on #constructionLoanApp for simpler layout
- use padding top instead of margin top when positioning table on scroll

### Performance improvements

- use watch instead of watchEffect to clear invalidClass so it only runs when noteContent is
  modified and not when invalidClass is modified

_[View all changes in v2025.11.4 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.11.3...v2025.11.4)_

## [v2025.11.3](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.11.2...v2025.11.3) - _21 November 2025_

### New features

- make amount field filterable by default
- add primary key field definition
- add ability to override required with attribute on Field component
- select all text in input field on initial focus
- add tailwind.json to VS Code config
- show date picker when input is focused
- add support for showing date picker in useField
- make th cells in thead smaller
- rework sticky row/column header drop shadows for improved look and fewer visual bugs
- make thead sticky
- make project view header sticky, place sticky table cell below it, and adjust size on vertical
  scroll
- make project view header sticky, place sticky table cell below it, and adjust size on vertical
  scroll
- add loan date and maturity date to project view header
- add project ID to project list view
- move ID field to column with view button
- add support for choosing whether to display 0% or nothing if percent value is 0
- emit update: events from ProjectLineItem and ProjectHeader and pass them up to ProjectView for
  later handling
- return newly-created entity from baseStore.save()
- return found entity from baseStore.fetchById() and projectStore.fetchById()
- add updateTotals() to config/utils
- add pure project utility functions to replace projectStore logic
- add deleteLineItem() utility
- add handlers for update events
- add pure updateDraw() function
- add useDirty composable for tracking if an object has changed
- utilize useDirty in ProjectView for tracking changes to project
- add initProject() function to projectUtils
- add deleteLineItem() and addLineItem() pure helper functions

### Improvements

- simplify onModelUpdate() for readability
- update FieldNumber to match FieldPercent and FieldDate
- update FieldCurrency to match updates to other Field components
- update FieldText to match other Field components
- normalize modelValue on set in FieldText
- move logic for calculating value for required attribute to useField to simplify Field components
- convert .sticky-header to use only Tailwind CSS directives
- move scroll observer to App.vue so classes can be applied to body based on window scroll
- move styles for background hover effect for cells inside th,td { ... } for improved encapsulation
- improve organization and readability of code
- rework onMounted() logic for readability
- store loading state in ProjectView instead of using projectStore
- rearrange columns in project list table
- use prop for loading state instead of project store
- move buildUpdatedProgressArray to lineItemProgressUtils.ts
- remove projectStore from child components of ProjectView and emit events instead
- rename update:property and projectStore.updateProperty() to update:field and
  projectStore.updateField() for consistency
- rename baseStore.updateProperty() to baseStore.updateField() for consistency
- rename baseStore.updateProperty() to baseStore.updateField() for consistency
- remove projectStore references and pass data down from parents via props
- remove unneeded onUnmount
- move new modal to ProjectList and remove delete modal from ProjectList
- send custName as prop instead of accessing via projectStore
- use local project ref for new project state instead of using projectStore
- send loanPurpose as prop instead of accessing via projectStore
- skip checking if saveData.id exists since checking type is sufficient
- update baseStore.fetchById() to return found entity
- update projectStore to use updateTotals() utility function
- use local ref for tracking project state and use return value from projectStore.fetchById() to set
  it
- use utility function to update draw on `update:draw` event
- use utility function to update draw on `update:draw` event
- use initProject() pure function to init project instead of projectStore.initProject()
- store template state in local ref, use pure functions for updating, and use local ref for loading
  state
- update calls to setSaveFn() and setRevertFn() on banner stores to use local functions
- use local save() in bannerStore.setSaveFn()
- update TemplateList and TemplateListTable to use local refs and props instead of templateStore
- use props instead of templateStore
- use colDef on fields and remove templateStore references
- use pure functions and local refs instead of projectStore
- remove references to templateStore except save() and add colDef to FieldText

### Bug fixes

- set sideEffects to false for config package
- change @update:modelValue event to @update to match BaseInput event
- add vertical space to input for improved visual appeal
- make drawDate nullable by default
- update classes to match useField
- apply input styles to textarea as well
- remove unused isValid and add class property to input
- make textarea for new note not required to prevent annoying validation error
- fix banner transition
- type event.target as HTMLInputElement | HTMLTextAreaElement instead of just input element
- adjust borders on table cells for project list view
- remove border radius from scroll container
- apply borders to non-empty cells only
- adjust height/padding on fields, inputs, and cells containing fields for improved UX
- prevent wrapping on line item name and remove extra padding
- use baseInputField instead of nameField for line item name to skip default validation rules
- make first column wider in line item row
- make line item name input full width to prevent expanding column when editing
- use field.onFocus for @focus in Date field
- adjust width of date column to reduce wasted horizontal space
- make input font always normal weight
- make non-header cells in thead use default font color
- use lighter grey for th in thead and make font bold
- apply smaller text size to all thead elements
- set height of table cells in thead
- use correct column name for "percentIfComplete"
- set line item name input to full width to prevent horizontal shifting when entering edit mode
- fix display issues with save banner when saving is in progress
- remove height on table footer cells to prevent display issues on sticky cells
- default fill to current text color
- use td for empty cells instead of th
- add &lt;/script&gt; back after inadvertently deleting it
- add back cells that were inadvertently removed
- merge styles that both apply border-l for simplicity
- use :first-of-type instead of first-child for applying left cell border
- use :last-of-type instead of :last-child to apply right border
- reference main.css instead of tailwindcss
- default to showing all projects until pagination component is put into place
- add right padding to app-layout
- set model value to 0 if input is empty and not required
- use Field components for data display for consistency
- remove unneeded casting
- remove unneeded optional chain
- add colDef and fix typing errors for modelValue in ModalNewProject
- remove redirect to route with temporary ID and only redirect after save has succeeded
- remove inject for newModal and emit close event instead of calling newModal.close()
- prevent type errors about Error.captureStackTrace() not existing when using error classes from
  frontend
- update banner callback function types to match recent changes to baseStore
- add guard to prevent running updateTotals() on a new project
- allow project to be Project | null and add conditional chaining to handle null project
- use local project ref for project prop on ProjectHeader
- use local project ref for props on ProjectLineItemsTable
- replace undefined with null on return value for BannerRevertFn
- only call function in event handlers if project is not null
- add empty draws array to BASE_PROJECT for initializing a new project
- remove null from possible values for project, since ProjectView prevents sending null project to
  updateField()
- return project as-is if lineItems is not set or has a length of 0
- use number|undefined for parentLoan and custNum props instead of null
- default parentLoan and custNum to null if missing, then remove null properties in initProject() to
  make TypeScript happy
- allow template line items to be TemplateLineItem or NewTemplateLineItem
- improve typing on bannerStore and callback functions
- remove duplicate save
- add required loading prop to TemplateListItem
- use pkField for primary key in TemplateSchema for consistency
- add missing colDef on FieldPercent
- use null for colDef on viewOnly FieldPercent
- re-export TemplateSchema and TemplateLineItemSchema
- use pkField for lineItem ID
- pass loading state to TemplateLineItem
- add lineItemCount and loading props to TemplateLineItem
- cast selectedTemplate.lineItems as TemplateLineItem[]
- remove reference to NewProject type, since it is not necessary

### Performance improvements

- remove unneeded conditional logic since toISODateString returns empty string for invalid dates
  already
- remove BaseInput from Field components to simplify event handling, model values, and improve
  performance

_[View all changes in v2025.11.3 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.11.2...v2025.11.3)_

## [v2025.11.2](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.11.1...v2025.11.2) - _17 November 2025_

### New features

- add early return if nullable is true and value is falsey
- add draw date to table headers
- add validateNull() and re-export via shared/validation
- adjust width based on precision setting in colDef

### Improvements

- improve organization of validators
- consolidate number formatting utility functions
- organize string validators to match number validators
- reduce code duplication across formatFloat() and formatCurrency()
- use colDef.format() if defined and fall back to formatCurrency()
- use minLength/maxLength instead of min/max for clarity in arguments
- use validateString() instead of checkStringLength() for string validation to reduce duplicated
  logic
- use validateInt() to validate value for percent complete field
- update percent/currency components to normalize empty string in modelValue to null and update code
  to account for the change
- organize types and add SchemaModule/SchemaRouteModule types
- improve typing in schema registry
- improve typing in addSchemaRoutes
- improve typing in addSchemaRoutes
- use arrow functions by default and mark private method properties as readonly
- mark functions returning a Promise as async and type correctly
- prevent accidental return value from promise executor functions
- use constant for pad length instead of magic number
- rename fieldTypes to columnTypes for consistency
- rename validateFieldType() to validateColumnData() and update filename to match
- move validateColumnData to validation/common and re-export as named export from
  "shared/validation"
- move nullable field validation functions to shared/validation and improve typing
- improve typing and type names for service and repository layer query objects and use EntityData
  from shared/types
- improve check for config.cascade as it could be a string, not just true
- rename ParsedFilter to ServiceFilter and reuse type from #types
- organize and export types inline instead of at the bottom of the file
- rename relations to cascadeRelations to prevent confusion
- rename entity to existingEntity for improved clarity
- move helper functions to external helpers file and refactor to pass class properties instead of
  accessing directly
- break up BaseRepository into more modules for improved readability
- move parseFilters to query-helpers and rework types to be more accurate
- simplify CSS to prevent vertical jump when entering edit mode
- ensure modelValue is a number unless null
- rework useField, BaseInput, and FieldPercent to improve functionality/performance, reduce
  flakiness, and be more declarative
- improve typing in onUpdate and remove null check before calling projectStore.updateProperty()
- rework BaseTextarea to function the same as BaseInput
- add and use FieldModelValue and FieldPercentValue types for improved consistency on field model
  values
- add initial support for including relations in service calls for single project
- add and use NewEntity type for cleaner code
- only protect clearTimeout() by checking \_doneTimeout before calling
- clean up template store to match project store
- add NewT argument to useBaseStoreComposable for improved/more accurate typing within stores
- default originalEntity to null
- improve typing for NewEntity and use Partial&lt;T | NewEntity&gt; for parameter to
  BaseService.save()
- move exported type definitions from BaseService to types/service
- move error types to types/errors

### Bug fixes

- import formatCurrency from shared/utils instead of #utils
- update format()/validate() to use colDef and use validateFloat inside validate()
- import from shared/... instead of src/...
- adjust leading in header items
- adjust leading in fields
- add "as const" to SchemaColumn.type and SchemaColumn.generated to satisfy type requirements for
  SchemaColumn
- allow for null progress.percent
- add missing "as const" to type and generated properties in SchemaColumn definitions
- use correct property name for LineItemProgress.percent
- use nullish coalescing operator instead of logical OR when checking if percent is set
- make LineItemProgress.percent nullable
- make LineItemProgress.percent nullable
- use modelValue instead of modalValue and coalesce to empty string if unset
- update handlers to use updated function names from useField
- update call to useField() to use newer parameters
- add missing colDef prop and rename name to title
- update validateFieldType to use new arguments to validateString()
- throw error if column is not found in getColDef()
- display user-friendly field title instead of name in error
- set step value on margin to prevent limiting to fewer decimal places
- remove default for appraisedValue
- mark all functions returning a Promise with async
- use static methods for any class methods that do not access `this` and place definitions at the
  top per eslint config
- prevent warnings about not using `this` for save() and delete() methods in loanService
- mark function returning Promise as async
- use description for Symbol()
- remove ParsedFilter interface and replace with ServiceFilter from #types
- only load cascading relations if orphanedRowAction is "soft-delete"
- handle non-array relations in #cascadeSoftDeleteChildren()
- tell Tailwind to always include w-[6ch] through w-[12ch] even if not detected in source
- prevent vertical jump when switching to edit mode and revealing input inside field inside td/th
- set min width on percent field input
- simplify handleInput() in BaseInput
- only update property if val is not null
- remove unneeded null check before calling updateTotals()
- prevent disappearing cell border when scrolling horizontally
- use Partial&lt;NewEntity&gt; instead of Partial&lt;NewEntity&lt;T&gt;&gt;
- add createdAt and updatedAt to Loan interface temporarily so BaseService doesn't complain
- use only number for BaseEntity.id, since NewEntity is for entities with a string-based temporary
  ID
- use relative imports in types/schema.ts to prevent potential circular dependency

_[View all changes in v2025.11.2 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.11.1...v2025.11.2)_

## [v2025.11.1](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.8.19...v2025.11.1) - _10 November 2025_

### New features

- add utility functions to format custNum and loanNum
- add tooltips to header items for additional information
- add schemas and schema routes to config package
- add route definitions for line items and projects
- add template schemas
- add template routes
- add foreign key field definition
- add ability to use subscribers from config package in DataSource
- add initial subscriber for changes to Draw
- add datetime field definition
- add BaseRepository.getManager() to allow access to EntityManager
- add support for optional hooks in schema
- add afterDelete callback to Draw schema
- add support for afterDelete hook
- add fractional percent field definition
- add function to calculate project completion percent from line item progress records
- add hook for recalculating project completion percent when project or child schemas are
  modified/deleted
- add locUtilization and completion fields to Project schema
- add calculated property to SchemaColumn and allow calculated columns to be null to prevent SQL
  constraint issues
- soft-delete children when not part of relations on entity
- add #softDeleteChildren and #cascadeSoftDeleteChildren
- add city, state, and ZIP to project schema
- add formatPercent function
- add margin to project header
- add optionsToParams() class method to convert a ServiceFetchOptions object to URLSearchParams
  object
- display line item progress in table as well as total progress per line item
- add updateLineItemProgress to projectStore and use in ProjectLineItem.vue when line item progress
  is updated
- add initial replaceTempDrawIds() for replacing temp IDs in lineItemProgress arrays
- add calculateDrawProgress()
- add initial table footer row
- add calculateCompletionFromLineItems() as a wrapper for calculateProjectCompletion
- add project completion cell to project line item table footer
- add actual advance row in table footer
- add BASE_DRAW structure to extend when adding a new draw to a project
- improve destructure for better DX and explicitly call updateTotals() on fetch and after
  updating/adding/deleting line items / line item progress
- add methods for adding/updating draws
- send loanValue to ProjectLineItemsTable so it can calculate max advance per draw
- add calculateMaxAdvance() and use Decimal.js for calculations to avoid floating-point rounding
  errors
- add interestAdvances to Draw schema and generate migration
- add "advances for interest" row to table footer
- add calculating project completion to calculateProjectTotals()
- add table footer row for "advances for lot & closing costs"
- make table row headers sticky and make horizontal scrolling work properly
- add support for updating draws via projectStore to preserve reactivity
- add additional table footer rows
- add function to calculate funds available on line-of-credit
- add support for calculating line-of-credit funds available in drawMeta map
- add line-of-credit funds still available row to table footer
- rework sticky row headers to be based on variable offset to simplify alignment without repeated
  styles
- add drop shadow under sticky header cells to improve UX when scrolling horizontally
- add cumulative % complete (construction and project) to draws
- add drawDate to Draw schema and lotAdvance/closingFeesAdvance to Project schema
- add function to calculate total advances
- add function to calculate total advances
- add getColDef() utility function to get SchemaColumn definition with name field added
- add text field definition
- add schema and routes for project comments/notes
- add routes for deleting note and retrieving all notes for a particular project
- add fetchNotes() function to project service
- add ability to view project notes in ProjectView
- add BaseTextarea and use instead of BaseInput in FieldText if colDef.multiline is true

### Improvements

- rename modals to match Vue recommendations and relocate new project/template modals to ui/Modals
- rename SettingsMenu according to Vue recommendations
- rename ModalOverlay to ModalLayout for consistency
- rename project and cost table items and update props for consistency
- rework template list components to be consistent with project list components
- use projectStore in ProjectListItem for consistency with TemplateListItem
- streamline &lt;options&gt; element loop
- adjust project list heading for legibility
- adjust project list heading for legibility
- use "note #" instead of "loan #" for consistency with ASP.NET app
- adjust title on new project modal
- adjust sizing for page title
- add class to container for page title elements
- adjust spacing in modal dialog
- simplify button styles so hover/active state is shared across all button colors
- adjust links in cells to better differentiate between editable fields
- left-align loan purpose
- simplify DOM in ProjectHeaderItem
- make border-r-dashed an actual utility class
- add bottom border to modal title for better visual separation
- adjust page title styles
- default fields to justify-start and override for date field
- convert to TypeScript
- convert to TypeScript
- convert to TypeScript
- convert to TypeScript
- convert to TypeScript
- convert to TypeScript
- improve BaseCostItem type
- convert to TypeScript
- convert to TypeScript
- improve typing for options argument to find()
- prevent warnings about shape of options
- use canonical classes
- convert to TypeScript
- convert to TypeScript
- convert to TypeScript
- convert to TypeScript
- convert to TypeScript
- sync code with backend API from project-manager and add ability to include relations on-the-fly
  with query parameters
- sync shared package with shared package from project-manager project
- add indexes to schema definitions
- update dateUtils to handle datetime as well as date
- add support for afterCreate and afterSave hooks
- move project type definitions to ProjectSchema file
- move project total recalculation to utils an import to use in hooks
- add #manager class property for storing reference to EntityManager from repository
- use updateTotals from projectUtils instead of inline function
- separate reusable pure calculation functions from service layer hooks and export separately from
  config package
- rename config/config.ts to config/common.ts for clarity
- update getProjectId to support getting project ID if entity is LineItemProgress
- rename li to item for clarity
- update BaseService to support arrays of functions for hooks and use generic #runHooks() method to
  reduce duplicated code
- rename completionPercent to completion for brevity
- separate out steps to save
- use arrow function for #schemaHasDeleteDate
- consolidate soft-delete logic and add cascading soft delete to delete()
- prefer declarative over imperative code and run delete queries in parallel
- move pagination and search field logic to private methods
- simplify #addPagination
- parse includeRelations into an array before sending to repository and rename to relations
- rename includeRelations to relations and assert it is string[]
- improve single responsibility for methods
- move pure functions to helpers file for improve legibility
- rewrite CSS as Tailwind classes
- rename costs to lineItems and fix typing for new structures
- rename \*CostItem\*.vue to \*LineItem\*.vue and update to TypeScript
- update ProjectView.vue to work with renamed ProjectLineItemsTable.vue
- rename TemplateCost\*.vue to TemplateLineItem\*.vue and rename TemplateList / TemplateView folders
  to List / View respectively for consistency with projects
- update types to use generics for improved typing ability over ModalData
- convert to TypeScript and update to use lineItems instead of costs
- improve typing and start modifying new project modal to use updated Project schema shape
- simplify rowClass computed ref
- convert defineProps() to TypeScript style definition
- improve typing for costUtils.ts
- rename toProjectCosts() to toProjectLineItems() and rename costUtils.ts to lineItemUtils.ts
- fix typing and replace instances of cost/costs with lineItem/lineItems
- fix import paths
- convert to TypeScript and update header items to reflect actual data in Project
- fix typing for store.delete()
- use simplified typing for emit
- make loadApp default export
- replace `e` with `err` for clarity
- convert to TypeScript and apply eslint fixes
- reduce complexity of validateCurrency()
- update comment for accuracy and simplify watchEffect to reduce nesting
- add LineItemError type and use when emitting lineItemError event
- use shallowRef instead of ref for arrays/objects
- simplify creating extended logger object
- call logger.fatal() instead of throwing error if SESSION_SECRET is not set
- update code to be inline with updated eslint rules
- update code to be inline with updated eslint rules
- simplify addSchemaRoutes and remove unneeded logic
- simplify getMiddlewareList
- simplify access to composable props with deconstruction and use short prop definitions
- move component-specific files to scoped style block inside the component for improved isolation
  when embedding app
- allow optional options param on BaseService.fetchById() and baseStore.fetchById()
- use simple entity variable instead of referencing base.entity
- organize CSS into separate files and move modal-specific styles to BaseModal.vue
- make container border optional and make styles local
- add draws prop to ProjectLineItemsTable.vue and fix defaults
- move BaseTable styles to scoped style block in BaseTable
- add initial draws rendering and headings for new format
- improve and simplify styles for table header cells
- remove useless literal boolean check against true
- move reusable logic from updateProjectTotals hook to separate pure utility function and separate
  out LOC utilization calculation in projectUtils for improved readability
- do not export functions that are not needed externally
- move calculateCumulative() to lineItemUtils, rename to calculateCumulativePercent() and add
  support for optional index
- remove unneeded conditional chain on lineItems
- improve typing on conditions to hide percent sign
- use calculateCumulativePercent() when totaling percentages for all template line items
- improve CSS selectors for applying border radius to cells
- improve typing for New\* interfaces by making createdAt and updatedAt optional
- improve typing for draws by allowing Draw | NewDraw
- move calculateCompletionFromLineItems() to config/utils
- rename project to data in calculateProjectTotals for improved clarity and separate interface for
  improved readability
- improve calculateLocUtilization so it can be reused for draws
- move logic for building drawMeta to external function for improved readability and testability
- move scoped styles to utility for improved reuse
- use custom utility .empty-cell instead of .empty for empty cells
- update sticky row headers to only use .sticky without widths or offsets
- use early return in handleScroll for less nesting
- use early return in handleScroll for less nesting and rename scrollContainer to container for
  improved readability
- destructure inside onFieldError instead of in arguments
- merge sticky row headers into a single CSS block for improved encapsulation
- replace initialAdvances with lotAdvances and closingFeesAdvances, using total of both where
  initialAdvances was previously used in calculations
- improve typing to pass eslint rules
- fix errors reported by latest eslint rule updates
- improve typing in common.ts
- fix type issues reported by recent eslint updates
- improve typing and update to pass updated eslint rules
- remove duplicate functions from frontend and import from shared/utils instead
- always use curly braces for void arrow functions
- use early return instead of else
- remove unneeded active filter code
- update filtering code to be clearer
- make functions easier to read with type definitions
- make if statement single line
- break up validateSentData() into multiple functions for improved readability and to avoid
  complexity warnings
- break out logic for validating SQLite and SQL Server config options into separate functions for
  improved readability
- use early return instead of nesting
- break up logic into smaller pieces for readability with type casting
- rearrange code, shorten getLineItemProgressRecords and make getProgressRecords easier to read with
  type casting
- send lotAdvance and closingFeesAdvance to calculateDrawMeta and calculate total advances there
  instead of calculating before sending
- add fieldTitle to onFieldError handling
- rework useField and Field components to be based around SchemaColumn definitions
- use single argument to reduce total number of arguments sent to calculateDrawMeta
- update ProjectLineItem component to match changes in Field components / useField
- rename comment to note
- add new note section and adjust styles for notes area for improved UX
- apply bg color mix to all cells by default
- highlight hovered rows in tfoot
- make some rows have darker background for improved UX

### Bug fixes

- fix top padding when included in ASP.NET site
- prevent call to loans API endpoint if custNum is not set
- prevent scrolling when content isn't &gt; viewport height
- set max height to 95% on model dialogs
- make primary button text bold
- set color on delete button with type=submit without using !important
- adjust h2 skeleton
- prevent dragging of view button
- adjust leading on h2
- update add button styles to use base button defaults
- add close button to all modals
- remove whitespace-nowrap to allow wrapping
- do not fall back to loan number in loan purpose column
- make view link stand out from links in cells
- adjust sizing of column holding view button
- add height to modal button container and fade in/out save button when form is valid/invalid
- add red asterisk after label associated with required fields
- wrap select in div.field so styles for required field labels work as expected
- add missing modal-title around title in new template modal
- adjust line height in cells and compensate on cells containing buttons
- change API proxy port to 3033
- setup shared package for TypeScript
- add TemplateCostItemWithAmount to types
- remove isValid from data sent to bannerStore.setState()
- initialize costs to [] if unset when calling templateService.addAmounts()
- set costs correctly when calling projectStore.initProject()
- use nullish coalescing operator instead of logical OR
- make save() accept entity without id property set
- use Partial&lt;&gt; on BaseCostItem in useBaseStoreComposable()
- prevent id from being overwritten by spread object
- allow null validationError in BannerState
- make InitData.costs use Partial&lt;&gt;
- casts costs as ProjectCostItem[]
- make to property optional
- allow null for parentLoan and custNum properties
- use null coalescing operator instead of logical OR
- use correct type for "to" prop on buttons
- remove props from ProjectListItem when projectStore.loading is true
- allow null for max
- allow error to be null in FieldError
- improve typing on emit
- use correct typing for emit
- remove default for fieldsValid and make it required instead
- make tsx a dependency of backend only and move typescript to dev dependency
- search schemas dir recursively when looking for schema files
- update paths to schema files for re-exports
- search routes directory recursively when looking for schema routes to configure and fix typing
  issue with .endsWith()
- cast filename to string before using value
- strip paths from route filenames before determining related schema name
- explicitly set endpoint for line items
- explicitly define base endpoint for template line items
- correct type and update error message to be generic
- improve type safety in validate()
- use :projectId instead of :id in nested REST endpoints
- add explicit column definition for projectId
- re-export types from schemas
- add missing fieldsValid property on FieldCurrency
- make date field use "date" column type and simplify validation using updated utils
- add datetimeField to exported field definitions
- add #schemaHasDeleteDate() to check if soft deletes are being used and fall back to
  this.hardDelete() if not
- rename updated to result for clarity
- use datetimeField for completedAt instead of date-only
- add missing import of datetimeField
- use datetimeField where date AND time are needed
- import from "backend/\*" instead of using import aliases
- set rootDir
- add exports for config and utils so schema routes in config package work properly
- add additional fields to schema and update type definition to match
- add missing templateId field to schema
- add re-export for fractionalPercentField
- import updateTotals from config/hooks
- rename closingLotAdvance to initialAdvance for clarity and consistency
- do not re-export hooks from utils/index.ts
- import updateProjectTotals from "config/hooks"
- update schema to import updateProjectTotals from "config/hooks"
- add additional hooks to Draw, LineItem, and LineItemProgress schemas
- set hooks for schema types
- rename locUtilizedPercent to locUtilization to match schema
- add missing lineItemId and drawId columns in LineItemProgress
- set margin precision to 9 and scale to 6 to allow for additional decimal points
- set calculated to true on completion column
- remove default max value on fractional percent field definition
- divide percent by 100 before using
- use decimal.js to prevent floating point issues
- return relations listed in includeRelations query parameter after POST/PUT
- set orphanedRowAction to "soft-delete" to properly handle orphaned child relations
- enable foreign keys for SQLite databases
- update paths after recent changes
- type take and skip as number instead of string
- add default for customer name
- reference correct paths in import aliases
- reference title case names in import aliases
- add re-export of loan types
- update paths to components
- add missing FooterVersion component
- add additional checks when working with inputEl
- make fieldsValid optional
- add missing imports for formStateKey and getModalKey
- make BaseInput.elementRef and inputRef nullable
- rename costs to lineItems to match actual shape of Template
- cast enumValues to State[]
- make template prop optional and provide default empty object cast as Template
- allow lineItemId to be number | string to allow for newly added (not yet saved) line items
- make lineItem optional and cast empty default object as LineItem
- allow payload for openDeleteModel event to allow for NewLineItem as well
- import FieldError from frontend types
- make fieldsValid optional and default to true
- use TemplateLineItem / NewTemplateLineItem instead of LineItem / NewLineItem respectively
- use TemplateLineItem / NewTemplateLineItem instead of LineItem / NewLineItem respectively but
  rename to LineItem / NewLineItem to prevent name collisions
- remove state from BASE_PROJECT to prevent issues with typing
- update imports to use correct import paths/filenames
- update imports to use correct import paths/filenames
- rename checkProjectCost to checkProjectLineItem and replace logic with placeholder
- use boolean for isPercentTotalValid
- use vue-tsc for type checking in frontend
- import FieldError from frontend types
- replace checkProjectCost with checkProjectLineItem
- use correct import path for FieldError
- remove explicit any type on payload
- allow Project or NewProject type for project prop
- update import path for FieldError
- allow null model value and default to empty string
- coalesce custNum and loanNum to null when sending to FieldNumber
- allow null type for onUpdate val argument
- cast projectStore.project as Project
- allow NewTemplate type for useBaseStoreComposable in useTemplateStore
- use Ref&lt;Template[]&gt; for templates as it will always be an array of real Template objects
  from API (not NewTemplate)
- use nullish coalescing operator instead of logical OR
- use nullish coalescing operator instead of logical OR
- make value prop optional
- update name for BASE_TEMPLATE_LINE_ITEM to remove reference to "cost item"
- use BASE_TEMPLATE_LINE_ITEM instead of defining the base template line item shape locally
- rename @addCostItem to @addLineItem
- rename TemplateCostTable to TemplateLineItemTable
- convert defineModel() to TypeScript style
- improve type checks in dateUtils
- inline code from handleError() to prevent issue with return type inference
- properly type \_doneTimeout ref
- add missing import of shallowRef
- prefer interface over type
- prevent warnings about tsconfig.json / eslint not covering \*.vue files
- make properties non-optional as they have default values
- properly type secret config option as CipherKey
- make fieldsValid optional and default to true
- init session and CSRF routes only if ENABLE_CSRF_SYNC === "true"
- cache modal keys instead of returning new Symbol() every time getModalKey() is called
- add temporary defaults to schema so migrations work
- prevent warning about loss of reactivity when destructuring while using withDefaults()
- import apiRequest as default export
- update typing, rename find\*() to fetch\*() and update to be in sync with loan-applications/admin
  service definition
- update typing, rename find\*() to fetch\*() and update to be in sync with loan-applications/admin
  service definition
- rename find\*() to fetch\*() and adjust to account for paginated results
- import apiRequest as default export instead of named export
- improve typing in ModalNewProject
- update handling of return value from fetch() now that it supports pagination
- set itemsPerPage to high number to prevent pagination for now
- use and extend ServiceFetchOptions instead of BaseServiceOptions
- add service type definitions
- use ServiceFetchOptions instead of BaseServiceOptions
- remove unneeded checks
- remove unneeded optional chain operator on id
- use correct value for title if projectStore.projects[0].custName is an empty string
- update table columns to match actual data returned from API
- simplify logic for setting numDecimals
- make options argument optional for formatCurrency() and validateCurrency()
- remove loan purpose column
- remove loan purpose for tooltip
- use correct field name in onUpdate() and increase input width
- use correct field name in onUpdate
- default percent field to 0
- remove required for model value
- add missing FieldPercent import
- add missing BaseSelect and Icon components from loan-application project for use in pagination
- add additional project header fields
- force project financial information on second row
- include relations when calling base.fetchById()
- do not use BASE_PROJECT to set defaults when fetching project from service
- do not apply right border if cell has .empty class
- use LineItemError interface for tying eventData instead of locally defined interface
- use correct sub-component for displaying skeleton
- make columns narrower by default
- add support for displaying line item progress per draw and total progress per line item
- correct logic for validate() in stateField
- remove leading for table headers and fields
- left-align line item names
- add right padding to main container
- add ProjectTotals interface
- return 0 from getProgressForDraw() instead of undefined
- improve alignment in header cells in tbody
- properly set borders in tfoot
- make modelValue required
- correct flex justification when container has text-center class applied
- wrap base table styles in table.base-table {}
- apply base table styles via base-table class instead of directly on table inside component
- make table header text slightly smaller
- apply text-center to thead table cells to center text
- remove unneeded styles
- set min=0 for FieldPercent
- hide percent sign if model value is &gt; 0
- remove unneeded right padding
- allow draw types to be Draw or NewDraw
- use calculateMaxAdvance() instead of inline calculation to avoid floating-point rounding errors
- make max advance field view-only
- make modelValue required in FieldCurrency
- default to 0 if appraisedValue is not set
- improve typing by making props required and forcing parent to handle default values
- add missing completion to ProjectTotals interface
- remove w-fit from .app-layout to prevent scrolling issues
- use opaque colors for cell backgrounds so sticky row headers work properly
- make advances for lot and closing costs view-only
- add update:modelValue and fieldError event listeners to Initial Advance field
- explicitly return void from assignment functions
- make item header not sticky for better UX
- add missing initialAdvance prop
- allow value to be date in updateDraw
- visually offset draw #, inspected by, and inspection date fields from the rest of the table for
  improved UX
- make cumulative % view-only
- use correct name for cumulative % field
- make empty cells have white background so other cells disappear behind them if they are sticky
- add updateProperty() to projectStore to call updateTotals() if appraisedValue, margin, or
  initialAdvance are updated
- add updateProperty() to projectStore to call updateTotals() if appraisedValue, margin, or
  initialAdvance are updated
- send loanBasis to ProjectLineItemsTable for use in calculateDrawMeta() calculations
- invert logic for including initialAdvance in calculateCumulativeLoanBalance()
- use verbiage from spreadsheet for initialAdvance to prevent confusion
- set default for amountFields to 0
- add new columns to Draw and Project interfaces
- set modalValue default to 0 for FieldCurrency component
- default interestAdvances to 0
- default actualAdvance to 0 if unset
- do not allow null values passed to modelValue on FieldNumber
- set default values for modelValue on Field components
- prevent constant reloading of TS
- improve typing in fetchById()
- add title to ID column and cast type and generated as const
- use number | "" for modelValue type in FieldCurrency/FieldPercent and for
  lotAdvance/closingFeesAdvance for more accurate typing
- relax typing in getColDef() to allow for stricter types in column definitions
- adjust emitted error for improved UX
- show browser error if checkValidity() is false
- return early if inputEl is not set
- set isValid to false if htmlValidity is false
- set isValid to false if not valid and true if valid
- update modelValue in onModelUpdate
- restore proper functionality with useField, BaseInput, and FieldPercent
- set default title in description field definition to "Description"
- add missing re-export of NoteSchema
- add missing re-export of types from NoteSchema.ts
- rename inspectedBy to username
- make Note.content field a multi-line text field
- set --max-width-prose to 80ch instead of the default 65ch
- add getter for #endpointBase class property
- remove admin from list of packages to update when bumping version number

### Performance improvements

- move watcher from initProject to new project modal to prevent potential memory leak
- store calculated draw fields in a computed ref Map() so calculations are only executed as needed
- send total project completion in props instead of calculating on-the-fly
- use drawProgress from previous calculation instead of re-calculating in calculateMaxAdvance()
- use drawProgress from previous calculation instead of re-calculating in calculateMaxAdvance()

_[View all changes in v2025.11.1 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v2025.8.19...v2025.11.1)_

## [v2025.8.19](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v1.0.0...v2025.8.19) - _19 August 2025_

### New features

- add stubs for project routes/controller
- add stubs for template routes and controller
- add initial config and models for TypeORM connection to SQL Server
- add controller and route for fetching project cost items
- add settings menu to access template management
- add link back to projects endpoint
- **SettingsMenu**: hide settings menu when clicking anywhere outside of it
- add NumberField component
- **useFormState**: add reset() to reset error, field error, and dirty ref
- generate JWT on page load for dev env
- add auth store for handling JWT storage/refresh
- add init of auth store and dependency injection for apiRequest
- add BaseRepository class
- add project and template repositories
- add BaseController class
- add BaseService class
- send ?show endpoint parameter to this.service.findAll() and this.service.findById()
- use pino for logging
- add support for custNum
- **frontend**: make loanNum and custNum links
- add base object structures for project, project cost, and template cost
- add loan service
- add dropdown for loans on new project dialog when custNum is set
- add resetEntity() to base store and override name for project and template stores
- add default skeleton style for h1
- add default style for h1
- show loan purpose and customer name in header items if set; fall back to IDs
- add style for required inputs
- add ButtonView and use it in project and template lists

### Improvements

- use config from .env for API_BASE
- improve error handling for API calls
- prevent resetting project store on every route change
- set saveData outside try/catch block
- **SettingsMenu**: replace inline classes with utility classes
- **TemplateList**: use custom utility class instead of inline classes for link
- use utility classes instead of inline classes for modals
- move padding between table and heading to table
- improve styles for settings menu
- **BaseTable**: replace inline classes with global class
- improve creation of payload and default isActive to true
- add goToView() to make router.replace() call simpler
- move project header styles to .project-header utility class to prevent long lines
- **apiUtils**: add JWT support and rework into smaller functions
- rely on defaults for options when calling apiRequest()
- remove try/catch blocks from project service since they are handled in projectStore
- use function declarations for functions internal to module
- use watchEffect to start/stop timer and use arrow functions everywhere
- use watchEffect to start/stop timer and use arrow functions everywhere
- update token refresh based on actual data returned by \_apiRequest
- **authStore**: require apiRequest in init() and throw if not provided
- move server.js to root instead of src
- allow passing options to findById and default to including relations
- move NotFoundError to standalone class
- improve handling of relations in findById
- improve applying active filter based on options
- don't attempt to validate input, since this is handled at service level
- extend BaseController to create ProjectController
- use default export instead of named export for all classes
- update template controller to extend BaseController
- update routes to use new controller classes
- use default export instead of named for models
- break up db setup into two files to prevent cyclical dependencies
- set column types based on DB type
- tie controller, repo, and services together properly
- add additional information to log output
- simplify arrow function for consistency
- make StatusController a class to be consistent with other controllers
- structure options for better readability
- move CORS setup and JSON parsing of HTTP request body to middleware
- **backend**: validate db config before creating DataSource
- restructure for simpler testing
- move server startup logging to external utility
- rework backend
- add config for disabling JWT in headers
- **frontend**: simplify display in currency field
- **frontend**: call fetchProjects() when route.query changes
- **frontend**: use default link style for router-link and add margin
- **frontend**: use 2xl for minimum table width
- **frontend**: simplify App.vue
- **frontend**: load app in shadow DOM if data-css-url is set on #app container
- swap custNum and loanNum columns in table
- break out project list table into separate component
- **frontend**: use config var for readability
- refactor(frontend)e break up TemplateList into sub-components for manageability
- **frontend**: use extended BaseService class for project and template service to reduce duplicated
  code
- **frontend**: replace core logic in project/template stores with baseStore composable
- **frontend**: rework classes to use Tailwind utility classes
- update project service calls in tests
- **frontend**: use &lt;button&gt; for buttons
- **frontend**: clean up and refine Field components
- **frontend**: clean up unused props and emits
- **frontend**: clean up view title display
- **frontend**: clean up unneeded &lt;template&gt; elements
- **frontend**: set styles for buttons to match button classes
- **frontend**: clean up template
- **frontend**: move bootstrapping logic from main.js into bootstrapUtils.js
- set sticky header styles in utility class and use --sticky-offset var for top:
- **frontend**: move bootstrapping logic from main.js to bootstrapUtils.js
- **frontend**: rename costValidation.js to templateValidation.js and add commonValidation.js
- **frontend**: rework project creating to utilize projectStore and move logic from overlay
- **frontend**: put String first in type list since it's more likely and predicable with defaults
- **frontend**: pass parentLoan and custNum from route query to child components to reduce code
  duplication
- **frontend**: use shorthand properties
- move logic for modifying template and project costs array to template service
- **frontend**: move watchEffect on project costs to project store
- **frontend**: remove unneeded logic from isDirty
- rename event handlers to use onX naming scheme
- move conversion of template costs -&gt; project costs to utility
- use project and originalProject from store for isDirty comparison
- **frontend**: clean up and simplify isValid
- move toProjectCosts() to costUtils.js for consistency
- use base project structure when initializing project store
- fix how base.entity.costs is sent to recalculateTotals()
- rename updateField to onUpdate for consistency and simplify @update:modelValue handler assignment
- streamline template by using computed props for fieldsValid and loading and clean up logic
- use prop shorthand for cost
- add loading and fieldsValid computed props and use shorthand prop assignments
- simplify loading prop logic
- simplify logic for display of variation
- use CurrencyField when displaying variation for consistency
- move setting class on TemplateListItem rows to TemplateListItem component
- use shorthand prop and simplify setting isPercentTotalValid
- export all stores as default export instead of named
- use default export for all composables instead of named export
- display loan purpose instead of ID in list
- set API_BASE to /api/v1 and handle setting construction or loan-analysis in the extended classes
- add ability to skip adding isActive to parameters in find()
- reduce top margin offset to prevent overlay with tab background
- rename reset() to resetEntity()
- use project or customer name in new project dialog title
- improve style and loading state for template view title
- default inputs to full width
- improve title content and loading state for project list view
- adjust primary button colors
- move view button to first column instead of last
- adjust complete cost item styles
- do not require .button class when using .button-sm
- adjust color and underline offset for editable fields
- use eye icon for view button
- reorder project list columns
- add tooltips to router links
- place view link first and use eye icon for button
- rename buttons to match Vue suggested naming scheme
- rename banners to match Vue recommendations
- improve organization of components and remove unnecessary AppLayout layer
- rename Field components to match Vue recommendations
- rename Icon components to match Vue recommendations
- use shorthand props and make Button components consistent
- improve main page structure in App
- adjust display of version in footer
- add loan number column and adjust column order
- set defaults for loading and project instead of making them required to simplify skeleton view
- remove unneeded project property from skeleton display of project list item
- adjust widths on template list items

### Bug fixes

- **projectRoutes**: add missing delete route
- add template routes and use API_PREFIX for endpoints
- set base path correctly for build environment
- import dotenv/config for env vars
- **projectStore**: replace Template with Project for consistency
- **projectStore**: set updatedOn property on project so isDirty calculation is correct
- **ProjectHeader**: use correct function call method for handleUpdate()
- prevent white outline when focusing inputs
- improve red border/ring/outline around invalid inputs
- wait for nextTick before validating in handleModelUpdate
- prevent errors calling startsWith() when id is not a string
- **templateStore**: replace template completely instead of just updating ID
- **projectStore**: replace entire project ref with new data to keep IDs in sync
- move app top padding to index.html so it only applies for dev
- prevent view transition after save when replacing temp ID with real ID in route
- rename .modal to .modal-dialog to prevent collisions with Bootstrap
- **NewProjectOverlay**: use NumberField component for loanNum
- **numberUtils**: make max optional for isInRange()
- **NewProjectOverlay**: set maxlength to 2 on state field
- call clearDoneTimeout() in reset()
- improve store reset logic on unmount and also reset formState
- remove debugging statements
- add watchEffect to imports
- use boolean instead of bit for isActive
- disable eager and set orphanedRowAction to delete
- set orphanedRowAction to delete
- use standard functions for class methods instead of arrow functions
- return null if not found in update instead of throwing error
- use consistent naming for cost items across projects and templates
- use bit for isActive for SQL Server backend
- adjust how db config is imported for clarity
- import db from config/dataSource.js instead of config/db.js
- import db from config/dataSource.js instead of config/db.js
- use arrow functions for class methods to preserve context of `this`
- show "no projects found" on project list if no matching projects found
- disable max-lines for file
- add custNum to ProjectListItem
- update page title in index.html
- **frontend**: wait for next tick before blurring input when ESC is pressed to prevent validating
  stale data
- set base font size to inherit container
- make app-layout only as wide as content
- **frontend**: prefix utility class with #constructionLoanApp
- **frontend**: improve menu and overlay appearance
- prevent table from being full-width
- **frontend**: adjust styles for modals so overlay backdrop doesn't move vertically
- **frontend**: remove unneeded v-bind="$attrs" to prevent duplicate classes
- **frontend**: use 5xl as minimum table width
- **frontend**: handle null date the same as empty string
- **frontend**: use 6xl for minimum table width
- **frontend**: make link text lighter when in table cells to appear the same as other links
- **frontend**: add customer number to new project dialog
- use rest operator to set options correctly
- **frontend**: log error on caught error
- **frontend**: log error to console on caught error
- **frontend**: return data from apiRequest() in findById()
- **frontend**: allow header to be narrower than page content
- **frontend**: place sticky header at z-index 900
- **frontend**: remove extra whitespace above app
- **frontend**: lower z-index to prevent issues with ASP.NET wrapper
- **frontend**: default options to empty object if omitted in validateCurrency
- **frontend**: apply right border specifically in .border-r-dashed
- **frontend**: update reference to template validation utils
- consider empty string invalid when checking for required properties
- send null instead of zero to CurrencyField for actualCost and drawnAmount
- sync original project with project in store after initializing new project
- extend base project in store in fetchById() to ensure all properties exist
- add missing import of BASE_PROJECT and BASE_PROJECT_COST
- change updateProjectProperty() to updateProperty() after renaming in store
- correct alignment of template list view heading
- make inputs full width in new project dialog
- add missing isActive default and add loan purpose to BASE_PROJECT
- display loan purpose instead of ID in project header
- strip temporary ID from saveData if set to prevent sending bad data to API
- call resetEntity() on unmount of new project/template overlay
- add fallback to ID if custName or loanPurpose are not set
- specify custNum in filter when filtering by project to prevent uninitialized custNum in new
  project dialog
- add missing exports for resetStore and resetEntity
- remove all negative top margin to prevent overlap with ASP.NET app tab background
- prevent crash when saving by using selectedParentLoanId.value instead of selectedParentLoanId
- calculate custName when loading dialog
- call projectStore.resetStore() on unmounted instead of projectStore.reset()
- prevent issues when selectedParentLoanId is not set from drop-down
- call templateStore.resetStore() on unmounted instead of .reset()
- remove y-padding to prevent unnecessary scroll

_[View all changes in v2025.8.19 »](https://10linux01.pbt.local/gitea/jkaufman/la-construction/compare/v1.0.0...v2025.8.19)_

## v1.0.0 - _1 August 2025_

### New features

- automatically calculate total drawn amount when cost items array changes
- add table footer for improved visual appeal
- add "unsaved changes" indicator if project has been changed
- add support for loading state
- add skeleton elements for loading state
- add support for loading state and set loading based on result of getProject()
- add support for skeleton while project data is loading
- add base skeleton styles
- make dollar sign before currency optional
- add currency validation method
- add invalid prop to BaseInput component
- add focus method and ref to BaseInput to allow focusing input from parent component
- add InputCurrency.vue component
- use CurrencyInput component for actual cost
- hide $ in front of currency if modalValue is not set and edit mode is off
- use CurrencyInput component for draw amount
- add dollar sign into CurrencyInput
- use CurrencyInput and pass errors up to parent component
- add error message display banner
- add form error handling to ProjectView component
- add sample data for development API
- properly set ID for pulling specific loan from API
- transition between router views
- use BaseTable for table and add loading skeleton
- add heading to loan list view
- set API_BASE in config and use in loan service
- expose input element to parent
- use constructionLoanStore for state
- add constructionLoanStore for global state
- use constructionLoanStore for state
- add TODO section
- add new loan button and styles to loan list view
- add new loan form overlay
- add percentOfProjectedTotal to mock cost items
- add viewOnly support to CurrencyInput.vue
- set viewOnly to true for projectedCost field
- make projected cost editable in header
- add TextField reusable component for text fields
- use new TextField component for header items
- add loan number to loan header
- add formIsValid prop to store
- do not allow fields to enter edit mode if form state is invalid
- add support for filtering project list by loan number
- add names to routes
- add ability to browse between project list and project view while keeping loan number filter
  intact
- conditionally render loan number column based on if view is filtered by loan number
- add default styling for buttons containing SVG images
- adjust new project form title based on if parentLoan is set
- add editOnly prop
- use value of editOnly to determine whether to show input by default and to allow view mode on exit
- use CurrencyField for projected cost input
- add loan number input to form if parentLoan is not set
- show computed total for each cost item based on projectedCost and the item's percent
- pull project templates from db/api
- add not found component
- add template routes and placeholder vue files
- add isNumeric()
- add revertProject() for revert button
- add handleRevert() to handle 'revert' events
- add route for template view
- add svg sizing for small button
- add AddButton reusable component
- add PercentField reusable component
- add edit-only functionality to TextField
- add templateStore
- add new template overlay component
- add template list component
- add template view
- add ability to add new cost items to template
- implement adding cost items to template
- make cost item name editable
- finish AddButton component
- add BackButton component
- use BackButton and AddButton components
- add ModalOverlay ui component
- add cancel and save button components
- refactor project and template layouts, use composable for modals, and streamline route handling
- add form store for handling form state
- add date utils
- flesh out DateField component
- use PercentField for projected percent on costs to allow editing
- default CurrencyField to min="0" to only allow positive numbers by default
- add validation of project cost in updateField()
- add dirty state tracking into project store to keep form store data-agnostic
- use injected composable for form state instead of Pinia store
- **ProjectCost**: add initial handler for field error emits
- add required name prop to field components
- pass on field-error emit with formatted error message
- highlight invalid project cost if any fields are invalid
- highlight invalid project cost if any fields are invalid
- add saveProject function to project store
- add validation for total of percentages on template cost items to equal 100%
- **templateService**: add save function
- **templateStore**: add storeTemplate call to saveTemplate() to save data to backend via API
- **banner**: add API error display functionality
- **templateStore**: display API error in banner if save fails
- add support for changing save banner while save is in progress
- **projectStore**: add isSaving ref to hold saving state
- **banner**: add support for displaying "done" banner after save is complete
- **SaveBanner**: add animation to save banner to give the impression of things happening during
  save
- **template**: add support for deleting cost items from template
- add API utility function for making fetch request and throwing formatted error
- add ID util for generating unique temporary ID
- **template**: add ability to create new templates
- **TemplateList**: add cost item count, delete button, and deleted status to template list
- **project**: add ability to save and delete projects to store/service
- add useField composable to hold reusable logic across Field components
- **ProjectList**: add projected cost, actual cost, and drawn amount to project list

### Improvements

- simplify how actual cost and drawn amount are kept in sync on project object
- clean up row class calculation
- move project data to projectService.js to simulate actual API call
- move unsaved changes notice to separate component
- use base skeleton class for skeleton items
- rename calculationUtils.js to numberUtils.js
- rename calculatePercentOfTotal() to calculatePercent()
- optimize recalculateTotals() function for improved performance and readability
- convert updateCostItem() into pure function to avoid side effects
- use structuredClone instead of stringify for copying project to originalProject
- simplify hasUnsavedChanges computation for clarity
- streamline edit mode handling and input validation in CurrencyInput
- make clicking on containing div call enableEdit enabling clickable empty cells
- improve edit/view and validation functionality
- enhance validateCurrency function to accept options for validation
- rename project to loan across codebase
- rename project to loan across codebase
- use Vue router for loans list and loan view and pull data from mock API
- improve input handling and use Pinia store
- use loanStore for state and organize logic
- move recalculateTotals to loanServices.js
- rework handling of modelValue to be in line with Vue v3.4+
- simplify computed property arrow function
- move back button inside LoanHeader component
- simplify handling projectedCost update
- move display of skeleton while loading into CurrencyField for consistency
- use new TextField component for header items
- move loading skeleton logic out of LoanHeaderItem so the field components can handle it
- use global store for loading state
- use global store for loading state
- use loan store for total projected and total actual costs
- rename hasUnsavedChanges to isDirty and use store state
- rename isDirty to formIsDirty and use formError from store instead of props
- use shorthand for updateLoanProperty setter
- use updated store state props
- use isValid for inputs for consistency with form state in store
- use isValid for consistency
- add handleUpdate to clean up @update:model-value and make component more readable
- use inputEl computed property to store reference to actual input element
- rename loans to projects for consistency
- use config for base URL in routes
- handle setting parentLoan in App.vue and pass down via props to components that need access
- use computed prop for templateCostItems array
- replace $router.back() with goBack method for navigation consistency
- rename ProjectCostTableRow component to ProjectCost
- move ProjectHeaderNotice.vue to Base/HeaderNotice.vue for reusability
- move HeaderNotice to ProjectView for better organization
- move HeaderNotice to ProjectView for better organization
- rename HeaderNotice to HeaderBanner
- rename project-templates endpoint to just templates for brevity
- move handling of loading state to header item instead of TextField
- move load state handling to ProjectCost component instead of individual field components
- always place skeleton placeholders for loading before actual content
- rename components/Base to components/base to match convention
- move field components from components/Fields to components/ui/Fields
- move components/ProjectView to components/projects/ProjectView to match convention
- organize views by domain
- move add button SVG to icon component
- use AppLayout for overall app layout
- use ModalOverlay component for new project/template overlays
- move back button SVG to reusable icon component
- move modal dialog container to separate component and use it in AppLayout
- use AppLayout for main layout in TemplateView
- move template costs to separate component
- consolidate banner components and implement banner store for better banner handling
- streamline handling of parentLoan query parameter
- move form-related state to form store
- use form store for form state when displaying banners
- use DateField component in project cost
- use formStore for form state instead of projectStore
- use formStore for form state
- use form store for form state
- use form store for form state
- streamline template store by integrating form store and removing unused error handling
- wrap template content in a div to prevent DOM errors when hot reloading modules
- consolidate CSS for modal transitions
- rename fade to fade-slide-right for clarity
- update README to remove TODO section and add project status link
- move project cost validation to utils/validation/projectValidation.js
- add formError ref and convert error to computed prop based on value of formError and fieldError
- rename reset to resetDirty and add reset method that clears fieldError and formError
- move calculation of isDirty outside form store to keep it data agnostic
- change project from reactive to ref for better reactivity handling
- remove unused formStore dependency and streamline isDirty computation
- clean up and simplify isDirty computed prop
- use injected formState composable instead of Pinia store
- clean up debugging in bindDirtyRef
- rename vars in recalculateTotals to allow object deconstruction in the assignment and cleaner code
- simplify toISODateString by using parseDateString for input normalization
- simplify toDateString by using parseDateString for input normalization
- simplify validateDate by using parseDateString for input normalization
- simplify check for invalid dates in isAfter
- **formatCurrency**: use options object for parameters
- **formatCurrency**: remove redundant checks / conversions on num
- **checkProjectCost**: improve validation logic
- **PercentField**: use v-if to prevent rendering BaseInput when viewOnly is true
- **PercentField**: store percents in 1-100 range instead of 0-1
- **PercentField**: remove unused decimals prop
- **CurrencyField**: initialize edit with value of editOnly to remain consistent with PercentField
- initialize edit with value of editOnly instead of watching value for changes
- **CurrencyField**: reorder v-if and v-show for consistency across field components
- **CurrencyField**: reorder v-if and v-show for consistency across field components
- **TextField**: update to skip rendering BaseInput if viewOnly is true to be consistent with other
  field components
- **CurrencyField**: simplify handleEscape()
- emit field errors on invalid input and make validateInput() consistent across fields
- **TextField**: make handling of editOnly prop consistent with other fields
- send object when emitting field-error
- move formatting of variation from computed prop to template for clarity
- move call to formState.setFieldError() to ProjectCost and ProjectHeader to simplify error handling
- use fieldsValid prop instead of injecting formState into Field components
- **bannerStore**: send save and revert functions to setState() to reduce hard-coding and
  dependencies
- **bannerStore**: set save and revert functions via setters instead of watch
- update template store and template view to be consistent with project store and view
- add loading prop to ProjectCostTable for loading state instead of using projectStore in
  ProjectCostTable
- rework template store and components to be consistent with project store and components
- **TemplateCostTable**: improve visual loading state in table footer
- simplify setting error message if total of percentages is not 100
- validate model value instead of sending argument to validateInput
- **PercentField**: rename inRange to validPercent for consistency
- move number range validation logic to utility function
- **TemplateCostTable**: use PercentField for displaying percent total
- **validateInput**: simplify logic for setting error message on field-error events
- **parseDateString**: remove redundant sanity check on date
- use JSON.parse(JSON.stringify()) instead of structuredClone() for consistency
- **updateCostItem**: clean up and simplify
- **template**: move percentTotal and percentTotalError from store to TemplateView
- **templateService**: flesh out initial storeTemplate logic
- **templateStore**: reset API error before functions that call the API
- **templateStore**: remove internal isSaving with watch and directly call bannerStore.setIsSaving()
- **BaseBanner**: add classes for "done" type and improve how classes are assigned
- **ModalOverlay**: make component reusable for other modal types
- move calculation of cost percent total and validation of percent total to utility functions for
  reuse with projects
- **templateStore**: use internal state for justSaved and sync with bannerStore's isSaveComplete
- **TemplateView**: improve logic for checking percent total
- use watchEffect to sync formState with bannerStore to improve legibility
- **template**: add support for filtering template list view
- **templateService**: use apiRequest() for API call
- **template**: add support for filtering template list view
- **templateService**: use custom apiRequest for API call
- add DeleteButton and use it instead of using DeleteIcon directly
- rework modal functionality to simplify usage and components that use it
- **templateService**: clean up and simplify getTemplates()
- **templateService**: add filtering for "complete" templates (templates with a cost length &gt; 0
  for now)
- **ProjectView**: update to match template view logic for creating new projects
- **NewProjectOverlay**: flesh out new project modal, adding validation and save functionality
- use watchEffect instead of watch for consistency
- use config for timeouts instead of magic numbers
- use config for fake API delay in testing
- use options object in fetchProjects/getProjects to be consistent with template service
- **projectStore**: use namespace import to clean up imports and prevent function name collisions
- **projectService**: use apiRequest utility for API calls
- **templateService**: simplify return from storeTemplate
- **apiUtils**: set default fetch method to GET
- **newProjectOverlay**: add loading state for template loading
- **CurrencyField**: use field composable to reduce code duplication
- update PercentField and TextField to use composable for logic and update tests accordingly
- **DateView**: use Field composable for DateField
- **DateField**: use handleModelUpdate from field composable and remove local handler
- **DateField**: use watchEffect instead of watch for more readable code
- move API delay for dev into apiUtils to reduce duplicate code
- **project**: break out project rows from ProjectList into separate component
- add calculateVariation util and use it for all variation computed properties
- use environment variable for API delay instead of hard-coding
- **TemplateView**: use modal composable for delete cost item modal overlay
- **ProjectView**: use injected formState instead of providing it and remove unneeded watchEffect
- **TemplateView**: remove unneeded wrapper for templateStore.saveTemplate()
- **useField**: simplify and streamline logic for readability
- add .prevent modifier to @keydown.escape to prevent default action
- move frontend code to ./frontend and add ./backend

### Bug fixes

- remove is-last prop and add text for Drawn column
- mark cost item row as complete if drawn amount === actual cost
- add input for item cost drawn amount entry
- rename Draw to Drawn in header items
- use project.drawnAmount for total drawn amount against project
- default project header items to 0 for formatCurrency()
- prevent unset project.costs[] from breaking recalculateTotals()
- add missing dep
- set costs prop to [] by default to prevent issues while loading
- default to empty string for projected cost, actual cost, and drawn amount
- default name and value to empty string
- make getProject() async and simulate long API response time
- prevent crash when cost.drawAmount is not set
- remove unneeded v-if on Input
- format projected amount with 2 decimal places
- format actual cost with 2 decimal places
- if input sent to formatCurrency is invalid, return the value as-is
- don't use .toFixed() when assigning value to input
- calculate projected cost from cost items and store in project object with other totals
- add missing toRaw import from vue
- use default styles for tfoot
- wrap content in div and add router-link to loan list view
- properly pull loan data based on ID from URL
- add styles for body
- set all Tailwind classes to !important by default
- add wrapper to entire app for targeting with CSS
- adjust routes to match ASP.NET
- allow input to be null
- use drawnAmount instead of drawAmount to remain consistent
- allow value prop to be string or number
- pass on credentials when making API request
- use correct path for route
- redirect / to /ConstructionLoans
- add missing &lt;tr&gt; around &lt;td&gt; in table footer
- use relative URL for loan list view
- use drawnAmount instead of drawAmount for consistency
- make API base not include loans or construction-loans and specify that in loanService.js instead
- remove unnecessary prop
- improve back button visual appeal
- use YYYY-MM-DD format for date input values
- remove unnecessary logic in assigning classes
- use primary button class for save button
- update router paths to match ASP.NET app paths
- remove trailing slash in API base
- hide spinners on input type=number
- use unicode char instead of &nbsp; for non-breaking space
- clean up event handling on table
- rename construction-loans to constructionLoans since json-server does not support hyphens
- clean up unused error emits
- simplify return
- use /api for base by default
- update schema to match project requirements
- validate modelValue before attempting to format it
- init inputRef as empty object
- default to true if checkValidity() is not available
- prevent missing inputEl.reportValidity() and inputEl.validationMessage from causing issues
- clean up unnecessary emits
- clean up unneeded defineEmits()
- return empty string if empty string sent to formatCurrency()
- return empty string if empty string sent to formatCurrency()
- add white bg to button to prevent bleed through
- place loan header container styles inside LoanHeader component for better encapsulation
- update schema
- add rewrites for json-server endpoints to mimic production
- show percentOfProjectedTotal in cost item table row
- stop completed rows from overlaying header items
- set API_BASE to match production and vite rewrites for json-server
- add missing percentOfProjectedTotal to construction loan 1
- display percent of projected total
- add projectedCost to mock data
- rename drawAmount to drawnAmount to match expectations
- remove static height on containing div
- use computed prop for projectedCost
- rename CurrencyInput to CurrencyField to more accurately describe the functionality
- move CurrencyField to @/components/Fields
- use TextField for cost item name
- make CurrencyField tests pass now that skeleton loading view is handled within the component
- remove unneeded @update:model-value on projectedCost as it is view-only
- prevent classes from being applied to root element in component
- use updateLoanProperty() from loan store to update projected cost
- rename updateProjectedCost to updateLoanProperty for reusability
- remove title and add padding to top of list page
- remove title and add padding to top of list page
- use cost.projectedCost instead of undefined projectedCost
- add missing prop definition
- properly reference loan's projected cost
- do not parse cost.actualCost
- use formErrorMsg instead of formError for clarity
- use setErrorMsg() instead of setError()
- default isValid to true
- use loanStore.setErrorMsg() instead of loanStore.setError()
- default inputRef to null
- remove unused expose of focus()
- use inputEl for interacting with raw input element
- validate modelValue.value when leaving field
- let handleLeave() handle calling validation
- correctly set htmlValidity
- do not use nullish coalescing for modelValue display
- use logical OR instead of nullish coalescing on validationMessage
- send modelValue.value to validateInput instead of raw input value
- update CurrencyField tests to include loading state and viewOnly prop handling and 100% coverage
- add title to project list page and reorder items for best visual
- add for attribute to labels
- align text to right in CurrencyField input box
- adjust padding on new project form
- add missing projectedCost ref
- define parentLoan prop
- rename Project route to ProjectView and Projects route to ProjectList for consistency
- correct calculation of amount in templateCostItems to use percent directly
- update BASE_ROUTE and adjust routing paths for consistency
- update route name for redirects to match actual routes
- lazy-load components for non-default routes
- add not found route
- rename appStore to projectStore for separations of concern
- use OR instead of bitwise or in if statement
- improve number validation in variation calculation
- simplify assigning class for clarity
- manually reset input value when handling escape
- adjust styles for header banners and add styles for info type banner
- add 2 to allowed magic numbers
- pass query parameters as-is to prevent empty parentLoan parameter
- use /ConstructionLoansApp/ as base when building so assets are imported correctly when running in
  ASP.NET environment
- refine table styles
- add skeleton styles for headings
- only allow string model values for TextField
- hide dates if not set until DateField is complete
- improve functionality of floating header when header items wrap
- add useRoute import for route.query to work in router-link
- cast model value to string when displaying loan number
- rename projectTemplateService to templateService and flesh out functionality
- rename getProjectTemplates to getTemplates
- add missing useRoute for navigation via router-link
- remove text shadow for warnings
- rename costItems to costs on templates for consistency with projects
- set min, max, and step appropriately for percent input
- align percent column to right
- use 1-100 range for UI while storing percent in 0.01-1.00 value range
- set type of modelValue to Number only
- rename costItems to costs for consistency
- add missing &lt;th&gt;
- set modelValue without toFixed() so it accurately reflects the value entered
- do nothing when pressing escape in an edit-only field
- do not cast origValue to string when resetting input element value
- simplify looping through cost items by using db ID for key
- improve styles on buttons containing an SVG
- rename costItems to costs for consistency
- send query parameters to AddButton
- update ProjectList to use parentLoan directly from query parameters instead of prop
- update modal query parameter check to use 'newTemplate'
- restructure AddButton template for conditional rendering of router-link and button
- prevent DOM update errors when hot reloading modules by wrapping content in div
- rename isDirty to formIsDirty to remain consistent with what HeaderBanners expects
- calculate projectedCost for costs on the fly for reactivity
- add missing import for PercentField
- remove unnecessary min="0" on CurrencyField
- print non-breaking space if formattedDate is not set so clickable element displays
- allow null message in ErrorBanner.vue
- reorder variable definitions for consistency across components
- properly modify project by replacing entire object, since it is a ref() instead of reactive()
- prevent validation of entire cost item if an individual field is invalid
- use .value on formState.fieldsValid since it is a ref from a composable now
- set edit using watchEffect instead of locking in initial value on component mount
- don't simulate API delay when running tests
- improve input processing in toISODateString function
- use parseDateString() to parse date in toDateString()
- enhance validateDate function to properly support empty date validation
- update call to validateDate to set allowEmpty properly
- refine parsing date from strings and reject valid-looking invalid dates
- format ISO date using local parts instead of toISOString
- use parseDateString instead of new Date() for parsing date
- return Date objects as-is when sent to parseDateString
- add early return for invalid Date objects in parseDateString
- properly handle negative and falsy inputs to calculatePercent
- refine isNumber logic and handle non-int, non-float strings properly
- **ProjectCost**: divide percent by 100 in calculations to reflect updated value range for percent
- **CurrencyField**: don't render BaseInput if viewOnly is set
- **PercentField**: fix typo in setFieldError and emit object in field-error
- prevent attrs from applying to root element by default
- use name in data when emitting field-error
- add required name prop to field components
- add cost name to error message when emitting field-error
- allow project list tables to expand to full width
- save model value to origValue on mount to prevent issues reverting when editOnly is true
- wait for next tick before handling field error so changes in cost.name are applied
- set required=true on TextField and PercentField
- add id attribute for input element to inherit
- wait for nextTick before validation to prevent race conditions
- **TextField**: trim value before comparing to empty string
- **CurrencyField**: import onMounted correctly
- **isInRange**: use Number.isInteger() to validate min/max options
- **PercentField**: set min to 1 instead of 0 to be consistent with attributes on BaseInput
- **PercentField**: allow resetting of input value on ESC when in edit-only mode
- set template.value.costs to empty array if not set when calling getTemplate()
- **templateStore**: use JSON.parse(JSON.stringify()) instead of structuredClone() in saveTemplate
- rework sync of formState to bannerStore to match changes
- rework sync of formState to bannerStore to match changes
- **bannerStore**: do not show save banner if \_apiError is set
- **templateStore**: reset originalTemplate on successful save to clear dirty state
- **ErrorBanner**: only display "ok" button on API errors
- add missing SpinnerIcon component
- **tailwind**: add utility functions for animation delay and duration
- **BaseBanner**: make banners appear above translucent overlay from modals
- **PercentField**: default to empty string instead of null to pass model value checks
- **templateStore**: improve logic for showing error banner to prevent overriding "saving" and
  "done" banners
- **AppLayout**: use route name as key to prevent transition when replacing temp ID with real ID in
  URL
- **templateStore**: move updateTemplateProperty above saveTemplate and use it to set ID to prevent
  race conditions
- **TemplateView**: improve logic for setting percentTotalError
- **templateStore**: replace costs array instead of push in addCostItem for better reactivity
- prevent infinite loop when exiting field with invalid data if edit-only is true
- prevent infinite loop in edit-only when leaving invalid field and prevent user leaving field if
  invalid in edit-only
- **templateService**: add missing deleteTemplate and add default export
- **NewProjectOverlay**: retain query parameters when replacing route to prevent loss of parentLoan
  state
- **newProjectOverlay**: keep newProject.loanNum in sync with parentLoan if set
- use endpointBase for API requests
- **projectService**: set loanNum only if options.parentLoan is set
- remove default export for template and project service
- **ProjectList**: send HTTP query to fetchProjects as options
- **NewProjectOverlay**: set minimum on projected cost field
- **projectService**: prevent errors if payload.id is not a string in storeProject
- **useField**: remove wait for next tick when validating input on model update to prevent race
  condition
- **ProjectCost**: move nextTick before checking formState.fieldsValid
- **CurrencyField**: fix typo in validateFn and errorMsg properties
- **ProjectCost**: set min = inspected date on draw requested instead of max
- **ProjectCost**: move project-wide validation to handleFieldError to prevent race conditions
- **templateStore**: add missing reset() function for template store
- **templateStore**: add missing reset() function for template store
- **templateStore**: use DONE_BANNER_TIMEOUT instead of magic number
- **ProjectCost**: update variation currency formatting to match CurrencyField view mode
- **ProjectCost**: set minimum value on actual cost and drawn amount to 1
- **projectValidation**: add test for if drawnAmount is set and drawRequestedOn is not
- **project**: emit cost-error in ProjectCost if cost fails validation and handle gracefully in
  ProjectCostTable
- **templateStore**: do not change saving and just saved states when removing a cost item from a
  template
- **useField**: manually blur on escape for non-Vivaldi browsers and then let handleLeave do
  validation, etc
- **useField**: add handleEnter that only blurs input to prevent handleLeave from being called twice
- use field.handleEnter for enter key press in Field components
- **ProjectCost**: set min to 0.01 on CurrencyField to match step
- **ProjectCost**: return after emitting null cost-error when fields are invalid to prevent extra
  checkProjectCost calls
