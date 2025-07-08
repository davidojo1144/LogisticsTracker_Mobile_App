# LogisticsTracker_Mobile_App




Logistics Tracker
A React Native app built with Expo for field logistics operators to manage package delivery statuses.
Setup Instructions

Initialize Project:

Run npx create-expo-app LogisticsTracker --template blank.
Replace app.json and package.json with provided files.
Install dependencies: npm install.


Add Fonts:

Create assets/fonts/ directory.
Download Roboto-Regular.ttf from Google Fonts and place it in assets/fonts/.


Add Data:

Create data/ directory.
Add packages.json with the provided mock data.


Run the App:

Start the Expo server: npm start.
Use Expo Go app or an emulator to test on iOS/Android.



Features

Dashboard: Lists packages with tracking ID, recipient name, and status badges (Pending: orange, In Transit: blue, Delivered: green). Supports font scaling.
Package Details: Shows full package info with locked fonts. Includes buttons for marking as delivered (toast), contacting recipient (phone link), and updating status.
Update Status: Form to change package status (Pending, In Transit, Delivered, Failed) with validation and console logging. Supports font scaling.
Settings: Toggle for font scaling, saved to AsyncStorage, affecting Dashboard and Update Status screens.


