
const fs = require('fs')
const path = require('path')
const shelljs = require('shelljs')
const convert = require('xml-js')
const packageJSON = require('../package.json')
const release = `${packageJSON.name}@${packageJSON.version}`

try {
  const runIOS = () => {
    const iosJSON = convert.xml2js(
      fs.readFileSync(
        path.resolve(__dirname, '..', 'ios', 'surmon_me_native', 'Info.plist')
      ),
      {
        compact: true,
        nativeType: true,
        instructionHasAttributes: true
      }
    )
    shelljs.cd(path.join(__dirname, '..', 'dist', 'ios'))
    const index = iosJSON.plist.dict.key.findIndex(item => item._text === 'CFBundleVersion')
    const iosVersion = iosJSON.plist.dict.string[index]._text
    shelljs.exec(
      `sentry-cli releases files ${release} upload-sourcemaps index.ios.bundle.map --url-prefix 'app:///' --rewrite --dist ${iosVersion}`,
      (code, stdout, stderr) => {
        console.log('IOS Exit code:', code)
        console.log('IOS output:', stdout)
        console.log('IOS stderr:', stderr)
        console.info('IOS done!')
      }
    )
  }

  const androidJSON = require('../android/app/build/outputs/apk/release/output.json')
  const androidVersionCode = androidJSON[0].apkData.versionCode
  shelljs.cd(path.join(__dirname, '..', 'dist', 'android')) 
  console.log(release, androidVersionCode)
  shelljs.exec(
    `sentry-cli releases files ${release} upload-sourcemaps index.android.bundle.map --url-prefix 'app:///' --rewrite --dist ${androidVersionCode}`,
    (code, stdout, stderr) => {
      console.log('Android Exit code:', code)
      console.log('Android output:', stdout)
      console.log('Android stderr:', stderr)
      console.info('Android done!')
      runIOS()
    }
  )
} catch (error) {
  console.warn('Failed!', error)
}
