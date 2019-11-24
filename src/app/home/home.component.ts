import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  record = {
    "games": [
      {
        "created": "2019-11-15T16:23:40.000Z",
        "winner": "user"
      },
      {
        "created": "2019-11-15T16:23:40.000Z",
        "winner": "user"
      },
      {
        "created": "2019-11-15T16:23:40.000Z",
        "winner": "user"
      },
      {
        "created": "2019-11-15T16:23:40.000Z",
        "winner": "opponent"
      },
      {
        "created": "2019-11-15T16:23:40.000Z",
        "winner": "opponent"
      },
      {
        "created": "2019-11-15T16:23:40.000Z",
        "winner": "draw"
      }
    ]
  };
  gamesPlayed = this.record.games.length
  gamesWon = this.getResults('user')
  gamesLost = this.getResults('opponent')

  getResults(winner: string) {
    const results = this.record.games.filter(game => {
      return game.winner === winner
    })
    return results.length
  }

  constructor(private authService: AuthService, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getRecord().subscribe(response => {
      console.log(response);
      this.record = response
    }, error => {
      console.log(error)
    })
  }

  onLogout() {
    this.authService.logout();
  }
}
