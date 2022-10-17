import { createServer, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {

    let server = createServer({
        environment,

        models: {
            pagePay: Model,
            address: Model,
            customer: Model,
            customerId: Model,
            card: Model,
            paymentInfo: Model,
            postPaymentInfo: Model
        },

        seeds(server) {
            server.create("pagePay", {
                uuid: "90076629-34dc-4a26-a333-22fab585ff5d",
                image: "https://image.io/product.jpeg",
                installmentType: "CARD_INSTALLMENT",
                description: "Descrição",
                plan: {
                    id: 1,
                    name: "Plano Pro",
                    maxInstallments: 1,
                    accessionValue: 1,
                    value: 10.50,
                    frequency: "MONTHLY",
                    trialDays: 15
                },
                loose: {
                    value: 10.50,
                    maxInstallments: 2
                },
                paymentMethods: [
                    "CREDIT_CARD",
                    "PIX",
                    "BANKSLIP"
                ],
                affiliate: {
                    id: 1,
                    name: "netflix",
                    businessName: "netflix nome"
                }
            })
            server.create("address", {
                street: "Rua 1",
                number: 2,
                lineTwo: "Apartamento 2",
                zipCode: "84050-230",
                city: "São Paulo",
                state: "SP"
            })
            server.create("customer", {
                id: 20,
                name: "Joana Silva",
                cpf: "883.283.090-68",
                email: "joanasilva@gmail.com",
                birthdate: 1664479224,
                phone: "42 925959595"
            })
            server.create("customerId", {
                id: 20,
            })
            server.create("card", {
                profileId: 2,
            })
            server.create("paymentInfo", {
                code: "1235465421646545121",
                date: 1665168260
            })


        },



        routes() {
            this.urlPrefix = 'http://localhost:8080'
            this.namespace = "api"

            this.get("/v2/checkout/companies/1/pagepays", (schema) => {
                return schema.pagePays.all()
            })

            this.get("/v2/customer/1/bestAddress", (schema) => {
                return schema.addresses.all()
            })

            this.get("/v2/checkout/pagepays/customer", (schema) => {
                return schema.customers.all()
            })
            this.get("/v2/checkout/pagepays/document/88328309068", (schema) => {
                return schema.customerIds.all()
            })
            this.get("/v2/checkout/pagepays/customer/20/card/2", (schema) => {
                return schema.cards.all()
            })
            this.get("/v2/checkout/pagepays/paymentmethod/BANKSLIP", (schema) => {
                return schema.paymentInfos.all()
            })

            this.post("v2/checkout/pagepays", (schema, request) => {
                let body = JSON.parse(request.requestBody);
                return {pagepay: body}
            })
            this.post("v2/checkout/pagepays/customer/new", (schema, request) => {
                let body = JSON.parse(request.requestBody);
                return {customer: body}
            })
            this.post("v2/customer/1/address/new", (schema, request) => {
                let body = JSON.parse(request.requestBody);
                return {address: body}
            })
            this.post("v2/checkout/pagepays/customer/1/card", (schema, request) => {
                let body = JSON.parse(request.requestBody);
                return {card: body}
            })
            this.put("/v2/checkout/pagepays/customer/20", function (schema, request){

                let body = JSON.parse(request.requestBody);
                return schema.customers.find(20).update(body);
            })
        },
    })

    return server
} 