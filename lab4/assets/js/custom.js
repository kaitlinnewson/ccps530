
// Add active class and aria attributes to nav

$('nav li a').filter(function(){
    return this.href === location.href;
}).addClass('active');

$('nav li a').filter(function(){
    return this.href === location.href;
}).attr('aria-current','page');
