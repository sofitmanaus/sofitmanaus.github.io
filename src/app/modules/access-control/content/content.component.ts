import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

export interface Item { title: string; content: string; }

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<Item>;
  item$: Observable<Item>;
  user: UserModel;

  constructor(private afs: AngularFirestore,
    public auth: AuthService) {
  }

  ngOnInit(): void {
    this.itemDoc = this.afs.doc<Item>('posts/myTestPost');
    this.item$ = this.itemDoc.valueChanges();
    this.auth.user$.subscribe(user => this.user = user);
  }

  editPost() {
    if (this.auth.canEdit(this.user)) {
      this.itemDoc.update({ title: 'Editei!' });
    } else {
      console.error('Clientes não podem fazer isso!')
    }
  }

  deletePost() {
    if (this.auth.canEdit(this.user)) {
      this.itemDoc.delete();
    } else {
      console.error('Clientes não podem fazer isso!')
    }
  }

}
