# Hakayat Admin - React + TypeScript + Vite

This project is a modern web application built with React, TypeScript, and Vite. It includes a robust setup with Material-UI, Redux Toolkit, and TailwindCSS for styling and state management.

## Features

- **React 19**: The latest version of React for building user interfaces.
- **TypeScript**: Strongly typed JavaScript for better code quality.
- **Vite**: Fast and modern build tool for development and production.
- **Material-UI**: Pre-styled components for rapid UI development.
- **Redux Toolkit**: Simplified state management.
- **TailwindCSS**: Utility-first CSS framework for custom designs.
- **Sass**: CSS preprocessor for advanced styling.

## Installation

To get started, clone the repository and install dependencies:

```bash
git clone https://github.com/your-repo/hakayat_admin.git
cd hakayat_admin
npm install
```

## Scripts

The following scripts are available in the `package.json`:

- `npm run dev`: Start the development server with Vite.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to check for code quality.
- `npm run preview`: Preview the production build.

## Dependencies

### Core Dependencies

- `@emotion/react` and `@emotion/styled`: For styling components.
- `@mui/icons-material` and `@mui/material`: Material-UI components and icons.
- `@reduxjs/toolkit`: Simplified Redux state management.
- `lucide`: Icon library.
- `rc-table`: Table components.
- `react` and `react-dom`: Core React libraries.
- `react-icons`: Icon components.
- `react-redux`: React bindings for Redux.
- `react-router-dom`: Routing library.
- `sass`: CSS preprocessor.

### Development Dependencies

- `@eslint/js` and `eslint`: Linting tools.
- `@vitejs/plugin-react`: Vite plugin for React.
- `autoprefixer` and `postcss`: CSS processing tools.
- `tailwindcss`: Utility-first CSS framework.
- `typescript` and `typescript-eslint`: TypeScript and linting support.

## ESLint Configuration

For production applications, consider expanding the ESLint configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also add React-specific lint rules using `eslint-plugin-react-x` and `eslint-plugin-react-dom`:

```js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

## License

This project is licensed under [MIT License](LICENSE).

---
Happy coding!