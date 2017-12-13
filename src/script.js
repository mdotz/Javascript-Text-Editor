const anchors = document.querySelector('a');
const editArea = document.getElementById('editor');

anchors.addEventListener('click', function(e){
  editor.focus();
  let command = e.target.getAttribute('data-command');

  document.execCommand(command, false, null);
  editor.focus();
});
