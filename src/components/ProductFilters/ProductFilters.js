import React, { Component } from "react";

import ReactSlider from "react-slider";
import ProductFilterGroup from "./ProductFilterGroup";

const sliderMin = 0;
const sliderMax = 300;

export default class ProductFilters extends Component {
	constructor(props) {
		super(props);

		this.state = {
			priceRange: [sliderMin, sliderMax],
		};
	}

	onSliderChange = (values) => {
		this.setState({
			priceRange: values,
		});
	};

	render() {
		const { priceRange } = this.state;

		return (
			<div className="product-filters">
				<h2 className="Title">Filtrer</h2>

				<ProductFilterGroup title="Trier par :">
					<label>
						<input type="radio" name="sort-by" /> Plus populaire
					</label>
					<label>
						<input type="radio" name="sort-by" /> Prix croissant
					</label>
					<label>
						<input type="radio" name="sort-by" /> Prix décroissant
					</label>
					<label>
						<input type="radio" name="sort-by" /> Nouveautés
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
						onChange={this.onSliderChange}
						ariaLabel={["Lower thumb", "Upper thumb"]}
						ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
						renderThumb={(props, state) => <div {...props}></div>}
						pearling
						minDistance={10}
					/>
					<div className="">
						{priceRange[0]}€ - {priceRange[1]}€
					</div>
				</ProductFilterGroup>
			</div>
		);
	}
}
