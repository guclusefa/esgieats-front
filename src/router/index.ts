import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';

import LoginView from '../views/auth/LoginView.vue';
import RegisterView from '../views/auth/RegisterView.vue';

import UsersView from '../views/users/UsersView.vue';
import UserView from '../views/users/UserView.vue';

import DeliveriesView from '../views/deliveries/DeliveriesView.vue';

import OrdersView from '../views/orders/OrdersView.vue';

import { setDocumentTitle } from '@/utils/document';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    // AUTH
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    // USERS
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/users/:id',
      name: 'user',
      component: UserView,
    },
    // DELIVERIES
    {
      path: '/deliveries',
      name: 'deliveries',
      component: DeliveriesView
    },
    // ORDERS
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView
    }
  ]
});

router.beforeEach((to, from, next) => {
  setDocumentTitle(String(to.name));
  next();
});

export default router;
