import { createApp } from 'vue';
import App from './App.vue';
import './main.css';
import * as VueRouter from 'vue-router';
import ShoppingCartPage from './pages/ShoppingCartPage.vue';
import ProductsPage from './pages/ProductsPage.vue';
import ProductDetailPage from './pages/ProductDetailPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDpXenQvv89o4qVCkTnqKRBMraV7Tn9C1w",
  authDomain: "vue-site-d11a6.firebaseapp.com",
  projectId: "vue-site-d11a6",
  storageBucket: "vue-site-d11a6.appspot.com",
  messagingSenderId: "549154159356",
  appId: "1:549154159356:web:2a77de1dbb7166462bb579"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App)
.use(VueRouter.createRouter ({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [{
        path: '/cart',
        component: ShoppingCartPage,
    } , {
        path: '/products',
        component: ProductsPage,
    }, {
        path: '/products/:productId',
        component: ProductDetailPage,
    }, {
        path: '/:pathMatch(.*)*',
        component: NotFoundPage,
    }]
}))
.mount('#app')
