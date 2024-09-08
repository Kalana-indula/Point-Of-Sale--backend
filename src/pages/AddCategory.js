import {useState} from "react";
import axios from "axios";

const AddCategory = () => {

    const [categoryName, setCategoryName] = useState('');

    //Fetching entered category name from text box
    const handleCategoryName = (event) => {
        setCategoryName(event.target.value);
    }

    //Send data to backend as 'Add Category' button is pressed
    const handleAddCategory = async (event) => {
        event.preventDefault();

        const categoryData = {
            "name": categoryName
        };

        try {
            const response = await axios.post(`http://localhost:8080/create/categories`, categoryData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);

            //Reset text field
            setCategoryName('');
        } catch (error) {
            console.log(error);
        }

    }

    //Clear text fields as cancel button is pressed
    const handleCancel = (event) => {
        event.preventDefault();

        setCategoryName('');
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-12">
                        <div className="add-category-body text-center">
                            <div className="add-category-title">Enter Category Name</div>
                            <div className="form-floating mb-3">
                                <input type="text"
                                       className="form-control"
                                       id="addCategoryNameField"
                                       placeholder="Category Name"
                                       onChange={handleCategoryName}
                                       value={categoryName}/>
                                <label htmlFor="addCategoryNameField">Category Name</label>
                                <div className="button-section d-flex justify-content-center">
                                    <button className="btn btn-primary mx-2"
                                            onClick={handleAddCategory}>
                                        Add Category
                                    </button>
                                    <button className="btn btn-outline-secondary mx-2"
                                            onClick={handleCancel}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCategory;