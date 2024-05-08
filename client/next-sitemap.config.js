require("dotenv").config();
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_DOMAIN_URL || 'http://localhost:3000/',
    generateRobotsTxt: true,
    // other options
  };