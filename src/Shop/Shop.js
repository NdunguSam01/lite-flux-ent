/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import Filter from "./Filter";
import Items from "./Items/Items";
import { useEffect, useState } from "react";

const Shop = ({Products, Categories, addToCart}) => 
{
    //State that keeps track of the items being displayed based on the category selected by the user
    const [displayedProducts, setDisplayedProducts]=useState(Products)

    //State that keeps track of the search parameters selected by the user
    const [productFilters, setProductFilters]=useState(
        {
            price: "",
            category: "",
        }
    )    

    //Function that handles change of the filter parameters
    const handleSelectChange= e =>setProductFilters(
            {
                ...productFilters,
                [e.target.id]: e.target.value
            })
    
    //Function that sets the products that will be displayed based on the product category
    const categoryFilter = () =>
    {
        if(productFilters.category === "")
        {
            setDisplayedProducts(Products)
        }
        else
        {
            setDisplayedProducts(Products.filter(product=> product.category === productFilters.category))
        }
    }

    //Running the function that updates the items being displayed once user changes the search parameters
    useEffect(()=>
    {
        categoryFilter()

    },[productFilters.category])

    //Extracting the categories from the products
    const uniqueCategories=new Set()//Creating a set to keep track of unique categories

    //Mapping through the Products array and filtering out duplicates
    const filterCategories=Products.map(product =>
        {
            if(!uniqueCategories.has(product.category))
            {
                uniqueCategories.add(product.category)
                return product.category
            }
            else
            {
                return null
            }
        })

    //The result of filterCategories is an array where the duplicate categories are marked with null. Because of this, we filter the result to remove the null values
    const categories=filterCategories.filter(category => category !== null)

    return ( 
        <>
            <Filter handleSelectChange={handleSelectChange} categories={categories}/>
            <Items products={displayedProducts} addToCart={addToCart}/>
            <Outlet/>
        </>
     );
}
 
export default Shop;