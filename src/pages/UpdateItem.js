import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const UpdateItem = () => {

    //To hold all categories
    const [categories, setCategories] = useState(null);
    const [serialNumber, setSerialNumber] = useState('');

    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [itemId, setItemId] = useState(null);

    //Fetching serial number from search field
    const handleSerialNumber = (event) => {
        setSerialNumber(event.target.value);
    }
    //Fetching details from the database as search button is pressed
    const handleSearch = async (event) => {
        event.preventDefault();

        //Handling possible errors
        try {
            const response = await axios.get(`http://localhost:8080/items/serial/${serialNumber}`);
            console.log(response.data);

            //Updating state variables with fetched item details
            setItemId(response.data.id);
            setItemName(response.data.itemName);
            setPrice(response.data.price);
        } catch (error) {
            if (error.response && error.response.state === 404) {
                console.log("Item Not Found");
            } else {
                console.log("An error occurred", error.message);
            }
        }


    }

    //Fetching all categories
    const getCategories = async () => {
        const response = await axios.get(`http://localhost:8080/categories`);
        console.log(response.data);
        setCategories(response.data);
    }

    useEffect(() => {
        getCategories();
    }, []);


    //Handling data in text fields
    const handleItemName = (event) => {
        setItemName(event.target.value);
    }

    const handleItemPrice = (event) => {
        setPrice(event.target.value);
    }

    const handleCategory = (event) => {
        setCategoryId(event.target.value)
    }

    // Clear all fields when cancel button is clicked
    const handleCancel = (event) => {
        event.preventDefault();

        setSerialNumber('');
        setItemName('');
        setPrice('');
        setCategoryId('');

    }

    //Submitting updated details
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            "serialNumber": serialNumber,
            "itemName": itemName,
            "price": price,
            "itemCategoryId": categoryId
        };

        try {
            const response = await axios.put(`http://localhost:8080/update/items/${itemId}`, data);

            console.log(response.data);

            //Resetting all fields
            setSerialNumber('');
            setItemName('')
            setPrice('');
            setCategoryId('');

        } catch (error) {
            console.error("Error updating Item", error);
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-8 col-sm-12">
                        <div className="update-item-body text-center">
                            <form className={handleSubmit}>
                                <div className="update-item-title mt-2 mb-3">Update Item</div>
                                <div className="input-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Serial Number"
                                        aria-label="Serial Number"
                                        aria-describedby="button-addon2"
                                        required={true}
                                        value={serialNumber}
                                        onChange={handleSerialNumber}
                                        onKeyDown={(event) => event.key === 'Enter' && handleSearch(event)}/>
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        id="button-addon2"
                                        onClick={handleSearch}>
                                        Search
                                    </button>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text"
                                           className="form-control"
                                           id="updateItemName"
                                           placeholder="Item Name"
                                           onChange={handleItemName}
                                           value={itemName}/>
                                    <label htmlFor="updateItemName">Item Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text"
                                           className="form-control"
                                           id="updateItemPrice"
                                           placeholder="Item Name"
                                           onChange={handleItemPrice}
                                           value={price}/>
                                    <label htmlFor="updateItemPrice">Item Price</label>
                                </div>
                                <div className="select-category">
                                    <select
                                        className="form-select"
                                        required={true}
                                        onChange={handleCategory}
                                        value={categoryId}
                                        aria-label="Default select example">

                                        <option selected>Select Category</option>
                                        {categories && categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="button-section d-flex justify-content-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary mx-2 add-item-btn">
                                        Update Item
                                    </button>
                                    <button
                                        className="btn btn-outline-secondary add-item-cancel mx-2"
                                        type="reset"
                                        onClick={handleCancel}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateItem;