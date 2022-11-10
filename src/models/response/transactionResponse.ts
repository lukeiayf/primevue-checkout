export class TransactionResponse{
	id: number;
	status: string;
	message?: string;
	code?: number;
	value?: number;
	extraReturnCode?: number;
	date?: number;
}