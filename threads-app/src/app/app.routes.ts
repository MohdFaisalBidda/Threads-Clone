import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:"",
        pathMatch:"prefix",
        redirectTo:"home",
    },
    {
        path: "home",
        loadComponent: () => import("./home/home.component").then(m => m.HomeComponent)
    },
    {
        path: "about",
        loadComponent: () => import("./about/about.component").then(m => m.AboutComponent)
    }
];
