import { createServer, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
    let postPaymentInfo = {

        uuid: '900000000-34dc-4a26-a333-22fab585ff5d',
        customerId: 2,
        paymentType: 'CREDIT_CARD',
        installments: 3,
        profileId: 3
        

    }
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
            /* server.create("postPaymentInfo", {
                uuid: '90076629-34dc-4a26-a333-22fab585ff5d',
                customerId: 20,
                paymentType: 'CREDIT_CARD',
                installments: 2,
                profileId: 2
            }) */

        },



        routes() {
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
            this.post("v2/checkout/pagepays", (schema, postPaymentInfo) => {
                let body = JSON.parse(postPaymentInfo.requestBody);
                return schema.postPaymentInfo.create(body)
            })
        },
    })

    return server
} 