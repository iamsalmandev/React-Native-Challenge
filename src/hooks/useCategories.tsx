import { useContext } from 'react';

import { CategoriesContext } from '~/components/CategoriesProvider';
export const useCategories = () => useContext(CategoriesContext);
