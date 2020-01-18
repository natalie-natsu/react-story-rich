All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
`### Added ### Changed ### Removed ### Fixed`

## [2.0.0-alpha] - 2020-01-18
v1.0.0 was release too fast but was none the less working well.

### Removed
- v1.0.0 was release too fast but was none the less working well
- location and dataContext reducers (were useless and after reflexion were not relevany)
- `<Landing />` & `<Layout />` (were not relevant)
- `<Provider />` (was not relevant)

### Changed
- v.2.0.0 has really improved CustomElements and the way to display it
- Improve documentation
- Enhance `<Story />` and Story prop `scrollToBottom` became `autoScroll`

### Added
- lodash as dependency
- Hooks !
  - useActions
  - useChunk
  - useEnabled
  - useFocus
  - useProgress
  - useTap
  - useTimeout
- Navigation Class
- Route Class


## [1.0.1] - 2019-12-29
### Fixed
- Reducer does not update after actions (Symbol issue)
- Layout takes more than the window height for min height

## [1.0.0] - 2019-12-27
**Includes changes made in initial development releases (0.1.z).**

### Added
- Main documentation with Styleguide
- Core package & UI package configuration for transpilation and module bundle (Babel + Rollup)
- Documented core component `<Element />`
- Documented core component `<Story />`
- Unfinished virtualized `<Story />` example that requires a contribution
- Documented core  `Actions` for story navigation
- Redux actions and reducers for navigation
- Barrel of imports using an included redux state for uninitiated creators that  want to actions bellow
- Documented UI component `<CardElement />`
- Documented UI component `<Landing />`
- Documented UI component `<Layout />`
- Other documentation sections like Troubleshooting or Contributors
