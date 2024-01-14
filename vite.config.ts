import reactRefresh from '@vitejs/plugin-react-refresh';

export default {
  plugins: [reactRefresh()],
  optimizeDeps: {
    swcOptions: {
      plugins: ['@swc-jotai/react-refresh'],
    },
  },
};
