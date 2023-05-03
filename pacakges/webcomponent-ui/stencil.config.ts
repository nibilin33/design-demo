import { Config } from '@stencil/core';
import { vueOutputTarget } from '@stencil/vue-output-target';

export const config: Config = {
  namespace: 'himo-ui-h5',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    /*
    {
      type: 'docs-readme',
    },
    */
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    vueOutputTarget({
      componentCorePackage: 'himo-ui-h5',
      proxiesFile: './dist/vue-lib.ts',
      includeImportCustomElements: true
    }),
  ],
};
