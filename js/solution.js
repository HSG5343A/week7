/*****
 the overall structure of the site is like this. I have simplified 
 this on purpose just to illustrate the basic structure:

div.container
|__section
   |__h2
   |__form
      |__input
      |__button
|__section
   |__h2
   |__ul
      |__li
|__section
   |__h2
   |__ul
      |__li

*/

/* 
 let's start with getting a reference to the #wrapper element,
 so we can add more html to it:
*/

var wrapper = document.getElementById('wrapper');

/* 
 This code creates the first <section> element. Notice how I am 
 giving it a variable name that makes it easy to tell the 
 purpose of the element.
*/
var addItemSection = document.createElement('section');
var addItemH2 = document.createElement('h2');
var addItemText = document.createTextNode('Add Item');

// this adds our text to the h2 element we created
addItemH2.appendChild(addItemText);

// now we are going to add the h2 to the section
addItemSection.appendChild(addItemH2);

// finally, in order to actually see our section, we need to add it to the visible DOM by 
// appending it to our wrapper
wrapper.appendChild(addItemSection);

// Next, we create the form, input and buttons, and add them to the wrapper
var addItemForm = document.createElement('form');

/*
 notice below that I am using the "className" property. We could also
 assign the class using the setAttribute property, like this:
 container.setAttribute('class', 'container');

 Sometimes there are many ways to do the same thing, but whatever you choose, just make sure you are consistent.
*/

addItemForm.className = 'form-inline';

function makeElement(type, attributes) {
   var el = document.createElement(type);
   if(attributes) {
      for (var attrib in attributes) {
         el.setAttribute(attrib, attributes[attrib]);
      }
   }
   return el;
}

function makeList(id) {
   var ul = makeElement('ul', {
      id: id,
      class: 'task-list list-unstyled'
   });
   return ul;
}

function makeTodoList(id, start, finish) {
   var ul = makeList(id);
   for(var i=5; i<9; i++) {
      var li = makeElement('li');
      var input = makeElement('input', {
         id: 'task-' + i,
         type: 'checkbox'
      });
      var label = makeElement('label', {
         for: 'task-' + i
      });
      label.innerHTML = 'Task #' + i;

      var div = makeElement('div', {
         class: 'action pull-right'
      });

      div.appendChild(makeEditButton());
      div.appendChild(makeDeleteButton());

      li.appendChild(input);
      li.appendChild(label);
      li.appendChild(div);
      ul.appendChild(li);
   }
   return ul;
}

function makeInput(attributes) {
   var inputAttributes = {
      type: 'text',
      class: 'form-control',
   }
   for (var attrib in attributes) {

      inputAttributes[attrib] = attributes[attrib]
   }
   return makeElement('input', inputAttributes);
}

function makeEditButton() {
   var btn = makeElement('button', {
      class: 'edit btn btn-sm btn-info'
   });
   btn.innerHTML = 'Edit';
   return btn;
}

function makeDeleteButton() {
   var btn = makeElement('button', {
      class: 'delete btn btn-sm btn-danger'
   });
   btn.innerHTML = 'Delete';
   return btn;
}

function makeSection(title) {
   var section = makeElement('section');
   var sectionH2 = makeElement('h2');
   var h2Text = document.createTextNode(title);
   sectionH2.appendChild(h2Text);
   section.appendChild(sectionH2);
   return section;
}

var addItemInput = makeInput({
   id: 'add-item',
   placeholder: 'Buy paper towels'
});



// create the button and button text
var addItemButton = document.createElement('button');
addItemButton.className = 'btn btn-primary';
var addItemButtonText = document.createTextNode('Add');
addItemButton.appendChild(addItemButtonText);

// Now, add the input and button to the form, and then add the form to the <section>
addItemForm.appendChild(addItemInput);
addItemForm.appendChild(addItemButton);

// Finally, don't forget to add the form to the section!
addItemSection.appendChild(addItemForm);


/*

Okay, to finish this assignment, you have to create the next 2 sections, "Todo List" and "Completed".
For each of these sections, you should first create the section element, then create the h2 element,
then create the ul and lis that go inside. For the <li> elements, you should use a loop, which will 
be a lot easier than creating the elements by hand.

*/

// Todo List Section
var todoListSection = makeSection('Todo List');
var todoList = makeTodoList('tasks-incomplete', 5, 9);
todoListSection.appendChild(todoList);
wrapper.appendChild(todoListSection);

// Completed Section
var completedSection = makeSection('Completed');
var todoList = makeTodoList('tasks-complete', 1, 5);
completedSection.appendChild(todoList);
wrapper.appendChild(completedSection);