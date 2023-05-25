import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-devices-edit',
  templateUrl: './devices-edit.component.html',
  styleUrls: ['./devices-edit.component.css', '../../app.component.css']
})
export class DevicesEditComponent implements OnInit{
  title = 'HTTP using native fetch API';
  id= 1;
  private url: string = `http://localhost:5172/api/id/device_configurations/`;
  data: any;
  mostrar=true;

  ngOnInit(): void {
    fetch(this.url,  
      {
        method: "get",
        body: "id=1"
      })
    .then((response) => response.json())
    .then((quotesData) => (this.data = quotesData));
}
}
