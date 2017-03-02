# mailer
contact form backend. runs on port 3000. uses SES and Recaptcha.

test `npm test`
run `node index.js`

## usage
1. Add email destination address, AWS and recaptcha keys to config. See `config/example.json`.
2. Run server
3. POST to `<server>/send`
4. Expected POST parameters: from (string, email); subject (string); message (string), recaptcha
5. Delivers 204 on success, 400 on missing or invalid parameters.
6. Email will be sent to the configured destination address.

## outstanding issues
1. test mail()
2. paranoid that app() recaptcha parameter will somehow end up false in prod. can we restructure app to avoid any paranoia?
3. consider issues for open github distribution
4. configurable port