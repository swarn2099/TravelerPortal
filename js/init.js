(function($) {
  $(function() {
    $('.tabs').tabs();
    $('.sidenav').sidenav();
    $('.dropdown-trigger').dropdown();
    $('.datepicker').datepicker({autoClose: true});
    $('select').formSelect();
    $('.timepicker').timepicker({
      vibrate: true,
      autoClose: true,
    });
    $(".button-collapse").sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space
