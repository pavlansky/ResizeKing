const config = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,css,scss,html}': ['prettier --write'],
  '*.{ts,tsx}': ['bash -c "npm run typecheck"'],
};

export default config;
