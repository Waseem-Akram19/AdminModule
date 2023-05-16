import React from "react";

import FoodBiscuits from './ViewFoodBiscuits';
import FoodDrinks from './ViewFoodDrinks';
import FastFood from './ViewFoodFastFood';
const ManageFood = () => {
    return (
        <>
        <FoodBiscuits></FoodBiscuits>
        <FoodDrinks></FoodDrinks>
        <FastFood></FastFood>
        </>
    );
};

export default ManageFood;