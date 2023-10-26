const sendGridMail = require('@sendgrid/mail');
const config = require('config');
sendGridMail.setApiKey(config.get('sendgrid_api_key'));

function getMessage() {
  const body = 'This is a test email using SendGrid from Node.js';
  return {
    to: 'karin@timecockpit.com',
    from: 'karin@linz.coderdojo.net',
    subject: 'Test email with Node.js and SendGrid',
    text: body,
    html: `<strong>${body}</strong>`,
  };
}

async function sendEmail() {
  try {
    await sendGridMail.send(getMessage());
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Error sending test email');
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
}

(async () => {
  console.log('Sending test email');
  await sendEmail();
})();
