const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/signup.html`)
})

app.post("/", (req, res) => {
    const dc = "us8";
    const listId = "920d768a1b";
    const apiKey = "d109864789cfc737061aca19547fe009-us8";
    
    const url = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}`;
    const options = {
        method: "POST",
        auth: `alex:${apiKey}`
    };

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data)

    const request = https.request(url, options, (response) => {
        response.on("data", (data) => {
            //console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

    console.log("*************")
    console.log("****START****")
    console.log("*************")


    console.log(firstName, lastName, email)
})

app.use(express.static("public"))

app.listen (3000, () => {
    console.log("Server is running on port 3000")
})

// API KEY d109864789cfc737061aca19547fe009-us8
// List ID 920d768a1b
// URL https://<dc>.api.mailchimp.com/3.0/ <dc> = us8