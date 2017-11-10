
function changeToDarkTheme() {
    $('#styleOfSite').attr('href', "/stylesheets/styleDark.css");
    $('header nav').attr('class', 'navbar navbar-expand-lg navbar-dark bg-dark');
    $("button[type='submit']").attr('class', 'btn btn-secondary');

}

function checkLanguage() {
  if ($("#selectLanguage").val() === 'Русский') {
    changeToRusLanguage();
  }
}

function checkTheme() {
    if ($('#selectTheme').val() === 'Dark')
      changeToDarkTheme();
}

function applyPersonalitySettings(){
  //checkLanguage();
  checkTheme();
}

function changePersonality() {
  applyPersonalitySettings();
  //savePersonalitySettings();
}

function checkNewPassword(){
  if ($('#changePassword').val() !== $('#confirmNewPassword').val()) {
    $('#passwordChanging').append("<p id='warningChangingPass'>Passwords are not the same</p>");
  }
  else {
    $('#warningChangingPass').remove();
    $('#passwordChanging').append("<p class='successChanged'>Password has successfully changed</p>")
  }
}

function savePassword() {
  checkNewPassword();
  //SaveNewPassword();
}

function saveMail() {

}
