export default function formatPrice(price) {
    if (!price)
    return null;
    return price.toFixed(2);
}