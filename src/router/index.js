

import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import DashboardPage from '../views/DashboardPage.vue';
import CadastroPage from '../views/CadastroPage.vue';
import EditMovimentacaoPage from '../views/EditMovimentacaoPage.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      // Verifica se já existe um token no localStorage
      const token = localStorage.getItem('token');
      if (token) {
        // Se houver token, redireciona para o dashboard
        next('/dashboard');
      } else {
        next(); // Caso contrário, permite o acesso à página de login
      }
    }
  },
  {
    path: '/edit-movement/:index',
    name: 'edit-movement',
    component: EditMovimentacaoPage
  },
  {
    path: '/register',
    name: 'register',
    component: CadastroPage
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
    beforeEnter: (to, from, next) => {
      // Verifica se o token está presente no localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        // Se não houver token, redireciona para o login
        next('/login');
      } else {
        next(); // Permite o acesso à página
      }
    }
  },
  {
    path: '/',
    redirect: '/login'  // Redireciona para o login como página inicial
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
