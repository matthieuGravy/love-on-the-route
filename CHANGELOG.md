# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0-beta.1] - 2024-12-19

### 🚀 Beta Release: Native Logo Integration in LoveNav

### Added

- **Logo Configuration in LoveNav**: Native logo support with flexible integration options
  - `LogoConfig` interface for comprehensive logo configuration
  - `logo` option in LoveNav constructor for integrated logo setup
  - `separateLogoFromNav` option for independent logo and navigation rendering
  - `replacesHome` option to replace "Home"/"Accueil" links with logo
- **New Methods**:
  - `renderSeparate()` - Returns separate logo and navigation elements for custom layouts
  - `updateLogo(logoConfig)` - Dynamic logo configuration updates
- **Enhanced Navigation Logic**:
  - Smart filtering of home routes when logo replaces home
  - Active state management for logo links
  - Support for custom CSS classes on logo container and link
- **Multilingual Logo Support**:
  - Dynamic logo href updates for current language
  - Integration with existing multilingual navigation system

### Enhanced

- **LoveNav Component**: Extended with comprehensive logo integration
  - Logo HTML can include any content (img, svg, text)
  - Configurable href for logo destination
  - Custom CSS classes for styling flexibility
  - Active state management for logo links

### Documentation

- **Comprehensive Examples**: Three different logo integration patterns
  - Option 1: Logo replaces Home link in navigation
  - Option 2: Logo completely separated from navigation
  - Option 3: Logo coexists with Home link
- **Multilingual Examples**: Logo configuration with language switching
- **API Reference**: Complete `LogoConfig` interface documentation

### TypeScript

- **Exported Types**: `LogoConfig` interface now publicly available
- **Enhanced Type Safety**: Full type support for all new logo features

### Beta Notes

- **Feature Testing**: This beta introduces logo functionality for community testing
- **Feedback Welcome**: Please test the new logo integration and report any issues
- **Stability**: Core routing and navigation features remain stable

## [1.3.0] - 2024-12-19

### 🎉 Major Release: Comprehensive Error Handling & Multilingual Improvements

### Added

- **Comprehensive Error Handling**: Added robust error management throughout the library
  - Validation of all input parameters in public functions
  - Try/catch blocks around critical operations
  - Console.error messages with clear prefixes for debugging
  - Fallback mechanisms for graceful degradation
- **Automatic Multilingual Redirection**: Smart redirection from "/" to default language in multilingual mode

### Enhanced

- **Router**: Parameter validation, error recovery, and automatic multilingual mode detection
- **Route Generator**: Input validation for components and configs with auto-detection of language routes
- **SEO Utils**: Safe DOM manipulation with error handling
- **Navigation Components**: Robust initialization and update methods with HTML escaping
- **Language Selector**: Comprehensive validation and error recovery

### Fixed

- **Multilingual Routing**: Fixed automatic redirection from "/" to default language (e.g., "/en")
- **Error Recovery**: Library now gracefully handles invalid inputs and continues working

### Security

- **XSS Protection**: HTML escaping in navigation components
- **Safe DOM Operations**: Protected meta tag and link manipulations

### Developer Experience

- **Clear Error Messages**: All errors prefixed with "[Love On The Route]"
- **Graceful Fallbacks**: Library continues working even with invalid inputs
- **Production Ready**: Removed debug console.log statements for cleaner production output

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
