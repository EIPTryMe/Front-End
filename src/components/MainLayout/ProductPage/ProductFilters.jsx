import React, { useState, useCallback } from "react";

import ReactSlider from "react-slider";
import ProductFilterGroup from "./ProductFilters/ProductFilterGroup";

import {sliderMin, sliderMax} from "../../../constants/productFilters";


function ProductFilters(props) {
	const [priceRange, setPriceRange] = useState([sliderMin, sliderMax]);
	const { onAfterChangePriceRange, onChangeOrderBy } = props;

	const onChangePriceRange = useCallback((values) => setPriceRange([values[0], values[1]]), []);

	return (
		<div className="product-filters">
			<h2 className="Title">Filtrer</h2>

			<ProductFilterGroup title="Trier par :" inputClasses={["order-by"]}>
				<label>
					<input
						type="radio"
						name="sort-by"
						value="popular_desc"
						onChange={onChangeOrderBy}
					/>{" "}
					Plus populaire
				</label>
				<label>
					<input
						type="radio"
						name="sort-by"
						value="price_asc"
						onChange={onChangeOrderBy}
					/>{" "}
					Prix croissant
				</label>
				<label>
					<input
						type="radio"
						name="sort-by"
						value="price_desc"
						onChange={onChangeOrderBy}
					/>{" "}
					Prix décroissant
				</label>
				<label>
					<input type="radio" name="sort-by" value="new" onChange={onChangeOrderBy} />{" "}
					Nouveautés
				</label>
			</ProductFilterGroup>
			<ProductFilterGroup title="Prix par mois :">
				<ReactSlider
					className="slider"
					thumbClassName="slider-thumb"
					trackClassName="slider-track"
					defaultValue={[sliderMin, sliderMax]}
					min={sliderMin}
					max={sliderMax}
					onChange={onChangePriceRange}
					// onAfterChange={([min, max]) => onAfterChangePriceRange(min, max)}
					onAfterChange={onAfterChangePriceRange}
					ariaLabel={["Lower thumb", "Upper thumb"]}
					ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
					renderThumb={(props, state) => <div {...props}></div>}
					pearling
					minDistance={5}
				/>
				<div className="">
					{priceRange[0]}€ - {priceRange[1]}
					{priceRange[1] === sliderMax && <sup>+</sup>}€
				</div>
			</ProductFilterGroup>
		</div>
	);
}

export default ProductFilters;
