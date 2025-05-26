const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());


app.get('/github-webhook/hello!!' , (req,res) =>
{
    res.status(200).json({ message: "Hello, world from webhook git retrotale" });
}
);
app.post('/github-webhook', (req, res) => {
  const branch = req.body.ref;
  if (branch === 'refs/heads/main') {
    console.log('Push to main detected');

    exec('cd /home/ec2-user/your-repo/sample && git pull', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error: ${err.message}`);
        return res.sendStatus(500);
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      res.sendStatus(200);
    });
  } else {
    console.log(`Push to branch: ${branch}`);
    res.sendStatus(200);
  }
});

app.listen(3002, () => {
  console.log('Listening for GitHub webhook on port 3000');
});
