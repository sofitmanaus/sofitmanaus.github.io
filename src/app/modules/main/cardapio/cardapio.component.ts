import { Component, OnInit } from '@angular/core';
import { FoodModel } from 'src/app/core/models/food.model';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { StateChange } from 'ng-lazyload-image';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss']
})
export class CardapioComponent implements OnInit {

  public foods: Array<FoodModel> = [
    {
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec velit et nisi pellentesque pharetra. Cras lacus neque, porttitor sit amet ex in, hendrerit tincidunt orci.',
      options: [],
      price: 22,
      title: 'Tortilha Integrais',
      image: 'https://firebasestorage.googleapis.com/v0/b/sofit-d7d06.appspot.com/o/food%2Ftortillas.png?alt=media',
      loading: true
    },
    {
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
      image: 'https://firebasestorage.googleapis.com/v0/b/sofit-d7d06.appspot.com/o/food%2Fgranola.jpg?alt=media',
      loading: true
    },
    {
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
      image: 'https://firebasestorage.googleapis.com/v0/b/sofit-d7d06.appspot.com/o/food%2Fiogurte.jpg?alt=media',
      loading: true
    },
    {
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
      image: 'https://firebasestorage.googleapis.com/v0/b/sofit-d7d06.appspot.com/o/food%2Fleite_vegetal.jpg?alt=media',
      loading: true
    },
    {
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
      image: 'https://firebasestorage.googleapis.com/v0/b/sofit-d7d06.appspot.com/o/food%2Fquiche.jpg?alt=media',
      loading: true
    },
    {
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec velit et nisi pellentesque pharetra. Cras lacus neque, porttitor sit amet ex in, hendrerit tincidunt orci.',
      options: [
        {
          price: 80,
          title: '24 Unidades'
        }
      ],
      price: 80,
      title: 'Mini Quiches',
      image: 'https://firebasestorage.googleapis.com/v0/b/sofit-d7d06.appspot.com/o/food%2Fmini_quiche.jpg?alt=media',
      loading: true
    },
    {
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
      image: 'https://firebasestorage.googleapis.com/v0/b/sofit-d7d06.appspot.com/o/food%2Fcupcake.jpg?alt=media',
      loading: true
    },
    {
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec velit et nisi pellentesque pharetra. Cras lacus neque, porttitor sit amet ex in, hendrerit tincidunt orci.',
      options: [],
      price: 65,
      title: 'Cheesecake Low-carb',
      image: 'https://firebasestorage.googleapis.com/v0/b/sofit-d7d06.appspot.com/o/food%2Fcheesecake.jpg?alt=media',
      loading: true
    },
    {
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec velit et nisi pellentesque pharetra. Cras lacus neque, porttitor sit amet ex in, hendrerit tincidunt orci.',
      options: [],
      price: 65,
      title: 'Torta de Nozes',
      image: 'https://firebasestorage.googleapis.com/v0/b/sofit-d7d06.appspot.com/o/food%2Ftorta_nozes.jpg?alt=media',
      loading: true
    },
    {
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
      image: 'https://firebasestorage.googleapis.com/v0/b/sofit-d7d06.appspot.com/o/food%2Ffruta_desidratada.jpg?alt=media',
      loading: true
    },
    {
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec velit et nisi pellentesque pharetra. Cras lacus neque, porttitor sit amet ex in, hendrerit tincidunt orci.',
      options: [],
      price: 15,
      title: 'Mix de Nuts Caramelizadas',
      image: 'https://firebasestorage.googleapis.com/v0/b/sofit-d7d06.appspot.com/o/food%2Fnuts_caramelizados.jpg?alt=media',
      loading: true
    }
  ]

  constructor(private cloudinary: Cloudinary) { }

  imageCallback(event: StateChange, index: number) {
    if (event.reason === 'loading-succeeded') {
      console.log(this.foods[index].loading)
      this.foods[index].loading = false;
    }
  }

  ngOnInit(): void {
  }

}
