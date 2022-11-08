export class AddressRequest {
	street: string;
	streetNumber: string;
	addressLineTwo?: string;
	zipCode: string;
	city: string;
	state: string;
	neighborhood?:string;
}