# hello-bot

This is a simple slack bot that sends shout-outs on a given date based on a given type of event. :tada: :tada: :tada:

### Installation

You will be needing the following:

-   A working redis installation, lcally or remote.
-   A slack workspace. Head over to [Slack.com](https://slack.com) to create one.
-   Then, you will need to create an app. Head over to [Apps](https://api.slack.com/apps) to create one. Select the `bot type` when asked.
-   Inside the app management screen, click on `App Manifest` from the left-handside menu.
-   Replace the existing manifest with the contents from the `manifest.yaml` file in the root directly of the repo.
-   Make sure to replace `request_url` with a URL to where your app will be hosted. For local development, you can use [Ngrok](https://ngrok.io) as a tunneling service.
-   Create a new file in the root folder fo the repo and name it `.env`.
-   Copy the contents of `.env.example` into the newly created file, aking sure to add the correct values for your app.
-   The `SLACK_SIGNING_SECRET` and `SLACK_BOT_TOKEN` can eb gotten from your app's [Adminstration](https://api.slack.com/apps) page.
-   After successfully completing the above steps, run `yarn install --frozen-lockfile` to install the project dependencies.
-   Run `yarn dev` or `yarn start` for development and production modes respectively.

### Invocation

-   Click on the bot name in the Apps Sidebar to start a new conversation
-   Send `hi`

The bot will respond with a greeting and two(2) form inputs:

-   Date picker
-   Anniversay type (which is a radio group containing `birthday` and `work anniversay`).

After inputting the desired answers, the bot will send a confirmation that the shoutout has been scheduled for the date you selected.

You can only make a request a time. If there is an existing request, the bot will inform you. At this point, you will have to send `restart`, to cancel the pending request and start over.

On the said date, the bot will post to the `general` channel, and depending on your choice, it will say either of:

-   Happy birthday to you, @JohnDoe! :tada: :tada: :tada:
-   Happy work anniversay to you, @JohnDoe! :tada: :tada: :tada:
