import {useState} from "react";
import axios from "axios";

const UpdateStock = () => {

    //Assigning data to state variables
    const [serialNumber, setSerialNumber] = useState('');
    const [itemId, setItemId] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemStockQty, setItemStockQty] = useState('');

    //Fetching serial number from search field
    const handleSerialNumber = (event) => {
        setSerialNumber(event.target.value);
    }

    //Finding corresponding stock for the entered serial number as search button clicked
    const handleSearch = async (event) => {
        event.preventDefault();

        //Handling possible errors
        try {
            const response = await axios.get(`http://localhost:8080/items/serial/${serialNumber}`);
            console.log(response.data);

            setItemId(response.data.id);
            setItemName(response.data.itemName);

            await getStockByItem(response.data.id);
        } catch (error) {
            if (error.response && error.response.state === 404) {
                console.log("Item Not Found");
            } else {
                console.log("An Error Occurred", error.message);
            }
        }

    }

    //Finding stock corresponding to item Id
    const getStockByItem = async (id) => {
        const response = await axios.get(`http://localhost:8080/items/${id}/stock`);
        console.log(response.data);
        setItemStockQty(response.data.stockQty);
    }

    const handleStockQty = (event) => {
        setItemStockQty(event.target.value);
    }

    //Updating stock as the update button is clicked
    const handleUpdate = async (event) => {
        event.preventDefault();

        const stockData = {
            "stockQty": itemStockQty
        };

        try {
            const response = await axios.put(`http://localhost:8080/update/items/${itemId}/stock`, stockData);
            console.log(response.data);
        } catch (error) {
            console.log("Error in updating", error.message);
        }

        //Clear all fields after updating
        setSerialNumber('');
        setItemId('');
        setItemName('');
        setItemStockQty('');
    }

    //Clear all the fields as the cancel button clicked
    const handleCancel = () => {
        setSerialNumber('');
        setItemId('');
        setItemName('');
        setItemStockQty('');
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-8 col-sm-12">
                        <div className="update-stock-body text-center">
                            <div className="update-stock-title mt-2 mb-3">Update Stock</div>
                            <div className="input-group mb-3">
                                <input type="text"
                                       className="form-control"
                                       placeholder="Item Serial Number"
                                       aria-label="Item Serial Number"
                                       aria-describedby="searcStockbtn"
                                       onChange={handleSerialNumber}
                                       value={serialNumber}
                                       onKeyDown={(event) => event.key === 'Enter' && handleSearch(event)}/>
                                <button className="btn btn-primary"
                                        type="button"
                                        id="searcStockbtn"
                                        onClick={handleSearch}>
                                    Search
                                </button>
                            </div>
                            <div className="update-stock-details mt-2 mb-3">Stock Details</div>
                            <div className="form-floating mb-3">
                                <input type="text"
                                       className="form-control"
                                       id="updatStockItemName"
                                       placeholder="Item Name"
                                       readOnly={true}
                                       value={itemName}/>
                                <label htmlFor="updatStockItemName">Item Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text"
                                       className="form-control"
                                       id="updatStockStockQty."
                                       placeholder="Item Name"
                                       value={itemStockQty}
                                       onChange={handleStockQty}/>
                                <label htmlFor="updatStockStockQty.">Stock Qty.</label>
                            </div>
                            <div className="button-section d-flex justify-content-center">
                                <button
                                    className="btn btn-primary mx-2"
                                    onClick={handleUpdate}>
                                    Update Stock
                                </button>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={handleCancel}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateStock;