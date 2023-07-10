import { Component, INJECTOR, Inject, PLATFORM_ID, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title: string = "Add Todo To add a todo, just fill the form below and click in add todo."
  todo: string = ''
  todoList: any[] = []
  showList: any = []
  todoPage = {
    page: 1,
    size: 10
  }
  constructor(@Inject(PLATFORM_ID) pid: object, private msg: NzMessageService) { }

  ngOnInit(): void {
    const list: any = localStorage.getItem('todolist');
    if (list) {
      this.todoList = JSON.parse(list);
      this.updateTodo();
    }
  }

  // 添加项
  addTodo() {
    if (this.todo.trim() != "") {
      this.todoList.push(
        {
          id: Math.floor(Math.random() * 1000),
          todo: this.todo,
          status: 0
        })

      this.todo = '';
      this.updateTodo();
      this.msg.success('Todo added!');
    }
  }

  // 删除项
  delList(id: number) {
    const index = this.todoList.findIndex(item => item.id === id);
    if (index != -1) {
      this.todoList.splice(index, 1);
      this.msg.warning('Todo removed!');
    }
    this.updateTodo();
  }

  // 分页
  change(event: any) {
    if (this.todoPage.page != event) {
      this.todoPage.page = event;
      this.updateTodo();
    }
  }

  switch() {
    localStorage.setItem('todolist',JSON.stringify(this.todoList));
  }

  // 更新数据
  updateTodo() {
    this.showList = this.todoList.slice((this.todoPage.page - 1) * this.todoPage.size, this.todoPage.page * this.todoPage.size);
    localStorage.setItem('todolist',JSON.stringify(this.todoList));
  }
}
