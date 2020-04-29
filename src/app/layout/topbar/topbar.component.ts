import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ResolveStart } from '@angular/router';
import {map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  public pageTitle = '';
  public navbarCollapsed = true;

  constructor(private route: ActivatedRoute,
              private router: Router
  ) {
  }

  setMyStyles() {
    let styles = {
      'width': '100%',
      'display': 'flex',
      'justify-content': 'space-between'
    };

    if (this.navbarCollapsed) {
      return;
    } else {
      return styles;
    }
  }

  ngOnInit(): void {
    // Verifica os eventos quando a página é atualizada
    this.route.url.subscribe(() => {
      const data = this.route.snapshot.firstChild;
      if (data) {
        this.pageTitle = data.routeConfig.data.title;
      }
    });

    // Verifica os eventos quando a rota muda, sem atualizar o HTML em si
    this.router.events.pipe(
        filter(event => event instanceof ResolveStart),
        map(event => {
            let data = null;
            // tslint:disable-next-line:no-string-literal
            let route = event['state'].root;

            while (route) {
                data = route.data || data;
                route = route.firstChild;
            }

            return data;
        }),
    ).subscribe(data => {
        if (data) {
            this.pageTitle = data.title;
        }
    });
  }

}
