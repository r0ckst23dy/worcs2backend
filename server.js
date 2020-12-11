const express =  require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const cors = require('cors');
const PORT = 8080;
const ordersRoutes = express.Router();

let Orders = require('./orders.model');

app.use(cors());
app.use(bodyParser.json());



mongoose.connect('mongodb://127.0.0.1:27017/WORCSDB', { useNewUrlParser: true}, { useUnifiedTopology : true})
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

ordersRoutes.route('/').get(function(req, res) {
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

ordersRoutes.route('/add').post(function(req, res) { 
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
    Orders.findById(req.params.id, function(err, orders {
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
                res.json(' Work Order Updated')
            })
            .catch(err => {
                res.status(400).send('Update not possible')
            });

    });
});


app.use('/orders', ordersRoutes)

app.listen(PORT, function() { 
    console.log("Server is running on Port:" + PORT);
})