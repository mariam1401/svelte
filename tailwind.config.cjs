const config = {
  content: ["./src/**/*.{html,js,svelte,ts}", "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      screens: {
        "3xl": "1886px",
        "xs": "340px"
      },
    },
  },

  plugins: [require("@tailwindcss/forms"), require("tw-elements/dist/plugin"), require("@tailwindcss/aspect-ratio"), require("@tailwindcss/typography"), require("flowbite/plugin")],
};

module.exports = config;
