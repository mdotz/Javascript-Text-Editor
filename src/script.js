editor.document.designMode = 'On';

[].forEach.call(document.getElementsByTagName('a'), v => {
  v.addEventListener('click', function(e){

    //Using currentTarget insead of target due to propagation
    let command = e.currentTarget.getAttribute('data-command');

    editor.focus();
    editor.document.execCommand(command, false, null);
    editor.focus();
  })
});
