import {useEffect, useState} from "react";
import axios from "axios";

const AllItems = () => {
    //Setting items to the page using react hook 'useState'
    const [items, setItems] = useState(null);
    const [stockData, setStockData] = useState({});

    const getAllItems = async () => {

        try{
            const response = await axios.get(`http://localhost:8080/items`);
            console.log(response.data);
            setItems(response.data);

            //fetch stock quantities for all items
            const stockData = {};
            for (const item of response.data) {
                const stockQty = await getItemStock(item.id);
                stockData[item.id] = stockQty;
            }

            setStockData(stockData);
        }catch (error){
            console.log(error.message);
        }

    }

    const getItemStock = async (itemId) => {
        try {
            const response = await axios.get(`http://localhost:8080/items/${itemId}/stock`);
            return response.data.stockQty;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return 0;
            } else {
                console.error("An error occurred", error);
                throw error;
            }
        }
    }


    //To load all the items at page loading
    useEffect(() => {
        getAllItems();
    }, []);

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10 col-sm-12 item-details mt-2">
                        <div className="header text-center">
                            <h1>All Items</h1>
                        </div>
                        <div className="item-list">
                            <table className="table table-striped table-bordered">
                                <thead className="table-light h6 text-center">
                                <tr>
                                    <td>Serial Number</td>
                                    <td>Name</td>
                                    <td>Price</td>
                                    <td>Stock</td>
                                    <td>Status</td>
                                </tr>
                                </thead>
                                <tbody>
                                {items && items.map((item) => (
                                    <tr className="text-center">
                                        <td>{item.serialNumber}</td>
                                        <td>{item.itemName}</td>
                                        <td>{item.price} LKR.</td>
                                        <td>{stockData[item.id] !== undefined ? stockData[item.id] : 'Loading...'}</td>
                                        <td>{stockData[item.id] !== 0 ? 'In stock' : 'Out of Stock'}</td>
                                    </tr>
                                ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="item-details-table">

                </div>
            </div>
        </>
    );

}

export default AllItems;