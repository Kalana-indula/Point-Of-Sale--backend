import {useDebugValue, useState} from "react";
import axios from "axios";

const DeleteItem = () => {
    const [serialNumber, setSerialNumber] = useState(null);
    const [itemName, setItemName] = useState(null);
    const [itemPrice, setItemPrice] = useState(null);
    const [itemId, setItemId] = useState(null);

    //Fetching details from the search field
    const handleSerialNumber = (event) => {
        setSerialNumber(event.target.value);
    }

    //Fetching data from backend as the search button is clicked
    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/items/serial/${serialNumber}`);
            console.log(response.data);

            //Setting fetched data into text-fields
            setItemName(response.data.itemName);
            setItemPrice(response.data.price);
            setItemId(response.data.id);

        } catch (error) {
            console.log(error.message);
        }

    }


    //Delete item as delete button is pressed
    const handleDelete = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.delete(`http://localhost:8080/delete/items/${itemId}`);
            console.log(response.data);

            //Clear all fields after deletion
            setItemName('');
            setItemPrice('');
            setSerialNumber('');
        } catch (error) {
            console.log(error.message);
        }

    }

    //Clear all fields as cancel button is pressed
    const handleCancel = (event) => {
        event.preventDefault();

        setItemName('');
        setItemPrice('');
        setSerialNumber('');
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-8 col-sm-12">
                        <div className="delete-item-body text-center">
                            <div className="delete-item-title mt-2 mb-3">Delete Item</div>
                            <div className="input-group mb-3">
                                <input type="text"
                                       className="form-control"
                                       placeholder="Serial Number Of Item For Delete"
                                       aria-label="Serial Number"
                                       aria-describedby="button-addon2"
                                       required={true}
                                       value={serialNumber}
                                       onChange={handleSerialNumber}
                                       onKeyDown={(event) => event.key === 'Enter' && handleSearch(event)}/>
                                <button className="btn btn-primary"
                                        type="button"
                                        id="button-addon2"
                                        onClick={handleSearch}>
                                    Search
                                </button>
                            </div>
                            <div className="delete-item-details mt-2 mb-3">Item Details</div>
                            <div className="form-floating mb-3">
                                <input type="email"
                                       className="form-control"
                                       id="deleteItemNameField"
                                       placeholder="name@example.com"
                                       readOnly={true}
                                       value={itemName}/>
                                <label htmlFor="deleteItemNameField">Item Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email"
                                       className="form-control"
                                       id="deleteItemPriceField"
                                       placeholder="name@example.com"
                                       readOnly={true}
                                       value={itemPrice}/>
                                <label htmlFor="deleteItemPriceField">Item Price</label>
                            </div>
                            <div className="button-section d-flex justify-content-center">
                                <button type="submit"
                                        className="btn btn-primary mx-2"
                                        onClick={handleDelete}>Delete
                                </button>
                                <button type="reset"
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

export default DeleteItem;