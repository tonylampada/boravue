const template = `
<div>
    <div>Eu sou uma navbar</div>
    <p>
        <router-link to="/foo">Go to Foo</router-link>
        <router-link to="/bar">Go to Bar</router-link>
    </p>
</div>
`;

Vue.component('navbar', {template});
