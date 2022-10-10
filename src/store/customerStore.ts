import { defineStore } from "pinia";
import { ICustomerState} from "../models/customerState.model";

export type RootState = {
    customerState: ICustomerState;
};

export const useCustomerStore = defineStore({
    id: "customerStore",
    state: () =>
    ({
        customerState: {},
    } as RootState),

    actions: {
        createNewForm(customerState:ICustomerState) {
            if (!customerState) return;

            this.customerState = customerState;
        },

        
    },
});
