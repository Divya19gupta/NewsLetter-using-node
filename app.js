const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

//073237b96a
//1b4a44859b82d490929fadda6c180744-us7
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
//we are accessing static folders and if we want those changes to update
//in static folder we will use the above method.
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
    app.post("/",function(req,res){
        const f = req.body.fname;
        const l = req.body.lname;
        const e = req.body.mail;
        console.log(f+" "+l+" "+e);

        let data ={
            members:[
                {
                    email_address: e,
                    status:"subscribed",
                    merge_fields:{
                        FNAME:f,
                        LNAME:l
                    }
                }
            ]
        };
        var jsonData = JSON.stringify(data);
         
        //here we want to post data and not extract
        const url ="https://us7.api.mailchimp.com/3.0//lists/073237b96a";
        const options={
            method:"POST",
            auth:"divya:1b4a44859b82d490929fadda6c180744-us7"
        }
        const request = https.request(url,options,function(response){

            if(response.statusCode===200){
                res.sendFile(__dirname+"/success.html");
            }
            else{
                res.sendFile(__dirname+"/failure.html");
            }

            response.on("data",function(data){
                console.log(JSON.parse(data));
            })
        })
        request.write(jsonData);
        request.end();
    })

    app.post("/failure",function(req,res){
        res.redirect("/");
    })

app.listen(process.env.PORT || 5500,function(){
    console.log("Server begins");
})
//https://obscure-coast-96707.herokuapp.com/

//Commands on git
//git add .
//git commit -m ""
//git push heroku master
//heroku --version
//heroku login.