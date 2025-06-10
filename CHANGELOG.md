# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2024-12-19

### 🎉 Major Release: Language Hooks for Dynamic Components

### Added

- **Language Detection Hooks**: Complete reactive language management system
  - `getCurrentLanguage()` - Simple current language detection from URL
  - `watchLanguageChanges(callback)` - Real-time language change monitoring for reactive components
  - Automatic cleanup system with unsubscribe pattern for memory management
- **Enhanced Language API**: Production-ready language detection capabilities
  - Smart language detection from URL segments (2-3 character codes)
  - Support for programmatic navigation changes via pushState/replaceState
  - Efficient background monitoring with automatic start/stop based on listener count
- **Developer Experience**: Complete documentation and real-world examples
  - Dedicated "Language Hooks" section in README with 3 clear usage patterns
  - Production-ready component localization examples
  - Comprehensive bilingual documentation (EN/FR)

### Enhanced

- **Language Change Detection**: Advanced monitoring system for production apps
  - Listens to both `popstate` events and programmatic navigation
  - Efficient listener management with automatic cleanup
  - Robust error handling for callback functions
- **API Consistency**: All language functions properly exported and documented
  - `getCurrentLanguage` and `watchLanguageChanges` added to main exports
  - Consistent error handling and logging patterns across all functions

### Documentation

- **Complete Language Hooks Guide**: Production-ready documentation
  - Simple current language detection for static components
  - Language detection with supported languages fallback
  - Real-time language change watching for reactive components
- **Real-world Examples**: Production-ready component patterns
  - Reactive components that update automatically on language changes
  - Proper cleanup and unsubscribe patterns for memory management
  - Translation integration examples with fallback strategies

### TypeScript

- **Enhanced Types**: Complete type definitions for all language features
  - `LanguageChangeCallback` type for watch functions
  - Full type safety for all language detection functions

### Production Ready

- **Stable API**: All language hooks thoroughly tested and ready for production
- **Performance Optimized**: Efficient listener management with minimal overhead
- **Memory Safe**: Automatic cleanup prevents memory leaks
- **Error Resilient**: Comprehensive error handling for edge cases

## [1.4.0-beta.4] - 2024-12-19

### 🚀 Beta Release: Language Hooks for Dynamic Components

### Added

- **Language Detection Hooks**: New reactive language management system
  - `getCurrentLanguage()` - Simple current language detection without fallback
  - `watchLanguageChanges(callback)` - Real-time language change monitoring for reactive components
  - Automatic cleanup system for language listeners
- **Enhanced Language API**: Improved language detection capabilities
  - Smart language detection from URL segments (2-3 character codes)
  - Support for programmatic navigation changes via pushState/replaceState
  - Background monitoring with automatic start/stop based on listener count
- **Developer Experience**: Complete documentation and examples
  - Language Hooks section in README with 3 clear usage patterns
  - Real-world component localization examples
  - Comprehensive bilingual documentation (EN/FR)

### Enhanced

- **Language Change Detection**: Advanced monitoring system
  - Listens to both `popstate` events and programmatic navigation
  - Efficient listener management with automatic cleanup
  - Error handling for callback functions
- **API Consistency**: All language functions now exported from main index
  - `getCurrentLanguage` and `watchLanguageChanges` added to exports
  - Consistent error handling and logging patterns

### Documentation

- **New Language Hooks Section**: Dedicated section highlighting the 3 main hooks
  - Simple current language detection
  - Language detection with supported languages fallback
  - Real-time language change watching
- **Complete Examples**: Full component localization examples
  - Reactive components that update on language changes
  - Automatic cleanup and unsubscribe patterns
  - Translation integration examples

### TypeScript

- **Enhanced Types**: New type definitions for language callbacks
  - `LanguageChangeCallback` type for watch functions
  - Full type safety for all new language features

### Beta Notes

- **Reactive Components**: Test the new language watching system
- **Performance**: Efficient listener management with automatic cleanup
- **Feedback Welcome**: Please test the new language hooks and provide feedback

## [1.4.0-beta.3] - 2024-12-19

### 🐛 Beta Release: Bug Fixes & Debug Improvements

### Fixed

- **Logo Click Navigation**: Fixed logo click events not triggering router navigation
  - Added proper click handlers for both integrated and separated logo modes
  - Logo clicks now correctly use `history.pushState` and `PopStateEvent`
- **Home Route Filtering**: Improved `replacesHome: true` logic
  - Now correctly filters multilingual home routes (`/`, `/en`, `/fr`, etc.)
  - Better pattern matching for language-specific home routes
- **Event Handler Setup**: Fixed missing click event configuration
  - All navigation links now properly handle clicks through router

### Added

- **Comprehensive Debug Logging**: Added detailed console logs for troubleshooting
  - Logo configuration and initialization logs
  - Route filtering debug information
  - Click handler setup and navigation tracking
  - Separate logo creation and event binding logs

### Enhanced

- **Navigation Logic**: Unified navigation handling across all link types
- **Error Handling**: Better error reporting for missing route attributes

### Debug Notes

- All debug logs are prefixed with `[Love On The Route] DEBUG:`
- Error logs use `[Love On The Route] ERROR:`
- Logs can be used to troubleshoot logo integration issues

## [1.4.0-beta.2] - 2024-12-19

### 🚀 Beta Release: Native Logo Integration in LoveNav (Updated)

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
