# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2023-10-11

## Added

- Validators Community List Update: Added AnyValid, SerGo and Xameyz

## [1.3.0] - 2023-07-13

## Added

- Comprehensive application of a custom UI/UX theme, encompassing:
    - Incorporation of specific colors for graph representation
    - Accentuation of color for PayoutBar and PayoutLine elements
    - Integration of the HumanSans typography
    - Refinement of colors assigned to BalanceGraph and Bounded components
    - Modification of the primary color dedicated to the light theme
    - Refreshment of the Cere Icon and Logo aesthetics

## Changed

- The functionality to toggle between light and dark themes has been reinstated
- Cere icon in the validator configuration has been updated

## [1.2.1] - 2023-07-12

## Changed

- Updated README: Revised the instructions for Liveness under General Requirements and updated the Contribution Guide.
  Additionally, included a feedback email for any questions or concerns regarding the content within the project.

## [1.2.0] - 2023-07-11

## Changed

- Enabled the Community Page.
- Updated the instructions for setting up the **Validator Entity** in the README.
- Improved the display of validators' identities.

## Added

- Added validators for Cere.

## [1.1.1] - 2023-06-01

## Changed

- Fix payout history date range. The dates were initially reversed and displayed the wrong date range.

## [1.1.0] - 2023-05-31

## Added

- Added `CereStatsProvider` feature to fetch data from CereStats API, providing reward history and era points for
  validators.
- Implemented custom hooks, `useFetchEraPoints` and `usePayouts`, to manage data from CereStats API. `useFetchEraPoints`
  retrieves era points for a specific validator, while `usePayouts` manages reward history.

## Changed

- The `useSubscan` hook has been replaced with the `useCereStats` hook for the Reward History and Era Point Charts data
  source.

## Removed

- Removed dependency on `Subscan API` and simplified data management strategy by using `CereStats` API as primary data
  source.

## [1.0.1] - 2023-05-18

## Added

- Improved network initialization and error handling. Prevents application crashes caused by incorrect localStorage
  network. Added default network for this scenario.

### Changed

- Improved workflow for deploying to development, staging, and production environments. Fixed issue
  with `REACT_APP_INCLUDE_TESTNET` variable.
- Set the `REACT_APP_INCLUDE_TESTNET` environment variable to `false` for the Stage environment.

## [1.0.0] - 2023-05-17

### Added

- Google Tag Manager script
- Cere Logo and Icon
- Cere Mainnet and Testnet configurations
- Cere Network favicons

### Changed

- Refactored testnet inclusion condition in build-and-deploy job
- Updated branches for Stage and Prod
- Updated information about Inflation
- Fixed HTML page formatting, ChangeNominations, and CERE_URL
- Updated README.md, prod.yaml, Favicons, units, and URI Prefix
- Adjusted constants and networks for Cere
- Updated default Network and active networks fields

### Removed

- Binance fetch
- maxNominatorsCount from TotalNominations
- Feedback and Community pages
- Settings Modal
- UseInflation hook
- Removed auctionCounter field
