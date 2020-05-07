import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public version: string;
  public owner: string;
  isProd = false;

  constructor() { }

  ngOnInit(): void {
    this.version = environment.APP.VERSION;
    this.owner = environment.APP.OWNER;
    this.isProd = environment.production
  }

}
