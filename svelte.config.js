import sveltePreprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import path from 'path';
import fs from 'fs';

const copyFile = options => {
  return function () {
    const targetDir = path.dirname(options.target);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }
    fs.writeFileSync(options.target, fs.readFileSync(options.source));
  };
};

export default {
  preprocess: [
    sveltePreprocess({
      postcss: true
    })
  ],
  kit: {
    adapter: adapter(),
    prerender: {
      default: true
    },
    vite: {
      prebundleSvelteLibraries: true,
      plugins: [
        copyFile({
          source: './src/lib/dateUtils.ts',
          target:
            './node_modules/@beyonk/svelte-datepicker/src/components/lib/date-utils.js'
        })
      ],
      ssr: {
        noExternal: ['dayjs']
      }
    }
  }
};
