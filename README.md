# PartyWall mobile app

Party Wall allows users to share their items (food, drinks) they want to sell
at the parties. Food has its name, description and weight. Drink has its
name and volume. Both drink and food have price and quantity

## Techs used

- React Native
- TypeScript

## Setup

### Prerequisites

- react-native
- Android SDK

### Before running on iOS:

- `cd ios && pod install`

### Installation on iOS device

- connect device with USB cable
- configure code signing in Xcode
- build and run your app using Xcode

### Installation on Android device

- turn on programmer mode in andorid device, allow instal&debug through USB
- connect device with USB cable
- make sure it's listed when you run `adb devices`
- run `npm run android`

## Development

- run `npm install`
- run `npm run server-auth`
- connect device / emulator
- run `npm run android/ios`
- run `npm run start`

## Env

Because of the internals pf `react-native-dotenv` package, the env handling is a bit different than usual.

- `.env` file has the example values, and is used in tests on CI
- `.env.development` file is uesd during development
- `.env.produciton` file is used for releases

### Troubleshooting

Anything wrong? Try:

- press `r` in terminal that runs `npm run start` to reload the app - see if it works
- force kill application then restart it
- `cd android; ./gradlew clean && npm run android` to rebuild the app

