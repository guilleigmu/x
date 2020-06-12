import { mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import { currency } from '../../filters/currency/currency.filter';
import { DEFAULT_X_CONFIG } from '../../plugins/x-plugin.config';
import { getResultsStub } from '../../__stubs__/results-stubs.factory';
import { getDataTestSelector, installNewXPlugin } from '../../__tests__/utils';
import BaseResultCurrentPrice from '../base-result-current-price.vue';

describe('testing BaseCurrentPrice component', () => {
  const results = getResultsStub();
  let priceWrapper: Wrapper<BaseResultCurrentPrice>;

  beforeEach(() => {
    const [, localVue] = installNewXPlugin();
    priceWrapper = mount(BaseResultCurrentPrice, {
      localVue,
      propsData: { result: results[0] }
    });
  });

  it('renders the current price applying the currency filter and without discount class', () => {
    expectPriceValue(results[0].price.value);
    expect(getElement().classList).not.toContain('x-result-current-price--on-sale');
  });

  it('renders the price applying the currency filter and with on-sale class', async () => {
    priceWrapper.setProps({ result: results[1] });
    await Vue.nextTick();

    expectPriceValue(results[1].price.value);
    expect(getElement().classList).toContain('x-result-current-price--on-sale');
  });

  function expectPriceValue(priceValue: number): void {
    expect(getElement()).toBeDefined();
    expect(priceWrapper.text()).toEqual(currency(priceValue, DEFAULT_X_CONFIG.currencyOptions));
  }

  function getElement(): HTMLElement {
    return priceWrapper.find(getDataTestSelector('result-current-price')).element;
  }
});
