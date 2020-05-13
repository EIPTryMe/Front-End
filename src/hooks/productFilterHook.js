import { useState, useCallback } from "react";

function useProductFilter() {
	const [filters, setFilters] = useState({});

	const onAfterChangePriceRange = useCallback(([min, max]) => {
		const newFilters = {
			...filters,
			where: {
				...filters.where,
				_and: [{ price_per_month: { _gt: min } }, { price_per_month: { _lt: max } }],
			},
        };
        
        setFilters(newFilters);
    }, []);

    const onChangeOrderBy = useCallback((event) => {
        const value = event.target.value;

        let filter = '';
        switch (value) {
            // todo filter popular ?
            case 'popular_desc': {
                filter = null;
                break;
            }
            case 'price_desc': {
                filter = {price_per_month: 'desc'};
                break;
            }
            case 'price_asc': {
                filter = {price_per_month: 'asc'};
                break;
            }
            //todo created_at
            case 'new': {
                filter = {id: 'desc'};
                break;
            }
            default:
                filter = null;
                break;
        }
    
        const newFilters = {
			...filters,
			order_by: {
				// ...filters.order_by,
				...filter,
			},
        };
        setFilters(newFilters);
    });

	return {
		filters,
        onAfterChangePriceRange,
        onChangeOrderBy
	};
}

export { useProductFilter };