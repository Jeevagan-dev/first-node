import express from "express";
import axios from "axios";

const app = express();
const PORT =  process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));


app.use(express.static("public"));
let datas ;
let errorterms ;
app.get('/',(req,res)=>{
   
    res.render("index.ejs",{datas,errorterms})
    datas = null;
    errorterms = null;
})
app.post('/process',async (req,res)=>{
    try {
        const coin = req.body.crypto;
        const crypto = coin.toLowerCase();

        const detail = await axios.get(`https://api.coingecko.com/api/v3/coins/${crypto}`,{
            headers:{
                'x-cg-demo-api-key': 'CG-UxgFzVmwgytw36bpMMv33kdT'
            }
        })
        datas = detail.data;
        errorterms = null;
       res.redirect('/');


    }
    catch (error){
            errorterms = "Please check Coin Id is exist"
        datas = null;
        res.redirect('/');
            } 

})

app.listen(PORT , ()=>{
    console.log("server is running");
})
