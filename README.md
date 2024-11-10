## kasirAjaAndroid 
mobile apps android kasirAja - aplikasi POS sedehana dengan berbagai fitur didalamnya dibangun dengan react native 

### backend
`Hapijs REST API - kasirAja`: [Link](https://github.com/ajikamaludin/hapi-kasiraja-api)

### screenshots
<div>
<img align="top" src="https://github.com/ajikamaludin/react-native-kasiraja-mobile/raw/dev/screenshots/1.jpg" width="200px">
<img align="top" src="https://github.com/ajikamaludin/react-native-kasiraja-mobile/raw/dev/screenshots/2.jpg" width="200px">
<img align="top" src="https://github.com/ajikamaludin/react-native-kasiraja-mobile/raw/dev/screenshots/3.jpg" width="200px">
<img align="top" src="https://github.com/ajikamaludin/react-native-kasiraja-mobile/raw/dev/screenshots/4.jpg" width="200px">
<img align="top" src="https://github.com/ajikamaludin/react-native-kasiraja-mobile/raw/dev/screenshots/5.jpg" width="200px">
<img align="top" src="https://github.com/ajikamaludin/react-native-kasiraja-mobile/raw/dev/screenshots/6.jpg" width="200px">
<img align="top" src="https://github.com/ajikamaludin/react-native-kasiraja-mobile/raw/dev/screenshots/7.jpg" width="200px">
<img align="top" src="https://github.com/ajikamaludin/react-native-kasiraja-mobile/raw/dev/screenshots/8.jpg" width="200px">
</div>

### Support me

<a href="https://trakteer.id/ajikamaludin" target="_blank"><img id="wse-buttons-preview" src="https://cdn.trakteer.id/images/embed/trbtn-blue-2.png" height="40" style="border:0px;height:40px;" alt="Trakteer Saya"></a>

### get the app
<a href="https://play.google.com/store/apps/details?id=com.kasirajaandroid" target="_blank">
<img align="top" src="https://github.com/ajikamaludin/react-native-kasiraja-mobile/raw/dev/screenshots/google-play-logo2.png" width="250px" height="75px">
</a>

### demo
[Demo Video](https://www.youtube.com/watch?v=pBqVOmw8Ess)

### feature
- nodejs rest api
- bisa lebih dari 1 toko `multi store`
- bisa lebih dari 1 kasir `multi users`
- pengelolaan produk, stok dan unit
- pembelian
- penjualan (scan barcode)
- diskon penjualan
- UI design use [NativeBase](https://nativebase.io/)
### development 
- install

        yarn install

or 

        npm install --legacy-peer-deps #for expo 45 some of deps is not support for react 17 

- config app.config.js file for api_url

        cp app.config.js.example app.config.js

- run the app

        npx expo start

### build debug apk
- bundle js and assets

        npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

- build apk with gradle 

        cd android && ./gradlew assembleDebug

- check file in android/app/build/outputs/apk/debug/app-debug.apk
