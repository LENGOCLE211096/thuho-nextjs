const path = require("path")
const Dotenv = require("dotenv-webpack")
const { i18n } = require("./next-i18next.config")

module.exports = {
  i18n,
  basePath: "/hocphi",
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/hocphi/api/account",
  //     },
  //   ]
  // },
  webpack: (config) => {
    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true,
      }),
    ]
    return config
  },
}
