import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'task-board',
        pathMatch: "full"
    },
    {
        path: 'task-board',
        loadComponent: () => import('./components/task-board/task-board.component')
    }
];
