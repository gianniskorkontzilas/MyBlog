import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewAllComponent } from './pages/view-all/view-all.component';
import { ViewpostComponent } from './pages/viewpost/viewpost.component';
import { SearchByNameComponent } from './pages/search-by-name/search-by-name.component';

export const routes: Routes = [
    {path:'create-post', component: CreatePostComponent},
    {path:'view-all', component: ViewAllComponent},
    {path:'search-by-name', component: SearchByNameComponent},
    {path:'view-post/:id', component: ViewpostComponent},


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutes {}
