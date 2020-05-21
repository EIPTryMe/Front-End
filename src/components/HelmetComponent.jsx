import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { Helmet } from "react-helmet";

const HelmetComponent = ({ title }) => {
	const displayedTitle = useMemo(() => `TryMe | ${title}`, [title]);

	return (
		<Helmet>
			<title>{displayedTitle}</title>
		</Helmet>
	);
};

HelmetComponent.propTypes = {
	title: PropTypes.string.isRequired,
};

export default HelmetComponent;
