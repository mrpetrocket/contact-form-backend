# contact-form-backend
Power your web contact form with this NodeJS app. Your HTML form takes user input and contact-form-backend does the rest. Clone this repo, fill out the config file and go.

> Q: another contact form app? seriously?
> A: I was paranoid about using free "we probably won't steal all emails sent through this form" services and didn't want to install PHP.

## Prerequisites
You'll need a server running node >= 6.x, a [Recaptcha](https://www.google.com/recaptcha) key (for blocking spam) and an [Amazon SES](https://aws.amazon.com/ses) account (for sending emails). Your contact form must use Recaptcha.

## Install
1. Clone or fork *contact-form-backend*
2. Copy `config/example.json` to `config/local.json`, fill in all fields. Remember to verify the source/destination addresses with SES.
3. Run *contact-form-backend* with `npm start`
4. Configure your contact form HTML to provide these fields: `email` (string, valid email); `name` (string); `message` (string), recaptcha. An example HTML form is available in `views/index.ejs`.
5. POST form to `<server>/send`
6. Backend delivers 204 on success, 400 on missing or invalid parameters.
7. Email will be sent to the configured destination address.

## Tests
`npm test` (unix) or `set NODE_ENV=test&&mocha` (windows)

## Example Contact Form
After installation, visit http://localhost:3000 to view an example contact form. Source: `views/index.ejs`.
