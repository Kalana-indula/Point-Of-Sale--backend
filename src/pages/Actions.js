import {Link} from "react-router-dom";


const Actions = () => {
    return (
        <>
            <div className="action-panel">
                <div className="container-fluid">
                    <div className="row" >
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <Link to={`/add-item`} className="component-card">
                                    <img className="card-image" src={`${process.env.PUBLIC_URL}/assets/add-item.png`}/>
                                    <span>Add Item</span>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <Link to={`/update-item`} className="component-card">
                                <img className="card-image" src={`${process.env.PUBLIC_URL}/assets/update-item.png`} />
                                <span>Update Item</span>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <Link to={`/delete-item`} className="component-card">
                                <img className="card-image" src={`${process.env.PUBLIC_URL}/assets/delete-item.png`} />
                                <span>Delete Item</span>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <Link to={`/update-stock`} className="component-card">
                                <img className="card-image" src={`${process.env.PUBLIC_URL}/assets/update-stock.png`} />
                                <span>Update Stock</span>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <Link to={`/add-category`} className="component-card">
                                <img className="card-image" src={`${process.env.PUBLIC_URL}/assets/add-category.png`} />
                                <span>Add Category</span>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <Link to={`/update-category`} className="component-card">
                                <img className="card-image" src={`${process.env.PUBLIC_URL}/assets/update-category.png`} />
                                <span>Update Category</span>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <Link to={`/delete-category`} className="component-card">
                                <img className="card-image" src={`${process.env.PUBLIC_URL}/assets/delete-category.png`} />
                                <span>Delete Category</span>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <Link to={`/register-user`} className="component-card">
                                <img className="card-image" src={`${process.env.PUBLIC_URL}/assets/add-user.png`} />
                                <span>Add User</span>
                            </Link>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}

export default Actions;