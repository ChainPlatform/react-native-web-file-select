# React Native File Select
The library allows you to select file with react-native without ejecting support both react-native and react-native-web.

<p align="center">
  <a href="https://github.com/ChainPlatform/react-native-web-file-select/blob/HEAD/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" />
  </a>
  <a href="https://www.npmjs.com/package/@chainplatform/file">
    <img src="https://img.shields.io/npm/v/@chainplatform/file?color=brightgreen&label=npm%20package" alt="Current npm package version." />
  </a>
  <a href="https://www.npmjs.com/package/@chainplatform/file">
    <img src="https://img.shields.io/npm/dt/@chainplatform/file.svg"></img>
  </a>
  <a href="https://www.npmjs.com/package/@chainplatform/file">
    <img src="https://img.shields.io/badge/platform-android%20%7C%20ios%20%7C%20web-blue"></img>
  </a>
  <a href="https://github.com/ChainPlatform/react-native-web-file-select/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=doansan">
    <img src="https://img.shields.io/twitter/follow/doansan.svg?label=Follow%20@doansan" alt="Follow @doansan" />
  </a>
</p>

## Prequisites
- This library relies on [React Native Webview](https://www.npmjs.com/package/react-native-webview). Please follow [this guide](https://github.com/react-native-community/react-native-webview/blob/HEAD/docs/Getting-Started.md) to install in your project first.


## Installation

- Ensure you've completed the setps in [prequisites.](#prequisites)

- Install package via npm or yarn:

`npm install --save @chainplatform/file` OR `yarn add @chainplatform/file`

- If your project use react-native-web to build website:

`npm install --save @chainplatform/react-native-web-webview` OR `yarn add @chainplatform/react-native-web-webview`

Then setup by guide at: https://github.com/ChainPlatform/react-native-web-webview#readme

## Usage

- Import in your project

```javascript
import FileSelect from '@chainplatform/file';
```

```js
    <FileSelect
        style_button={`background: ${colors.green2}; 
          padding: ${styles.fs11}px ${styles.fs15}px; 
          font-size: ${styles.fs13}px; 
          font-weight: ${styles.fw600};
          border-radius: ${styles.s0}px;`
        }
        file_text={"Select file"}
        file_types={"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,text/comma-separated-values, text/csv, application/csv"}
        getFile={(datas) => { 
            console.log("File ", datas);
        }}
    />
```

## Component props

- `style_button` (String) - Button style ({ `background: "green"; padding: 12px; font-size: 13px; font-weight: 600; border-radius: 5px;` })
- `file_text` (String) - Button text.
- `file_types` (String) - File type allowed ("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,text/comma-separated-values, text/csv, application/csv"...)
- `getFile` (?Function) - Called upon calback of the file selected
- Support full Webview props

## Contributing
Pull requests are highly appreciated! For major changes, please open an issue first to discuss what you would like to change.

### Related Projects
- Other packages for react native and react native web: [ChainPlatform](https://github.com/ChainPlatform)

