import ls from "../utils/testingLocalStorage";

describe("Profile", () => {
	beforeAll(() => {
		ls.setLocalStorage();
	});

	it("Verify user personal informations (name, address, phone)", () => {
		const fakeUser = JSON.parse(localStorage.getItem("user"));

		expect(fakeUser.name).toBeDefined().not.toBeNull();
		expect(fakeUser.address).toBeDefined().not.toBeNull();
		expect(fakeUser.phone).toBeDefined().not.toBeNull();
    });
    
    it("Verify company informations (name, address, siret, phone)", () => {
		const fakeUser = JSON.parse(localStorage.getItem("user"));

        expect(fakeUser).toHaveProperty('company');

        const { company } = fakeUser;

		expect(company.name).toBeDefined().not.toBeNull();
		expect(company.address).toBeDefined().not.toBeNull();
		expect(company.phone).toBeDefined().not.toBeNull();
		expect(company.SIRET).toBeDefined().not.toBeNull();
	});
});
