(function() {
    function createAppTitle(title){
        let apTitle = document.createElement('h2');
        apTitle.innerHTML = title;
        return apTitle;
    };

    function createTodoItemForm(){
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';


        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);


        return {
            form,
            input,
            button,
        }
    };
    
    function createTodoList(){
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    };


    function createTodoItemObj(obj) {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        
        item.textContent = obj.names;

        if (obj.done === true) {
            item.classList.toggle('list-group-item-success');  
        }
        

        

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        }
    }


    function createTodoItem(name) {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');



        item.textContent = name;  
       

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        }
    }


    function createTodoApp(container, title, arrayObj = [], localKey){

        container.innerHTML = '';



        let todoAppTitle =createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();


        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
   
        todoItemForm.button.setAttribute('disabled', 'true');
   

        todoItemForm.input.addEventListener('keypress', function () {
            todoItemForm.button.removeAttribute('disabled', 'true');
        });


        if(arrayObj != undefined){
            for (let i=0; i < arrayObj.length; i++){
                const arrayObjItems = createTodoItemObj(arrayObj[i]);
                container.append(arrayObjItems.item);
                arrayObjItems.doneButton.addEventListener('click', function(){
                    arrayObjItems.item.classList.toggle('list-group-item-success');
                    arrayObj[i].done = arrayObjItems.item.classList.contains('list-group-item-success');
                    localStorage.setItem(localKey, JSON.stringify(arrayObj)); 
                    console.log(arrayObj);
                });
        
                arrayObjItems.deleteButton.addEventListener('click', function(){
                    if(confirm('Вы уверены?')) {
                        arrayObjItems.item.remove();
                        arrayObj.splice(i, 1);
                        // arrayObj = arrayObj.filter(item => item.names != arrayObjItems.item.firstChild.textContent);
                        localStorage.setItem(localKey, JSON.stringify(arrayObj));  
                        console.log(localStorage.arrayObj);
                        createTodoApp(container, title, arrayObj, localKey);
                    }
                });
            }
        }


        todoItemForm.form.addEventListener('submit', function(e) { 
                e.preventDefault();

                if (!todoItemForm.input.value) {
                    return;
                }


                let todoItem = createTodoItem(todoItemForm.input.value);


                let newObj= {};
                    newObj.names = todoItem.item.firstChild.textContent;
                    newObj.done = false;

                todoItem.doneButton.addEventListener('click', function(){
                    todoItem.item.classList.toggle('list-group-item-success');   
                    newObj.done = todoItem.item.classList.contains('list-group-item-success');   
                    localStorage.setItem(localKey, JSON.stringify(arrayObj));
                    console.log(localStorage.arrayObj);
                });

                todoItem.deleteButton.addEventListener('click', function(){
                    if(confirm('Вы уверены?')) {
                        todoItem.item.remove();
                        arrayObj = arrayObj.filter(item => item.names != todoItem.item.firstChild.textContent);
                        console.log( arrayObj);   
                        localStorage.setItem(localKey, JSON.stringify(arrayObj));  
                        console.log(localStorage.arrayObj);
                    }
                });

                todoList.append(todoItem.item);

                todoItemForm.input.value = '';

                todoItemForm.button.setAttribute('disabled', 'true');

                arrayObj.push(newObj);
                console.log( arrayObj);

                localStorage.setItem(localKey, JSON.stringify(arrayObj));
                console.log(localStorage.arrayObj); 
                
            });
            
        }
    window.createTodoApp = createTodoApp;

})();
