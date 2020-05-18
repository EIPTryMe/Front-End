import ls from "../utils/testingLocalStorage";
import jwt from "jsonwebtoken";
import fs from "fs";

describe("Authentication", () => {
	beforeAll(() => {
		ls.setLocalStorage();
	});

	it("should verify access token", () => {
		const token = localStorage.getItem("token");
		const fakeUser = JSON.parse(localStorage.getItem("user"));

		const cert = fs.readFileSync("dev-2o6a8byc.pem");

		jwt.verify(token, cert, (err, decoded) => {
			if (err) {
				return;
			}
			expect(decoded).toEqual(fakeUser);
		});
	});
});
