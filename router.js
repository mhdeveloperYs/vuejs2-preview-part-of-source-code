/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  main route => demain.com/country-lang                  
  ----------------------------------------------------------------------------------------
  APP Name: MEMO- WEB APPLICATION
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
// i18n
import i18n from './i18n/i18n'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: '/',
    routes: [

      {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
        path: '',
        component: () => import('./layouts/main/Main.vue'),
        children: [
      // =============================================================================
      // Theme Routes
      // =============================================================================
          {
            path: '/:country-:lang',
            name: 'Dashboard',
            component: () => import('./views/pages/Dashboard/Home.vue'),
              meta: {
                  requiresAuth: true
              }
          },
          {
              path: '/:country-:lang/supervisors',
              name: 'supervisors',
              component: () => import('./views/pages/Users/Supervisors/Supervisors'),
              meta: {
                 breadcrumb: [
                          { title: 'Home', url: '/' },
                          { title: 'Supervisors', active: true },
                      ],
                  pageTitle: 'Supervisors',
                  requiresAuth: true
              }
          },
           {
              path: '/:country-:lang/supervisor/:id/profile',
              name: 'supervisor_profile',
              component: () => import('./views/pages/Users/Supervisors/SupervisorProfile'),
              meta: {
                 breadcrumb: [
                          { title: 'Home', url: '/' },
                          { title: 'Supervisors', url: '/:country-:lang/supervisors' },
                          { title: 'profile', active: true },
                      ],
                  pageTitle: 'Profile',
                  requiresAuth: true
              }
          },
          {
            path: '/:country-:lang/shops',
            name: 'Dashboard',
            component: () => import('./views/apps/eCommerce/ECommerceShop.vue'),
              meta: {
                  requiresAuth: true
              }
          },
        ],
      },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
      {
        path: '',
        component: () => import('@/layouts/full-page/FullPage.vue'),
        children: [
      // =============================================================================
      // PAGES
      // =============================================================================
          {
            path: '/callback',
            name: 'auth-callback',
            component: () => import('@/views/Callback.vue'),
           
          },
          {
            path: '/auth/login',
            name: 'pageLogin',
            component: () => import('@/views/pages/Auth/Login.vue'),

          },
          {
            path: '/pages/error-404',
            name: 'pageError404',
            component: () => import('@/views/pages/Error404/Error404.vue'),
          },
        ]
      },
      // Redirect to 404 page, if no match found
      {
        path: '*',
        redirect: '/pages/error-404'
      }
    ],
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})


router.beforeEach((to, from, next) => {
        const defaultLang    = i18n.locale,
              defaultCountry = 'kuwait',
              routeLang      = to.params.lang;

               //

        if (to.path == '/') {
          //defaultCountry = localStorage.country.slug
          next("/"+defaultCountry+"-"+defaultLang)
        }

        // check lang in route
        if (routeLang == 'en') {
           i18n.locale = 'en';
           document.querySelector('body').classList.remove('rtl');
        } else if (routeLang == 'ar') {
          i18n.locale = 'ar'
          document.querySelector('body').classList.add('rtl');
        }

        if(to.matched.some(record => record.meta.requiresAuth)) {
      //store.getters.isLoggedIn
        if (localStorage.getItem('token') != null) {
          //console.log('user loged');
            next();
            return
        }
        next('/auth/login')
    } else {
        next()
    }
});

export default router
