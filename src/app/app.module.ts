// import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { CommonModule } from '@angular/common'; 


import { AppRoutes } from "./app.routes";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularMaterialModule } from "./AngularMaterialModule";
import { FormsModule } from "@angular/forms";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';  // Προσθήκη του MatIconModule

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptor } from './my-interceptor';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CreatePostComponent } from "./pages/create-post/create-post.component";


@NgModule({
    declarations: [
        AppComponent,
        CreatePostComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutes,
        BrowserAnimationsModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        MatToolbarModule,  
        MatIconModule,  
        
    ],
    providers: [provideHttpClient(withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],

})
export class AppModule { }

