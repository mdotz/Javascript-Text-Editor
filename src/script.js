editor.document.designMode = 'On';

const colors = ['#ffffff' ,'#d3d3d3' ,'#000000','#c00000','#ff0000',
                '#ffc000','#ffff00','#92d050',
                '#00b050', '#00b0f0'];
let foreColorState = false;
let fontSizeAnchors = document.getElementById('font-row').getElementsByTagName('a');
let colorIcons =
          document.getElementById('color-row').getElementsByTagName('i');
let bar = document.getElementById('bar');
let fontRow = document.getElementById('font-row');
let colorRow = document.getElementById('color-row');
let edit = document.getElementById('editor');
let barStyle = getComputedStyle(bar);
let editStyle = getComputedStyle(edit);
let foreAnchor = document.getElementById('fore');
let backAnchor = document.getElementById('back');
let fontAnchor = document.getElementById('font');
let anchors = [foreAnchor, backAnchor, fontAnchor];

// For determining fore/back color bar option is enabled
foreAnchor.addEventListener('click', function(e){
  foreColorState = true;
});

backAnchor.addEventListener('click', function(e){
  foreColorState = false;
});

///////////////////////////////////////////////////
/*             THIRD BAR EVENT HANDLERS          */
///////////////////////////////////////////////////
for(let i = 0; i < fontSizeAnchors.length; i++){
  fontSizeAnchors[i].addEventListener('click', e => {
    editor.document.execCommand('fontSize', false, i+1);
  });
}

for(let i = 0; i < colors.length; i++){
  colorIcons[i].style.color = colors[i];
  colorIcons[i].style.fontSize = '3vw';
  colorIcons[i].parentNode.addEventListener('click', function(e){
    let command = foreColorState ? 'foreColor' : 'hiliteColor';
    editor.document.execCommand(command, false, colors[i]);
  })
}

///////////////////////////////////////////////////
/*            FONT ANCHOR EVENT HANDLER          */
///////////////////////////////////////////////////
fontAnchor.addEventListener('click', function(e){

  if(colorRow.classList.contains('hidden')){
    toggleBarFlex();
    toggleRow(fontRow);
  }
  else{
    hideRow(colorRow);
    toggleRow(fontRow);
  }

  if(fontRow.classList.contains('hidden')){
    toggleActiveAnchor(null);
  }
  else {
    toggleActiveAnchor(fontAnchor);
  }
});


///////////////////////////////////////////////////
/*           COLOR ANCHORS EVENT HANDLER         */
///////////////////////////////////////////////////
let previousTarget;

[].forEach.call(document.getElementsByClassName('picker'), v => {
  v.addEventListener('click', function(e) {


    if((previousTarget == null || previousTarget === e.currentTarget)
        || colorRow.classList.contains('hidden')){
          if(fontRow.classList.contains('hidden')){
            toggleBarFlex();
            toggleRow(colorRow);
          }
          else {
            hideRow(fontRow);
            toggleRow(colorRow);
          }
    }

    if(colorRow.classList.contains('hidden')){
      toggleActiveAnchor(null);
    }
    else{
      if(foreColorState){
        toggleActiveAnchor(foreAnchor);
      }
      else {
        toggleActiveAnchor(backAnchor);
      }
    }

    previousTarget = e.currentTarget;
  });
});

function toggleBarFlex(){
  edit.style.flex = editStyle.flexGrow == 0.85 ? 0.775 : 0.85;
  bar.style.flex = barStyle.flexGrow == 0.15 ? 0.225 : 0.15;
}
function toggleRow(row){
  row.classList.toggle('row');
  row.classList.toggle('hidden');
}
function hideRow(row){
  row.classList.add('hidden');
  row.classList.remove('row');
}

function toggleActiveAnchor(activeAnchor){
  anchors.forEach(a => {
    a.classList.remove('active');
  })
  if(activeAnchor != null){
    activeAnchor.classList.add('active');
  }
}

///////////////////////////////////////////////////
/*           STATIC ANCHORS EVENT HANDLER        */
///////////////////////////////////////////////////
[].forEach.call(document.getElementsByClassName('std'), v => {
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
      default:
        editor.focus();
        editor.document.execCommand(command, false, null);
        editor.focus();
    }
  })
});
