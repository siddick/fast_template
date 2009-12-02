FT.Util.Paginator = Class.create( { 
  initialize: function( div_id , total_records , display_records  ){
    this.main_obj       = $(div_id);
    this.main_obj.paginator = this ;
    this.total_records  = total_records;
    this.display_records= display_records;
    this.current_page   = 1;
    this.current_page_index = 0;
//    this.total_pages    = Math.ceil( this.total_pages / this.display_records)  ;
    //round


    //get all the objects.
      this.button_start       = new Element('a');
      this.button_start_back  = new Element('span');
      this.button_start_display = false;
        //-- Start button 
        this.button_start.writeAttribute('href','javascript:void(0);');
        this.button_start.writeAttribute('title','start');
        this.button_start.paginator = this ;
//        this.button_start.writeAttribute('onclick','this.paginator.start_call(this);return false;');
        Event.observe( this.button_start , 'click', function(){ this.paginator.start_call(this);return false; } );
        this.button_start.appendChild( document.createTextNode('Start') );
        this.button_start_back.appendChild( document.createTextNode('Start') );
        //--

      this.button_end         = new Element('a');
      this.button_end_back    = new Element('span');
      this.button_end_display =  false;
        //-- End button 
        this.button_end.writeAttribute('href','javascript:void(0);');
        this.button_end.writeAttribute('title','end');
        this.button_end.paginator = this ;
//        this.button_end.writeAttribute('onclick','this.paginator.end_call(this);return false;');
        Event.observe(this.button_end , 'click', function(){this.paginator.end_call(this);return false; } );
        this.button_end.appendChild( document.createTextNode('End') );
        this.button_end_back.appendChild( document.createTextNode('End') );
        //--

      this.button_prev        = new Element('a');
      this.button_prev_back   = new Element('span');
      this.button_prev_display = false ;
        //-- Previous button 
        this.button_prev.writeAttribute('href','javascript:void(0);');
        this.button_prev.writeAttribute('title','previous page');
        this.button_prev.paginator = this ;
//        this.button_prev.writeAttribute('onclick','this.paginator.prev_call(this);return false;');
        Event.observe( this.button_prev, 'click', function(){this.paginator.prev_call(this);return false; } );
        this.button_prev.appendChild( document.createTextNode('Prev') );
        this.button_prev_back.appendChild( document.createTextNode('Prev') );
        //--

      this.button_next        = new Element('a');
      this.button_next_back   = new Element('span');
      this.button_next_display = false;
        //-- Next button 
        this.button_next.writeAttribute('href','javascript:void(0);');
        this.button_next.writeAttribute('title','next page');
        this.button_next.paginator = this ;
//        this.button_next.writeAttribute('onclick','this.paginator.next_call(this);return false;');
        Event.observe( this.button_next , 'click', function(){ this.paginator.next_call(this);return false; } );
        this.button_next.appendChild( document.createTextNode('Next') );
        this.button_next_back.appendChild( document.createTextNode('Next') );
        //--

      this.button_pages       = [];
        //-- Page buttons 
        var count = 0;
        var cur_rec = 0;
        while( true ){
          var obj = new Element('a') ;
          obj.paginator = this ;
          obj.writeAttribute('href','javascript:void(0);');
//          obj.writeAttribute('onclick',"this.paginator.set_page(this,"+count+");return false;");
          obj.count = count
          Event.observe( obj, 'click', function(){ this.paginator.set_page(this, this.count);return false; } );
          this.button_pages.push( obj );
          count++;
          cur_rec += display_records;
          if( count >= 10  || cur_rec >= total_records )
            break;
        }
        //--
      this.button_current_page = new Element('span');

      this.limit         = new Element('select');
        //-- select record limit
        this.limit.paginator = this ;
        this.limit.writeAttribute('name','limit');
//        this.limit.writeAttribute('onchange','this.paginator.change_record(this);');
        Event.observe(this.limit, 'change', function(){ this.paginator.change_record(this); });
        this.limit.addClassName('inputbox');
        var ary = [ ['5','5'],['10','10'],['15','15'],['20','20'],['25','25'],['30','30'],['50','50'],['100','100'],['0','all'] ] ;
        while( ary.size() > 0 ){
            var i = ary.shift();
            var chi = new Element('option');
            chi.writeAttribute('value',i[0]);
            chi.appendChild( document.createTextNode(i[1]));
            this.limit.appendChild( chi );
          }
        //--
      this.offset        = new Element('input');
        //-- Offset value
        this.offset.writeAttribute('name','offset');
        this.offset.writeAttribute('value','0');
        this.offset.writeAttribute('type', 'hidden');
        //--
      this.page_info = new Element('div');
        this.page_info.addClassName('limit');

        //-- Init display
          this.init_display();
        //--



  }, prev_call: function( obj ){
    if( ( this.current_page_index < 2 && this.current_page > 2 ) || ( this.current_page_index == 0 && this.current_page > 1 )){
      this.shift_left( 1, 1 );
    } else {
      prev_page_index = this.current_page_index;
      prev_page_no    = this.current_page;

      this.current_page_index = prev_page_index - 1;
      this.current_page       = this.current_page - 1;
      this.buttons_display();
      this.highlight_current_page( prev_page_index, prev_page_no, this.current_page );
      this.display_page_info();
    }
    this.offset.value = this.display_records * ( this.current_page - 1 );
    this.table_request();
  }, shift_left: function( count , dec ){
    begin_page = this.current_page - this.current_page_index ;
    begin_page = begin_page - count ;
//    if( begin_page <= 0 ){
//      begin_page = 1;
//    }

    prev_page_index = this.current_page_index ;
    prev_page_no = 0;

    this.current_page_index = this.current_page_index + ( count - dec );
    this.current_page       = this.current_page - dec ;

    ary = this.button_pages;
    for( i = 0 ; i < ary.size(); i++ ){
        ary[i].update( begin_page );
        ary[i].writeAttribute('title', begin_page );
        if( prev_page_index == i ) {
          prev_page_no = begin_page ;
        }
        begin_page++;
    }
    
    this.buttons_display();
    this.highlight_current_page( prev_page_index, prev_page_no, this.current_page );
    this.display_page_info();
    
  }, shift_right: function( count , inc ){
    begin_page = this.current_page - this.current_page_index ;
    begin_page = begin_page + count ;

    prev_page_index = this.current_page_index ;
    prev_page_no = 0;

    this.current_page_index = this.current_page_index - ( count - inc );
    this.current_page       = this.current_page + inc ;

    ary = this.button_pages;
    for( i = 0 ; i < ary.size(); i++ ){
        ary[i].update( begin_page );
        ary[i].writeAttribute('title', begin_page );
        if( prev_page_index == i ) {
          prev_page_no = begin_page ;
        }
        begin_page++;
    }
    
    this.buttons_display();
    this.highlight_current_page( prev_page_index, prev_page_no, this.current_page );
    this.display_page_info();
  },next_call: function( obj ){
    if(( this.current_page_index >= (this.button_pages.size() -2) && this.total_pages >= ( this.current_page + 2 )) || ( this.current_page_index == (this.button_pages.size()-1 ) && this.total_pages > this.current_page  )  ){
      this.shift_right( 1, 1 );
    } else{ 
      prev_page_index = this.current_page_index;
      prev_page_no    = this.current_page;

      this.current_page_index = prev_page_index + 1;
      this.current_page       = this.current_page + 1;
      this.buttons_display();
      this.highlight_current_page( prev_page_index, prev_page_no, this.current_page );
      this.display_page_info();
    }
    this.offset.value = this.display_records * ( this.current_page - 1 );
    this.table_request();
  }, start_call: function( obj ){ //-- Start call

      prev_index = this.current_page_index ;
      prev_page_no = 0;
      ary = this.button_pages ;
      for( i = 0 ; i < ary.size(); i++ ){
        ary[i].update( i + 1 );
        ary[i].writeAttribute('title',i+1);
        if( prev_index == i ) {
          prev_page_no = i + 1 ;
        }
      }
      this.current_page_index = 0 ;
      this.current_page = 1;
      this.buttons_display();
      this.highlight_current_page( prev_index, prev_page_no, this.current_page );
      this.display_page_info();
      this.offset.value = 0 ;
      this.table_request();
  }, end_call: function( obj ){
    prev_index = this.current_page_index ;
    prev_page_no = 0;
    ary = this.button_pages ;
    tot_page = this.total_pages - ary.size() ;
    for( i = 0 ; i < ary.size(); i++ ){
        tot_page++;
        ary[i].update( tot_page  );
        ary[i].writeAttribute('title', tot_page);
        if( prev_index == i ) {
          prev_page_no = tot_page ;
        }
    }
    this.current_page_index = ary.size() -1 ;
    this.current_page = this.total_pages ;

    this.buttons_display();
    this.highlight_current_page( prev_index, prev_page_no, this.current_page );
    this.display_page_info();
    this.offset.value = this.display_records * ( this.current_page - 1 );
    this.table_request();

  },init_display: function(){    //-- Init display

      var del_obj = (new Element('del')).addClassName('container');
      var div_page_obj = (new Element('div')).addClassName('pagination');

      //-- Display limit
        var tmp_obj = new Element('div');
        tmp_obj.addClassName( 'limit');
        var tmp_txt = document.createTextNode('Display #');
        tmp_obj.appendChild( tmp_txt );
        tmp_obj.appendChild( this.limit );
        div_page_obj.appendChild( tmp_obj );
        this.limit.value = this.display_records ;
        this.total_pages = Math.ceil( this.total_records / this.limit.value );
        //round
      //--

      //-- Display start button
        var tmp_obj = (new Element('div')).addClassName('start');
        tmp_obj.appendChild( this.button_start_back );
        var tmp_obj2 = (new Element('div')).addClassName('button2-right');
        tmp_obj2.addClassName('off');
        tmp_obj2.appendChild( tmp_obj ) ;
        div_page_obj.appendChild( tmp_obj2 );
      //--

      //-- Display prev 
        var tmp_div_but_obj = (new Element('div')).addClassName('button2-right');
        tmp_div_but_obj.addClassName('off');
        var tmp_div_prev_obj = (new Element('div')).addClassName('prev');
        tmp_div_but_obj.appendChild( tmp_div_prev_obj );
        tmp_div_prev_obj.appendChild( this.button_prev_back );
        div_page_obj.appendChild(  tmp_div_but_obj );
      //-- 

      //-- Pages
        var tmp_div_page = new Element('div');
          tmp_div_page.addClassName('page');
        var tmp_div_button = new Element('div');
          tmp_div_button.addClassName('button2-left');
          tmp_div_button.appendChild( tmp_div_page );

        var pg_size = this.button_pages.size();
        for(var  i =0; i<pg_size; i++ ){
          if( this.current_page_index == i ){
            tmp_obj = this.button_current_page;
          } else {
            tmp_obj = this.button_pages[i];
            tmp_obj.writeAttribute('title', i +1 );
          }
//          tmp_obj.appendChild( document.createTextNode( i +1 ) );
          tmp_obj.update( i + 1 );
          tmp_div_page.appendChild(tmp_obj);
        }
        div_page_obj.appendChild( tmp_div_button );
      //--

      //-- Display Next
        tmp_div_but_obj = (new Element('div')).addClassName('button2-left');
        if( pg_size > 1 ){
          tmp_div_prev_obj = (new Element('div')).addClassName('next');
          tmp_div_but_obj.appendChild( tmp_div_prev_obj );
          tmp_div_prev_obj.appendChild( this.button_next );
          div_page_obj.appendChild(  tmp_div_but_obj );
          this.button_next_display = true;
        } else {
          tmp_div_but_obj.addClassName('off');
          tmp_div_prev_obj = (new Element('div')).addClassName('next');
          tmp_div_but_obj.appendChild( tmp_div_prev_obj );
          tmp_div_prev_obj.appendChild( this.button_next_back );
          div_page_obj.appendChild(  tmp_div_but_obj );
        }
      //--

      //-- Display End
        tmp_div_but_obj = (new Element('div')).addClassName('button2-left');
        if( pg_size > 1 ){
          tmp_div_prev_obj = (new Element('div')).addClassName('end');
          tmp_div_but_obj.appendChild( tmp_div_prev_obj );
          tmp_div_prev_obj.appendChild( this.button_end );
          div_page_obj.appendChild(  tmp_div_but_obj );
          this.button_end_display = true;
        } else {
          tmp_div_but_obj.addClassName('off');
          tmp_div_prev_obj = (new Element('div')).addClassName('end');
          tmp_div_but_obj.appendChild( tmp_div_prev_obj );
          tmp_div_prev_obj.appendChild( this.button_end_back );
          div_page_obj.appendChild(  tmp_div_but_obj );
        }

      //--

      //-- Display the Current page and Total page
        tmp_str = 'Page ' + this.current_page + ' of ' + this.total_pages ;
        this.page_info.appendChild( document.createTextNode( tmp_str ) );
        div_page_obj.appendChild( this.page_info );
      //-- 

      //-- hidden offset
        div_page_obj.appendChild( this.offset );
      //--

      //-- every thing
      del_obj.appendChild( div_page_obj )
      this.main_obj.appendChild( del_obj );
  }, set_page: function( page_sel_obj, change_page_index ){
    // calculate the current page & offset value.
    // disable or enable start , prev , next & end buttons.

    var prv_page_index = this.current_page_index;
    var prv_page_no    = this.current_page ;
    this.current_page = this.current_page + ( change_page_index - this.current_page_index );
    this.current_page_index = change_page_index;

    this.offset.value = this.display_records * ( this.current_page - 1 );

    this.display_page_info();
    this.buttons_display();
    this.highlight_current_page( prv_page_index, prv_page_no , this.current_page );
    this.table_request();

  }, display_page_info: function(){
    tmp_str = 'Page ' + this.current_page + ' of ' + this.total_pages ;
    this.page_info.update( tmp_str );
    
  }, buttons_display: function(){
    if( this.current_page == 1 ){
      this.disable_prev_button();
      this.disable_start_button();
    } else { 
      this.enable_prev_button();
      this.enable_start_button();
    }
    if( this.current_page == this.total_pages ){
      this.disable_end_button();
      this.disable_next_button();
    } else { 
      this.enable_end_button();
      this.enable_next_button();
    }
  }, disable_prev_button:   function(){
    if( this.button_prev_display ){
      obj = this.button_prev;
      obj.parentNode.parentNode.addClassName('off');
      prt_node = obj.parentNode;
      obj.remove() ;
      prt_node.appendChild( this.button_prev_back );
      this.button_prev_display = false;
    }
  }, disable_start_button:  function(){
    if( this.button_start_display ){
      obj = this.button_start;
      obj.parentNode.parentNode.addClassName('off');
      prt_node = obj.parentNode;
      obj.remove() ;
      prt_node.appendChild( this.button_start_back );
      this.button_start_display = false;
    }
  }, disable_end_button:    function(){
    if( this.button_end_display){
      obj = this.button_end ;
      obj.parentNode.parentNode.addClassName('off');
      prt_node = obj.parentNode;
      obj.remove() ;
      prt_node.appendChild( this.button_end_back );
      this.button_end_display = false;
    }
  }, disable_next_button:   function(){
    if( this.button_next_display){
      obj = this.button_next;
      obj.parentNode.parentNode.addClassName('off');
      prt_node = obj.parentNode;
      obj.remove() ;
      prt_node.appendChild( this.button_next_back );
      this.button_next_display = false;
    }
  }, enable_prev_button:    function(){
    if( !this.button_prev_display ){
      obj = this.button_prev_back;
      obj.parentNode.parentNode.removeClassName('off');
      prt_node = obj.parentNode;
      obj.remove() ;
      prt_node.appendChild( this.button_prev );
      this.button_prev_display = true;
    }
  }, enable_start_button:   function(){
    if( !this.button_start_display ){
      obj = this.button_start_back;
      obj.parentNode.parentNode.removeClassName('off');
      prt_node = obj.parentNode;
      obj.remove() ;
      prt_node.appendChild( this.button_start );
      this.button_start_display = true;
    }
  }, enable_end_button:     function(){
    if( !this.button_end_display){
      obj = this.button_end_back;
      obj.parentNode.parentNode.removeClassName('off');
      prt_node = obj.parentNode;
      obj.remove() ;
      prt_node.appendChild( this.button_end );
      this.button_end_display = true;
    }
  }, enable_next_button:    function(){
    if( !this.button_next_display){
      obj = this.button_next_back;
      obj.parentNode.parentNode.removeClassName('off');
      prt_node = obj.parentNode;
      obj.remove() ;
      prt_node.appendChild( this.button_next );
      this.button_next_display = true;
    }
  }, highlight_current_page: function( prev_index, prev_page, current_page ){
    var prev_obj = this.button_pages[prev_index];
    prev_obj.update(prev_page );
    this.button_current_page.replace( prev_obj );
    this.button_current_page.update( current_page );
    var cur_obj = this.button_pages[ this.current_page_index ];
    cur_obj.replace( this.button_current_page );
  }, change_record: function( self_obj, refresh_req ){
    self_obj.disable();
    // calculate the current page & current page index.
    // calculate the begin page.
    // calculate the offset value.
    // remove the current page list 
    // prepare the page list and current display page.
    // Display the prepared page list and current display page.
    // check the button display & handle it.
    // display the current page info.
    
    // display records
    var dsp_rcd  = self_obj.value;
    if( dsp_rcd == 0 ) dsp_rcd = this.total_records ;

    // total pages.
    var tot_page = Math.ceil( this.total_records / dsp_rcd );
    //round

    // current page
    var cur_page = Math.ceil( (this.current_page * this.display_records ) / dsp_rcd );
    if( cur_page <= 0 ) cur_page = 1 ;
    if( cur_page > tot_page ) cur_page = tot_page ;



    // current page index & begin page.
    if( tot_page > 10 ){
      if( ( cur_page + 7 ) > tot_page ){
        begin_page = ( tot_page - 10 ) + 1 ;
        cur_page_index =cur_page - begin_page  ;
      }else{
        begin_page = cur_page - 2 ;
        if( begin_page < 1 ){
          begin_page =  1 ;
        }
        cur_page_index = cur_page - begin_page  ;
      }
    } else{
      cur_page_index = cur_page - 1;
      begin_page = 1;
    }

    // Remove the old pages.
    var parent_page_obj = this.button_current_page.parentNode ; // object of parent page.
    var a_size = this.button_pages.size();
    for(var  i = 0 ; i < a_size; i++ ){
      if( this.current_page_index == i ){
        this.button_current_page.remove();
      }else{
        this.button_pages[i].remove();
      }
    }

    // generate the page list.
    if( tot_page > 10 ){
      a_size = 10;
    } else{
      a_size = tot_page;
    }

    var count = begin_page;
    this.button_pages = [];
    for( var i = 0; i < a_size ; i++ ){
      var obj = new Element('a') ;
      obj.paginator = this ;
      obj.writeAttribute('href','javascript:void(0);');
//      obj.writeAttribute('onclick',"this.paginator.set_page(this,"+i+");return false;");
      obj.count = i;
      Event.observe( obj, 'click', function(){ this.paginator.set_page(this,this.count );return false; } );
      this.button_pages.push( obj );
      obj.appendChild( document.createTextNode(count) );
      if( cur_page_index == i ){
        this.button_current_page.update( count );
        parent_page_obj.appendChild( this.button_current_page);
      } else{
        parent_page_obj.appendChild( obj );
      }
      
      count++;
    }

    // store the values.
    this.current_page = cur_page;
    this.current_page_index = cur_page_index ;
    this.display_records = dsp_rcd ;
    this.total_pages = tot_page;

    // calculate the offset value.
    this.offset.value = this.display_records * ( this.current_page - 1 );

    this.display_page_info();
    this.buttons_display();
    this.offset.value = this.display_records * ( this.current_page - 1 );
    if( !refresh_req ){ /* Not a refresh request */
      this.table_request();
    }
    self_obj.enable();
  }, table_request: function(){
    if( this.main_obj.table ){
      this.main_obj.table.paginator_request( this );
    }
  }, refresh: function( total_records ){
    this.total_records = total_records;
    this.change_record( this.limit, true );
  }
} );
