import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SearchService, User } from './search.service';

enum KeyboardKeys {
  ENTER = 13,
  UP = 38,
  DOWN = 40,
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private searchSvc: SearchService, private fb: FormBuilder) {}
  searchForm: FormGroup;
  filteredUsers: User[] = [];
  currentSelection: number = 0;

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      input: new FormControl(''),
    });
  }

  search(e) {
    if (e.target.value === '') {
      this.clearSuggestions();
      return;
    }
    if (e.keyCode == KeyboardKeys.DOWN) {
      this.currentSelection < this.filteredUsers.length &&
        this.currentSelection++;
      return;
    }

    if (e.keyCode == KeyboardKeys.UP) {
      this.currentSelection > 1 && this.currentSelection--;
      return;
    }

    if (e.keyCode == KeyboardKeys.ENTER) {
      this.selectSuggestion(
        this.filteredUsers.filter((u) => u.id == this.currentSelection).shift()
      );
      return;
    }
    this.searchSvc.search(e.target.value).subscribe((filteredUsers) => {
      this.filteredUsers = filteredUsers;
    });
  }

  selectSuggestion({ name }) {
    this.searchForm.get('input').setValue(name);
    this.clearSuggestions();
  }
  clearSuggestions() {
    this.currentSelection = 0;
    this.filteredUsers = [];
  }
}
