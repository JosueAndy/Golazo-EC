const { getDefaultConfig } = require('@expo/metro-config')

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolve.assetExts.push("cjs")

module.exports = defaultConfig