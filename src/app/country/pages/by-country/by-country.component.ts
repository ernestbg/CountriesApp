import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [
    `
      li {
        cursor: pointer;
        color: blue;
      }
    `,
  ],
})
export class ByCountryComponent {
  term: string = '';
  errorExists: boolean = false;
  countries: Country[] = [];
  suggestedCountries: Country[] = [];
  showSuggestions: boolean = false;

  constructor(private countryService: CountryService) {}

  search(term: string) {
    this.errorExists = false;
    this.term = term;
    this.countryService.searchCountry(this.term).subscribe({
      next: (countries) => {
        (this.countries = countries), console.log(this.countries);
      },
      error: (e) => {
        (this.errorExists = true), (this.countries = []);
      },
    });
  }

  suggestions(term: string) {
    this.errorExists = false;
    this.term = term;
    this.showSuggestions = true;
    this.countryService.searchCountry(term).subscribe({
      next: (countries) => (this.suggestedCountries = countries.splice(0, 5)),
      error: (e) => (this.suggestedCountries = []),
    });
  }

  searchSuggested(term: string) {
    this.search(term);
  }
}
