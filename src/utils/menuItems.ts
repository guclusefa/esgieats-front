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

export async function getMenuItemNameById(id: string): Promise<string | undefined> {
  let name: string | undefined;
  try {
    const menuItems = await fetchAllMenuItems();
    const menuItem = menuItems.find((item) => item.id === id);
    if (menuItem) {
      name = menuItem.name;
    } else {
      console.warn(`Menu item with ID ${id} not found.`);
    }
  } catch (error) {
    console.error(`Failed to get menu item name for ID ${id}:`, error);
    throw error;
  }
  return name;
}

export async function getMenuItemPriceById(id: string): Promise<number | null> {
  let price: number | null = null;
  try {
    const menuItems = await fetchAllMenuItems();
    const menuItem = menuItems.find((item) => item.id === id);
    if (menuItem) {
      price = menuItem.price;
    } else {
      console.warn(`Menu item with ID ${id} not found.`);
    }
  } catch (error) {
    console.error(`Failed to get menu item name for ID ${id}:`, error);
    throw error;
  }
  return price;
}
