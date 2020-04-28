import React from "react";

export const handleHttpError = function (error) {
	alert("An error occured, read the console");
	console.log(JSON.stringify(error, null, 4));
	return <code>{JSON.stringify(error, null, 4)}</code>;
};
