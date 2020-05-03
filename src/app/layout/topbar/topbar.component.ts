import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router, ResolveStart } from '@angular/router'
import {map, filter, first} from 'rxjs/operators'
import { AuthService } from 'src/app/core/services/auth.service'
import { UserModel } from 'src/app/core/models/user.model'
import { Observable } from 'rxjs'
import { UserDataService } from 'src/app/core/services/user-data.service'

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  pageTitle = ''
  navbarCollapsed = true
  user: UserModel
  photoURL = 'assets/images/anonymous.png'
  firstName = 'Anonymous'

  constructor(private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService,
              private userData: UserDataService
  ) {
  }

  signOut() {
    this.auth.signOut().then(res => this.router.navigate(['/login']))
  }

  setMyStyles() {
    let styles = {
      'width': '100%',
      'display': 'flex',
      'justify-content': 'space-between'
    }

    if (this.navbarCollapsed) {
      return
    } else {
      return styles
    }
  }

  ngOnInit(): void {
    // this.user = this.userData.get();
    // if (this.user.photoURL) this.photoURL = this.user.photoURL;
    // else if (this.user.firstName) this.firstName = this.user.firstName

    // Verifica os eventos quando a página é atualizada
    this.route.url.subscribe(() => {
      const data = this.route.snapshot.firstChild
      if (data) {
        this.pageTitle = data.routeConfig.data.title
      }
    })

    // Verifica os eventos quando a rota muda, sem atualizar o HTML em si
    this.router.events.pipe(
        filter(event => event instanceof ResolveStart),
        map(event => {
            let data = null
            // tslint:disable-next-line:no-string-literal
            let route = event['state'].root

            while (route) {
                data = route.data || data
                route = route.firstChild
            }

            return data
        }),
    ).subscribe(data => {
        if (data) {
            this.pageTitle = data.title
        }
    })
  }

}
