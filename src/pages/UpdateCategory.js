import {useEffect, useState} from "react";
import axios from "axios";

const UpdateCategory = () => {

    const [categories, setCategories] = useState(null);
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');

    //Fetching all categories
    const getAllCategories = async () => {
        const response = await axios.get(`http://localhost:8080/categories`);
        console.log(response.data);
        setCategories(response.data);
    }

    //Load all categories at page loading
    useEffect(() => {
        getAllCategories();
    }, []);

    //Fetching category id from drop down menu
    const handleCategory = async (event) => {
        setCategoryId(event.target.value);

        //Get category Id as it is selected by dropdown
        try {
            await getCategoryById(event.target.value);
        } catch (error) {
            console.log("No Category Found", error.message);
        }

    }

    const handleCategoryName = (event) => {
        setCategoryName(event.target.value);
    }

    //Get category by Id as category selected by dropdown
    const getCategoryById = async (catId) => {
        const response = await axios.get(`http://localhost:8080/categories/${catId}`);
        console.log(response.data);

        setCategoryName(response.data.name);
    }

    //Updating category with new name
    const handleUpdateCategory = async (event) => {
        event.preventDefault();

        if (categoryName !== '') {

            const categoryData = {
                "name": categoryName
            };
            try {
                const response = await axios.put(`http://localhost:8080/update/categories/${categoryId}`, categoryData);

                setCategoryName('');
                setCategoryId('');
            } catch (error) {
                console.log(error.message);
            }
        } else {
            console.log("No category name entered");
        }

    }

    const handleCancel = (event) => {
        event.preventDefault();

        setCategoryName('');
        setCategoryId('');
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-8 col-sm-12">
                        <div className="update-category-body text-center">
                            <div className="update-category-title mt-2 mb-3">Update Category</div>
                            <select className="form-select mb-3"
                                    aria-label="Default select example"
                                    onChange={handleCategory}
                                    value={categoryId}>
                                <option selected>Select Category</option>
                                {categories && categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            <div className="form-floating mb-3">
                                <input type="text"
                                       className="form-control"
                                       id="updateCategoryNameField"
                                       placeholder="name@example.com"
                                       value={categoryName}
                                       onChange={handleCategoryName}
                                       required={true}/>
                                <label htmlFor="updateCategoryNameField">
                                    Category Name
                                </label>
                                <div className="button-section d-flex justify-content-center">
                                    <button className="btn btn-primary mx-2"
                                            onClick={handleUpdateCategory}>
                                        Update
                                    </button>
                                    <button className="btn btn-outline-secondary"
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

export default UpdateCategory;