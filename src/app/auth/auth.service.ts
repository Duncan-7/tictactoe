import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as  AmazonCognitoIdentity from "amazon-cognito-identity-js";


@Injectable({ providedIn: 'root' })
export class AuthService {
  idToken: string;


  constructor(private http: HttpClient, private router: Router) { }

  getUserPool() {
    const poolData = {
      UserPoolId: 'us-east-1_qRdMI4QGp',
      ClientId: '193l2qgeu9o51qpmboddhda5kk',
    };
    return new AmazonCognitoIdentity.CognitoUserPool(poolData);
  }

  signup(email: string, password: string) {
    const userPool = this.getUserPool()

    let attributeList = [];

    let cognitoUser;
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());
      this.login(email, password)
    });
  }

  login(email: string, password: string) {
    const userPool = this.getUserPool();
    var userData = {
      Username: 'duncanmorrison2001@yahoo.com',
      Pool: userPool
    };
    var authenticationData = {
      Username: email,
      Password: password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        this.idToken = result.getAccessToken().getJwtToken();
        localStorage.setItem('idToken', this.idToken)
        this.router.navigate(['/home']);
      },
      onFailure: function (err) {
        console.log(err);
      },
    });
  }

  checkLogin() {
    const idToken: string = localStorage.getItem('idToken');
    if (!idToken) {
      return
    }
    this.idToken = idToken;
  }

  logout() {
    this.idToken = null;
    localStorage.removeItem('idToken');
    this.router.navigate(['/login']);
  }
}