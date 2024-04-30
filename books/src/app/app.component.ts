import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

interface Book {
  title: string;
  author: string;
  description: string;
  src: string;
  ratings: number[];
  averageRating: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private bookList: Book[] = [
    {
      title: "Crime and Punishment",
      author: "Fyodor Dostoevsky",
      description: "A psychological novel exploring the motives and consequences of a young man's decision to commit murder, and his eventual redemption through love and suffering.",
      src: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/02bbc540531495.57836e92d8e40.jpg",
      ratings: [],
      averageRating: 0
    },
    {
      title: "The Stranger",
      author: "Albert Camus",
      description: "The story follows Meursault, an indifferent settler in French Algeria, who, weeks after his mother's funeral, kills an unnamed Arab man in Algiers. The story is divided into two parts, presenting Meursault's first-person narrative before and after the killing.",
      src: "https://m.media-amazon.com/images/I/81GjCVSEDAL._AC_UF1000,1000_QL80_.jpg",
      ratings: [],
      averageRating: 0
    },
    {
      title: "Perfume: The Story of a Murderer",
      author: "Patrick Suskind",
      description: "The novel explores the sense of smell and its relationship with the emotional meanings that scents may have. The story follows Jean-Baptiste Grenouille, an unloved orphan in 18th-century France who is born with an exceptional sense of smell, capable of distinguishing a vast range of scents in the world around him.",
      src: "https://m.media-amazon.com/images/I/91mNfGLsTwL._AC_UF1000,1000_QL80_.jpg",
      ratings: [],
      averageRating: 0
    },
    {
      title: "The Plague",
      author: "Albert Camus",
      description: "A philosophical novel by French-Algerian author Albert Camus (1913-1960). The book follows a city's struggle to maintain order and civility during an outbreak of the bubonic plague. As the citizens lose hope, a small band of volunteers valiantly attempts to hold the line by helping others.",
      src: "https://i0.wp.com/www.printmag.com/wp-content/uploads/2020/03/2a34d8_0bb082ef9e1844ccb1a81797b6d44a1dmv2.jpg?resize=371%2C635&quality=89&ssl=1",
      ratings: [],
      averageRating: 0
    },
    {
      title: "The Idiot",
      author: "Fyodor Dostoevsky",
      description: "A novel that delves into the complex psyche of a naive and pure-hearted protagonist who struggles to navigate the corrupt and hypocritical society around him. It explores themes of innocence, love, and the destructiveness of human nature.",
      src: "https://mysticbooks.org/image/book/the-idiot-part-1-and-part-2.webp",
      ratings: [],
      averageRating: 0
    },
    {
      title: "Musashi",
      author: "Eiji Yoshikawa",
      description: "This novel tells the story of Japan's most famous samurai, Musashi Miyamoto, his best friend Matahatchi, his love interest Otsu and the many many other characters he encounters as he attempts to master the Way of the Sword.",
      src: "https://m.media-amazon.com/images/I/71g8sIw7nqL._AC_UF1000,1000_QL80_.jpg",
      ratings: [],
      averageRating: 0
    }
  ];

  private index: number = 0;

  public modelTitle: string = this.getCurrentBook().title;
  public modelAuthor: string = this.getCurrentBook().author;
  public modelDescription: string = this.getCurrentBook().description;
  public modelRating: number = 1;

  public isFormInvalid(): boolean {
    return (
      !this.modelTitle ||
      !this.modelAuthor ||
      !this.modelDescription ||
      this.modelRating <= 0 ||
      this.modelRating > 5
    );
  }

  private processNextBook() {
    this.index++;
    
    if (this.index >= this.bookList.length) {
      this.index = 0;
    }

    this.resetTempData();
  }

  public processSaveBookData() {
    const currentBook = this.getCurrentBook();
    
    currentBook.title = this.modelTitle;
    currentBook.author = this.modelAuthor;
    currentBook.description = this.modelDescription;
    currentBook.ratings.push(this.modelRating);

    this.calculateRating();

    this.processNextBook();
  }

  private calculateRating() {
    const currentBook = this.getCurrentBook();
    const ratings = currentBook.ratings;
  
    if (ratings.length === 0) {
      currentBook.averageRating =  0;
    }
  
    const sumOfRatings = ratings.reduce((total, rating) => total + rating, 0);
  
    const averageRating = sumOfRatings / ratings.length;
  
    currentBook.averageRating = averageRating;
  }
  
  private resetTempData() {
    this.modelTitle = this.getCurrentBook().title;
    this.modelAuthor = this.getCurrentBook().author;
    this.modelDescription = this.getCurrentBook().description;
    this.modelRating = 1;
  }

  public getCurrentBook() {
    return this.bookList[this.index];
  }
}
