export default function formatPrice(price) {
	if (price === null || price === undefined) return null;
	return price.toFixed(2);
}
