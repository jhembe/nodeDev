const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customer');

const app = express();
mongoose.set('strictQuery',false);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = 3001;


const data = {
    "name": "Joseph Gabriel",
    "age": 23,
    "domain": "Computer Science",
    "hobby": [
        "movies",
        "swiming",
        "eating"
    ],
    "favoritePeaople": [
        {
            "name": "Gabriel Anthony",
            "relationship": "Father"
        },
        {
            "name": "Phoebe Gabriel",
            "relationship": "Mother"
        }
    ]
}

const customers = [
    {
        "name":"Joseph",
        "industry":"IT"
    },
    {
        "name":"Philes",
        "industry":"IT Maniac"
    },
    {
        "name":"Mgasa",
        "industry":"Data Master"
    }
]

// create an endpoint
app.get('/',(req,res)=>{
    res.send("Welcome :)");
});

app.get('/api/customers',async(req,res)=>{
    const result = await Customer.find();
    res.send({"Customers":result});
    // res.send({"customers":customers})
})

app.get('/api/fav',(req,res)=>{
    res.send({"data":data.favoritePeaople})
})


// Creste a POST endpoint
app.post('/',(req,res)=>{
    res.send("This is a post request");
});

app.post('/api/customers',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
})

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})