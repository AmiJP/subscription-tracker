import aj from "../config/arcjet.js";


export const arcjetMiddleware = async (req,res,next) => {
 try {
    const decision = await aj.protect(req, { requested: 1 });


    if (decision.conclusion === "DENY") {
      if (decision.reason.isRateLimit && decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Rate limit exceeded" });
      }
      if (decision.reason.bot) {
        return res.status(403).json({ error: "Bot detected" });
      }
      return res.status(403).json({ error: "Access denied" });
    }

    next();
  } catch (error) {
    console.error("Arcjet middleware error", error);
    next(error);
  }
}
export default arcjetMiddleware