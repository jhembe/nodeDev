const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customer');
const cors = require('cors');


const app = express();
mongoose.set('strictQuery', false);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT || 3000;
// const PORT = 3000;


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
        "name": "Joseph",
        "industry": "IT"
    },
    {
        "name": "Philes",
        "industry": "IT Maniac"
    },
    {
        "name": "Mgasa",
        "industry": "Data Master"
    }
]


// const customer = new Customer({
//     name: "Maitarian",
//     industry: "IT Cyber security"
// });

// customer.save();


// create an endpoint
app.get('/', (req, res) => {
    res.send("Welcome :)");
});

// app.get('/',(req,res)=>{
//     res.send(customer);
// });

app.get('/api/customers', async (req, res) => {
    // console.log(await mongoose.connection.db.listCollections().toArray());
    try {
        const result = await Customer.find();
        res.json({ "customers": result });
        /*res.send({"customers":customers})*/
    } catch (e) {
        res.status(500).json({ error: e.message });
    }

})

app.get('/api/customers/:id',async(req,res)=>{
    // console.log({
    //     requestParams : req.params,
    //     requestQuery:req.query
    // });
    try{
        let {id:customerId} = req.params;
        console.log(customerId);
        let customer = await Customer.findById(customerId);
        if(!customer){
            res.status(404).json({error:'User not found'});
        } else {
            res.json({customer});
        }

    }catch(e){
        res.status(500).json({error:'Something went wrong',err:e});
    }

})


app.get('/api/fav', (req, res) => {
    res.send({ "data": data.favoritePeaople })
})


// Creste a POST endpoint
app.post('/', (req, res) => {
    res.send("This is a post request");
});

// app.post('/api/customers', (req, res) => {
//     console.log(req.body);
//     res.send(req.body);
// })

// app.post('/api/customers', async (req, res) => {
//     console.log(req.body);
//     const customer = new Customer({
//         name: req.body.name,
//         industry:req.body.industry
//     });
//     customer.save();
// })

app.post('/api/customers', async (req, res) => {
    console.log(req.body);
    const customer = new Customer(req.body);
    try{
        await customer.save();
        res.status(201).json({customer});
    }catch(e){
        res.status(400).json({error:e.message});
    }

})


// Updating values
app.put('/api/customers/:id',async(req,res)=>{
    try{
        const customerId = req.params.id;
        const result = await Customer.replaceOne({_id:customerId},req.body);
        console.log(result);
        res.json({updatedCount:result.modifiedCount});
    }catch(error){
        res.status(500).json({error:"Something went wrong when using PUT method"});
    }
})

// Deleting a resource
app.delete('/api/customers/:id', async(req,res)=>{
    try{
        const customerId = req.params.id;
        const result = await Customer.deleteOne({_id:customerId})
        console.log(result);
        res.json({Success:"Customer with ID "+customerId+"was deleted"});
    }catch(error){
        res.status(500).json({error:"Something went wrong while Deleting a customer"});
    }
})

// app.listen(PORT,()=>{
//     console.log(`Server is running at http://localhost:${PORT}`);
// })

const start = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION);

        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        })
    } catch (e) {
        console.log(e.message);
    }

}

start();