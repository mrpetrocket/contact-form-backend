# contact-form-backend
Power your website contact form with this NodeJS app. Clone the repo, fill out the config file and go.

> Q: another contact form app? seriously?
> A: I was paranoid about using free "we probably won't steal all emails sent through this form" services and didn't want to install PHP.

**contact-form-backend** is designed for situations where you already have an HTML form and just need a server-side program to handle the data. If you need the full package with a frontend form, you can still use this app, but be aware that you'll need to make your own frontend. I included an example frontend.

## Prerequisites
You'll need a server running node >= 6.x, a [Recaptcha](https://www.google.com/recaptcha) key (for blocking spam) and an [Amazon SES](https://aws.amazon.com/ses) account (for sending emails). 
Also, you'll need an HTML contact form that uses Recaptcha. You can see an example form at `views/index.ejs`

## Install
1. Clone or fork this repo onto your server
2. Copy `config/example.json` to `config/local.json` and fill in all fields. Remember to verify the source and destination addresses with SES.
3. Run the app with `npm start`
4. Configure your contact form HTML to provide these fields: `email` (string, valid email); `name` (string); `message` (string), recaptcha. See the example form: `views/index.ejs`
5. POST your form to `<server address>:3000/send`
6. Backend delivers 204 on success, 400 on missing or invalid parameters
7. Every time a user fills out your contact form, the app will send an email to the configured destination address.

## Tests
`npm test` (unix) or `set NODE_ENV=test&&mocha` (windows)

## Example Contact Form
After installation, visit http://localhost:3000 to view an example contact form. Source: `views/index.ejs`
