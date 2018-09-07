import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { SwitchView } from '@angular/common/src/directives/ng_switch';

interface Task {
  description: string
  category: string
  time: string
  status: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Morning Check Monitor';
  statusList = ["OK", "Caution", "Error"]

  sortName = null;
  sortValue = null;

  constructor(private taskService: TasksService) {
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      tasks.forEach(task => {
        if (task.data) {
          // TODO
          console.log(JSON.parse(task.data))
        }
      })
      this.dataSet = tasks
    })
  }

  dataSet: Task[] = []

  getColor(status: String) {
    let color = 'black'
    switch (status) {
      case 'OK':
        color = 'green'
        break;
      case 'Caution':
        color = 'orange'
        break;
      case 'Error':
        color = 'red'
        break;
    }
    return {
      'color': color
    }
  }

  sort(sort: { key: string, value: string }): void {
    //this.sortName = sort.key;
    //this.sortValue = sort.value;
    //this.search();
  }

  filter(listOfSearchName: string[], searchAddress: string): void {
    //this.listOfSearchName = listOfSearchName;
    //this.searchAddress = searchAddress;
    //this.search();
  }
}
