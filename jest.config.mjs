/** @type {import('jest').Config} */
const config = {
   // Gunakan jsdom untuk simulasi browser
   testEnvironment: 'jest-environment-jsdom',

   // Pastikan setup file diarahkan ke file .ts/.js yang benar
   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

   // Transformasi menggunakan babel-jest
   transform: {
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
   },

   collectCoverage: true,
   collectCoverageFrom: [
      'src/pages/index.tsx',
      'src/pages/404.tsx',
      'src/pages/_app.tsx',
      'src/pages/about/**/*.{ts,tsx}',
      'src/pages/admin/**/*.{ts,tsx}',
      'src/pages/auth/**/*.{ts,tsx}',
      'src/pages/blog/**/*.{ts,tsx}',
      'src/pages/profile/**/*.{ts,tsx}',
      'src/pages/product/**/*.{ts,tsx}',
      'src/pages/shop/**/*.{ts,tsx}',
      'src/components/layout/**/*.{ts,tsx}',
      'src/utils/swr/fetcher.ts',
      '!src/pages/api/**',
      '!src/pages/user/**',
      '!src/pages/setting/**',
      '!src/pages/editor/**',
      '!src/views/**',
      '!src/types/**',
      '!src/Middleware/**',
      '!src/middleware.ts',
      '!src/utils/db/**',
   ],

   moduleNameMapper: {
      // Pastikan CSS/SCSS ada di baris atas
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',

      // Tangani alias folder
      '^@/(.*)$': '<rootDir>/src/$1',

      // Tangani file gambar/aset
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
   },
};

export default config;