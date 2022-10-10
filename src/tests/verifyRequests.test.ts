import { describe, expect, test } from 'vitest'
import { makeServer } from "../server"

let server

describe('requests',()=>{
    beforeEach(() => {
        server = makeServer({ environment: "test" })
    })
    
    afterEach(() => {
        server.shutdown()
    })

    test('getUsers', () => {
        let pagePay = [];
        let serverError = null;

        fetch("/api/v2/checkout/companies/1/pagepays")
            .then((res) => res.json())
            .then((json) => {
                if (json.error) {
                    serverError = json.error;
                } else {
                    pagePay = json.pagePay;
                }
                expect(pagePay).toBeTruthy;
                expect(serverError).toBeFalsy;
            })
    });
})
