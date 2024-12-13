const routes = [
  {
    path: "",
    component: () => import("layouts/NewLayout.vue"),
    children: [
      {
        path: "exemplo",
        component: () => import("pages/exemploSenai.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
