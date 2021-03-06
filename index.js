const express =  require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const port = process.env.PORT || 8080;
const ordersRoutes = express.Router();

const uri = "mongodb+srv://Joshua:12345josh@cluster0.fxm00.mongodb.net/WORCS?retryWrites=true&w=majority";

let Orders = require('./orders.model');

let whitelist = ['http://localhost:3000', "http://localhost:8080"]
var corsOptions = {
    origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
    } else {
        callback(new Error('Not allowed by CORS'))
    }
``}
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {
        console.log('Connected to Database');
    })
    .catch( (err) => {
        console.log((`Error connecting to database. \n${err}`));
    })

// // DEVELOPMENT 
// app.get('/', (req, res) => {
//     Orders.find(function(err, orders) { 
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(orders)
//         }
//     }); 
// });

// app.get('/:id', (req, res) => {
//     let id = req.params.id;
//     Orders.findById(id, function(err, orders) {
//         res.json(orders);
//     });
// });

// ROUTES
ordersRoutes.route('/').get( (req, res) => {
    Orders.find(function(err, orders) { 
        if (err) {
            console.log(err);
        } else {
            res.json(orders)
        }
    });
});

ordersRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Orders.findById(id, function(err, orders) {
        res.json(orders);
    });
});


ordersRoutes.route('/add').post(function(req, res)
{ 
    let orders = new Orders(req.body);
    orders.save()
        .then(orders => {
            res.status(200).json({'orders': 'work order added successfully'});
        })
        .catch(err => { 
            res.status(400).send('adding new work order failed');
        });
});

ordersRoutes.route('/update/:id').post(function(req, res) { 
    Orders.findById(req.params.id, function(err, orders) {
        if (!orders)
            res.status(404).send('data is not found');
        else
            orders.titie = req.body.title;
            orders.requesDate = req.body.requesDate;
            orders.assignedDate = req.body.assignedDate;
            orders.completionDate = req.body.completionDate;
            orders.requestedBy = req.body.requestBy;
            orders.completedBy = req.body.completeBy;
            orders.assignedTo = req.body.assignedTo;
            orders.priority = req.body.priority;
            orders.assignmentSummary = req.body.assignmentSummary;
            orders.completionSummary = req.body.completionSummary;
            orders.summary = req.body.summary;
            orders.assignedImage = req.body.assignedImage;
            orders.completedImage = req.body.completedImage;
            orders.current = req.body.current;
            orders.assigned = req.body.assigned;
            orders.completed = req.body.completed;
            orders.reviewed = req.body.reviewed;

            orders.save().then(orders => {
                res.json('Work Order Updated')
            })
            .catch(err => {
                res.status(400).send('Update not possible')
            });

    });
});


app.use('/orders', ordersRoutes)

app.listen(port, function() { 
    console.log("Server is running on Port:" + port);
})

