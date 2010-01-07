FT.Util.Paginator = Class.create({
  initialize: function( element, config ){
    this.element     = element;
    this.button      = {};
    if( Object.isUndefined(config) ){
      config = {};
    }
    this.config = config;
    this.request     = config.request;
    this.reset( config.totalRecords, config.displayRecords, 
      config.displayPages, config.currentPage);
  },
  reset: function( total, display_records, display_pages, cur_page, display_page_from ){
    if( Object.isUndefined(total) ){
      this.total_records = 110;
    } else {
      this.total_records = total;
    }
    if( Object.isUndefined( display_records ) ){
      this.display_records = 10;
    } else {
      this.display_records = display_records;
    }
    this.total_pages     = this.get_total_pages( 
              this.total_records,
              this.display_records );
    this.display_pages   = display_pages || 10;
    this.current_page    = cur_page || 1;
    if( this.current_page > this.total_pages ){
      this.current_page = this.total_pages;
    }
    this.display_page_from = this.page_from( display_page_from || this.current_page);

    if( this.display_pages > this.total_pages ){
      this.display_pages = this.total_pages;
    }

    this.table   = new Element('table', {'class':'pagination_table'});
    this.tr      = new Element('tr');

    this.element.update();
    this.element.appendChild( this.table );
    this.table.appendChild( this.tr );
    this.add_buttons();
    this.activate_page( this.current_page - this.display_page_from );
    this.activate_buttons();
  },
  page_from: function( display_page_from ){
    var min_val = this.total_pages - this.display_pages ;
    if( min_val < 1 || display_page_from < 1 ) {
      return 1;
    }
    if(display_page_from > min_val ){
      return min_val;
    }
    return display_page_from;
  },
  get_total_pages: function( total, display ){
    if( display == 0 ){
      return 1;
    }
    var count = parseInt(total / display);
    if( (total % display) > 0 ) count++;
    if( count == 0 ) count = 1;
    return count;
  },
  add_buttons: function(){
    this.add_display_record();
    this.add_button(' ', 'space5px');
    this.add_start_button();
    this.button.start_img = this.add_button(' ','left_button');
    this.add_start();
    this.add_join_button();
    this.button.prev_img  = this.add_button(' ','left_button');
    this.add_previous();
    this.add_join_button();
    this.add_pages();
    this.add_join_button();
    this.add_next();
    this.button.next_img  = this.add_button(' ','right_button');
    this.add_join_button();
    this.add_end();
    this.button.end_img   = this.add_button(' ','right_button');
    this.add_end_button();
    this.add_button(' ', 'space5px');
    this.add_page_no();
  },
  add_button: function( cont, className ){
    var td = new Element('td', {'class':className});
    td.appendChild(document.createTextNode(cont));
    this.tr.appendChild(td);
    return td;
  },
  add_join_button: function(){
    this.add_button( ' ', 'join_button' );
  },
  add_start_button: function(){
    this.add_button( ' ', 'start_button' );
  },
  add_end_button: function(){
    this.add_button( ' ', 'end_button' );
  },
  add_display_record: function(){
    var td  = new Element('td');
    this.tr.appendChild( td );
    td.appendChild( document.createTextNode('Display #') );

    td = new Element('td');
    this.tr.appendChild( td );
    var sel_but = this.button.display_record = new Element('select');
    td.appendChild( sel_but );

    var sel_vals = [ 5, 10, 15, 20, 25, 30, 50, 100, 'all' ];
    for( var i=0; i<sel_vals.length; i++ ){
      var opt = new Element('option', {value: sel_vals[i]});
      opt.appendChild( document.createTextNode(sel_vals[i]) );
      sel_but.appendChild( opt );
    }

    this.update_display_record( this.display_records );
    var bfun = this.click_display_record.bind( this );
    Event.observe( sel_but, 'change', bfun );

  },
  add_start: function(){
    var td            = new Element('td', {'class':'normal_button'});
    this.button.start = new Element('a',{'href':'javascript:void(0);'});
    var bfun          = this.click_start.bind(this);

    this.tr.appendChild( td );
    td.appendChild( this.button.start );
    this.button.start.update('Start');
    Event.observe( this.button.start, 'click', bfun );
  },
  add_previous: function(){
    var td            = new Element('td', {'class':'normal_button'});
    this.button.prev  = new Element('a', {'href':'javascript:void(0);'});
    var bfun          = this.click_prev.bind(this);

    this.tr.appendChild( td );
    td.appendChild( this.button.prev );
    this.button.prev.update('Prev');
    Event.observe( this.button.prev, 'click', bfun );
  },
  add_pages: function(){
    this.button.pages = [];
    for( var i=0; i<this.display_pages; i++ ){
      var td  = new Element('td', {'class':'page_button'});
      var lnk = new Element('a', {'href':'javascript:void(0);'});
      var bfun= this.click_page.bind(this,i);

      this.tr.appendChild( td );
      td.appendChild( lnk );
      this.button.pages.push( lnk );

      Event.observe( lnk,'click', bfun );
    }
    this.update_pages();
  },
  add_next: function(){
    var td            = new Element('td', {'class':'normal_button'});
    var bfun          = this.click_next.bind(this);
    this.button.next  = new Element('a', {'href':'javascript:void(0);'});

    this.tr.appendChild( td );
    td.appendChild( this.button.next );
    this.button.next.update('Next');
    Event.observe( this.button.next, 'click', bfun );
  },
  add_end: function(){
    var td            = new Element('td', {'class':'normal_button'});
    var bfun          = this.click_end.bind(this);
    this.button.end   = new Element('a',{'href':'javascript:void(0);'});

    this.tr.appendChild( td );
    td.appendChild( this.button.end );
    this.button.end.update('End');
    Event.observe( this.button.end, 'click', bfun );
  },
  add_page_no: function(){
    this.td_cur_page = new Element('td');
    this.tr.appendChild( this.td_cur_page );
    this.update_page_no( this.current_page);
  },
  update_page_no: function( page_no ){
    this.td_cur_page.update('Page ' + page_no + ' of ' + this.total_pages);
  },
  update_pages: function( update_form ){
    if( !Object.isUndefined( update_form ) ){
      this.display_page_from = update_form;
    }
    for( var i=0; i<this.button.pages.length; i++ ){
      this.button.pages[i].update( this.display_page_from + i );
    }
  },
  update_display_record: function( dr ){
    if( dr == 0 )
      this.button.display_record.setValue( 'all' );
    else 
      this.button.display_record.setValue( dr );
  },
  click_page: function( pg_no ){
    
    if( this.current_page == (this.display_page_from + pg_no) ){
      return;
    }

    this.current_page = this.display_page_from + pg_no;
    this.update_page_no( this.current_page );

    this.activate_page(pg_no);
    this.activate_buttons();

    if( this.request ){
      this.request((this.current_page-1)*this.display_records, this.display_records);
    }
  },
  click_next: function(){
    if( this.current_page < this.total_pages ){
      if( this.current_page == (this.display_page_from + 
              this.display_pages - 1 )){
        this.update_pages( this.display_page_from + 1 );
        this.click_page( this.display_pages - 1 );
      } else {
        this.click_page( this.current_page - this.display_page_from + 1 );
      }
    } 
  },
  click_prev: function(){
    if( this.current_page > 1 ){
      if( this.current_page == this.display_page_from ){
        this.update_pages( this.display_page_from - 1 );
        this.click_page( 0 );
      } else {
        this.click_page( this.current_page - this.display_page_from - 1);
      }
    }
  },
  click_start: function(){
    if( this.current_page != 1 ){
      this.update_pages(1);
      this.click_page(0);
    }
  },
  click_end: function(){
    if( this.current_page != this.total_pages ){
      this.update_pages( this.total_pages - this.display_pages + 1 );
      this.click_page(this.display_pages - 1);
    }
  },
  click_display_record: function(){
    var dsp_rcd = parseInt( this.button.display_record.getValue() );
    if( dsp_rcd ){
      var cur_page = this.current_page;
      var old_dsp_rcd = this.display_records;
      cur_page = parseInt( (cur_page-1) * old_dsp_rcd / dsp_rcd );
      this.reset( this.total_records, dsp_rcd, this.config.display_pages,
              cur_page );
    } else {
      this.reset( this.total_records, 0, this.config.display_pages, 1);
    }
  },
  activate_page: function(pg_no){
    for( var i=0; i<this.button.pages.length; i++ ){
      this.button.pages[i].removeClassName('active');
    }
    this.button.pages[pg_no].addClassName('active');
    this.button.display_record.focus();
  },
  activate_buttons: function(){
    if( this.display_page_from == 1 ){
      this.button.start_img.removeClassName('active');
    } else {
      this.button.start_img.addClassName('active');
    }

    if( this.current_page == 1 ){
      this.button.prev_img.removeClassName('active');
    } else {
      this.button.prev_img.addClassName('active');
    }

    if( this.current_page == this.total_pages ){
      this.button.next_img.removeClassName('active');
    } else {
      this.button.next_img.addClassName('active');
    }

    if((this.display_page_from+this.display_pages) > this.total_pages){
      this.button.end_img.removeClassName('active');
    } else {
      this.button.end_img.addClassName('active');
    }
  }

});
