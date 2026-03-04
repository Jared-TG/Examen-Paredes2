import { Component, inject } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { AutService } from '../../services/aut-service';

@Component({
  selector: 'app-header',
  imports: [MatToolbar],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly auth = inject(AutService);
}
