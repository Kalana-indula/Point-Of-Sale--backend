import {useEffect, useState} from "react";
import axios from "axios";

const DeleteCategory = () => {

    const [categories, setCategories] = useState(null);
    const [categoryId, setCategoryId] = useState('');

    //Fetching all categories
    const getAllCategories = async () => {
        const response = await axios.get(`http://localhost:8080/categories`);
        console.log(response.data);
        setCategories(response.data);
    }

    const handleCategory = (event) => {
        setCategoryId(event.target.value);
    }

    //Deleting category as delete button pressed
    const handleCategoryDelete = async (event) => {

        event.preventDefault();

        try {
            const response = await axios.delete(`http://localhost:8080/delete/categories/${categoryId}`);
            console.log(response.data);
            setCategoryId('');

        } catch (error) {
            if (error.response && error.response.state === 403) {
                console.log("Category Not Found");
            } else {
                console.log("An Error Occurred", error.message);
            }
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();

        setCategoryId('');
        getAllCategories();
    }

    //Loading all categories at page load
    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-8 col-sm-12">
                        <div className="delete-category-body text-center">
                            <div className="delete-category-title mt-2 mb-3">Select Category</div>
                            <select className="form-select" aria-label="Default select example"
                                    onChange={handleCategory} value={categoryId}>
                                <option selected>Select Category</option>
                                {categories && categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            <div className="button-section d-flex justify-content-center">
                                <button className="btn btn-primary mx-2" onClick={handleCategoryDelete}>Delete Category</button>
                                <button className="btn btn-outline-secondary mx-2" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteCategory;