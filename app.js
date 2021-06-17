//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){

  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email=req.body.email;

  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }


      }
    ]
  };
  const jsonData=JSON.stringify(data);
  const url="https://us1.api.mailchimp.com/3.0/lists/ca9b2681f4";
  const options={
    method:"POST",
    auth: "ashhar007:7a07d35e11ef53a7e77ae911d52aa67f-us1"
  }



  const request=https.request(url,options,function(response){

  if(response .statusCode ===200)
  {
    //res.send("success");
    res.sendFile(__dirname+"/success.html");
  }
  else{
  //  res.send("failure");
    res.sendFile(__dirname+"/failure.html");
  }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });

  });

request.write(jsonData);
request.end();









});

/*app.post("/failure",function(req,res){
  res.redirect("/");
});*/
//7a07d35e11ef53a7e77ae911d52aa67f-us1
//ca9b2681f4









app.listen(3000,function(){
  console.log("port is running at 3000");
});
