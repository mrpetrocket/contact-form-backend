# mailer
contact form backend. runs on port 3000. uses SES and Recaptcha.

test `npm test` (unix) or `set NODE_ENV=test&&mocha` (windows)
run `node index.js`
visit http://localhost:3000 for sample contact form

## usage
1. Copy `config/example.json` to `config/local.json`, fill in all fields. Remember to verify the source/destination addresses with SES.
2. Run server with `node index.js`
3. Setup your contact form to provide these parameters: email (string, valid email); name (string); message (string), recaptcha
3. POST form to `<server>/send`
5. Server delivers 204 on success, 400 on missing or invalid parameters.
6. Email will be sent to the configured destination address.

## outstanding issues
1. test mail()
2. paranoid that app() recaptcha parameter will somehow end up false in prod. can we restructure app to avoid any paranoia?
3. consider issues for open github distribution
4. configurable port