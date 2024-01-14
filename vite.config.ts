import reactRefresh from '@vitejs/plugin-react-refresh';

export default {
  base: '/analog-watch/',
  plugins: [reactRefresh()],
  optimizeDeps: {
    swcOptions: {
      plugins: ['@swc-jotai/react-refresh'],
    },
  },
};
