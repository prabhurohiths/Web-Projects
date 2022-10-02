$(function () {
  var password = $("#password"),
    initBtn = $("#init-btn"),
    errorBox = $("#error-box"),
    b24 = $(".b24"),
    alertTriangle = $("#error-message-i");

  function showHideErrorMessage() {
    if (password.val().trim().length > 0) {
      $(this).toggleClass("zindex");

      if (errorBox.hasClass("active")) {
        b24.toggleClass("active");
        alertTriangle.toggleClass("shake");

        setTimeout(function () {
          errorBox.toggleClass("active");
        }, 300);

        setTimeout(function () {
          errorBox.toggleClass("zindex");
        }, 600);
      } else {
        errorBox.toggleClass("active zindex");
        setTimeout(function () {
          alertTriangle.toggleClass("shake");
          b24.toggleClass("active");
        }, 300);
      }
    }
  }

  initBtn.on("click", showHideErrorMessage);
});