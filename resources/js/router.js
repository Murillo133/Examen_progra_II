import Vue from "vue";
import VueRouter from "vue-router";
import Authors from "./components/authors/index.vue";

Vue.use(VueRouter);

const router = new VueRouter(
    {
        mode: "history",
        linkExactActiveClass: "active",
        routes: [
            {
                path: "/authors",
                component: Authors
            },
           
        ]
    }
);

export default router;
