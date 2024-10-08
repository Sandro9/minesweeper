import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'settings'
    },
    {
        path: '',
        pathMatch: 'prefix',
        loadComponent: () => import('./domain/layout/layout').then((m) => m.LayoutComponent),
        children: [
            {
                path: 'settings',
                loadComponent: () => import('./pages/settings').then((m) => m.SettingsComponent)
            },
            {
                path: 'game',
                loadComponent: () => import('./pages/game').then((m) => m.GameComponent)
            }
        ]
    }, 

];
