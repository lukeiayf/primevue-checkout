
import { describe, expect, test } from "vitest";

describe("env", () => {
	test("getEnv", async () => { 
		expect(import.meta.env.VITE_APP_BACK_END_CLASS).toEqual("BackendImplementationMock");
	});
});