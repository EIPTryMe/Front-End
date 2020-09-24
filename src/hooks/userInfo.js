import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import { USER_INFO } from "../queries/user";
import useAppContext from "../contexts/AppContext";

function useUserInfo(user) {
	const [userInfo, setUserInfo] = useState(null);
	const context = useAppContext();

	const [shouldExecute, executeQuery] = useState(false);
	const { loading: isFetching, data } = useQuery(USER_INFO, {
		skip: !shouldExecute,
	});
	const fetchUserInfo = useCallback(() => {
		executeQuery(true);
	}, []);

	useEffect(() => {

		if (!data || !user || isFetching) return;

		const { user: userInfo } = data;
		if (userInfo && Array.isArray(userInfo) && userInfo.length > 0) {

			const builtUser = {
				picture: user.picture,
				uid: user.sub,
				id: userInfo[0].id,
				firstname: userInfo[0].first_name,
				email: userInfo[0].email,
				name: userInfo[0].name,
				phone: userInfo[0].phone,
				address: userInfo[0].address,
				company: userInfo[0].company
			};
			context.setUser(builtUser);
			context.changeParams({ cartLength: userInfo[0].cartsUid.length });
		}
	}, [data, isFetching, user]);

	return {
		fetchUserInfo,
		userInfo,
		isFetching,
	};
}

export default useUserInfo;
