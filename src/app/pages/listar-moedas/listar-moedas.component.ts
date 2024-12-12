import { Component } from '@angular/core';
import { TableComponent } from './components/table/table.component';
@Component({
  selector: 'app-listar-moedas',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './listar-moedas.component.html',
  styleUrl: './listar-moedas.component.css'
})
export class ListarMoedasComponent {

}
