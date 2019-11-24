import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from "@angular/router"
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoggedOutGuard } from './auth/loggedout.guard';
import { LoggedInGuard } from './auth/loggedin.guard';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoggedOutGuard] },
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'game', component: GameComponent, canActivate: [LoggedInGuard] }
]

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
