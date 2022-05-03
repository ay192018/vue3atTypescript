import { defineStore } from 'pinia';
import { Name } from './config/moduleName';
export const mian = defineStore(Name.mian, {
  state: () => {
    return {
      name: 'mian',
    };
  },
});
interface theme {
  backgroundColor: string;
}
export const theme = defineStore(Name.theme, {
  state: () => {
    return {
      color: 'rgba(245, 245, 245, 0.68)',
      fontSizeColor: '#000',
    };
  },
});
