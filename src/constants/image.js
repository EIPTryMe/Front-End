const imgs = [
	"https://via.placeholder.com/286x300/14213D/FFFFFF?text=Tryme+placeholder",
	"https://via.placeholder.com/286x300/FCA311/FFFFFF?text=Tryme+placeholder",
	"https://via.placeholder.com/286x300/000000/FFFFFF?text=Tryme+placeholder",
	"https://via.placeholder.com/286x300/FFFFFF/000000?text=Tryme+placeholder",
];

export const imagePlaceholder = () => imgs[Math.floor(Math.random() * 4)];

export const imagePlaceholderBlue = imgs[0];
export const imagePlaceholderOrange = imgs[1];
export const imagePlaceholderBlack = imgs[2];
export const imagePlaceholderWhite = imgs[3];
