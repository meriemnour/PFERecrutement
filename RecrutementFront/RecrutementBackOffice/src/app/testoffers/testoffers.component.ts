import { Component, OnInit } from '@angular/core';
import { Test } from '../models/test.model';
import { TestService } from '../service/test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testoffers',
  templateUrl: './testoffers.component.html',
  styleUrls: ['./testoffers.component.scss']
})
export class TestoffersComponent implements OnInit{
  tests!: Test[];
  search: string = '';

  constructor(private testService: TestService, private router: Router) {}

  ngOnInit(): void {
    this.testService.afficherTests().subscribe(data => {
      this.tests = data;
    });
  }

  deleteTest(id: number | null): void {
    if (id != null) {
      this.testService.supprimerTest(id).subscribe(() => {
        this.testService.afficherTests().subscribe(data => {
          this.tests = data;
        });
      });
    }
  }

  updateTest(id: number | null): void {
    if (id != null) {
      this.router.navigate(['/testoffers/update', id]);
    }
  }

  gotoAddTest(): void {
    this.router.navigate(['/testoffers/add']);
  }

  filterTests(): void {
    // Implement your filtering logic here
  }

  navigateToDetails(id: number | null): void {
    if (id != null) {
      this.router.navigate(['/testoffers/details', id]);
    }
  }
}
