
$(document).ready(function () {

  var newTodoInput = $('#new-todo-input');
  var newTodoBtn = $('#new-todo-btn');
  var todosList = $('.todos');

  var apiUrl = 'http://157.230.17.132:3018/todos';

  var source = $('#todo-template').html();
  var template = Handlebars.compile(source);

  printAllTodos(apiUrl, template, todosList);

  newTodoBtn.click(function(){
    var todoValue = newTodoInput.val().trim();

    $.ajax({
      url:apiUrl,
      method:'POST',
      data: {
        text: todoValue
      },
      success: function(){
        printAllTodos(apiUrl, template, todosList);
      },
      error: function() {
        console.log('Errore creazione todo')
      }
    })
  })

  $(document).on('click', '.remove', function(){
    var todoId = $(this).data('id');

    $.ajax({
      url:apiUrl + '/' + todoId,
      method:'DELETE',
      success: function(){
        printAllTodos(apiUrl, template, todosList);
      },
      error: function() {
        console.log('Errore eliminazione todo')
      }
    })

  });

});



function printAllTodos(apiUrl, template, todosList) {
  todosList.html('');

  $.ajax({
    url: apiUrl,
    method : 'GET',
    success: function(data){

      var todos = data;

      for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];

        var context = {
          todo: todo.text,
          id: todo.id
        }

        var html = template(context);
        todosList.append(html);
      }

    },
    error: function(){
      console.log('Errore in print')
    }
  });
}
