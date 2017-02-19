const ctx = require.context('../src/', true, /\/docs\/.*Docs\.vue$/)
const components = ctx.keys().map(ctx)

export default {
    components,
    get
}

function get(name){
    for(var c of components){
        if(c.name == name){
            return c;
        }
    }
}
