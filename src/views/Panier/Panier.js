import React from "react";
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import PanierList from '../../components/PanierList/PanierList';
import "./Panier.scss";
import { GET_PRODUCTS } from '../../queries/product';
import { useQuery } from '@apollo/react-hooks';
import { handleHttpError } from "../../utils/errorHandler";


const Paniers = () => {
    const { loading: isLoadingPanier, error, data } = useQuery(GET_PRODUCTS);

    if (isLoadingPanier) {
        return <LoadingScreen/>;
    } else if (error) {
        return handleHttpError(error);
    }
    //<code>{JSON.stringify(data, null, 4)}</code>
    const panier = data ? data.product : [];
    return (
        <div className="my-panier">
            {!isLoadingPanier && panier && <PanierList paniers={panier} />}
            {console.log(JSON.stringify(data, null, 4))}
        </div>
    );
};

export default Paniers;
