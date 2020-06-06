const path = require("path");
const rootDir = path.resolve(process.cwd());
const sharedConfig = require("./jest.config.shared");

module.exports = {
    ...sharedConfig(path.join(rootDir, "packages", "package"))
}