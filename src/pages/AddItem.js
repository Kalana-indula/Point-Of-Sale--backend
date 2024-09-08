import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AddItem = () => {

    const [categories, setCategories] = useState(null);

    //Getting product details
    const [serialNumber, setSerialNumber] = useState('');
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const [item, setItem] = useState(null);

    //Assigning values to state variables at they are entered in the field
    const handleSerial = (event) => {
        setSerialNumber(event.target.value);
    }

    const handleItemName = (event) => {
        setItemName(event.target.value);
    }

    const handlePrice = (event) => {
        setPrice(event.target.value);
    }

    const handleCategory = (event) => {
        setCategoryId(event.target.value);
    }

    //Make the function async so that function will wait until all the data is fetched
    const handleSubmit = async (event) => {
        event.preventDefault();

        //Creating a js object to hold fetched data
        const data = {
            "serialNumber": serialNumber,
            "itemName": itemName,
            "price": price,
            "itemCategoryId": categoryId
        };

        try {
            const response = await axios.post(`http://localhost:8080/create/items`, data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            setItem(response.data);
            //resetting form details
            setSerialNumber('');
            setItemName('');
            setPrice('');
            setCategoryId('');
        } catch (error) {
            console.log(error);
        }
    }

    //Clear all fields when cancel button is clicked
    const handleCancel = (event) => {
        event.preventDefault();

        setSerialNumber('');
        setItemName('');
        setPrice('');
        setCategoryId('');
    }


    const getCategories = async () => {
        const response = await axios.get(`http://localhost:8080/categories`);
        console.log(response.data);
        setCategories(response.data);
    }

    //Loading all categories at page loading
    useEffect(() => {
        getCategories();
    }, []);


    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-8 col-sm-12">
                        <div className="add-item-body text-center">
                            <div className="add-item-title mt-2 mb-3">Add Item</div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput"
                                           placeholder="Enter Serial Number Here"
                                           onChange={handleSerial}
                                           required={true}
                                           value={serialNumber}/>
                                    <label htmlFor="floatingInput">Serial Number</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput"
                                           placeholder="Enter Item Name"
                                           onChange={handleItemName}
                                           required={true}
                                           value={itemName}/>
                                    <label htmlFor="floatingInput">Item Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput"
                                           placeholder="Enter Item Price"
                                           onChange={handlePrice}
                                           required={true}
                                           value={price}/>
                                    <label htmlFor="floatingInput">Item Price</label>
                                </div>
                                <div className="select-category">
                                    <select className="form-select"
                                            onChange={handleCategory}
                                            required={true}
                                            aria-label="Default select example"
                                            value={categoryId}>
                                        <option selected>Select Category</option>
                                        {categories && categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="button-section d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary mx-2 mt-2">Add Item</button>
                                    <button type="button" className="btn btn-outline-secondary mx-2 mt-2"
                                            onClick={handleCancel}>Cancel
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

export default AddItem;