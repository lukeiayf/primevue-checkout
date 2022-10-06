import { expect, test } from 'vitest'
import SalesDetailComponent from '../components/SalesDetailComponent.vue';
import FormComponent from '../components/FormComponent.vue';
import TransactionSummaryComponent from '../components/TransactionSummaryComponent.vue';

test('mount component', async () => {
    expect(SalesDetailComponent).toBeTruthy();
    expect(FormComponent).toBeTruthy();
    expect(TransactionSummaryComponent).toBeTruthy();
})