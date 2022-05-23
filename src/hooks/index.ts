import { ref, onMounted, onUnmounted } from 'vue';
export const useWindowResize: any = () => {
  const width = ref<number>(0);
  const height = ref<number>(0);
  const handleResize = (): void => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };
  onMounted((): void => {
    window.addEventListener('resize', handleResize);
    handleResize();
  });
  onUnmounted((): void => {
    window.removeEventListener('resize', handleResize);
  });
  return [width, height];
};
