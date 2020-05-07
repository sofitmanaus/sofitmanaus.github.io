import { Component, OnInit } from '@angular/core';
import { FoodModel } from 'src/app/core/models/food.model';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss']
})
export class CardapioComponent implements OnInit {

  public foods: Array<FoodModel> = [
    {
      id: 0,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec velit et nisi pellentesque pharetra. Cras lacus neque, porttitor sit amet ex in, hendrerit tincidunt orci.',
      options: [],
      price: 22,
      title: 'Tortilhas Integrais',
      image: `https://firebasestorage.googleapis.com/v0/b/${environment.firebaseConfig.storageBucket}/o/food%2Ftortillas.png?alt=media`,
      loading: true,
      express: true
    },
    {
      id: 1,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec velit et nisi pellentesque pharetra. Cras lacus neque, porttitor sit amet ex in, hendrerit tincidunt orci.',
      options: [
        {
          price: 26,
          title: '500g'
        },
        {
          price: 52,
          title: '1kg'
        }
      ],
      price: 26,
      title: 'Granola Funcional',
      image: `https://firebasestorage.googleapis.com/v0/b/${environment.firebaseConfig.storageBucket}/o/food%2Fgranola.jpg?alt=media`,
      loading: true,
      express: true
    },
    {
      id: 2,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec velit et nisi pellentesque pharetra. Cras lacus neque, porttitor sit amet ex in, hendrerit tincidunt orci.',
      options: [
        {
          price: 22,
          title: 'Sabor Natural'
        },
        {
          price: 26,
          title: 'Sabor Frutas Vermelhas'
        },
        {
          price: 26,
          title: 'Sabor Abacaxi'
        }
      ],
      price: 22,
      title: 'Iogurte Caseiro',
      image: `https://firebasestorage.googleapis.com/v0/b/${environment.firebaseConfig.storageBucket}/o/food%2Fiogurte.jpg?alt=media`,
      loading: true,
      express: true
    },
    {
      id: 3,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec velit et nisi pellentesque pharetra. Cras lacus neque, porttitor sit amet ex in, hendrerit tincidunt orci.',
      options: [
        {
          price: 25,
          title: 'Sabor Amêndoas'
        },
        {
          price: 25,
          title: 'Sabor Coco'
        },
        {
          price: 25,
          title: 'Sabor Soja'
        }
      ],
      price: 25,
      title: 'Leites Vegetais',
      image: `https://firebasestorage.googleapis.com/v0/b/${environment.firebaseConfig.storageBucket}/o/food%2Fleite_vegetal.jpg?alt=media`,
      loading: true,
      express: false
    },
    {
      id: 4,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec velit et nisi pellentesque pharetra. Cras lacus neque, porttitor sit amet ex in, hendrerit tincidunt orci.',
      options: [
        {
          price: 62,
          title: 'Sabor Palmito'
        },
        {
          price: 62,
          title: 'Sabor Brócolis'
        },
        {
          price: 62,
          title: 'Sabor Alho Poró'
        }
      ],
      price: 62,
      title: 'Quiches',
      image: `https://firebasestorage.googleapis.com/v0/b/${environment.firebaseConfig.storageBucket}/o/food%2Fquiche.jpg?alt=media`,
      loading: true,
      express: false
    },
    {
      id: 5,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec velit et nisi pellentesque pharetra. Cras lacus neque, porttitor sit amet ex in, hendrerit tincidunt orci.',
      options: [
        {
          price: 80,
          title: '24 Unidades'
        }
      ],
      price: 80,
      title: 'Mini Quiches',
      image: `https://firebasestorage.googleapis.com/v0/b/${environment.firebaseConfig.storageBucket}/o/food%2Fmini_quiche.jpg?alt=media`,
      loading: true,
      express: false
    },
    {
      id: 6,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec velit et nisi pellentesque pharetra. Cras lacus neque, porttitor sit amet ex in, hendrerit tincidunt orci.',
      options: [
        {
          price: 72,
          title: 'Sabor Cenoura (24 unidades)'
        },
        {
          price: 72,
          title: 'Sabor Chocolate (24 unidades)'
        },
        {
          price: 72,
          title: 'Sabor Maça (24 unidades)'
        },
        {
          price: 72,
          title: 'Sabor Banana (24 unidades)'
        }
      ],
      price: 72,
      title: 'Cupcakes',
      image: `https://firebasestorage.googleapis.com/v0/b/${environment.firebaseConfig.storageBucket}/o/food%2Fcupcake.jpg?alt=media`,
      loading: true,
      express: false
    },
    {
      id: 7,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec velit et nisi pellentesque pharetra. Cras lacus neque, porttitor sit amet ex in, hendrerit tincidunt orci.',
      options: [],
      price: 65,
      title: 'Cheesecake Low-carb',
      image: `https://firebasestorage.googleapis.com/v0/b/${environment.firebaseConfig.storageBucket}/o/food%2Fcheesecake.jpg?alt=media`,
      loading: true,
      express: false
    },
    {
      id: 8,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec velit et nisi pellentesque pharetra. Cras lacus neque, porttitor sit amet ex in, hendrerit tincidunt orci.',
      options: [],
      price: 65,
      title: 'Torta de Nozes',
      image: `https://firebasestorage.googleapis.com/v0/b/${environment.firebaseConfig.storageBucket}/o/food%2Ftorta_nozes.jpg?alt=media`,
      loading: true,
      express: false
    },
    {
      id: 9,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec velit et nisi pellentesque pharetra. Cras lacus neque, porttitor sit amet ex in, hendrerit tincidunt orci.',
      options: [
        {
          price: 12,
          title: 'Sabor Abacaxi'
        },
        {
          price: 12,
          title: 'Sabor Coco'
        },
        {
          price: 12,
          title: 'Sabor Maça com Canela'
        }
      ],
      price: 12,
      title: 'Frutas Desidratadas',
      image: `https://firebasestorage.googleapis.com/v0/b/${environment.firebaseConfig.storageBucket}/o/food%2Ffruta_desidratada.jpg?alt=media`,
      loading: true,
      express: false
    },
    {
      id: 10,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec velit et nisi pellentesque pharetra. Cras lacus neque, porttitor sit amet ex in, hendrerit tincidunt orci.',
      options: [],
      price: 15,
      title: 'Mix de Nuts Caramelizadas',
      image: `https://firebasestorage.googleapis.com/v0/b/${environment.firebaseConfig.storageBucket}/o/food%2Fnuts_caramelizados.jpg?alt=media`,
      loading: true,
      express: false
    }
  ]

  today= new Date();
  todayTime: number;
  isOpen = false

  constructor() {
    this.todayTime = parseInt(formatDate(this.today, 'H:mm', 'en-US'));
    if (this.todayTime >= 8 && this.todayTime <= 18) {
      console.log('ABERTO')
      this.isOpen = true
    } else {
      this.isOpen = false
      console.log('FECHADO')
    }
  }

  ngOnInit(): void {
  }

}
