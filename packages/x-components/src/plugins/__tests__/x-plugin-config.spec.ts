import { shallowMount, Wrapper } from '@vue/test-utils';
import { ComponentOptions, default as Vue } from 'vue';
import { CurrencyOptions } from '../../i18n/currency.types';
import { installNewXPlugin } from '../../__tests__/utils';
import { XPlugin } from '../x-plugin';
import { DEFAULT_X_CONFIG } from '../x-plugin.config';
import { DocumentDirection } from '../x-plugin.types';

describe('testing global config', () => {
  let xPlugin: XPlugin;
  let localVue: typeof Vue;

  beforeEach(() => {
    jest.clearAllMocks();
    [xPlugin, localVue] = installNewXPlugin();
  });

  it('registers reactive global config via plugin options', () => {
    expect(XPlugin.config).toMatchObject(DEFAULT_X_CONFIG);
  });

  it('overrides global config through XPlugin.setConfig', () => {
    xPlugin.setConfig({ consent: true });
    expect(XPlugin.config).toHaveProperty('consent', true);
  });

  describe("testing integration with plugin's mixin", () => {
    const component: ComponentOptions<Vue> & ThisType<Vue> = {
      render(createElement) {
        return createElement();
      }
    };
    let componentInstance: Wrapper<Vue>;

    beforeEach(() => {
      componentInstance = shallowMount(component, { localVue });
    });

    afterEach(() => {
      componentInstance.destroy();
    });

    it('overrides consent and emits ConfigConsentChanged event', async () => {
      const listener = jest.fn();
      componentInstance.vm.$x.on('ConfigConsentChanged').subscribe(listener);
      const newConsent = true;
      componentInstance.vm.$x.config.consent = newConsent;

      await localVue.nextTick();
      expect(listener).toHaveBeenCalledTimes(1);
      expect(XPlugin.config).toHaveProperty('consent', newConsent);
    });

    it('overrides currencyOptions and emits ConfigCurrencyChanged event', async () => {
      const listener = jest.fn();
      componentInstance.vm.$x.on('ConfigCurrencyChanged').subscribe(listener);
      const newCurrencyOptions: Partial<CurrencyOptions> = { symbol: '$' };
      componentInstance.vm.$x.config.currencyOptions = newCurrencyOptions as CurrencyOptions;

      await localVue.nextTick();
      expect(listener).toHaveBeenCalledTimes(1);
      expect(XPlugin.config).toHaveProperty('currencyOptions', newCurrencyOptions);
    });

    it('overrides documentDirection and emits ConfigDocumentDirectionChanged event', async () => {
      const listener = jest.fn();
      componentInstance.vm.$x.on('ConfigDocumentDirectionChanged').subscribe(listener);
      const newDocumentDirection: DocumentDirection = 'rtl';
      componentInstance.vm.$x.config.documentDirection = newDocumentDirection;

      await localVue.nextTick();
      expect(listener).toHaveBeenCalledTimes(1);
      expect(XPlugin.config).toHaveProperty('documentDirection', newDocumentDirection);
    });
  });
});
