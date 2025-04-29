import api from '@/services/api';
import type { MenuItem } from '@/types/MenuItem';

const url = '/menu';

/**
 * Fetches all menu items.
 */
export async function fetchAllMenuItems(): Promise<MenuItem[]> {
  try {
    const response = await api.get(url);
    return response.data as MenuItem[];
  } catch (error) {
    console.error('Failed to fetch all menu items:', error);
    throw error;
  }
}

/**
 * Fetches the name of a specific menu item by its ID.
 * @param id - The ID of the menu item.
 */
export async function getMenuItemNameById(id: string): Promise<string | null> {
  try {
    const menuItems = await fetchAllMenuItems();
    const menuItem = menuItems.find((item) => item.id === id);

    return menuItem ? menuItem.name : null;
  } catch (error) {
    console.error(`Failed to get menu item name for ID ${id}:`, error);
    throw error;
  }
}

export async function getMenuItemRestaurantById(id: string): Promise<string | null> {
  try {
    const menuItems = await fetchAllMenuItems();
    const menuItem = menuItems.find((item) => item.id === id);

    return menuItem ? menuItem.restaurant_id : null;
  } catch (error) {
    console.error(`Failed to get menu item restaurant for ID ${id}:`, error);
    throw error;
  }
}
