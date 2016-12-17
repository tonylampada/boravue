Vue.component('foo', {template: '<div>foo</div>'});
Vue.component('bar', {template: '<div>bar</div>'});

new Vue({
    router: new VueRouter({
        routes: [
            { path: '/foo', component: {template: '<foo></foo>'}},
            { path: '/bar', component: {template: '<bar></bar>'}},
        ],
    }),
}).$mount('#app');

