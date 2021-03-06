import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ToasterService } from 'angular2-toaster';

import { ScoringService } from '../_services/scoring/scoring.service';
import { CryptoService } from '../_services/crypto/crypto.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  accessToken: string;
  requestId: string;
  consentId: string;
  secureMSISDN: string;

  valid = true;
  msisdn: string;
  formDetails: any;
  score: string;
  scoreMult: number;

  constructor(
    private formBuilder: FormBuilder,
    private scoringService: ScoringService,
    private cryptoService: CryptoService,
    private router: Router,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('access_token');
    this.requestId = localStorage.getItem('request_id');
    this.secureMSISDN = localStorage.getItem('secureMSISDN');
    if (!this.accessToken || !this.requestId || !this.secureMSISDN) {
      this.router.navigate(['/apply']);
    }
    this.formDetails = this.formBuilder.group({
      otp: ''
    });
  }

  onSubmit(formData: any) {
    console.log('Received Data', formData);

    if (!formData.otp) {
      this.valid = false;
    } else {
      this.valid = true;
      this.startVerifyFlow(formData.otp);
    }

    this.formDetails.reset();
  }

  startVerifyFlow(otp: any) {
    this.scoringService.verifyReq(this.accessToken, this.requestId, otp).subscribe(response => {
      if (response.data && response.data.consent_id) {
        this.consentId = response.data.consent_id;
        localStorage.setItem('consentId', this.consentId);

        this.getCreditScore();
      }
    }, error => {
      this.toasterService.pop(
        'error',
        'Error: TrustingSocial',
        'Your OTP was rejected by the TrustingSocial API with the following message:\n' + error.error.message
      );
      console.error(error);
    });
  }

  getCreditScore() {
    this.scoringService.getScore(this.accessToken, this.secureMSISDN, this.consentId).subscribe(response => {
      if (response.data && response.data.score) {

        this.cryptoService.decrypt(response.data.score).subscribe(decrypted => {
          this.score = decrypted;

          if (parseInt(this.score, 10) < 300) { this.score = '0'; }
          if (parseInt(this.score, 10) > 850) { this.score = '0'; }

          this.scoreMult = ((parseInt(this.score, 10) - 300) / (850 - 300));
          localStorage.setItem('scoreMult', this.scoreMult.toString());
        });
      }
    }, error => {
      this.toasterService.pop(
        'error',
        'Error: TrustingSocial',
        'The TrustingSocial API could not retrieve a credit score for this number. Check the console for more information.'
      );
      console.error(error);
    });
  }

}
