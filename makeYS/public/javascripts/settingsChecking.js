
function changeToDarkTheme() {
    $(#styleOfSite).attr(href, "/stylesheets/styleDark.css")
}

function checkLanguage() {
  if ($('#selectLanguage').val === 'Русский')
    changeToRusLanguage();
}

function checkTheme() {
    if ($('#selectTheme').val === 'Dark')
      changeToDarkTheme();

}

function applyPersonalitySettings(){
  checkLanguage();
  checkTheme();
}

function changePersonality() {
  applyPersonalitySettings();
  //savePersonalitySettings();
}

function checkNewPassword(){
  if ($('#changePassword').val() != $('#confirmNewPassword').val())
    $('#passwordChanging').append("<p id='warningChangingPass'>Passwords are not the same</p>");
  else
    $('#warningChangingPass').remove();
}

function savePassword() {
  checkNewPassword();
  //SaveNewPassword();
  $('#passwordChanging').append("<p class='successChanged'>Password has successfully changed</p>")
}

function saveMail() {

}
