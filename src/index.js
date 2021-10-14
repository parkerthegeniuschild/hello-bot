const { app } = require("./configs");
const { ACTIONS } = require("./constants");
const { actionHandler, messageHandler } = require("./handlers");

const { date, anniversary_type } = ACTIONS;

const main = async () => {
    try {
        // handle incoming messages ('hi'& 'restart')
        app.message(/^hi$|^restart$/, messageHandler);

        // handle date picker action
        app.action(date, (e) => actionHandler(e, date));

        // handle anniversary type action
        app.action(anniversary_type, (e) => actionHandler(e, anniversary_type));
    } catch (error) {
        console.log("Error:", error);
    }
};

main();
