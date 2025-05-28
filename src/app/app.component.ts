import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from "./component/header/header.component";
import { FooterComponent } from "./component/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, HeaderComponent, FooterComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
}
