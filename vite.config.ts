import reactRefresh from '@vitejs/plugin-react-refresh';

export default {
  base: '/',
  plugins: [reactRefresh()],
  optimizeDeps: {
    swcOptions: {
      plugins: ['@swc-jotai/react-refresh'],
    },
  },
};
