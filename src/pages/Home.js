import React from "react";
import Jmbotron from "../components/cards/Jmbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryNav from "../components/categoriesNav/Category";

const Home = () => {
    return (
        <>
            <div className="mt-5 pt-4">
                <CategoryNav />
            </div>
            <div className="jumbotron text-danger h1 font-weight-bold text-center">
                <Jmbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
            </div>
            <h4 className="text-center p-3 mt-5 mb-5 display-4 bg-secondary">
                New Arrivals
            </h4>
            <NewArrivals />
            <h4 className="text-center p-3 mt-5 mb-5 display-4 bg-secondary">
                Best Sellers
            </h4>
            <BestSellers />
        </>
    )
}

export default Home;