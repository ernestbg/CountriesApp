import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: [
    `
      button {
        margin-right: 5px;
      }
    `,
  ],
})
export class ByRegionComponent {
  regions: string[] = ['EU','CARICOM','PA','AU','USAN','EEU','AL','ASEAN','CAIS','CEFTA','NAFTA','SAARC','EFTA'];
  activedRegion: string = '';
  countries: Country[] = [];

  constructor(private countryService: CountryService) {}

 
  activateRegion(region: string) {

    if(region===this.activedRegion){return;}
    this.activedRegion = region;
    this.countries=[];  
    
    this.countryService.searchRegion(region).subscribe(
      countries => this.countries=countries
      
     );
  }

  getClassCSS(region: string): string {
    return region === this.activedRegion
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }
}
