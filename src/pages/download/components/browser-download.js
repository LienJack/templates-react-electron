import React, { Component } from 'react'
import './browser-download.scss'
import macIcon from '../images/mac.png'
import windows from '../images/windows.png'

const win32 = 'https://img2.61info.cn/download/chrome/chrome_x86_71.exe'
const win64 = 'https://img2.61info.cn/download/chrome/chrome_64_71.exe'
const macos = 'https://img2.61info.cn/download/chrome/chrome_71.dmg'

class BrowserDownload extends Component {

    download (platform) {
        let url = ''
        let systemBit = this.getSystemBit()
        if(platform === 'win'){
            url = systemBit === 'x86' ? win32 : win64
        }else{
            url = macos
        }
        window.open(url)
    }

    getSystemBit () {
        let bit = ''
        let agent=navigator.userAgent.toLowerCase();
        if(agent.indexOf("win64") >= 0||agent.indexOf("wow64") >= 0){
            //64位
            bit = 'x64'
        }else{
            //32位
            bit = 'x86'
        }
        return bit
    }

    render () {
        return (
            <div className="browser-download">
                <div className="download-title">浏览器下载</div>
                <div className="download-box">
                    <div className="title">
                        <i className="google-logo"></i>
                        <span>谷歌浏览器<br/>Chrome</span>
                    </div>
                    <div className="for-windows common" onClick={()=>{this.download('win')}}>
                        <div className="win-left left"><img src={windows} alt=""/></div>
                        <div className="win-right right">
                            Chrome
                            <br/>
                            for Windows下载
                        </div>
                    </div>
                    <div className="for-mac common" onClick={()=>{this.download('mac')}}>
                        <div className="mac-left left"><img src={macIcon} alt="mac"/></div>
                        <div className="mac-right right">
                            Chrome
                            <br/>
                            for Mac下载
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BrowserDownload
