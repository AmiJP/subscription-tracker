import createRequire from 'create-require';
import Subscription from '../models/subscription.model.js';
import dayjs from 'dayjs';

const require = createRequire(import.meta.url);
const { serve, trigger: triggerReminder } = require('@upstash/qstash/serve');
const reminder = [7, 5, 2, 1]

export const sendReminder = serve(async (contex) => {
    const { subscriptionId } = contex.requestPayload;
    const subScription = await fetchSubscription(contex, subscriptionId)

    if (!subScription || subScription.status !== "active") return

    const renewalDate = dayjs(subScription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        console.log(`renewal date has passed for subscription ${subscriptionId} stopping workflow`)
        return;
    }

    for (const daybefore of reminder) {
        if (renewalDate.subtract(daybefore, 'day').isSame(dayjs(), 'day')) {
            await sleepUntilReminder(`Reminder ${daybefore} day before `);

        }
        await triggerReminder(`Reminder day before ${daybefore}`)
    }

})

export const sleepUntilReminder = async (contex, label, date) => {
    console.log(`Sleeping untill ${label} reminder at ${date}`)
    await contex.sleepUntil(date.toDate())
}

export const fetchSubscription = async (contex, subscriptionId) => {
    return await contex.run('get subscription', () => {
        return Subscription.findById(subscriptionId).populate('user', 'email name')
    })

}    