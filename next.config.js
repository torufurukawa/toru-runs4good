const withImages = require('next-images')
const withCSS = require('@zeit/next-css')
module.exports = withCSS(withImages({
  target: 'serverless',
  env: {
    host: 'https://torurunsforgood.tokyo'
  }
}))
