import { FilterType } from '../types/filter-types';
import { PriorityTypes } from '../types/priority-types';

export function getCategoryByType(type: FilterType) {
  switch (type) {
    case FilterType.SHIRT:
      return 't-shirts';
    case FilterType.MUG:
      return 'mugs';
    default:
      return '';
  }
}

export function getFieldByPriority(priority: PriorityTypes) {
  switch (priority) {
    case PriorityTypes.NEWS:
      return { field: "created_at", order: "DESC" };
    case PriorityTypes.HIGHEST_PRICE:
      return { field: "price_in_cents", order: "DESC" };
    case PriorityTypes.LOWEST_PRICE:
      return { field: "price_in_cents", order: "ASC" };
    default:
      return { field: "sales", order: "DESC" };
  }
}

export function mountQuery(type: FilterType, priority: PriorityTypes) {
  const sortSettings = getFieldByPriority(priority);

  if (type === FilterType.ALL) {
    return `
      query {
        allProducts(sortField: "${sortSettings.field}", sortOrder: "${sortSettings.order}") {
          id,
          name,
          price_in_cents,
          image_url,
          category 
        }
      }
    `
  }

  return `
    query {
      allProducts(
        filter: {category: "${getCategoryByType(type)}"},
        sortField: "${sortSettings.field}",
        sortOrder: "${sortSettings.order}"
      ) {
        id,
        name,
        price_in_cents,
        image_url,
        category 
      }
    }
  `
}

