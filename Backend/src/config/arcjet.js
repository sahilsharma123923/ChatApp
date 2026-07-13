require("dotenv").config();

const { arcjet, shield, detectBot, tokenBucket } = require("@arcjet/node");

const aj = arcjet({
    key: process.env.ARCJET_KEY,

    rules: [
        shield({
            mode: "LIVE",
        }),

        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE",
            ],
        }),

        tokenBucket({
            mode: "LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 10,
        }),
    ],
});

module.exports = aj;