const aj = require("../config/arcjet");
const { isSpoofedBot } = require("@arcjet/inspect");

// Arcjet Middleware
async function arcjetMiddleware(req, res, next) {
    try {

        // Ask Arcjet to inspect this request
        const decision = await aj.protect(req, { requested: 1 });        // If Arcjet blocks the request
        if (decision.isDenied()) {
            // Rate limit exceeded
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({
                    message: "Rate limit exceeded. Please try again later."
                });
            }
            // Bot detected
            if (decision.reason.isBot()) {
                return res.status(403).json({
                    message: "Bot access denied."
                });
            }
            // Any other security rule
            return res.status(403).json({
                message: "Access denied by security policy."
            });
        }

        // Detect spoofed bots
        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({
                message: "Malicious bot activity detected."
            });
        }
        // Everything is OK
        next();

    } catch (err) {

        console.log("Arcjet protection error:", err);
        // Continue the request if Arcjet fails
        next();
    }
}

module.exports=arcjetMiddleware