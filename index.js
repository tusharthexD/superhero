import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


app.use(express.static("public/"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res)=>{

    try{
         const response = await axios.get("https://www.superheroapi.com/api.php/3602988760026328/search/batman");
         const result = response.data.results
        res.render("index.ejs", ({content: result}));
        
        }
    catch (error){
        console.error
    }         
})


app.post("/", async (req, res)=>{

    try{
        var str = req.body.Superhero;
         var replaced = str.split(' ').join('-');
         const response = await axios.get(`https://www.superheroapi.com/api.php/3602988760026328/search/${replaced}`);
         const result = response.data.results
         
           res.render("index.ejs", ({content: result}));
           console.log(replaced)
        }
    catch (error){
        console.error
    }         
})


app.post("/superhero", async (req, res)=>{

    try{
        var heroId = req.body.button;
         const response = await axios.get(`https://www.superheroapi.com/api.php/3602988760026328/${heroId}`);
         const result = response.data
           res.render("hero.ejs", {content: result});
           
        }
    catch (error){
        console.error
    }         
})
app.listen(port, ()=>{
    console.log(`Listening to server ${port}`)
})