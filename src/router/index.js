import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/views/UserLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/UserHome.vue'),
      },
      {
        path: 'products',
        name: 'Product',
        component: () => import('@/views/UserProducts.vue'),
      },
      {
        path: 'products/:id',
        name: 'ProductDetail',
        component: () => import('@/views/UserProduct.vue'),
      },
      {
        path: 'articles',
        name: 'Article',
        component: () => import('@/views/UserArticles.vue'),
      },
      {
        path: 'articles/:id',
        name: 'ArticleDetail',
        component: () => import('@/views/UserArticle.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/UserCart.vue'),
      },
      {
        path: 'order/:id',
        name: 'Order',
        component: () => import('@/views/UserOrder.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/AdminLogin.vue'),
  },
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminDashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('@/views/admin/AdminProducts.vue'),
      },
      {
        path: 'orders',
        component: () => import('@/views/admin/AdminOrders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('@/views/admin/AdminCoupons.vue'),
      },
      {
        path: 'article',
        component: () => import('@/views/admin/AdminArticle.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
