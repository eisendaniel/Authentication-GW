// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

// wasm support for expo-sqlite web
config.resolver.assetExts.push('wasm');

// keep your sqlite3 asset extension too
config.resolver.assetExts.push('sqlite3');

// dev-server headers for SharedArrayBuffer (COOP/COEP)
config.server.enhanceMiddleware = (middleware) => {
  return (req, res, next) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    return middleware(req, res, next);
  };
};

module.exports = config;
