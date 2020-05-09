import React, { Component } from "react";

import ReactSlider from "react-slider";
import ProductFilterGroup from "./ProductFilterGroup";

export default class ProductFilters extends Component {
	render() {
		return (
			<div className="product-filters">
                <h2 className="Title">Filtrer</h2>

				<ProductFilterGroup title="Prix par mois :">
					<ReactSlider
						className="slider"
						thumbClassName="slider-thumb"
						trackClassName="slider-track"
                        defaultValue={[0, 300]}
                        min={0}
                        max={300}
						ariaLabel={["Lower thumb", "Upper thumb"]}
						ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
						renderThumb={(props, state) => <div {...props}><span className="thumb-value">{state.valueNow}</span></div>}
						pearling
						minDistance={10}
					/>
				</ProductFilterGroup>
			</div>
		);
	}
}
