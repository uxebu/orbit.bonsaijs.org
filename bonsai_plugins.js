wait();

require.config({
  paths: {
    as3shim: 'js/as3shim',
    as3vm : 'js/as3vm',
    spareparts: 'js/spareparts'
  }
});

require(['js/spareparts/text_field', 'js/spareparts/button', 'js/spareparts/preloader' /*, 'js/as3shim', 'js/as3vm'*/], function() {
  done();
});
