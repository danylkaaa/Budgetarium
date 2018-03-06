const logs = require("@logs")(module);
const path = require("path");
const crypto = require("./crypto");
const tokens=require("./tokens");
/**
 * load all modules from specific directory
 * @param dir full name of dir
 * @returns {Object} loaded modules
 */
function loadModulesFromDir(dir) {
    let modules = {};
    try {
        require("fs").readdirSync(dir).forEach(function (file) {
            modules[file.split(".")[0]] = (require(path.join(dir, file)));
        });
    } catch (err) {
        logs.error(err);
    }
    return modules;
}

module.exports = {
    loadModulesFromDir,
    crypto,
    tokens
};