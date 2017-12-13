editor.document.designMode = 'On';

[].forEach.call(document.getElementsByTagName('a'), v => {
  v.addEventListener('click', function(e){

    //Using currentTarget instead of target due to propagation
    let command = e.currentTarget.getAttribute('data-command');

    switch(command){
      case 'src':
        let child = e.currentTarget.childNodes[0];
        child.innerHTML = child.textContent === 'abc' ? '&lt/&gt' : 'abc';
        //TODO
        break;
      default:
        editor.focus();
        editor.document.execCommand(command, false, null);
        editor.focus();
    }
  })
});
