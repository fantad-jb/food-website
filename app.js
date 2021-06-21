const express = require('express');
const https = require('https');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/about", function(req,res){
  res.sendFile(__dirname + "/about.html");
});

app.get("/contact", function(req,res){
  res.sendFile(__dirname + "/contact.html");
});

app.post("/contact", function(req,res){
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;

  const data = {
    members: [{
      merge_fields: {
        FNAME: name,
        PHONE: phone
      },
      status: "subscribed",
      email_address: email
    }]
  };

  const jsonData = JSON.stringify(data);

  const url = 'https://us6.api.mailchimp.com/3.0/lists/1361cfd587';
  const options = {
    method: "POST",
    auth: "duongdung:9adb8097853233f54d20537be7f97b74-us6"
  };

  const request = https.request(url, options, function(response){
    if(response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  });

  request.write(jsonData);
  request.end();
});

app.listen(3000, function() {
  console.log("Server is running...");
});
