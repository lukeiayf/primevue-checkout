
import { Backend } from "../services/backend";
import { describe, expect, test } from "vitest";

describe("abc", () => {
    test("getPagepay", async () => {
        Backend.getInstance().getCardImplementation().getCard("mock");
        expect("a").toEqual("a");
     });
});