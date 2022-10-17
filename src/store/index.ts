import { defineStore } from "pinia";
import { DefaultState, defaultState as defaultForm } from "../models/defaultState.model";

export type RootState = {
    defaultForms: DefaultState;
};

export const useMainStore = defineStore({
	id: "mainStore",
	state: () =>
		({
			defaultForms: {},
		} as RootState),

	actions: {
		createNewForm(defaultForm:DefaultState) {
			if (!defaultForm) return;

			this.defaultForms = defaultForm;
		},

		updateForm(id: string, payload: DefaultState) {
			if (!id || !payload) return;

			const index = this.findIndexById(id);

			if (index !== -1) {
				this.defaultForms = createNewForm();
			}
		},

		deleteForm(id: string) {
			const index = this.findIndexById(id);

			if (index === -1) return;

			this.defaultForms.splice(index, 1);
		},

		findIndexById(id: string) {
			return this.defaultForms.findIndex((defaultForm) => defaultForm.id === id);
		},
	},
});

function createNewForm(): any {
	throw new Error("Function ainda n implementada.");
}
