import { Component, OnInit } from '@angular/core';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
selector: 'app-registration',
templateUrl: './registration.component.html',
styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  

  constructor() { }
 


  ngOnInit(): void {
 

}