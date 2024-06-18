import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidature } from 'src/app/models/candidature.model';
import { Offer } from 'src/app/models/offer.model';
import { Profile } from 'src/app/models/profile.model';
import { User } from 'src/app/models/user.model';
import { CandidatureService } from 'src/app/service/candidature.service';
import { OfferService } from 'src/app/service/offer.service';
import { ProfileService } from 'src/app/service/profile.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit {
  offer!: Offer;
  candidatureList: Candidature[] = [];
  candidatList: Profile[] = [];
  userMap: Map<number, User> = new Map<number, User>();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offerService: OfferService,
    private candidatureService: CandidatureService,
    private profileService: ProfileService,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    const offerId = Number(this.route.snapshot.paramMap.get('id'));
    if (offerId) {
      this.offerService.afficherOfferParId(offerId).subscribe(
        (data: Offer) => {
          this.offer = data;
          this.candidatureService.afficherCandidatureParIdOffer(offerId).subscribe(
            (candidatures) => {
              console.log(candidatures);
              this.candidatureList = candidatures;
              this.candidatureList.forEach(c => {
                if (c.idCandidat) {
                  this.profileService.afficherProfileParId(c.idCandidat).subscribe((profile) => {
                    console.log(profile);
                    this.candidatList.push(profile);
                    this.userService.getUserById(profile.userId).subscribe((user) => {
                      this.userMap.set(profile.userId, user);
                    });
                  });
                }
              });
            }
          );
        }
      );
    }
  }

  getImageUrl(filename: string | null): string {
    return `http://localhost:8080/api/files/get-image/${filename}`;
  }

  downloadFile(filename: string | null): void {
    const url = `http://localhost:8080/api/files/get-file/${filename}`;
    window.open(url);
  }

  setDefaultImage(event: any): void {
    event.target.src = 'assets/images/bg/bg1.jpg';
  }
  getUserFullName(userId: number | undefined): string {
    const user = this.userMap.get(userId || 0);
    return user ? `${user.nom} ${user.prenom}` : '';
  }

  getUserEmail(userId: number | undefined): string {
    const user = this.userMap.get(userId || 0);
    return user ? user.email || '' : '';
  }
}
