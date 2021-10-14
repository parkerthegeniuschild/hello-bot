const { templateBuilder, ACTIONS, shoutOutMessages } = require("../constants");
const { RedisService } = require("../services");
const dayjs = require("dayjs");

const messageHandler = async ({ message, say }) => {
    const { type, text, channel_type } = message;

    // clear pending shoutout for this user
    if (text === "restart") {
        await RedisService.delete(message.user);
    }

    if (type === "message" && channel_type === "im") {
        return await say(templateBuilder(ACTIONS));
    }
};

/**
 * Handles different types of actions
 * @param {Object{body, ack, say}}
 * @param {String{<'date'|'anniversary_type'>}}
 * @return void
 */
const actionHandler = async ({ client, body, ack, say }, action_id) => {
    // Acknowledge the action
    await ack();

    const { actions, user } = body;

    const response = actions.find((item) => item.action_id === action_id);

    const whoami = user.id;

    // find saved user info
    const cached = await RedisService.get(whoami);

    // return to normal form
    const info = cached ? JSON.parse(cached) : {};

    if (!info.date || !info.anniversary_type) {
        const payload = {
            date: response.selected_date
                ? dayjs(response.selected_date).unix()
                : info.date,
            anniversary_type:
                response.selected_option?.value ?? info.anniversary_type,
        };

        await RedisService.set(whoami, JSON.stringify(payload));

        // incomplete data, so don't execute shoutout yet
        if (!payload.date || !payload.anniversary_type) return;

        // schedule message in "general" channel
        const { channels } = await client.conversations.list();

        const general_channel = channels.find(
            (item) => item.name === "general" && item.is_channel
        );

        await client.chat.scheduleMessage({
            channel: general_channel.id,
            post_at: payload.date,
            text: shoutOutMessages.dispatch(payload.anniversary_type, user.id),
        });

        // confirm to user
        await say(
            shoutOutMessages.confirm(
                dayjs(new Date(payload.date * 1000)).format("ddd, MMM D, YYYY")
            )
        );
        return;
    }

    // if we get here , it means user already has a pending shoutout
    await say(
        shoutOutMessages.pending(
            info.anniversary_type,
            dayjs(info.date * 1000).format("ddd, MMM D, YYYY")
        )
    );
};

module.exports = {
    messageHandler,
    actionHandler,
};
