editor.document.designMode = 'On';
const colors = ['#000000','#c00000','#ff0000',
                '#ffc000','#ffff00','#92d050',
                '#00b050', '#00b0f0'];

const colorIcons =
          document.getElementById('back-color-row').getElementsByTagName('i');

let foreColorState = false;

////////////////

document.getElementById('font-color-fore').addEventListener('click', function(e){
  foreColorState = true;
});

document.getElementById('font-color-back').addEventListener('click', function(e){
  foreColorState = false;
});

for(let i = 0; i < colors.length; i++){
  colorIcons[i].style.color = colors[i];
  colorIcons[i].style.fontSize = '3vw';
  //console.log(colorIcons[i].parentNode);
  colorIcons[i].parentNode.addEventListener('click', function(e){
    let command = foreColorState ? 'foreColor' : 'hiliteColor';
    editor.document.execCommand(command, false, colors[i]);
  })
}

////////////////

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
      case 'formatBlock':
        editor.focus();
        editor.document.execCommand(command, false, 'H1');
        editor.focus();
        break;
      case 'fontColor':
        let bar = document.getElementById('bar');
        let row = document.getElementById('back-color-row');
        let edit = document.getElementById('editor');
        let barStyle = getComputedStyle(bar);
        let editStyle = getComputedStyle(edit);

        edit.style.flex = editStyle.flexGrow == 0.85 ? 0.775 : 0.85;
        bar.style.flex = barStyle.flexGrow == 0.15 ? 0.225 : 0.15;
        row.classList.toggle('row');
        row.classList.toggle('hidden');

        break;
      default:
        editor.focus();
        editor.document.execCommand(command, false, null);
        editor.focus();
    }
  })
});
