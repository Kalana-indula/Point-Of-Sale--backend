import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios, {get} from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Home = () => {
    const [orders, setOrders] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [serialNumber, setSerialNumber] = useState('');
    const [orderPrice, setOrderPrice] = useState(0);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [itemIds, setItemIds] = useState([]);

    //Reference to the last added order item
    const lastOrderItemRef = useRef(null);

    //Daily data fetch
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [dailySales, setDailySales] = useState('');
    const [dailyDiscount, setDailyDiscount] = useState('');

    //Fetching and formatting date and time
    const updateDateTime = () => {
        const now = new Date();
        setDate(now.toLocaleDateString());
        setTime(now.toLocaleTimeString());
    }

    //Get current day order count
    const getCurrentDayOrders=async ()=>{
        try{
            const response=await axios.get(`http://localhost:8080/orders/today`);
            setDailySales(response.data);
            console.log(dailySales);
        }catch (error){
            console.log(error.message);
        }
    }

    //Getting only last 10 orders
    const getAllLastOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/latest/orders`);
            setOrders(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    //Formating date time data to get only date
    const formatDate = (dateTime) => {
        return new Date(dateTime).toLocaleDateString();
    }

    //Set serial number entered to the state variable
    const handleSerialNumber = (event) => {
        setSerialNumber(event.target.value);
    }

    //handle add
    const handleAdd = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get(`http://localhost:8080/items/serial/${serialNumber}`);

            console.log(response.data);
            setOrderItems([...orderItems, response.data]);
            setItemIds([...itemIds, response.data.id]);

            //Updating total and tax as add button is clicked
            let updatedTotal = total + response.data.price;
            let updatedTax = updatedTotal * 0.03;
            setTotal(updatedTotal);
            setTax(updatedTax);
            setOrderPrice(updatedTotal + updatedTax);

            setSerialNumber('');

            //Scroll to the last added order item
            if (lastOrderItemRef.current) {
                lastOrderItemRef.current.scrollIntoView({behavior: "smooth"});
            }

        } catch (error) {
            console.log(error.message);
        }

    }

    //create the order as checkout button is pressed
    const handleCheckout = async (event) => {
        event.preventDefault();

        const data = {
            "items": itemIds
        };

        try {
            const response = await axios.post(`http://localhost:8080/create/order`, data);
            console.log(response);
            console.log(itemIds);

            //Once the order is successfully created, generate the invoice PDF
            generateInvoicePDF(orderItems, total, tax, orderPrice);

            setOrderItems([]);
            setTax(0);
            setOrderPrice(0);
            setTotal(0);
            setItemIds([]);

            //updating daily sales
            getCurrentDayOrders();
            getAllLastOrders();

        } catch (er) {
            console.log(er.message);
        }

    }

    //Creating a function to generate an invoice as a PDF
    const generateInvoicePDF = (orderItems, total, tax, orderPrice) => {
        const doc = new jsPDF();

        //Set up the title
        doc.text("Invoice", 105, 20, null, null, "center");

        //Add details
        doc.text(`Date:${new Date().toLocaleDateString()}`, 10, 10);

        //Create a table for order items
        doc.autoTable({
            startY: 40,
            head: [['Serial', 'Name', 'Price']],
            body: orderItems.map(item => [item.serialNumber, item.itemName, item.price.toFixed(2)]),
        });

        //add total, tax and order price
        doc.text(`Total:${total.toFixed(2)} LKR`, 10, doc.lastAutoTable.finalY + 10);
        doc.text(`Tax:${tax.toFixed(2)} LKR`, 10, doc.lastAutoTable.finalY + 20);
        doc.text(`Order Price: ${orderPrice.toFixed(2)} LKR`, 10, doc.lastAutoTable.finalY + 30);

        //Save the PDF
        doc.save("invoice.pdf");
    }

    const handleCancel = (event) => {
        event.preventDefault();

        setSerialNumber('');
        setOrderItems([]);
        setTax(0);
        setOrderPrice(0);
        setTotal(0);
        setItemIds([]);
    }


    //Loading order details at page load
    useEffect(() => {
        getAllLastOrders();
        updateDateTime();
        getCurrentDayOrders();

        //Update date and time as the page is being displayed
        const intervalId = setInterval(updateDateTime, 1000);

        //Clean the interval as the component is unmounted
        return () => clearInterval(intervalId);
    }, []);


    return (
        <>
            <div className="home">
                <div className="container-fluid ">
                    <div className="row justify-content-center">
                        {/*Left side of the page*/}
                        <div className="col-lg-6 col-md-10 col-sm-12">
                            <div className="container-fluid order-section">
                                <div className="row justify-content-center">
                                    <div className="col-12">
                                        <div className="container-fluid timely-stats">
                                            <div className="row">
                                                <div className="col-md-6 col-sm-12 d-flex justify-content-start">
                                                    <div className="left-section">
                                                        <div className="date">
                                                            <div><label>Date :</label></div>
                                                            <div className="current-date">
                                                                {date}
                                                            </div>
                                                        </div>
                                                        <div className="time">
                                                            <div><label>Time :</label></div>
                                                            <div className="current-time">
                                                                {time}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-12 d-flex justify-content-start">
                                                    <div className="right-section">
                                                        <div className="sales">
                                                            <div><label>Daily Sales :</label></div>
                                                            <div className="total-sales">
                                                                {dailySales}
                                                            </div>
                                                        </div>
                                                        <div className="discount">
                                                            <div><label>Daily Discount :</label></div>
                                                            <div className="daily-discount">

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container-fluid current-order">
                                            <div className="row">
                                                <h1 className="text-center">Add Items</h1>

                                                <div className="add-items mb-3">
                                                    <div className="input-group">
                                                        <input
                                                            onChange={handleSerialNumber}
                                                            onKeyDown={(event) => event.key === 'Enter' && handleAdd(event)}
                                                            className="form-control"
                                                            placeholder="Enter Item Serial Number"
                                                            value={serialNumber}
                                                        />
                                                        <button onClick={handleAdd} className="btn btn-primary">Add To
                                                            Cart
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="order-items mb-3">
                                                    <table className="table table-bordered">
                                                        <thead>
                                                        <tr className="order-item-columns">
                                                            <th className="serial">Serial Number</th>
                                                            <th className="name">Name</th>
                                                            <th className="price">Price</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {orderItems && orderItems.map((item,index) => (
                                                            <tr key={item.serialNumber}
                                                                ref={index === orderItems.length - 1 ? lastOrderItemRef : null}>
                                                                <td>{item.serialNumber}</td>
                                                                <td>{item.itemName}</td>
                                                                <td>{item.price}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className="checkout-details">
                                                    <div className="details mb-2">
                                                        <div className="row">
                                                            <div className="col-6 detail-label">Total</div>
                                                            <div className="col-6">
                                                                <input value={total} readOnly={true}
                                                                       className="form-control"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="details mb-2">
                                                        <div className="row">
                                                            <div className="col-6 detail-label">Tax</div>
                                                            <div className="col-6">
                                                                <input value={tax} readOnly={true}
                                                                       className="form-control"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="details mb-2">
                                                        <div className="row">
                                                            <div className="col-6 detail-label">Order Price</div>
                                                            <div className="col-6">
                                                                <input value={orderPrice} readOnly={true}
                                                                       className="form-control"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="button-section d-flex justify-content-center">
                                                    <button onClick={handleCheckout}
                                                            className="btn btn-primary me-2">
                                                        <i className="bi bi-cart-check fst-normal">Checkout</i>
                                                    </button>
                                                    <button onClick={handleCancel}
                                                            className="btn btn-outline-secondary">Cancel
                                                        Order
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*Right side of the page*/}
                        <div className="col-lg-6 col-md-10 col-sm-12">
                            <div className="container-fluid chart-section">
                                <div className="row justify-content-center">
                                    <div className="col-lg-10 col-sm-12 mt-2 order-list">
                                        <h2 className="text-center mt-4 mb-4">Last Orders</h2>
                                        <table className="table table-striped table-bordered">
                                            <thead className="table-light">
                                            <tr>
                                                <th>Order Id</th>
                                                <th>Order Date</th>
                                                <th>Total</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {orders && orders.map((order) => (
                                                <tr key={order.id}>
                                                    <td>{order.id}</td>
                                                    <td>{formatDate(order.orderTime)}</td>
                                                    <td>{order.total} LKR.</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;