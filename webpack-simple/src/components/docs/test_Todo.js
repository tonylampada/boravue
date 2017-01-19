import Vue from 'vue'
import Todo from '../Todo.vue'

describe('Todo.vue', () => {
  it('Add item in list', () => {
    expect(!!Todo).equal(true);
    const Ctor = Vue.extend(Todo);
    const todo = new Ctor();
    expect(todo.items.length).equal(0);
    todo.text = 'oi';
    todo.add();
    expect(todo.items.length).equal(1);
    expect(todo.text).equal('');
  })
})
