const ACTIONS = {
    date: "date_picker_action",
    anniversary_type: "anniversary_type_action",
};

/**
 * Generate the shoutout messages
 * @param {String} date timestamp in milliseconds
 * @param {String<'birthday'|'work anniversary'>} anniversary_type
 * @returns {String}
 */
const shoutOutMessages = {
    confirm: (date) => `Got it! You will receive a shoutout on ${date} 🎉`,
    dispatch: (anniversary_type, user) =>
        `Happy ${anniversary_type} to you, <@${user}>! 🎉🎉🎉`,
    pending: (anniversary_type, date) =>
        `:warning: You have a pending _*${anniversary_type}*_ shoutout for ${date}. Send _*restart*_ to start over.`,
};

/**
 * Generates a response template
 * @param {Object}
 * @returns
 */
const templateBuilder = ({ date, type }) => ({
    blocks: [
        {
            type: "section",
            text: {
                type: "plain_text",
                emoji: true,
                text: "Hey there, I can give you a shoutout. :wave:",
            },
        },
        {
            type: "divider",
        },
        {
            type: "input",
            element: {
                type: "datepicker",
                placeholder: {
                    type: "plain_text",
                    text: "Pick a date:",
                },
                action_id: ACTIONS.date,
            },
            label: {
                type: "plain_text",
                text: "Date:",
            },
        },
        {
            type: "input",
            element: {
                type: "radio_buttons",
                options: [
                    {
                        text: {
                            type: "plain_text",
                            text: "Birthday",
                        },
                        value: "birthday",
                    },
                    {
                        text: {
                            type: "plain_text",
                            text: "Work Anniversary",
                        },
                        value: "work anniversary",
                    },
                ],
                action_id: ACTIONS.anniversary_type,
            },
            label: {
                type: "plain_text",
                text: "Anniversary type:",
                emoji: true,
            },
        },
    ],
    text: "date picker and anniversary type selector",
});

module.exports = {
    ACTIONS,
    shoutOutMessages,
    templateBuilder,
};
