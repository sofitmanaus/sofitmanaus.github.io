import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { title: string; content: string; }

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<Item>;
  item: Observable<Item>;

  constructor(private afs: AngularFirestore) {
    this.itemDoc = afs.doc<Item>('posts/myTestPost');
    this.item = this.itemDoc.valueChanges();
  }

  ngOnInit(): void {
  }

}
