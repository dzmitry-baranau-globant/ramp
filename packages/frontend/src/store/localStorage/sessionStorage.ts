import store2 from 'store2';
import { LocalStorageNamespace } from '@store/localStorage/recommendationsStorage';
import { RootState } from '@store/store';

const getLocalStorageToken = () => {
  const storage: RootState = store2(LocalStorageNamespace.STORE);
  return storage?.session?.jwt ?? null;
};

export default getLocalStorageToken;
