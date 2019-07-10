
let path = require("path")
let fs = require("fs")
let chalk = require("chalk")
let glob = require("glob")
let {execSync}  = require("child_process")

var staticRootDir = path.resolve(__dirname, '../../');//整个项目的根目录
function resolvePath(subPath){
    return path.resolve(staticRootDir, subPath)
}

function  checkAndDownLoadDll (){
    let dllPath = resolvePath(`./dll`)
    const manifest = path.resolve(dllPath,"./manifest", './renderer.json');
    if (!(fs.existsSync(dllPath) && fs.existsSync(manifest))) {
        console.log(chalk.black.bgYellow.bold('The DLL files are missing. Sit back while we build them for you with "yarn build-dll"'));
        execSync('yarn build-dll');
    }
}

function getEntry(globPath, filterStr) {
    var entries = {},
      pathname;

    glob.sync(globPath).forEach(function (entry) {
        pathname = entry.split('/').splice(-3, 2).join('/');
        if(filterStr){
            if(pathname == filterStr){
                entries[pathname] = entry;
            }
        }else{
            entries[pathname] = entry;
        }
    });
    return entries;
}

function getNPMParams() {
    let argv;
    try {
        argv = JSON.parse(process.env.npm_config_argv).original;
    }	catch(ex) {
        argv = process.argv;
    }
    let params = {}
    argv && argv.forEach(item => {
        let arr = item.split(/=/ig)
        if(item.slice(0, 2) === '--' && arr.length === 2){
            params[arr[0].slice(2)] = arr[1]
        }
    })
    return params
}

module.exports = {
    resolvePath,
    getEntry,
    getNPMParams,
    checkAndDownLoadDll
}
