import { useContext } from 'react';

import { CategoriesMetaDataContext } from '~/components/CategoriesMetaDataProvider';

export const useCategoriesMetaData = () => useContext(CategoriesMetaDataContext);
