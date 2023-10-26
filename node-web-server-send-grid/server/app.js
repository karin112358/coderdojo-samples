const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const sendGridMail = require('@sendgrid/mail');
const config = require('config');

sendGridMail.setApiKey(config.get('sendgrid_api_key'));

app.post('/send-mail', async (req, res) => {
  try {
    console.log(req.body);

    const body = `Email: ${req.body.from}, Message: ${req.body.message}`;
    
    const message = {
      to: 'karin@timecockpit.com',
      from: 'karin@linz.coderdojo.net',
      subject: 'Test email with Node.js and SendGrid',
      text: body,
      html: body,
    };

    await sendGridMail.send(message);
    console.log('Test email sent successfully');
    res.send();
  } catch (error) {
    console.error('Error sending test email');
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }

    res.status(500).send('Mail could not be sent.');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
