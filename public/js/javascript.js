
$(".salad-dishes, .noodle-dishes").hide();

$(".item").click(function() {
  $(".item").removeClass('sub-active');
  const menuCurrent = $(this).attr('id');
  $("#" + menuCurrent).addClass('sub-active');
  showMenu(menuCurrent);
});

function showMenu(className) {
  $(".pizza-dishes, .salad-dishes, .noodle-dishes").hide();
  $("." + className).show();
}

$(".btn-signup").click(function() {
  $(this).addClass('btn-animation');
  setTimeout(function() {
    $(".btn-signup").removeClass('btn-animation');
  }, 100);
});
