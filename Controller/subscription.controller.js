import Subscription from "../models/subscription.model.js"

export const createSubscription = async (req, res, next) => {
    try {
        const subScription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })
        
        await workflowClient.trigger({
            url : `${SERVER_URL/api/v1/workflows/subscription/reminder}`,
            body: {
                subscriptionId: subScription._id},
            headers: {
                'Content-Type': 'application/json',
            },
            retries: 0
        })

        res.status(201).json({ success: true, data: subScription })
    } catch (e) {
        next(e)
    }
}

export const getUserSubscriptions = async (req, res, next) => {

    try {
        if (req.user._id.toString() != req.params.id) {
            const error = new Error("You are not owner of this account")
            error.status = 401;
            throw error
        }

        const subScription = await Subscription.find({ user: req.user._id })
        return res.status(200).json({ success: true, data: subScription })
    } catch (e) {
        next(e)
    }
}

export const getSubscriptions = async (req,res,next) => {
try {
   const subscriptions = await Subscription.find();
    res.status(200).json({ success: true, data: subscriptions })

} catch (error) {
    next(error)
}
}

export const getUserSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        console.log(subscription.user.toString(), req.user._id.toString())
        if (!subscription) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }
        if (subscription.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }
        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
}