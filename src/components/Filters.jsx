import React, { useState } from "react";
import FormInput from "./FormInput";
import { Form, Link } from "react-router-dom";
import FormRange from "./FormRange";
import FormSelect from "./FormSelect";
import FormDatePicker from "./FormDatePicker";
import FormCheckbox from "./FormCheckbox";

const Filters = () => {
  const [selectCategoryList, setSelectCategoryList] = useState([
    "all",
    "shoes",
    "slippers",
    "heels",
    "t-shirts",
    "jackets",
    "caps",
    "shorts",
    "sweaters",
    "sneakers",
    "shirts",
    "boots",
    "overshirts",
    "pants",
    "jeans",
    "socks",
    "belts",
    "trainers",
  ]);
  const [selectBrandList, setSelectBrandList] = useState([
    "all",
    "jokimg",
    "WALK LONDON",
    "Reebok",
    "Nike",
    "Jack & Jones",
    "Crocs",
    "Vans",
    "Puma",
    "New Balance",
    "Tommy Jeans",
    "Tommy Hilfiger",
    "Bershka",
    "New Look",
    "AllSaints",
    "Columbia",
    "The North Face",
    "Collusion",
    "ASOS DESIGN",
    "Topman",
    "Dr Denim",
    "Polo Ralph Lauren",
    "ASOS Dark Future",
    "Levi's",
    "Threadbare",
    "Calvin Klein",
    "AAPE BY A BATHING APE®",
    "Good For Nothing",
    "Timberland",
    "Pull and Bear",
    "Koi Footwear",
    "adidas performance",
    "Nike Running",
    "Dr Martens",
    "River Island",
  ]);

  return (
    <Form className="bg-white shadow-md rounded-md p-4 max-w-sm h-[580px] mx-auto mt-4 mb-4">
      <h2 className="text-2xl font-bold mb-4">Filters</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* SEARCH */}
        <FormInput
          type="search"
          label="Search product"
          name="search"
          size="input-md"
          defaultValue=""
          className="w-full"
        />
        {/* CATEGORIES */}
        <FormSelect
          label="Select category"
          name="category"
          list={selectCategoryList}
          size="select-md"
          defaultValue="all"
          className="w-full"
        />
        {/* COMPANIES */}
        <FormSelect
          label="Select brand"
          name="brand"
          list={selectBrandList}
          size="select-md"
          defaultValue="all"
          className="w-full"
        />
        {/* ORDER */}
        <FormSelect
          label="Sort by"
          name="order"
          list={["asc", "desc", "price high", "price low"]}
          size="select-md"
          defaultValue="a-z"
          className="w-full"
        />
        {/* Producer */}
        <FormSelect
          label="Select gender"
          name="gender"
          list={["all", "male", "female"]}
          size="select-md"
          defaultValue="all"
          className="w-full"
        />
        {/* PRICE */}
        <FormRange
          name="price"
          label="Select price"
          size="range-md"
          price={2000}
          className="w-full"
        />
        {/* Date Picker */}
        <FormDatePicker
          label="Select minimum production date"
          name="date"
          className="w-full "
        />
        {/* In stock */}
        <FormCheckbox
          label="Only products in stock"
          name="stock"
          defaultValue="false"
          className="w-full"
        />
      </div>
      <div className="flex justify-between mt-4 items-center">
        {/* BUTTONS */}
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
        <Link
          to="/shop?page=1"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </Link>
      </div>
    </Form>
  );
};

export default Filters;
