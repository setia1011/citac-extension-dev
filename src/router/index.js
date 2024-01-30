import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Login from "../templates/Login.vue";
import First from "../templates/First.vue";
import { authStore } from '../stores/auth';

const routes = [
    {
        path: '/user-login',
        name: 'login',
        meta: { layout: Login, 'name': 'User Login' },
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/',
        name: 'home',
        meta: { layout: First, 'name': 'Home' },
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/komoditi-impor',
        name: 'Komoditi Impor',
        meta: { layout: First, 'name': 'KOMODITI IMPOR' },
        component: () => import('../views/KomImporView.vue')
    },
    {
        path: '/komoditi-ekspor-cpo',
        name: 'Komoditi Ekspor CPO',
        meta: { layout: First, 'name': 'EKSPOR CPO' },
        component: () => import('../views/KomEksporCPOView.vue')
    },
    {
        path: '/blokir',
        name: 'Blokir',
        meta: { layout: First, 'name': 'BLOKIR' },
        component: () => import('../views/BlokirView.vue')
    },
    {
        path: '/ima-crawler',
        name: 'Crawler',
        meta: { layout: First, 'name': 'Crawler' },
        component: () => import('../views/ArticleCrawlerView.vue')
    },
    {
        path: '/ima-article',
        name: 'Article',
        meta: { layout: First, 'name': 'Article' },
        component: () => import('../views/ArticleV2View.vue')
    },
    {
        path: '/ima-article-v2',
        name: 'Article v2',
        meta: { layout: First, 'name': 'Article V2' },
        component: () => import('../views/ArticleV2View.vue')
    },
    {
        path: '/ima-analytic',
        name: 'Analytic',
        meta: { layout: First, 'name': 'Analytic' },
        component: () => import('../views/ArticleAnalyticView.vue')
    },
    // di bawah tidak ditampilkan
    {
        path: '/doc',
        name: 'Doc',
        meta: { layout: First, 'name': 'Documentation' },
        component: () => import('../views/DocDevView.vue')
    },
    {
        path: '/doc-dev',
        name: 'Docdev',
        meta: { layout: First, 'name': 'Documentation for Developer' },
        component: () => import('../views/DocDevView.vue')
    },
    {
        path: '/doc-user',
        name: 'Docuser',
        meta: { layout: First, 'name': 'Documentation for User' },
        component: () => import('../views/DocUserView.vue')
    },
    {
        path: '/intel-doc',
        name: 'Dokumen Intelijen',
        meta: { layout: First, 'name': 'Dokumen Intelijen' },
        component: () => import('../views/IntelDocView.vue')
    },
    {
        path: '/intel-doc-summary',
        name: 'Rangkuman Dokumen Intelijen',
        meta: { layout: First, 'name': 'Rangkuman Dokumen Intelijen' },
        component: () => import('../views/IntelDocSummaryView.vue')
    }
];

const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes
});

router.beforeEach(async to => {
    const store = authStore();
    if (process.env.NODE_ENV === 'production') {
        store.getUser();
    } else {
        store.getUserDev();
    }
});

export default router
