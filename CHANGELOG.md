# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0-beta.1] - 2024-12-19

### Added

- **Comprehensive Error Handling**: Added robust error management throughout the library
  - Validation of all input parameters in public functions
  - Try/catch blocks around critical operations
  - Console.error messages with clear prefixes for debugging
  - Fallback mechanisms for graceful degradation

### Enhanced

- **Router**: Parameter validation and error recovery
- **Route Generator**: Input validation for components and configs
- **SEO Utils**: Safe DOM manipulation with error handling
- **Navigation Components**: Robust initialization and update methods
- **Language Selector**: Comprehensive validation and error recovery

### Security

- **XSS Protection**: HTML escaping in navigation components
- **Safe DOM Operations**: Protected meta tag and link manipulations

### Developer Experience

- **Clear Error Messages**: All errors prefixed with "[Love On The Route]"
- **Graceful Fallbacks**: Library continues working even with invalid inputs
- **Better Debugging**: Comprehensive logging for development

## [1.2.1] - 2024-12-19

### Fixed

- **Documentation**: Updated README with improved examples and logo
- **Assets**: Updated logo image

## [1.2.0] - 2024-12-19

### Added

- **New multilingual utility functions**:
  - `detectCurrentLanguage()` - Detects current language from URL
  - `filterRoutesByCurrentLanguage()` - Filters routes by current language
- **Enhanced multilingual navigation**:
  - Navigation now automatically filters routes by current language
  - No more duplicate links in multilingual mode
  - Dynamic navigation updates when switching languages
- **Improved LangSelector**:
  - Better support for custom SVG/image flags
  - Enhanced HTML flag support
- **Better SEO utilities**:
  - `resetSEO()` function for cleaning meta tags

### Fixed

- **Multilingual navigation duplication**: Navigation now shows only current language routes
- **Route filtering**: Proper filtering logic for multilingual applications
- **SEO integration**: Better integration with route components

### Improved

- **Documentation**: Complete multilingual setup examples
- **TypeScript**: Better type definitions for multilingual features
- **Examples**: Added comprehensive multilingual usage examples

### Breaking Changes

- None (backward compatible)

## [1.1.1] - Previous release

- Initial stable release with basic routing, navigation, and SEO features
